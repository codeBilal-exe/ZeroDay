/* ============================================
   ZeroDay — Messages / Secure Channels (messages.js)
   ============================================ */

let currentActiveChatUserId = null;

document.addEventListener('DOMContentLoaded', () => {
  checkAuth();

  document.getElementById('nav-container').innerHTML = buildNavigation('messages');
  initNavToggle();

  renderChannelsList();
  setupSearch();

  // Check if we need to open a specific chat (e.g. from profile page link)
  const params = new URLSearchParams(window.location.search);
  const toUserId = params.get('to');
  if (toUserId) {
    const id = parseInt(toUserId);
    if (getUserById(id)) {
      openChat(id);
    }
  }

  // Setup message send form
  const form = document.getElementById('send-message-form');
  const input = document.getElementById('message-input');
  const error = document.getElementById('message-error');

  input.addEventListener('input', () => {
    input.classList.remove('is-invalid');
    error.classList.remove('show');
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const content = input.value.trim();
    
    if (!content) {
      input.classList.add('is-invalid');
      error.classList.add('show');
      return;
    }

    if (currentActiveChatUserId) {
      sendMessage(currentActiveChatUserId, content);
      input.value = '';
    }
  });
});

/** Render list of active channels (conversations) */
function renderChannelsList(filterQuery = '') {
  const currentUser = getCurrentUser();
  const partners = getConversationPartners(currentUser.id);
  const container = document.getElementById('channels-list');
  const query = filterQuery.toLowerCase();

  const filtered = partners.filter(p => p.name.toLowerCase().includes(query) || p.role.toLowerCase().includes(query));

  if (filtered.length === 0) {
    container.innerHTML = `
      <div style="padding:1.5rem;text-align:center;color:var(--zd-muted);font-size:0.85rem;">
        No channels found.
      </div>
    `;
    return;
  }

  container.innerHTML = filtered.map(p => {
    const isActive = p.id === currentActiveChatUserId;
    const isUnread = p.unreadCount > 0;
    
    // Formatting preview
    let preview = p.lastMessage.content;
    if (preview.length > 35) preview = preview.substring(0, 35) + '...';
    if (p.lastMessage.fromId === currentUser.id) preview = 'You: ' + preview;

    return `
      <div class="channel-item ${isActive ? 'active' : ''}" onclick="openChat(${p.id})">
        ${renderAvatar(p, 'avatar-md')}
        <div style="flex:1;min-width:0;">
          <div style="display:flex;justify-content:space-between;align-items:baseline;margin-bottom:0.2rem;">
            <div style="font-weight:600;font-size:0.9rem;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;${isUnread ? 'color:var(--zd-text);' : ''}">${p.name}</div>
            <div class="technical-label" style="font-size:0.55rem;flex-shrink:0;">${timeAgo(p.lastMessage.timestamp)}</div>
          </div>
          <div style="font-size:0.75rem;color:var(--zd-muted);white-space:nowrap;overflow:hidden;text-overflow:ellipsis;${isUnread ? 'font-weight:600;color:var(--zd-text);' : ''}">
            ${preview}
          </div>
        </div>
        ${isUnread ? '<div class="channel-unread"></div>' : ''}
      </div>
    `;
  }).join('');
}

/** Search filter setup */
function setupSearch() {
  const searchInput = document.getElementById('channel-search');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      renderChannelsList(e.target.value);
    });
  }
}

/** Open a specific chat */
function openChat(partnerId) {
  const currentUser = getCurrentUser();
  const partner = getUserById(partnerId);
  if (!partner) return;

  currentActiveChatUserId = partnerId;

  // Layout adjustments for mobile
  document.getElementById('messaging-workspace').classList.add('chat-active');
  document.getElementById('chat-empty-state').style.display = 'none';
  document.getElementById('active-chat').style.display = 'flex';

  // Mark as read
  messages.forEach(m => {
    if (m.toId === currentUser.id && m.fromId === partnerId) {
      m.read = true;
    }
  });

  // Re-render sidebar to clear unread markers and update active state
  renderChannelsList(document.getElementById('channel-search').value);
  // Re-render top nav to update unread badge
  document.getElementById('nav-container').innerHTML = buildNavigation('messages');
  initNavToggle();

  // Set chat header
  document.getElementById('chat-header-user').innerHTML = `
    <a href="profile.html?id=${partner.id}">${renderAvatar(partner, 'avatar-sm')}</a>
    <div>
      <a href="profile.html?id=${partner.id}" style="color:inherit;text-decoration:none;"><div style="font-weight:600;font-size:0.95rem;line-height:1;">${partner.name}</div></a>
      <div style="display:flex;align-items:center;gap:0.4rem;margin-top:0.2rem;">
        <span class="zd-status-dot ${partner.status}"></span>
        <span class="technical-label" style="font-size:0.55rem;text-transform:lowercase;">${partner.status}</span>
      </div>
    </div>
  `;

  renderChatMessages();
}

/** Render messages in the active chat */
function renderChatMessages() {
  if (!currentActiveChatUserId) return;
  const currentUser = getCurrentUser();
  const convo = getConversation(currentUser.id, currentActiveChatUserId);
  const container = document.getElementById('chat-messages');
  
  if (convo.length === 0) {
    container.innerHTML = `
      <div style="text-align:center;color:var(--zd-muted);font-size:0.85rem;margin-top:2rem;">
        <div class="technical-label mb-sm">CHANNEL ESTABLISHED</div>
        <p>No messages yet. Messages are end-to-end encrypted (simulated).</p>
      </div>
    `;
  } else {
    container.innerHTML = convo.map(m => {
      const isSent = m.fromId === currentUser.id;
      return `
        <div class="msg-bubble ${isSent ? 'sent' : 'received'}">
          <div>${m.content}</div>
          <div class="msg-time" style="text-align:${isSent ? 'right' : 'left'};">
            ${timeAgo(m.timestamp)} ${isSent ? (m.read ? '· Read' : '· Delivered') : ''}
          </div>
        </div>
      `;
    }).join('');
  }

  // Scroll to bottom
  container.scrollTop = container.scrollHeight;
}

/** Send a new message */
function sendMessage(toId, content) {
  const currentUser = getCurrentUser();
  
  const newMsg = {
    id: messages.length + 1,
    fromId: currentUser.id,
    toId: toId,
    content: content,
    timestamp: new Date(),
    read: false
  };

  messages.push(newMsg);

  renderChatMessages();
  renderChannelsList(document.getElementById('channel-search').value);
}

/** Back to channels list (mobile) */
function backToChannels() {
  document.getElementById('messaging-workspace').classList.remove('chat-active');
  currentActiveChatUserId = null;
  renderChannelsList(document.getElementById('channel-search').value);
}

/** Open modal to start new chat */
function openNewChatModal() {
  const currentUser = getCurrentUser();
  // Allow messaging anyone, but sort connections first
  let targetUsers = users.filter(u => u.id !== currentUser.id);
  
  targetUsers.sort((a, b) => {
    const aConn = currentUser.connections.includes(a.id);
    const bConn = currentUser.connections.includes(b.id);
    if (aConn && !bConn) return -1;
    if (!aConn && bConn) return 1;
    return a.name.localeCompare(b.name);
  });

  const select = document.getElementById('new-chat-target');
  select.innerHTML = targetUsers.map(u => {
    const isConn = currentUser.connections.includes(u.id);
    return `<option value="${u.id}" style="padding:0.75rem 1rem;border-bottom:1px solid var(--zd-border-light);cursor:pointer;">
      ${u.name} ${isConn ? '(Connection)' : ''} — ${u.role}
    </option>`;
  }).join('');

  const modal = new bootstrap.Modal(document.getElementById('newChatModal'));
  modal.show();
}

/** Start new chat from modal */
function startNewChat() {
  const select = document.getElementById('new-chat-target');
  const targetId = parseInt(select.value);

  if (!targetId || isNaN(targetId)) {
    showToast('Please select a user.', 'error');
    return;
  }

  const modal = bootstrap.Modal.getInstance(document.getElementById('newChatModal'));
  if (modal) modal.hide();

  openChat(targetId);
}
