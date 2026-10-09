const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');
const {WebSocketServer, WebSocket} = require('ws');

const ROOT = __dirname;
const PORT = Number(process.env.PORT) || 3000;
const validUsers = new Set([1, 2, 3, 4, 5]);
const pageFiles = new Set([
  'index.html', 'home.html', 'discover.html', 'learn.html', 'connections.html',
  'messages.html', 'profile.html', 'threat-watch.html'
]);
const mimeTypes = {
  '.css': 'text/css; charset=utf-8',
  '.html': 'text/html; charset=utf-8',
  '.ico': 'image/x-icon',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.mp4': 'video/mp4',
  '.png': 'image/png',
  '.svg': 'image/svg+xml',
  '.webp': 'image/webp'
};

const app = http.createServer((request, response) => {
  const requestPath = decodeURIComponent(new URL(request.url, 'http://localhost').pathname);
  const requestedFile = requestPath.slice(1);
  const relativePath = requestPath === '/' ?
      'html/index.html' :
      pageFiles.has(requestedFile) ? `html/${requestedFile}` : requestedFile;
  const filePath = path.resolve(ROOT, relativePath);
  if (filePath !== ROOT && !filePath.startsWith(`${ROOT}${path.sep}`)) {
    response.writeHead(403).end('Forbidden');
    return;
  }

  fs.stat(filePath, (error, stat) => {
    if (error || !stat.isFile()) {
      response.writeHead(404, {'Content-Type': 'text/plain; charset=utf-8'});
      response.end('Not found');
      return;
    }

    const headers = {
      'Content-Type': mimeTypes[path.extname(filePath).toLowerCase()] || 'application/octet-stream',
      'Cache-Control': 'no-store'
    };
    const range = request.headers.range;
    if (range && path.extname(filePath).toLowerCase() === '.mp4') {
      const match = /^bytes=(\d*)-(\d*)$/.exec(range);
      if (!match) {
        response.writeHead(416).end();
        return;
      }
      const start = match[1] ? Number(match[1]) : 0;
      const end = match[2] ? Math.min(Number(match[2]), stat.size - 1) : stat.size - 1;
      if (start > end || start >= stat.size) {
        response.writeHead(416, {'Content-Range': `bytes */${stat.size}`}).end();
        return;
      }
      response.writeHead(206, {
        ...headers,
        'Accept-Ranges': 'bytes',
        'Content-Length': end - start + 1,
        'Content-Range': `bytes ${start}-${end}/${stat.size}`
      });
      fs.createReadStream(filePath, {start, end}).pipe(response);
      return;
    }

    response.writeHead(200, headers);
    fs.createReadStream(filePath).pipe(response);
  });
});

const sockets = new WebSocketServer({server: app, path: '/realtime', maxPayload: 16 * 1024 * 1024});

sockets.on('connection', (socket, request) => {
  const userId = Number(new URL(request.url, 'http://localhost').searchParams.get('userId'));
  if (!validUsers.has(userId)) {
    socket.close(1008, 'Sign in with a demo account first');
    return;
  }
  socket.userId = userId;

  socket.on('message', data => {
    let event;
    try {
      event = JSON.parse(data.toString());
    } catch {
      return;
    }

    if (!event || event.actorId !== socket.userId || typeof event.type !== 'string') return;
    const allowedTypes = new Set([
      'post:create', 'post:reaction', 'post:comment', 'message:send', 'connection:request'
    ]);
    if (!allowedTypes.has(event.type)) return;
    if (event.type === 'post:create' && event.post?.authorId !== socket.userId) return;
    if (event.type === 'post:comment' && event.comment?.authorId !== socket.userId) return;
    if (event.type === 'message:send' &&
        (event.message?.fromId !== socket.userId || !validUsers.has(event.toId))) return;
    if (event.type === 'connection:request' &&
        (event.request?.fromId !== socket.userId || !validUsers.has(event.toId))) return;

    const serialized = JSON.stringify({...event, timestamp: event.timestamp || new Date().toISOString()});
    for (const peer of sockets.clients) {
      if (peer === socket || peer.readyState !== WebSocket.OPEN) continue;
      if (event.type === 'message:send' || event.type === 'connection:request') {
        if (peer.userId !== event.toId && peer.userId !== event.actorId) continue;
      }
      peer.send(serialized);
    }
  });
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`ZeroDay demo is available at http://localhost:${PORT}`);
  console.log('Realtime chat, feed updates, and reactions are kept in memory while this server runs.');
});
