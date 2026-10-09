/* ============================================
   ZeroDay — Messages / Secure Channels (messages.js)
   ============================================ */

let currentActiveChatUserId = null;

document.addEventListener('zd:page-ready', () => {
  if (!document.getElementById('messaging-workspace')) return;
  if (!checkAuth()) return;

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
  const unreadBadge = document.getElementById('inbox-unread-count');
  const unreadTotal = partners.reduce((total, partner) => total + partner.unreadCount, 0);
  if (unreadBadge) {
    unreadBadge.textContent = unreadTotal;
    unreadBadge.classList.toggle('has-unread', unreadTotal > 0);
    unreadBadge.setAttribute('aria-label', `${unreadTotal} unread messages`);
  }

  const filtered = partners.filter(p =>
      !isBlocked(p.id, currentUser.id) &&
      (p.name.toLowerCase().includes(query) || (p.role || '').toLowerCase().includes(query)));

  if (filtered.length === 0) {
    container.innerHTML = `
      <div class="channels-empty">
        No conversations found.
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
      <button class="channel-item ${isActive ? 'active' : ''} ${isUnread ? 'unread' : ''}" type="button" onclick="openChat(${p.id})" aria-current="${isActive ? 'true' : 'false'}">
        <span class="channel-avatar-wrap">${renderAvatar(p, 'avatar-md')}<span class="channel-avatar-status ${p.status}" aria-hidden="true"></span></span>
        <span class="channel-copy">
          <span class="channel-topline"><span class="channel-name">${escapeHTML(p.name)}</span><span class="channel-time">${timeAgo(p.lastMessage.timestamp)}</span></span>
          <span class="channel-bottomline"><span class="channel-preview">${escapeHTML(preview)}</span>${isUnread ? '<span class="channel-unread" aria-label="Unread"></span>' : ''}</span>
        </span>
      </button>
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
  closeChatMenu();

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
      <div class="chat-empty-state chat-empty-thread">
        <div class="chat-empty-icon"><i class="bi bi-chat-dots" aria-hidden="true"></i></div>
        <span class="messages-eyebrow">A NEW CONVERSATION</span>
        <p>Send the first message to get the conversation started.</p>
      </div>
    `;
  } else {
    container.innerHTML = '<div class="chat-day-marker"><span>Recent messages</span></div>' + convo.map(m => {
      const isSent = m.fromId === currentUser.id;
      const imagePost = m.id === 3 ? posts.find(post => post.id === 2) : null;
      const sharedPost = m.id === 4 ? posts.find(post => post.id === 1) : null;
      const showVoiceNote = m.id === 8;
      const showReactions = m.id === 3 || m.id === 4;
      return `
        <div class="msg-row ${isSent ? 'sent' : 'received'}">
        <div class="msg-bubble ${isSent ? 'sent' : 'received'}">
          <div class="msg-copy">${escapeHTML(m.content)}</div>
          ${imagePost ? `<div class="message-image-attachment"><img src="${imagePost.image}" alt="Image shared in this conversation"><span>${zdIcon('image')} Shared image</span></div>` : ''}
          ${sharedPost ? `<div class="shared-post-preview"><span class="shared-post-label">${zdIcon('reply')} Shared signal</span><strong>${sharedPost.title}</strong><span>${sharedPost.category} · ${getUserById(sharedPost.authorId).name}</span></div>` : ''}
          ${showVoiceNote ? `<div class="voice-note-preview"><span class="voice-note-play">${zdIcon('play-fill')}</span><span class="voice-wave" aria-hidden="true">${'<i></i>'.repeat(18)}</span><span class="voice-note-duration">0:18</span></div>` : ''}
          ${showReactions ? `<div class="message-reaction-preview"><span>${zdIcon('heart-fill')} 2</span><span>${zdIcon('hand-thumbs-up-fill')} 1</span></div>` : ''}
          <div class="msg-time">
            ${timeAgo(m.timestamp)} ${isSent ? (m.read ? '· Read' : '· Delivered') : ''}
          </div>
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
    id: Date.now() * 1000 + Math.floor(Math.random() * 1000),
    fromId: currentUser.id,
    toId: toId,
    content: content,
    timestamp: new Date(),
    read: false
  };

  messages.push(newMsg);
  sendRealtimeEvent({type: 'message:send', toId, message: newMsg});

  renderChatMessages();
  renderChannelsList(document.getElementById('channel-search').value);
}

/** Back to channels list (mobile) */
function backToChannels() {
  document.getElementById('messaging-workspace').classList.remove('chat-active');
  document.getElementById('active-chat').style.display = 'none';
  document.getElementById('chat-empty-state').style.display = 'flex';
  currentActiveChatUserId = null;
  renderChannelsList(document.getElementById('channel-search').value);
}

function toggleChatMenu(event) {
  event.stopPropagation();
  const menu = document.getElementById('chat-more-menu');
  const trigger = document.getElementById('chat-more-toggle');
  if (!menu || !trigger) return;
  const expanded = trigger.getAttribute('aria-expanded') === 'true';
  menu.hidden = expanded;
  trigger.setAttribute('aria-expanded', String(!expanded));
  if (!expanded) menu.querySelector('button')?.focus();
}

function closeChatMenu() {
  const menu = document.getElementById('chat-more-menu');
  const trigger = document.getElementById('chat-more-toggle');
  if (menu) menu.hidden = true;
  trigger?.setAttribute('aria-expanded', 'false');
}

function removeChatFriend() {
  const currentUser = getCurrentUser();
  const target = getUserById(currentActiveChatUserId);
  if (!target) return;
  currentUser.connections = currentUser.connections.filter(id => id !== target.id);
  target.connections = target.connections.filter(id => id !== currentUser.id);
  const ratingIndex = connectionRatings.findIndex(
      rating => rating.fromId === currentUser.id && rating.toId === target.id);
  if (ratingIndex !== -1) connectionRatings.splice(ratingIndex, 1);
  closeChatMenu();
  renderChannelsList(document.getElementById('channel-search').value);
  showToast(`${target.name} removed from your connections.`, 'success');
}

function blockChatUser() {
  const currentUser = getCurrentUser();
  const target = getUserById(currentActiveChatUserId);
  if (!target) return;
  const alreadyBlocked = blockedUsers.some(
      entry => entry.userId === currentUser.id && entry.blockedId === target.id);
  if (!alreadyBlocked) {
    blockedUsers.push({userId: currentUser.id, blockedId: target.id});
    localStorage.setItem('zd_blocked_users', JSON.stringify(blockedUsers));
  }
  currentUser.connections = currentUser.connections.filter(id => id !== target.id);
  target.connections = target.connections.filter(id => id !== currentUser.id);
  closeChatMenu();
  backToChannels();
  showToast(`${target.name} has been blocked.`, 'success');
}

document.addEventListener('click', event => {
  if (!event.target.closest('.chat-more-wrap')) closeChatMenu();
});
document.addEventListener('keydown', event => {
  if (event.key !== 'Escape') return;
  const trigger = document.getElementById('chat-more-toggle');
  if (trigger?.getAttribute('aria-expanded') === 'true') {
    closeChatMenu();
    trigger.focus();
  }
});

/** Open modal to start new chat */
function openNewChatModal() {
  const currentUser = getCurrentUser();
  // Allow messaging anyone, but sort connections first
  let targetUsers = users.filter(
      u => u.id !== currentUser.id && !isBlocked(u.id, currentUser.id));
  
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
    return `<option value="${u.id}">
      ${escapeHTML(u.name)} ${isConn ? '· Connection' : ''}
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
