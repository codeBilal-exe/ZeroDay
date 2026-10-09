/* ============================================
   ZeroDay — Connections / Network (connections.js)
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
  checkAuth();

  document.getElementById('nav-container').innerHTML = buildNavigation('connections');
  initNavToggle();

  renderAllTabs();
  updatePendingBadge();
});

/** Show/hide tabs */
function showConnectionTab(tab, tabEl) {
  document.querySelectorAll('.zd-tab').forEach(t => t.classList.remove('active'));
  tabEl.classList.add('active');

  document.getElementById('tab-connections').style.display = tab === 'connections' ? 'block' : 'none';
  document.getElementById('tab-pending').style.display = tab === 'pending' ? 'block' : 'none';
  document.getElementById('tab-find').style.display = tab === 'find' ? 'block' : 'none';
}

/** Render all tabs */
function renderAllTabs() {
  renderConnections();
  renderPending();
  renderFindPeople();
}

/** Update pending badge count */
function updatePendingBadge() {
  const currentUser = getCurrentUser();
  const pending = connectionRequests.filter(r => r.toId === currentUser.id && r.status === 'pending');
  const badge = document.getElementById('pending-badge');
  if (badge) {
    badge.textContent = pending.length;
    badge.style.display = pending.length > 0 ? 'inline' : 'none';
  }
}

/** Render My Connections */
function renderConnections() {
  const currentUser = getCurrentUser();
  const connections = currentUser.connections.map(id => getUserById(id)).filter(Boolean);
  const container = document.getElementById('tab-connections');

  if (connections.length === 0) {
    container.innerHTML = `
      <div class="empty-state">
        <div class="empty-state-icon">◇</div>
        <div class="empty-state-text">No connections yet. Start building your security network!</div>
      </div>
    `;
    return;
  }

  container.innerHTML = `
    <div class="row g-3">
      ${connections.map(c => {
        const rating = getRating(currentUser.id, c.id);
        const ratingDisplay = rating ? `<span class="rating-option selected rating-${rating}" style="cursor:default;">${rating}</span>` : '';

        return `
        <div class="col-md-6 col-lg-4">
          <div class="zd-panel" style="height:100%;">
            <div style="display:flex;align-items:center;gap:0.75rem;margin-bottom:1rem;">
              <a href="profile.html?id=${c.id}">${renderAvatar(c, 'avatar-md')}</a>
              <div style="flex:1;min-width:0;">
                <a href="profile.html?id=${c.id}" style="color:var(--zd-text);text-decoration:none;">
                  <div style="font-weight:600;font-size:0.95rem;">${c.name}</div>
                </a>
                <div style="display:flex;align-items:center;gap:0.4rem;margin-top:0.3rem;">
                  <span class="zd-status-dot ${c.status}"></span>
                  <span class="technical-label" style="font-size:0.55rem;">${c.status}</span>
                </div>
              </div>
            </div>

            <!-- Current Rating -->
            <div style="margin-bottom:0.75rem;">
              <div class="technical-label mb-xs" style="font-size:0.55rem;">Trust Rating</div>
              ${ratingDisplay || '<span class="text-muted-zd" style="font-size:0.75rem;">Not rated</span>'}
            </div>

            <!-- Actions -->
            <div style="display:flex;gap:0.4rem;flex-wrap:wrap;">
              <button class="btn-zd-secondary btn-zd-sm" onclick="openRatingModal(${c.id})">Rate</button>
              <a href="messages.html?to=${c.id}" class="btn-zd-secondary btn-zd-sm">Message</a>
              <button class="btn-zd-danger btn-zd-sm" onclick="removeConnection(${c.id})">Remove</button>
            </div>
          </div>
        </div>
        `;
      }).join('')}
    </div>
  `;
}

/** Render Pending Requests */
function renderPending() {
  const currentUser = getCurrentUser();

  // Incoming requests
  const incoming = connectionRequests.filter(r => r.toId === currentUser.id && r.status === 'pending');
  // Outgoing requests
  const outgoing = connectionRequests.filter(r => r.fromId === currentUser.id && r.status === 'pending');

  const container = document.getElementById('tab-pending');

  let html = '';

  // Incoming
  html += `
    <div class="zd-panel mb-lg">
      <div class="zd-panel-header">
        <span class="zd-panel-title">↓ Incoming Requests (${incoming.length})</span>
      </div>
  `;

  if (incoming.length === 0) {
    html += '<div class="text-muted-zd" style="font-size:0.85rem;">No pending incoming requests.</div>';
  } else {
    incoming.forEach(req => {
      const sender = getUserById(req.fromId);
      if (!sender) return;
      html += `
        <div class="user-card mb-sm">
          <a href="profile.html?id=${sender.id}">${renderAvatar(sender, 'avatar-md')}</a>
          <div class="user-card-info">
            <div class="user-card-name">${sender.name}</div>
            <div class="technical-label" style="font-size:0.55rem;">${timeAgo(req.timestamp)}</div>
          </div>
          <div style="display:flex;gap:0.35rem;">
            <button class="btn-zd-primary btn-zd-sm" onclick="acceptRequest(${req.fromId})">Accept</button>
            <button class="btn-zd-secondary btn-zd-sm" onclick="rejectRequest(${req.fromId})">Decline</button>
            <button class="btn-zd-danger btn-zd-sm" onclick="ignoreRequest(${req.fromId})" title="Block/Ignore this user">Block</button>
          </div>
        </div>
      `;
    });
  }
  html += '</div>';

  // Outgoing
  html += `
    <div class="zd-panel">
      <div class="zd-panel-header">
        <span class="zd-panel-title">↑ Sent Requests (${outgoing.length})</span>
      </div>
  `;

  if (outgoing.length === 0) {
    html += '<div class="text-muted-zd" style="font-size:0.85rem;">No pending sent requests.</div>';
  } else {
    outgoing.forEach(req => {
      const target = getUserById(req.toId);
      if (!target) return;
      html += `
        <div class="user-card mb-sm">
          <a href="profile.html?id=${target.id}">${renderAvatar(target, 'avatar-md')}</a>
          <div class="user-card-info">
            <div class="user-card-name">${target.name}</div>
            <div class="technical-label" style="font-size:0.55rem;">Sent ${timeAgo(req.timestamp)}</div>
          </div>
          <button class="btn-zd-danger btn-zd-sm" onclick="cancelRequest(${req.toId})">Cancel</button>
        </div>
      `;
    });
  }
  html += '</div>';

  container.innerHTML = html;
}

/** Render Find People */
function renderFindPeople() {
  const currentUser = getCurrentUser();
  const nonConnections = users.filter(u =>
    u.id !== currentUser.id &&
    !currentUser.connections.includes(u.id)
  );

  const container = document.getElementById('tab-find');

  if (nonConnections.length === 0) {
    container.innerHTML = `
      <div class="empty-state">
        <div class="empty-state-icon">◎</div>
        <div class="empty-state-text">You're connected with everyone in the network!</div>
      </div>
    `;
    return;
  }

  container.innerHTML = `
    <!-- Search -->
    <div class="zd-search mb-lg" style="max-width:400px;">
      <span class="search-icon">◎</span>
      <input type="text" class="zd-input" id="find-search" placeholder="Search by name..." oninput="filterPeople()" style="padding-left:2.5rem;">
    </div>

    <div class="row g-3" id="find-people-grid">
      ${nonConnections.map(u => {
        const pending = hasPendingRequest(currentUser.id, u.id);
        const blocked = isBlocked(currentUser.id, u.id);

        return `
        <div class="col-md-6 col-lg-4 find-person" data-name="${u.name.toLowerCase()}">
          <div class="zd-panel" style="height:100%;">
            <div style="display:flex;align-items:center;gap:0.75rem;margin-bottom:0.75rem;">
              <a href="profile.html?id=${u.id}">${renderAvatar(u, 'avatar-md')}</a>
              <div style="flex:1;min-width:0;">
                <a href="profile.html?id=${u.id}" style="color:var(--zd-text);text-decoration:none;">
                  <div style="font-weight:600;">${u.name}</div>
                </a>
                <div style="display:flex;align-items:center;gap:0.4rem;margin-top:0.2rem;">
                  <span class="zd-status-dot ${u.status}"></span>
                  <span class="technical-label" style="font-size:0.55rem;">Level ${u.level}</span>
                </div>
              </div>
            </div>
            <p style="font-size:0.8rem;color:var(--zd-muted);margin-bottom:0.75rem;line-height:1.5;">${u.bio.substring(0, 100)}${u.bio.length > 100 ? '...' : ''}</p>
            ${blocked
              ? '<button class="btn-zd-danger btn-zd-sm" disabled>Blocked</button>'
              : pending
                ? '<button class="btn-zd-secondary btn-zd-sm" disabled>Request Sent</button>'
                : `<button class="btn-zd-primary btn-zd-sm" onclick="sendRequest(${u.id})" id="connect-btn-${u.id}">◇ Connect</button>`
            }
          </div>
        </div>
        `;
      }).join('')}
    </div>
  `;
}

/** Filter find people search */
function filterPeople() {
  const query = document.getElementById('find-search').value.toLowerCase();
  document.querySelectorAll('.find-person').forEach(el => {
    const name = el.dataset.name;
    el.style.display = (name.includes(query)) ? 'block' : 'none';
  });
}

/** Send connection request */
function sendRequest(targetId) {
  const currentUser = getCurrentUser();

  if (isBlocked(currentUser.id, targetId)) {
    showToast('Cannot send request. This user has restricted your access.', 'error');
    return;
  }

  if (hasPendingRequest(currentUser.id, targetId)) {
    showToast('Request already pending.', 'warning');
    return;
  }

  connectionRequests.push({
    fromId: currentUser.id,
    toId: targetId,
    status: 'pending',
    timestamp: new Date()
  });

  // Update button
  const btn = document.getElementById(`connect-btn-${targetId}`);
  if (btn) {
    btn.textContent = 'Request Sent';
    btn.disabled = true;
    btn.className = 'btn-zd-secondary btn-zd-sm';
  }

  showToast('Connection request sent.', 'success');
}

/** Accept incoming request */
function acceptRequest(fromId) {
  const currentUser = getCurrentUser();
  const req = connectionRequests.find(r =>
    r.fromId === fromId && r.toId === currentUser.id && r.status === 'pending'
  );
  if (req) {
    req.status = 'accepted';
    // Add to both users' connections
    if (!currentUser.connections.includes(fromId)) {
      currentUser.connections.push(fromId);
    }
    const sender = getUserById(fromId);
    if (sender && !sender.connections.includes(currentUser.id)) {
      sender.connections.push(currentUser.id);
    }
  }

  renderAllTabs();
  updatePendingBadge();
  showToast('Connection accepted.', 'success');
}

/** Reject/decline request */
function rejectRequest(fromId) {
  const currentUser = getCurrentUser();
  const req = connectionRequests.find(r =>
    r.fromId === fromId && r.toId === currentUser.id && r.status === 'pending'
  );
  if (req) req.status = 'rejected';

  renderAllTabs();
  updatePendingBadge();
  showToast('Request declined.', 'success');
}

/** Ignore/block request (prevents future requests) */
function ignoreRequest(fromId) {
  const currentUser = getCurrentUser();

  // Reject the request
  const req = connectionRequests.find(r =>
    r.fromId === fromId && r.toId === currentUser.id && r.status === 'pending'
  );
  if (req) req.status = 'blocked';

  // Add to blocked list
  if (!isBlocked(fromId, currentUser.id)) {
    blockedUsers.push({ userId: currentUser.id, blockedId: fromId });
  }

  renderAllTabs();
  updatePendingBadge();
  showToast('User blocked. They cannot send you connection requests.', 'success');
}

/** Cancel outgoing request */
function cancelRequest(toId) {
  const currentUser = getCurrentUser();
  const idx = connectionRequests.findIndex(r =>
    r.fromId === currentUser.id && r.toId === toId && r.status === 'pending'
  );
  if (idx > -1) connectionRequests.splice(idx, 1);

  renderAllTabs();
  showToast('Request cancelled.', 'success');
}

/** Remove connection */
function removeConnection(targetId) {
  const currentUser = getCurrentUser();

  // Remove from current user's connections
  const idx1 = currentUser.connections.indexOf(targetId);
  if (idx1 > -1) currentUser.connections.splice(idx1, 1);

  // Remove from target's connections
  const target = getUserById(targetId);
  if (target) {
    const idx2 = target.connections.indexOf(currentUser.id);
    if (idx2 > -1) target.connections.splice(idx2, 1);
  }

  // Remove rating
  const rIdx = connectionRatings.findIndex(r => r.fromId === currentUser.id && r.toId === targetId);
  if (rIdx > -1) connectionRatings.splice(rIdx, 1);

  renderAllTabs();
  showToast('Connection removed.', 'success');
}

/** Open rating modal */
function openRatingModal(targetId) {
  const target = getUserById(targetId);
  if (!target) return;

  const currentUser = getCurrentUser();
  const currentRating = getRating(currentUser.id, targetId);

  const body = document.getElementById('rating-modal-body');
  body.innerHTML = `
    <div style="text-align:center;margin-bottom:1rem;">
      ${renderAvatar(target, 'avatar-lg')}
      <div style="font-weight:600;margin-top:0.5rem;">${target.name}</div>
    </div>

    <div class="technical-label mb-sm">Connection Trust Rating</div>
    <div class="rating-group" style="justify-content:center;" id="rating-options">
      <div class="rating-option rating-stupid ${currentRating === 'stupid' ? 'selected' : ''}"
           data-rating="stupid" onclick="selectRating(this)">
        ✕ Stupid
      </div>
      <div class="rating-option rating-cool ${currentRating === 'cool' ? 'selected' : ''}"
           data-rating="cool" onclick="selectRating(this)">
        ◈ Cool
      </div>
      <div class="rating-option rating-trustworthy ${currentRating === 'trustworthy' ? 'selected' : ''}"
           data-rating="trustworthy" onclick="selectRating(this)">
        ★ Trustworthy
      </div>
    </div>
  `;

  // Setup save button
  const saveBtn = document.getElementById('save-rating-btn');
  saveBtn.onclick = () => saveRating(targetId);

  const modal = new bootstrap.Modal(document.getElementById('ratingModal'));
  modal.show();
}

/** Select a rating option */
function selectRating(el) {
  document.querySelectorAll('#rating-options .rating-option').forEach(o => o.classList.remove('selected'));
  el.classList.add('selected');
}

/** Save rating */
function saveRating(targetId) {
  const selected = document.querySelector('#rating-options .rating-option.selected');
  if (!selected) {
    showToast('Select a rating first.', 'error');
    return;
  }

  const ratingValue = selected.dataset.rating;
  setRating(getCurrentUser().id, targetId, ratingValue);

  const modal = bootstrap.Modal.getInstance(document.getElementById('ratingModal'));
  if (modal) modal.hide();

  renderConnections();
  showToast('Rating saved.', 'success');
}
