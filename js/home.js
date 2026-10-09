/* ============================================
   ZeroDay — Home / Security Signals (home.js)
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
  checkAuth();

  // Inject navigation
  document.getElementById('nav-container').innerHTML = buildNavigation('home');
  initNavToggle();

  // Render feed
  renderFeed('all');
  renderSidebar();
  setupShareTargetToggle();
});

let currentFilter = 'all';

/** Render signal feed */
function renderFeed(filter) {
  currentFilter = filter;
  const feed = document.getElementById('signals-feed');
  const currentUser = getCurrentUser();
  let feedPosts = getHomeFeed(currentUser.id);

  if (filter !== 'all') {
    feedPosts = feedPosts.filter(p => p.category === filter);
  }

  if (feedPosts.length === 0) {
    feed.innerHTML = `
      <div class="empty-state">
        <div class="empty-state-icon">◈</div>
        <div class="empty-state-text">No signals found${filter !== 'all' ? ` for category "${filter}"` : ''}.</div>
      </div>
    `;
    return;
  }

  feed.innerHTML = feedPosts.map(p => renderSignalCard(p, true)).join('');
}

/** Filter signals by category */
function filterSignals(filter, tabEl) {
  // Update active tab
  document.querySelectorAll('.zd-tab').forEach(t => t.classList.remove('active'));
  tabEl.classList.add('active');

  renderFeed(filter);
}

/** Render sidebar */
function renderSidebar() {
  const currentUser = getCurrentUser();

  // Active Threats
  const threatsContainer = document.getElementById('sidebar-threats');
  const criticalThreats = threatWatchItems.filter(t => t.severity === 'critical' || t.severity === 'high').slice(0, 3);
  threatsContainer.innerHTML = criticalThreats.map(t => `
    <div class="threat-item" style="padding:0.6rem;margin-bottom:0.4rem;">
      <div class="threat-severity severity-${t.severity}"></div>
      <div style="flex:1;min-width:0;">
        <div style="font-size:0.8rem;font-weight:600;margin-bottom:0.15rem;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">${t.title}</div>
        <div class="technical-label" style="font-size:0.55rem;">${t.severity.toUpperCase()} · ${t.category}</div>
      </div>
    </div>
  `).join('');

  // Online Connections
  const onlineContainer = document.getElementById('sidebar-online');
  const onlineConnections = currentUser.connections
    .map(id => getUserById(id))
    .filter(u => u && u.status === 'online');

  if (onlineConnections.length === 0) {
    onlineContainer.innerHTML = '<div class="text-muted-zd" style="font-size:0.8rem;padding:0.5rem 0;">No connections online.</div>';
  } else {
    onlineContainer.innerHTML = onlineConnections.map(u => `
      <div style="display:flex;align-items:center;gap:0.6rem;padding:0.5rem 0;border-bottom:1px solid var(--zd-border);">
        ${renderAvatar(u, 'avatar-xs')}
        <div style="flex:1;min-width:0;">
          <div style="font-size:0.8rem;font-weight:500;">${u.name}</div>
          <div class="technical-label" style="font-size:0.55rem;">${u.role}</div>
        </div>
        <span class="zd-status-dot online"></span>
      </div>
    `).join('');
  }

  // Stats
  const statsContainer = document.getElementById('sidebar-stats');
  const totalSignals = posts.filter(p => p.authorId === currentUser.id).length;
  const totalConnections = currentUser.connections.length;
  const pendingReqs = connectionRequests.filter(r => r.toId === currentUser.id && r.status === 'pending').length;

  statsContainer.innerHTML = `
    <div class="col-4 stat-block">
      <div class="stat-value">${totalSignals}</div>
      <div class="stat-label">Signals</div>
    </div>
    <div class="col-4 stat-block" style="border-left:1px solid var(--zd-border);border-right:1px solid var(--zd-border);">
      <div class="stat-value">${totalConnections}</div>
      <div class="stat-label">Connections</div>
    </div>
    <div class="col-4 stat-block">
      <div class="stat-value">${pendingReqs}</div>
      <div class="stat-label">Pending</div>
    </div>
  `;
}

/** Toggle selected connections list visibility */
function setupShareTargetToggle() {
  const allRadio = document.getElementById('share-all-radio');
  const selectedRadio = document.getElementById('share-selected-radio');
  const list = document.getElementById('selected-connections-list');

  if (!allRadio || !selectedRadio) return;

  const currentUser = getCurrentUser();
  const connections = currentUser.connections.map(id => getUserById(id)).filter(Boolean);

  // Build connection checkboxes
  list.innerHTML = connections.map(c => `
    <div class="share-recipient">
      <input type="checkbox" class="new-signal-check" id="ns-${c.id}" value="${c.id}" checked>
      <label for="ns-${c.id}" style="cursor:pointer;display:flex;align-items:center;gap:0.5rem;font-size:0.85rem;">
        ${renderAvatar(c, 'avatar-xs')}
        ${c.name}
      </label>
    </div>
  `).join('');

  allRadio.addEventListener('change', () => { list.style.display = 'none'; });
  selectedRadio.addEventListener('change', () => { list.style.display = 'block'; });
}

/** Open new signal modal */
function openNewSignalModal() {
  // Reset form
  const form = document.getElementById('new-signal-form');
  if (form) form.reset();
  document.querySelectorAll('.zd-error-msg').forEach(e => e.classList.remove('show'));
  document.querySelectorAll('.is-invalid').forEach(e => e.classList.remove('is-invalid'));
  document.getElementById('selected-connections-list').style.display = 'none';

  const modal = new bootstrap.Modal(document.getElementById('newSignalModal'));
  modal.show();
}

/** Submit new signal */
function submitNewSignal() {
  let valid = true;

  const category = document.getElementById('signal-category').value;
  const risk = document.getElementById('signal-risk').value || null;
  const title = document.getElementById('signal-title').value.trim();
  const content = document.getElementById('signal-content').value.trim();
  const shareAll = document.getElementById('share-all-radio').checked;

  // Validate
  if (!category) {
    document.getElementById('signal-category').classList.add('is-invalid');
    document.getElementById('category-error').classList.add('show');
    valid = false;
  }
  if (!title) {
    document.getElementById('signal-title').classList.add('is-invalid');
    document.getElementById('title-error').classList.add('show');
    valid = false;
  }
  if (!content) {
    document.getElementById('signal-content').classList.add('is-invalid');
    document.getElementById('content-error').classList.add('show');
    valid = false;
  }

  if (!valid) return;

  // Determine share targets
  let sharedWith = 'all';
  if (!shareAll) {
    const selected = Array.from(document.querySelectorAll('.new-signal-check:checked')).map(cb => parseInt(cb.value));
    if (selected.length === 0) {
      showToast('Select at least one connection to share with.', 'error');
      return;
    }
    sharedWith = selected;
  }

  // Handle optional image upload
  const imageInput = document.getElementById('signal-image');
  const file = imageInput ? imageInput.files[0] : null;

  const createPostAndFinish = (imageUrl) => {
    // Create new post
    const newPost = {
      id: posts.length + 1,
      authorId: getCurrentUser().id,
      category: category,
      risk: risk,
      title: title,
      content: content,
      timestamp: new Date(),
      sharedWith: sharedWith,
      useful: 0,
      notUseful: 0,
      reactions: {}
    };

    if (imageUrl) {
      newPost.image = imageUrl;
    }

    posts.unshift(newPost);

    // Close modal
    const modal = bootstrap.Modal.getInstance(document.getElementById('newSignalModal'));
    if (modal) modal.hide();

    // Refresh feed
    renderFeed(currentFilter);

    showToast('Signal transmitted successfully.', 'success');
  };

  if (file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      createPostAndFinish(e.target.result);
    };
    reader.readAsDataURL(file);
  } else {
    createPostAndFinish(null);
  }
}

// Clear validation on input
document.addEventListener('input', (e) => {
  if (e.target.classList.contains('is-invalid')) {
    e.target.classList.remove('is-invalid');
    const errorMsg = e.target.closest('.zd-form-group')?.querySelector('.zd-error-msg');
    if (errorMsg) errorMsg.classList.remove('show');
  }
});
