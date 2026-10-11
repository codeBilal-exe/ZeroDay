# ZeroDay

ZeroDay is a cybersecurity community prototype for sharing posts, discussions, learning resources, and security awareness updates. It uses HTML, CSS, and browser JavaScript, with a small Node.js server for page delivery and temporary WebSocket updates.

## Features

- Five local demo accounts and profile pages.
- Home feed with image and video posts, reactions, comments, search, and topic filters.
- Discover, Learn, Connections, Messages, Profile, and Threat Watch pages.
- Dark and light themes, saved locally in the browser.
- Responsive navigation and layouts for mobile through desktop.
- Optional live messages, posts, comments, reactions, and sent connection requests between open sessions.
- Feed videos load as they approach the viewport and pause when offscreen.

## Project layout

```text
ZeroDay/
+-- assets/                 # Avatars, icons, post images, and videos
+-- css/
|   +-- style.css           # Shared design system and page styles
+-- html/                   # Application pages
|   +-- index.html
|   +-- home.html
|   +-- discover.html
|   +-- learn.html
|   +-- connections.html
|   +-- messages.html
|   +-- profile.html
|   +-- threat-watch.html
+-- js/                     # Shared code and page behavior
+-- Chat_server/            # Node server, WebSocket relay, and demo guide
    +-- Chat-Demo.md
    +-- package.json
    +-- package-lock.json
    +-- server.js
```

## Run locally

Install [Node.js](https://nodejs.org/), then run these commands from the project directory:

```sh
cd Chat_server
npm install
npm start
```

Open [http://localhost:3000](http://localhost:3000). Keep the server running while using the site. To demonstrate live updates, open a second browser profile or private window and sign in with a different account.

## Demo accounts

| Username | Password | Notes |
| --- | --- | --- |
| `bilal.asif` | `zeroday123` | Presenter account |
| `usaid.rehan` | `zeroday` | Connected to Bilal, Raheem, and Mina |
| `raheemxd` | `zeroday` | Connected to Bilal, Usaid, and Mina |
| `mina.codes` | `zeroday` | Connected to Bilal, Usaid, and Raheem |
| `daniyal.noor` | `zeroday` | Unconnected account for request demos |

See [Chat_server/Chat-Demo.md](Chat_server/Chat-Demo.md) for a presentation walkthrough.

## Live update limits

The WebSocket relay sends messages, new posts, comments, reaction counts, and outgoing connection requests to relevant open sessions. It keeps no history: refresh the page or restart the server and the app returns to its sample data. Accepting or rejecting a request, saved posts, blocks, and theme preferences are not synchronized.

The login accounts are mock data for a local prototype, not production authentication. Bootstrap and Google Fonts are loaded from external CDNs, so those resources need an internet connection.
