/* ============================================
   ZeroDay — Profile / Identity (profile.js)
   ============================================ */

document.addEventListener('zd:page-ready', () => {
  if (!document.getElementById('profile-header')) return;
  if (!checkAuth()) return;

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
      <div class="empty-state text-center py-5" style="margin-top:4rem;">
        <div class="empty-state-icon fs-1 mb-2">${
        zdIcon('person-bounding-box')}</div>
        <div class="empty-state-text fs-5 mb-3">User not found.</div>
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
  if (isOwn) {
    actionButtons = `
      <div class="profile-account-actions">
        ${themeSwitchMarkup('profile-theme-switch')}
        <button class="btn-zd-secondary btn-zd-sm" type="button" onclick="logout()">${
        zdIcon('box-arrow-right')} Log out</button>
      </div>`;
  } else {
    if (connected) {
      actionButtons = `
        <div class="profile-action-group">
          <button class="btn-zd-secondary btn-zd-sm" disabled>${
          zdIcon('person-check')} Connected</button>
          <a href="messages.html?to=${
          user.id}" class="btn-zd-primary btn-zd-sm">${
          zdIcon('chat-left-text')} Message</a>
        </div>`;
    } else if (pending) {
      actionButtons = `
        <button class="btn-zd-secondary btn-zd-sm" disabled>Request Pending</button>`;
    } else {
      actionButtons = `
        <div class="profile-action-group">
          <button class="btn-zd-primary btn-zd-sm" onclick="sendConnectionRequest(${
          user.id})">${zdIcon('person-plus')} Connect</button>
          <a href="messages.html?to=${
          user.id}" class="btn-zd-secondary btn-zd-sm">${
          zdIcon('chat-left-text')} Message</a>
        </div>`;
    }
  }

  document.getElementById('profile-header').innerHTML = `
    <div class="profile-hero-main">
      <div class="profile-identity">
        <div class="profile-avatar-wrap">
          ${
      isOwn ? `
            <button class="profile-avatar-button" type="button" onclick="document.getElementById('avatar-upload').click()" aria-label="Change profile photo">
              ${renderAvatar(user, 'avatar-xl')}
              <span class="profile-avatar-edit">${
                  zdIcon('camera')} Edit photo</span>
            </button>
            <input type="file" id="avatar-upload" accept="image/*" class="visually-hidden" onchange="handleAvatarUpload(event)">
          ` :
              renderAvatar(user, 'avatar-xl')}
        </div>
        <div class="profile-meta">
          <span class="profile-eyebrow">COMMUNITY PROFILE</span>
          <h1>${escapeHTML(user.name)}</h1>
          <div class="profile-identity-details">
            <span class="profile-handle">@${escapeHTML(user.username)}</span>
            <span class="profile-detail-separator" aria-hidden="true">·</span>
            <span class="profile-status ${
      user.status === 'online' ?
          'is-online' :
          ''}"><i aria-hidden="true"></i>${escapeHTML(user.status)}</span>
            <span class="profile-detail-separator" aria-hidden="true">·</span>
            <span class="profile-last-active">Active ${
      timeAgo(user.lastActive)}</span>
          </div>
        </div>
      </div>
      <div class="profile-actions">${actionButtons}</div>
    </div>

    <div class="profile-about-inline" id="profile-about" aria-label="About"></div>

    <div class="profile-stat-grid" aria-label="Profile statistics">
      <div class="profile-stat">
        <span class="profile-stat-value">${user.connections.length}</span>
        <span class="profile-stat-label">Connections</span>
      </div>
      <div class="profile-stat">
        <span class="profile-stat-value">${
      posts.filter(p => p.authorId === user.id).length}</span>
        <span class="profile-stat-label">Signals</span>
      </div>
      <div class="profile-stat">
        <span class="profile-stat-value">${user.level}</span>
        <span class="profile-stat-label">Level</span>
      </div>
      <div class="profile-stat">
        <span class="profile-stat-value">${user.achievements.length}</span>
        <span class="profile-stat-label">Achievements</span>
      </div>
    </div>
  `;
}

/** Render about section */
function renderAbout(user, isOwn) {
  document.getElementById('profile-about').innerHTML = `
    <div class="zd-panel-header">
      <span class="zd-panel-title">${zdIcon('person-lines-fill')} About</span>
      ${
      isOwn ?
          '<button class="btn-zd-secondary btn-zd-sm" onclick="editProfile()">Edit</button>' :
          ''}
    </div>
    <p class="profile-bio">${escapeHTML(user.bio)}</p>
    <div class="profile-subheading">AREAS OF INTEREST</div>
    <div class="profile-interest-list">
      ${
      user.interests
          .map(i => `<span class="profile-interest">${escapeHTML(i)}</span>`)
          .join('')}
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
      <div class="profile-empty-signals">
        <div class="empty-state-text">No signals posted yet.</div>
      </div>
    `;
    return;
  }

  container.innerHTML = userPosts.map(p => renderSignalCard(p, true)).join('');
}

/** Render XP / Level */
function renderXP(user) {
  const progress =
      Math.max(0, Math.min(100, Math.round((user.xp / user.xpToNext) * 100)));
  document.getElementById('profile-xp').innerHTML = `
    <div class="zd-panel-header">
      <span class="zd-panel-title">${zdIcon('bar-chart')} Progress</span>
    </div>
    <div class="profile-level-summary">
      <span class="profile-level-number">${user.level}</span>
      <div>
        <strong>Contributor level</strong>
        <small>${user.xp} XP earned</small>
      </div>
    </div>
    <div class="profile-xp-labels">
      <span>${user.xp} XP</span>
      <span>${user.xpToNext} XP</span>
    </div>
    <div class="xp-bar-container profile-xp-bar" role="progressbar" aria-label="Progress to next level" aria-valuemin="0" aria-valuemax="${
      user.xpToNext}" aria-valuenow="${Math.min(user.xp, user.xpToNext)}">
      <div class="xp-bar-fill" style="width:${progress}%;"></div>
    </div>
    <p class="profile-xp-caption">${
      Math.max(0, user.xpToNext - user.xp)} XP to next level</p>
  `;
}

/** Render achievements */
function renderAchievements(user) {
  document.getElementById('profile-achievements').innerHTML = `
    <div class="zd-panel-header">
      <span class="zd-panel-title">${zdIcon('award')} Achievements</span>
    </div>
    <div class="profile-achievement-list">
      ${
      user.achievements
          .map(
              a => `
        <span class="profile-achievement">${zdIcon('award')} ${
                  escapeHTML(a)}</span>`)
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
      <span class="zd-panel-title">${zdIcon('people')} Connections (${
      connections.length})</span>
      ${
      isOwn ?
          '<a href="connections.html" class="profile-manage-link">View all</a>' :
          ''}
    </div>
    ${
      connections.length === 0 ?
          '<div class="text-muted-zd profile-empty-connections">No connections yet.</div>' :
          ''}
    <div class="profile-connection-list">
      ${
      connections
          .map(
              c => `
        <a href="profile.html?id=${c.id}" class="profile-connection">
          <div class="user-card">
            <div class="profile-connection-person">
              ${renderAvatar(c, 'avatar-sm')}
              <div class="user-card-info">
                <div class="user-card-name">${escapeHTML(c.name)}</div>
                <div class="profile-connection-handle">@${
                  escapeHTML(c.username)}</div>
              </div>
            </div>
            <span class="zd-status-dot ${c.status}"></span>
          </div>
        </a>
      `).join('')}
    </div>
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

  const viewUser = getUserById(targetId);
  renderProfileHeader(viewUser, false);
  renderAbout(viewUser, false);
}

/** Edit profile modal */
function editProfile() {
  const user = getCurrentUser();

  const modalHTML = `
  <div class="modal fade" id="editProfileModal" tabindex="-1" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header border-bottom">
          <h5 class="modal-title h6 mb-0"><span class="technical-label fw-bold">EDIT IDENTITY</span></h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body d-flex flex-column gap-3">
          <div class="zd-form-group">
            <label class="zd-label form-label small fw-medium" for="edit-name">Full Name</label>
            <input type="text" class="zd-input form-control" id="edit-name" value="${
      escapeHTML(user.name)}">
          </div>
          <div class="zd-form-group">
            <label class="zd-label form-label small fw-medium" for="edit-bio">Bio</label>
            <textarea class="zd-textarea form-control" id="edit-bio" rows="3">${
      escapeHTML(user.bio)}</textarea>
          </div>
          <div class="zd-form-group">
            <label class="zd-label form-label small fw-medium" for="edit-interests">Interests (comma separated)</label>
            <input type="text" class="zd-input form-control" id="edit-interests" value="${
      escapeHTML(user.interests.join(', '))}">
          </div>
        </div>
        <div class="modal-footer border-top d-flex gap-2">
          <button class="btn-zd-secondary btn-zd-sm ms-auto" data-bs-dismiss="modal">Cancel</button>
          <button class="btn-zd-primary btn-zd-sm" onclick="saveProfile()">Save Changes</button>
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

    renderProfileHeader(user, true);
    renderAbout(user, true);

    document.getElementById('nav-container').innerHTML =
        buildNavigation('profile');
    initNavToggle();

    showToast('Identity picture updated.', 'success');
  };
  reader.readAsDataURL(file);
}
