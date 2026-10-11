/* ============================================
   ZeroDay — Home / Security Signals (home.js)
   ============================================ */

document.addEventListener('zd:page-ready', () => {
  if (!document.getElementById('signals-feed')) return;
  if (!checkAuth()) return;

  // Inject navigation
  document.getElementById('nav-container').innerHTML = buildNavigation('home');
  initNavToggle();

  currentQuery = '';
  const searchInput = document.getElementById('home-feed-search');
  const clearSearchButton = document.getElementById('home-search-clear');
  searchInput?.addEventListener('input', () => {
    currentQuery = searchInput.value.trim().toLowerCase();
    clearSearchButton.hidden = !currentQuery;
    renderFeed(currentFilter);
  });
  clearSearchButton?.addEventListener('click', () => {
    searchInput.value = '';
    currentQuery = '';
    clearSearchButton.hidden = true;
    renderFeed(currentFilter);
    searchInput.focus();
  });

  renderFeed('all');
  renderThreatTicker();
  setupShareTargetToggle();
});

let currentFilter = 'all';
let currentQuery = '';
let feedVideoObserver = null;
let activeFeedVideo = null;

/** Render signal feed */
function renderFeed(filter) {
  feedVideoObserver?.disconnect();
  activeFeedVideo?.pause();
  activeFeedVideo = null;
  currentFilter = filter;
  const feed = document.getElementById('signals-feed');
  const currentUser = getCurrentUser();
  let feedPosts = getHomeFeed(currentUser.id);

  if (filter !== 'all') {
    feedPosts = feedPosts.filter(p => p.category === filter);
  }

  if (currentQuery) {
    feedPosts = feedPosts.filter(post => {
      const author = getUserById(post.authorId);
      const searchable =
          [
            post.title, post.content, post.category, post.risk, author?.name,
            author?.username
          ].filter(Boolean)
              .join(' ')
              .toLowerCase();
      return searchable.includes(currentQuery);
    });
  }

  if (feedPosts.length === 0) {
    feed.innerHTML = `
      <div class="empty-state">
        <div class="empty-state-icon">${zdIcon('activity')}</div>
        <div class="empty-state-text">${
        currentQuery ?
            'No posts match your search.' :
            `No signals found${
                filter !== 'all' ? ` for category "${filter}"` : ''}.`}</div>
      </div>
    `;
    return;
  }

  feed.innerHTML = feedPosts.map(p => renderSignalCard(p, true)).join('');
  prepareFeedVideos();
}

/** Pause videos offscreen and play the visible feed video. */
function prepareFeedVideos() {
  const videos = document.querySelectorAll('#signals-feed video.signal-video');
  if (!('IntersectionObserver' in window)) {
    videos[0]?.play().catch(() => {});
    return;
  }
  feedVideoObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        if (activeFeedVideo && activeFeedVideo !== entry.target)
          activeFeedVideo.pause();
        activeFeedVideo = entry.target;
        entry.target.play().catch(() => {});
      } else if (activeFeedVideo === entry.target) {
        entry.target.pause();
        activeFeedVideo = null;
      }
    });
  }, {rootMargin: '120px 0px'});
  videos.forEach(video => feedVideoObserver.observe(video));
}

/** Filter signals by category */
function filterSignals(filter, tabEl) {
  // Update active tab
  document.querySelectorAll('.zd-tab').forEach(
      t => t.classList.remove('active'));
  tabEl.classList.add('active');

  renderFeed(filter);
}

/** Render a continuous threat update marquee above the feed. */
function renderThreatTicker() {
  const container = document.getElementById('threat-ticker');
  const activeThreats =
      threatWatchItems.filter(t => !['low', 'info'].includes(t.severity));
  if (!container) return;
  if (!activeThreats.length) {
    container.remove();
    return;
  }
  const items =
      activeThreats
          .map(
              item => `
    <span class="threat-marquee-item"><b class="severity-${item.severity}">${
                  item.severity}</b><span>${item.title}</span><small>${
                  item.category}</small></span>
    <span class="threat-marquee-separator" aria-hidden="true"></span>`)
          .join('');
  container.innerHTML = `
    <section class="threat-marquee" aria-label="${
      activeThreats.length} current threat updates">
      <div class="threat-marquee-status"><span>${
      zdIcon('activity')} CURRENT UPDATES</span><strong>${
      activeThreats.length} ACTIVE</strong></div>
      <div class="threat-marquee-window" aria-live="off"><div class="threat-marquee-track"><div class="threat-marquee-sequence">${
      items}</div><div class="threat-marquee-sequence" aria-hidden="true">${
      items}</div></div></div>
      <a class="threat-marquee-link" href="threat-watch.html">Threat Watch ${
      zdIcon('arrow-up-right')}</a>
    </section>`;
}

/** Toggle selected connections list visibility */
function setupShareTargetToggle() {
  const allRadio = document.getElementById('share-all-radio');
  const selectedRadio = document.getElementById('share-selected-radio');
  const list = document.getElementById('selected-connections-list');

  if (!allRadio || !selectedRadio) return;

  const currentUser = getCurrentUser();
  const connections =
      currentUser.connections.map(id => getUserById(id)).filter(Boolean);

  // Build connection checkboxes
  list.innerHTML =
      connections
          .map(
              c => `
    <div class="share-recipient">
      <input type="checkbox" class="new-signal-check" id="ns-${c.id}" value="${
                  c.id}" checked>
      <label for="ns-${
                  c.id}" style="cursor:pointer;display:flex;align-items:center;gap:0.5rem;font-size:0.85rem;">
        ${renderAvatar(c, 'avatar-xs')}
        ${c.name}
      </label>
    </div>
  `).join('');

  allRadio.addEventListener('change', () => {
    list.style.display = 'none';
  });
  selectedRadio.addEventListener('change', () => {
    list.style.display = 'block';
  });
}

/** Open new signal modal */
function openNewSignalModal() {
  // Reset form
  const form = document.getElementById('new-signal-form');
  if (form) form.reset();
  document.querySelectorAll('.zd-error-msg')
      .forEach(e => e.classList.remove('show'));
  document.querySelectorAll('.is-invalid')
      .forEach(e => e.classList.remove('is-invalid'));
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
    const selected =
        Array.from(document.querySelectorAll('.new-signal-check:checked'))
            .map(cb => parseInt(cb.value));
    if (selected.length === 0) {
      showToast('Select at least one connection to share with.', 'error');
      return;
    }
    sharedWith = selected;
  }

  // Attach optional image or video media.
  const imageInput = document.getElementById('signal-image');
  const file = imageInput ? imageInput.files[0] : null;

  // Create the post after optional media has been prepared.
  const createPostAndFinish = (mediaData, mediaFile) => {
    // Create new post
    const newPost = {
      id: Date.now() * 1000 + Math.floor(Math.random() * 1000),
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

    if (mediaData && mediaFile) {
      newPost.media = mediaData;
      newPost.mediaType =
          mediaFile.type.startsWith('video/') ? 'video' : 'image';
      newPost.mediaMime = mediaFile.type;
    }

    posts.unshift(newPost);
    sendRealtimeEvent({type: 'post:create', post: newPost});

    // Close modal
    const modal =
        bootstrap.Modal.getInstance(document.getElementById('newSignalModal'));
    if (modal) modal.hide();

    // Refresh feed
    renderFeed(currentFilter);

    showToast('Signal transmitted successfully.', 'success');
  };

  if (file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      createPostAndFinish(e.target.result, file);
    };
    reader.onerror = () => showToast(
        'That file could not be loaded. Please choose another.', 'error');
    reader.readAsDataURL(file);
  } else {
    createPostAndFinish(null, null);
  }
}

// Clear validation on input
document.addEventListener('input', (e) => {
  if (e.target.classList.contains('is-invalid')) {
    e.target.classList.remove('is-invalid');
    const errorMsg =
        e.target.closest('.zd-form-group')?.querySelector('.zd-error-msg');
    if (errorMsg) errorMsg.classList.remove('show');
  }
});
