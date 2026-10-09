/* ============================================
   ZeroDay — Profile / Identity (profile.js)
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
  checkAuth();

  document.getElementById('nav-container').innerHTML =
      buildNavigation('profile');
  initNavToggle();

  // Check if viewing another user's profile via URL param
  const params = new URLSearchParams(window.location.search);
  const viewUserId =
      params.get('id') ? parseInt(params.get('id')) : getCurrentUser().id;
  const viewUser = getUserById(viewUserId);

  if (!viewUser) {
    document.querySelector('.zd-main').innerHTML = `
      <div class="empty-state" style="margin-top:4rem;">
        <div class="empty-state-icon">◇</div>
        <div class="empty-state-text">User not found.</div>
        <a href="home.html" class="btn-zd-primary mt-md" style="display:inline-block;">Back to Signals</a>
      </div>
    `;
    return;
  }

  const isOwnProfile = viewUser.id === getCurrentUser().id;

  renderProfileHeader(viewUser, isOwnProfile);
  renderAbout(viewUser, isOwnProfile);
  renderUserSignals(viewUser);
  renderXP(viewUser);
  renderAchievements(viewUser);
  renderConnections(viewUser, isOwnProfile);
});

/** Render profile header */
function renderProfileHeader(user, isOwn) {
  const currentUser = getCurrentUser();
  const connected = areConnected(currentUser.id, user.id);
  const pending = hasPendingRequest(currentUser.id, user.id);

  let actionButtons = '';
  if (!isOwn) {
    if (connected) {
      actionButtons =
          `<button class="btn-zd-secondary btn-zd-sm" disabled>◇ Connected</button>
                       <a href="messages.html?to=${
              user.id}" class="btn-zd-primary btn-zd-sm">▧ Message</a>`;
    } else if (pending) {
      actionButtons =
          `<button class="btn-zd-secondary btn-zd-sm" disabled>Request Pending</button>`;
    } else {
      actionButtons =
          `<button class="btn-zd-primary btn-zd-sm" onclick="sendConnectionRequest(${
              user.id})">◇ Connect</button>
                       <a href="messages.html?to=${
              user.id}" class="btn-zd-secondary btn-zd-sm">▧ Message</a>`;
    }
  }

  document.getElementById('profile-header').innerHTML = `
    <div class="profile-summary">
      ${
      isOwn ? `
        <div class="avatar-edit-container" onclick="document.getElementById('avatar-upload').click()">
          ${renderAvatar(user, 'avatar-xl')}
          <div class="avatar-edit-overlay">Change</div>
          <input type="file" id="avatar-upload" accept="image/*" style="display:none;" onchange="handleAvatarUpload(event)">
        </div>
      ` :
              renderAvatar(user, 'avatar-xl')}
      <div class="profile-meta">
        <h1>${user.name}</h1>
        <div style="display:flex;align-items:center;gap:0.75rem;flex-wrap:wrap;margin-top:0.6rem;">
          <span class="zd-badge ${
      user.status === 'online' ? 'zd-badge-online' : 'zd-badge-offline'}">
            ${user.status}
          </span>
          <span class="technical-label" style="font-size:0.6rem;">
            Level ${user.level} · ${user.xp} XP
          </span>
          <span class="technical-label" style="font-size:0.6rem;">
            Last active: ${timeAgo(user.lastActive)}
          </span>
        </div>
      </div>
      <div class="profile-actions">
        ${actionButtons}
      </div>
    </div>

    <div class="profile-stat-grid">
      <div class="stat-block">
        <div class="stat-value">${user.connections.length}</div>
        <div class="stat-label">Connections</div>
      </div>
      <div class="stat-block" style="border-left:1px solid var(--zd-border);">
        <div class="stat-value">${
      posts.filter(p => p.authorId === user.id).length}</div>
        <div class="stat-label">Signals</div>
      </div>
      <div class="stat-block" style="border-left:1px solid var(--zd-border);">
        <div class="stat-value">${user.level}</div>
        <div class="stat-label">Level</div>
      </div>
      <div class="stat-block" style="border-left:1px solid var(--zd-border);">
        <div class="stat-value">${user.achievements.length}</div>
        <div class="stat-label">Achievements</div>
      </div>
    </div>
  `;
}

/** Render about section */
function renderAbout(user, isOwn) {
  document.getElementById('profile-about').innerHTML = `
    <div class="zd-panel-header">
      <span class="zd-panel-title">◈ About</span>
      ${
      isOwn ?
          '<button class="btn-zd-secondary btn-zd-sm" onclick="editProfile()">Edit</button>' :
          ''}
    </div>
    <p style="font-size:0.95rem;margin-bottom:1rem;color:var(--zd-text);opacity:0.9;">${
      user.bio}</p>
    <div class="technical-label mb-sm">Security Interests</div>
    <div style="display:flex;gap:0.4rem;flex-wrap:wrap;">
      ${
      user.interests.map(i => `<span class="achievement">${i}</span>`).join('')}
    </div>
  `;
}

/** Render user's signals */
function renderUserSignals(user) {
  const userPosts = posts.filter(p => p.authorId === user.id)
                        .sort((a, b) => b.timestamp - a.timestamp);
  const container = document.getElementById('profile-signals');

  if (userPosts.length === 0) {
    container.innerHTML = `
      <div class="empty-state" style="padding:1.5rem;">
        <div class="empty-state-text">No signals posted yet.</div>
      </div>
    `;
    return;
  }

  container.innerHTML = userPosts.map(p => renderSignalCard(p, true)).join('');
}

/** Render XP / Level */
function renderXP(user) {
  const progress = Math.round((user.xp / user.xpToNext) * 100);
  document.getElementById('profile-xp').innerHTML = `
    <div class="zd-panel-header">
      <span class="zd-panel-title">▦ Security Level</span>
    </div>
    <div style="text-align:center;margin-bottom:1rem;">
      <div style="font-family:var(--font-heading);font-size:2.5rem;font-weight:700;color:var(--zd-action);">${
      user.level}</div>
      <div class="technical-label">Level</div>
    </div>
    <div style="display:flex;justify-content:space-between;margin-bottom:0.4rem;">
      <span class="technical-label" style="font-size:0.6rem;">${
      user.xp} XP</span>
      <span class="technical-label" style="font-size:0.6rem;">${
      user.xpToNext} XP</span>
    </div>
    <div class="xp-bar-container">
      <div class="xp-bar-fill" style="width:${progress}%;"></div>
    </div>
    <div class="technical-label mt-sm" style="font-size:0.6rem;text-align:center;">
      ${user.xpToNext - user.xp} XP to next level
    </div>
  `;
}

/** Render achievements */
function renderAchievements(user) {
  document.getElementById('profile-achievements').innerHTML = `
    <div class="zd-panel-header">
      <span class="zd-panel-title">★ Achievements</span>
    </div>
    <div style="display:flex;flex-wrap:wrap;gap:0.4rem;">
      ${
      user.achievements.map(a => `<span class="achievement">★ ${a}</span>`)
          .join('')}
    </div>
  `;
}

/** Render connections list */
function renderConnections(user, isOwn) {
  const connections =
      user.connections.map(id => getUserById(id)).filter(Boolean);

  document.getElementById('profile-connections').innerHTML = `
    <div class="zd-panel-header">
      <span class="zd-panel-title">◇ Connections (${connections.length})</span>
      ${
      isOwn ?
          '<a href="connections.html" class="technical-label" style="color:var(--zd-action);font-size:0.65rem;">MANAGE</a>' :
          ''}
    </div>
    ${
      connections.length === 0 ?
          '<div class="text-muted-zd" style="font-size:0.8rem;">No connections yet.</div>' :
          ''}
    ${
      connections
          .map(
              c => `
      <a href="profile.html?id=${
                  c.id}" style="text-decoration:none;color:inherit;">
        <div class="user-card" style="margin-bottom:0.5rem;">
          ${renderAvatar(c, 'avatar-sm')}
          <div class="user-card-info">
            <div class="user-card-name">${c.name}</div>
          </div>
          <span class="zd-status-dot ${c.status}"></span>
        </div>
      </a>
    `).join('')}
  `;
}

/** Send connection request from profile page */
function sendConnectionRequest(targetId) {
  const currentUser = getCurrentUser();

  if (isBlocked(currentUser.id, targetId)) {
    showToast(
        'Connection request blocked. This user has restricted your access.',
        'error');
    return;
  }

  if (hasPendingRequest(currentUser.id, targetId)) {
    showToast('A connection request is already pending.', 'warning');
    return;
  }

  connectionRequests.push({
    fromId: currentUser.id,
    toId: targetId,
    status: 'pending',
    timestamp: new Date()
  });

  showToast('Connection request sent.', 'success');

  // Re-render header
  const viewUser = getUserById(targetId);
  renderProfileHeader(viewUser, false);
}

/** Edit profile (placeholder) */
function editProfile() {
  const user = getCurrentUser();

  const modalHTML = `
  <div class="modal fade" id="editProfileModal" tabindex="-1">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title"><span class="technical-label">EDIT IDENTITY</span></h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
        </div>
        <div class="modal-body">
          <div class="zd-form-group">
            <label class="zd-label" for="edit-name">Full Name</label>
            <input type="text" class="zd-input" id="edit-name" value="${
      user.name}">
          </div>
          <div class="zd-form-group">
            <label class="zd-label" for="edit-bio">Bio</label>
            <textarea class="zd-textarea" id="edit-bio" rows="3">${
      user.bio}</textarea>
          </div>
          <div class="zd-form-group">
            <label class="zd-label" for="edit-interests">Interests (comma separated)</label>
            <input type="text" class="zd-input" id="edit-interests" value="${
      user.interests.join(', ')}">
          </div>
        </div>
        <div class="modal-footer">
          <button class="btn-zd-secondary" data-bs-dismiss="modal">Cancel</button>
          <button class="btn-zd-primary" onclick="saveProfile()">Save Changes</button>
        </div>
      </div>
    </div>
  </div>
  `;

  const existing = document.getElementById('editProfileModal');
  if (existing) existing.remove();

  document.body.insertAdjacentHTML('beforeend', modalHTML);
  const modal =
      new bootstrap.Modal(document.getElementById('editProfileModal'));
  modal.show();
}

/** Save profile edits */
function saveProfile() {
  const user = getCurrentUser();
  const name = document.getElementById('edit-name').value.trim();
  const bio = document.getElementById('edit-bio').value.trim();
  const interests = document.getElementById('edit-interests')
                        .value.split(',')
                        .map(s => s.trim())
                        .filter(Boolean);

  if (!name) {
    showToast('Name cannot be empty.', 'error');
    return;
  }

  user.name = name;
  user.bio = bio;
  user.interests = interests;

  const modal =
      bootstrap.Modal.getInstance(document.getElementById('editProfileModal'));
  if (modal) modal.hide();

  // Re-render
  renderProfileHeader(user, true);
  renderAbout(user, true);

  showToast('Profile updated successfully.', 'success');
}

/** Handle avatar image upload */
function handleAvatarUpload(event) {
  const file = event.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = (e) => {
    const user = getCurrentUser();
    user.avatar = e.target.result;

    // Re-render header to show new avatar
    renderProfileHeader(user, true);

    // Also update navigation avatar
    document.getElementById('nav-container').innerHTML =
        buildNavigation('profile');
    initNavToggle();

    showToast('Identity picture updated.', 'success');
  };
  reader.readAsDataURL(file);
}
