/* ============================================
   ZeroDay — Core Application Module (app.js)
   Shared mock data, utilities, and navigation
   ============================================ */

// ---- Mock Users ----
const users = [
  {
    id: 1,
    name: 'Bilal Asif',
    username: 'bilal.asif',
    password: 'zeroday123',
    role: 'Security learner',
    bio:
        'Cybersecurity enthusiast focused on web application security and practical digital safety.',
    interests: ['Web Security', 'Penetration Testing', 'CTF', 'OWASP'],
    level: 12,
    xp: 2450,
    xpToNext: 3000,
    status: 'online',
    lastActive: new Date(Date.now() - 300000),
    avatar: '../assets/avatars/user-6.svg',
    achievements:
        ['First Signal', 'Bug Hunter', 'CTF Rookie', '10 Connections'],
    connections: [2, 3, 4]
  },
  {
    id: 2,
    name: 'Usaid Rehan',
    username: 'usaid.rehan',
    password: 'zeroday',
    role: 'Application security researcher',
    bio:
        'Exploring application security, secure development, and community research.',
    interests: ['Application Security', 'Web Development', 'OWASP'],
    level: 7,
    xp: 920,
    xpToNext: 1500,
    status: 'online',
    lastActive: new Date(Date.now() - 60000),
    avatar: '../assets/avatars/user-1.svg',
    achievements: ['First Signal', 'Community Member'],
    connections: [1, 3, 4]
  },
  {
    id: 3,
    name: 'Raheem Khan',
    username: 'raheemxd',
    password: 'zeroday',
    role: 'Software developer',
    bio:
        'Building dependable software and learning how to secure it along the way.',
    interests: ['Secure Coding', 'JavaScript', 'CTF'],
    level: 8,
    xp: 1180,
    xpToNext: 1800,
    status: 'online',
    lastActive: new Date(Date.now() - 120000),
    avatar: '../assets/avatars/user-2.svg',
    achievements: ['First Signal', 'Helpful Reviewer'],
    connections: [1, 2, 4]
  },
  {
    id: 4,
    name: 'Mina Qureshi',
    username: 'mina.codes',
    password: 'zeroday',
    role: 'Privacy-minded developer',
    bio:
        'Developer focused on accessible tools, privacy, and safer online communities.',
    interests: ['Privacy', 'Frontend', 'Security Awareness'],
    level: 6,
    xp: 760,
    xpToNext: 1200,
    status: 'online',
    lastActive: new Date(Date.now() - 240000),
    avatar: '../assets/avatars/user-3.svg',
    achievements: ['First Signal'],
    connections: [1, 2, 3]
  },
  {
    id: 5,
    name: 'Daniyal Noor',
    username: 'daniyal.noor',
    password: 'zeroday',
    role: 'Digital safety learner',
    bio: 'New to the community and interested in practical digital safety.',
    interests: ['Digital Safety', 'Learning', 'Privacy'],
    level: 1,
    xp: 120,
    xpToNext: 500,
    status: 'online',
    lastActive: new Date(Date.now() - 300000),
    avatar: '../assets/avatars/user-4.svg',
    achievements: [],
    connections: []
  }
];

const ACCOUNT_ROSTER_VERSION = 'zeroday-five-users-v1';
if (sessionStorage.getItem('zd_account_roster') !== ACCOUNT_ROSTER_VERSION) {
  sessionStorage.removeItem('zd_logged_in');
  sessionStorage.removeItem('zd_user_id');
  sessionStorage.setItem('zd_account_roster', ACCOUNT_ROSTER_VERSION);
}

// ---- Mock Posts / Security Signals ----
const posts = [
  {
    id: 1,
    authorId: 2,
    category: 'THREAT',
    risk: 'high',
    title: 'Phishing Campaign Targeting University Students',
    content:
        'Detected a coordinated phishing campaign using fake university portal pages. The attackers are sending emails with subjects like \'Grade Update Required\' and \'Scholarship Approval\'. The landing pages replicate Air University and NUST login portals. Always verify URLs before entering credentials.',
    image: '../assets/posts/university-phishing.jpg',
    timestamp: new Date(Date.now() - 720000),
    sharedWith: 'all',
    useful: 24,
    notUseful: 1,
    reactions: {}
  },
  {
    id: 2,
    authorId: 3,
    category: 'RESEARCH',
    risk: null,
    title: 'Broken Access Control in REST APIs — Analysis',
    content:
        'Completed a research analysis on OWASP A01:2021 Broken Access Control patterns in modern REST APIs. Key findings: 67% of tested APIs lacked proper authorization checks on object-level access. Horizontal privilege escalation was possible in 40% of cases through IDOR vulnerabilities.',
    image: '../assets/posts/api-security-research.jpg',
    timestamp: new Date(Date.now() - 1800000),
    sharedWith: 'all',
    useful: 31,
    notUseful: 0,
    reactions: {}
  },
  {
    id: 3,
    authorId: 5,
    category: 'LEARNING',
    risk: null,
    title: 'Multi-Factor Authentication — Why Your Password Is Not Enough',
    content:
        'Even strong passwords can be compromised through data breaches, keyloggers, or social engineering. MFA adds an additional verification layer — something you have (phone, hardware key) or something you are (biometrics). Enable MFA on all accounts that support it, especially email, banking, and social media.',
    timestamp: new Date(Date.now() - 3600000),
    sharedWith: 'all',
    useful: 45,
    notUseful: 2,
    reactions: {}
  },
  {
    id: 4,
    authorId: 4,
    category: 'CTF',
    risk: null,
    title: 'TryHackMe OWASP Top 10 Room — Walkthrough Notes',
    content:
        'Just completed the OWASP Top 10 room on TryHackMe. The injection challenges were excellent for understanding SQLi fundamentals. Sharing my approach notes for the command injection and SSRF sections — these are great practice for beginners getting into web security.',
    timestamp: new Date(Date.now() - 5400000),
    sharedWith: 'all',
    useful: 18,
    notUseful: 0,
    reactions: {}
  },
  {
    id: 5,
    authorId: 5,
    category: 'ALERT',
    risk: 'medium',
    title: 'Suspicious DNS Queries Detected on Campus Network',
    content:
        'SOC team detected unusual DNS resolution patterns suggesting potential DNS tunneling activity on the campus network. Multiple hosts are resolving long, encoded subdomains to an external server. If you notice unusual network slowdowns, report to the IT security team.',
    image: '../assets/posts/campus-network-alert.jpg',
    timestamp: new Date(Date.now() - 7200000),
    sharedWith: 'all',
    useful: 12,
    notUseful: 1,
    reactions: {}
  },
  {
    id: 6,
    authorId: 3,
    category: 'TOOL',
    risk: null,
    title: 'Trivy — Open Source Container Security Scanner',
    content:
        'Integrated Trivy into our CI/CD pipeline for container image scanning. It detects OS package vulnerabilities, application dependency issues, and infrastructure misconfigurations. Highly recommended for anyone working with Docker/Kubernetes. The GitHub Actions integration is straightforward.',
    timestamp: new Date(Date.now() - 9000000),
    sharedWith: 'all',
    useful: 27,
    notUseful: 0,
    reactions: {}
  },
  {
    id: 7,
    authorId: 2,
    category: 'DISCUSSION',
    risk: null,
    title: 'Post-Quantum Cryptography — Is Your Organization Ready?',
    content:
        'NIST finalized its post-quantum cryptographic standards. CRYSTALS-Kyber for key encapsulation and CRYSTALS-Dilithium for digital signatures are now standardized. Organizations should start inventorying their cryptographic usage and planning migration timelines. What steps is your team taking?',
    timestamp: new Date(Date.now() - 10800000),
    sharedWith: 'all',
    useful: 15,
    notUseful: 3,
    reactions: {}
  },
  {
    id: 8,
    authorId: 1,
    category: 'GENERAL',
    risk: null,
    title: 'Starting My OSCP Journey',
    content:
        'Enrolled in the PEN-200 course today. Planning to document my preparation journey here on ZeroDay. If anyone has study tips, lab strategies, or recommended practice platforms, I would appreciate the guidance. Let\'s connect if you\'re also preparing!',
    timestamp: new Date(Date.now() - 14400000),
    sharedWith: 'all',
    useful: 9,
    notUseful: 0,
    reactions: {}
  },
  {
    id: 9,
    authorId: 3,
    category: 'RESEARCH',
    risk: null,
    title: 'A look inside the cybersecurity field',
    content:
        'A short field clip for the ZeroDay community, with a few notes on the people and practices behind day-to-day security work.',
    mediaType: 'video',
    media: '../assets/videos/zeroday-sample-video.mp4',
    mediaMime: 'video/mp4',
    timestamp: new Date(Date.now() - 300000),
    sharedWith: 'all',
    useful: 18,
    notUseful: 0,
    reactions: {}
  },
  {
    id: 10,
    authorId: 3,
    category: 'THREAT',
    risk: 'medium',
    title: 'How Cyber Attacks Happen Every 11 Minutes',
    content:
        'A short video explaining how frequently cyber attacks occur and the everyday security habits that can help reduce risk.',
    mediaType: 'video',
    media: '../assets/videos/Cyber_Attack-sample-Video.mp4',
    mediaMime: 'video/mp4',
    timestamp: new Date(Date.now() - 90000),
    sharedWith: 'all',
    useful: 22,
    notUseful: 1,
    reactions: {}
  }
];

// ---- Connection Requests ----
const connectionRequests = [];

// ---- Blocked / Ignored Users ----
const blockedUsers = [...readStoredArray('zd_blocked_users')];
const savedPostIds = new Set(readStoredArray('zd_saved_posts'));

/** Read a JSON array from local storage, falling back safely. */
function readStoredArray(key) {
  try {
    const value = JSON.parse(localStorage.getItem(key) || '[]');
    return Array.isArray(value) ? value : [];
  } catch {
    return [];
  }
}

// ---- Connection Ratings ----
const connectionRatings = [
  {fromId: 1, toId: 2, rating: 'cool'},
  {fromId: 1, toId: 3, rating: 'trustworthy'},
  {fromId: 1, toId: 4, rating: 'stupid'}, {fromId: 2, toId: 1, rating: 'cool'},
  {fromId: 2, toId: 3, rating: 'cool'},
  {fromId: 2, toId: 4, rating: 'trustworthy'},
  {fromId: 3, toId: 1, rating: 'trustworthy'},
  {fromId: 3, toId: 2, rating: 'cool'},
  {fromId: 3, toId: 4, rating: 'trustworthy'},
  {fromId: 4, toId: 1, rating: 'stupid'},
  {fromId: 4, toId: 2, rating: 'trustworthy'},
  {fromId: 4, toId: 3, rating: 'cool'}
];
// ---- Messages / Secure Channels ----
const messages = [
  {
    id: 1,
    fromId: 2,
    toId: 1,
    content:
        'Hi Bilal, I read your access-control post. The IDOR checklist was clear.',
    timestamp: new Date(Date.now() - 900000),
    read: true
  },
  {
    id: 2,
    fromId: 1,
    toId: 2,
    content:
        'Thanks, Usaid. I added a short test case to the post this morning.',
    timestamp: new Date(Date.now() - 720000),
    read: true
  },
  {
    id: 3,
    fromId: 2,
    toId: 1,
    content: 'Here is the request and response snapshot we discussed.',
    timestamp: new Date(Date.now() - 600000),
    read: true
  },
  {
    id: 4,
    fromId: 1,
    toId: 2,
    content: 'Nice catch. I will share the post with our study group.',
    timestamp: new Date(Date.now() - 480000),
    read: true
  },
  {
    id: 5,
    fromId: 3,
    toId: 1,
    content:
        'I checked the phishing report flow. The domain warning is easy to follow.',
    timestamp: new Date(Date.now() - 2400000),
    read: true
  },
  {
    id: 6,
    fromId: 1,
    toId: 3,
    content: 'Great. I added a short list of domain checks beneath the post.',
    timestamp: new Date(Date.now() - 2100000),
    read: true
  },
  {
    id: 7,
    fromId: 4,
    toId: 1,
    content: 'The privacy checklist is ready if you have time to review it.',
    timestamp: new Date(Date.now() - 5400000),
    read: true
  },
  {
    id: 8,
    fromId: 1,
    toId: 4,
    content:
        'I sent a quick voice note with two suggestions for the checklist.',
    timestamp: new Date(Date.now() - 5100000),
    read: true
  },
  {
    id: 9,
    fromId: 2,
    toId: 1,
    content: 'Nice catch. I will share the updated example with the study group.',
    timestamp: new Date(Date.now() - 360000),
    read: true
  },
  {
    id: 10,
    fromId: 1,
    toId: 2,
    content: 'Thanks! I added a note about testing with a second account too.',
    timestamp: new Date(Date.now() - 285000),
    read: true
  },
  {
    id: 11,
    fromId: 2,
    toId: 1,
    content: 'That makes the steps much easier to reproduce.',
    timestamp: new Date(Date.now() - 210000),
    read: false
  },
  {
    id: 12,
    fromId: 3,
    toId: 1,
    content: 'Could you send me the link to the updated phishing checklist?',
    timestamp: new Date(Date.now() - 1500000),
    read: true
  },
  {
    id: 13,
    fromId: 1,
    toId: 3,
    content: 'Just sent it. The domain and redirect checks are near the top.',
    timestamp: new Date(Date.now() - 1320000),
    read: true
  },
  {
    id: 14,
    fromId: 3,
    toId: 1,
    content: 'Found it. I will add one more example from a lookalike domain.',
    timestamp: new Date(Date.now() - 1140000),
    read: true
  },
  {
    id: 15,
    fromId: 4,
    toId: 1,
    content: 'I added the plain-language version of the privacy checklist.',
    timestamp: new Date(Date.now() - 3300000),
    read: true
  },
  {
    id: 16,
    fromId: 1,
    toId: 4,
    content: 'This reads clearly. The short examples make it easy to scan.',
    timestamp: new Date(Date.now() - 3120000),
    read: true
  },
  {
    id: 17,
    fromId: 4,
    toId: 1,
    content: 'Great, I will use that version for the next community post.',
    timestamp: new Date(Date.now() - 2940000),
    read: true
  }
];
// ---- Threat Watch Data ----
const threatWatchItems = [
  {
    id: 1,
    title: 'Active Phishing Campaign — University Portals',
    description:
        'Fake university login pages are being distributed via email. Verify the URL domain before entering credentials.',
    severity: 'critical',
    category: 'Phishing',
    date: new Date(Date.now() - 3600000),
    source: 'ZeroDay Threat Intel'
  },
  {
    id: 2,
    title: 'CVE-2025-29813 — Azure DevOps Token Escalation',
    description:
        'A critical vulnerability in Azure DevOps Server allows pipeline token escalation. Update to the latest patch immediately.',
    severity: 'critical',
    category: 'Vulnerability',
    date: new Date(Date.now() - 7200000),
    source: 'CISA Advisory'
  },
  {
    id: 3,
    title: 'Credential Stuffing Attacks Increasing',
    description:
        'Multiple services reporting credential stuffing attempts using leaked databases. Enable MFA on all accounts.',
    severity: 'high',
    category: 'Account Security',
    date: new Date(Date.now() - 14400000),
    source: 'OWASP Alert'
  },
  {
    id: 4,
    title: 'Suspicious NPM Packages Identified',
    description:
        'Several typosquatting NPM packages discovered containing data exfiltration code. Verify package names before installing.',
    severity: 'medium',
    category: 'Supply Chain',
    date: new Date(Date.now() - 28800000),
    source: 'Snyk Security'
  },
  {
    id: 5,
    title: 'Wi-Fi Deauthentication Attacks on Campus',
    description:
        'Deauth attacks detected on campus Wi-Fi. Use WPA3-enabled networks when available and avoid open networks.',
    severity: 'medium',
    category: 'Network',
    date: new Date(Date.now() - 43200000),
    source: 'Campus SOC'
  },
  {
    id: 6,
    title: 'Browser Extension Permissions — Privacy Risk',
    description:
        'Review your browser extensions regularly. Some extensions request excessive permissions that could compromise browsing data.',
    severity: 'low',
    category: 'Privacy',
    date: new Date(Date.now() - 86400000),
    source: 'Digital Safety Guide'
  }
];

// ---- Learn Content ----
const learnContent = [
  {
    id: 1,
    title: 'Recognizing Phishing Emails',
    description:
        'Learn to identify phishing attempts by examining sender addresses, suspicious links, urgency tactics, and grammar inconsistencies.',
    level: 'beginner',
    category: 'Social Engineering',
    duration: '10 min',
    topics: [
      'Email headers', 'URL inspection', 'Reporting phishing', 'Common tactics'
    ]
  },
  {
    id: 2,
    title: 'Password Security Best Practices',
    description:
        'Understand why unique, complex passwords matter and how to use password managers effectively.',
    level: 'beginner',
    category: 'Account Security',
    duration: '8 min',
    topics: [
      'Password strength', 'Password managers', 'Avoiding reuse',
      'Breach checking'
    ]
  },
  {
    id: 3,
    title: 'Understanding HTTPS and TLS',
    description:
        'How HTTPS protects data in transit, what TLS certificates mean, and how to verify a secure connection.',
    level: 'beginner',
    category: 'Web Security',
    duration: '12 min',
    topics:
        ['TLS handshake', 'Certificate authorities', 'Mixed content', 'HSTS']
  },
  {
    id: 4,
    title: 'Introduction to OWASP Top 10',
    description:
        'Overview of the most critical web application security risks as defined by OWASP.',
    level: 'intermediate',
    category: 'Web Security',
    duration: '20 min',
    topics: [
      'Broken Access Control', 'Injection', 'Security Misconfiguration', 'SSRF'
    ]
  },
  {
    id: 5,
    title: 'Network Security Fundamentals',
    description:
        'Firewalls, IDS/IPS, network segmentation, and monitoring strategies for securing infrastructure.',
    level: 'intermediate',
    category: 'Network Security',
    duration: '25 min',
    topics: ['Firewalls', 'IDS vs IPS', 'Network segmentation', 'Monitoring']
  },
  {
    id: 6,
    title: 'Threat Modeling with STRIDE',
    description:
        'A systematic approach to identifying and categorizing security threats using the STRIDE framework.',
    level: 'intermediate',
    category: 'Security Engineering',
    duration: '18 min',
    topics: [
      'Spoofing', 'Tampering', 'Repudiation', 'Info Disclosure', 'DoS',
      'Elevation'
    ]
  },
  {
    id: 7,
    title: 'Web Application Penetration Testing',
    description:
        'Methodology for ethical testing of web applications: reconnaissance, enumeration, exploitation, and reporting.',
    level: 'advanced',
    category: 'Penetration Testing',
    duration: '35 min',
    topics: ['Recon', 'Burp Suite', 'SQLi', 'XSS', 'Auth bypass', 'Reporting']
  },
  {
    id: 8,
    title: 'Incident Response Procedures',
    description:
        'Building an incident response plan: preparation, detection, containment, eradication, and lessons learned.',
    level: 'advanced',
    category: 'Incident Response',
    duration: '30 min',
    topics: [
      'IR framework', 'Containment', 'Forensics basics', 'Post-incident review'
    ]
  }
];


// ============================================
//  UTILITY FUNCTIONS
// ============================================

/** Get user by ID */
function getUserById(id) {
  return users.find(u => u.id === id);
}

/** Get current logged-in user */
function getCurrentUser() {
  const activeId = Number(sessionStorage.getItem('zd_user_id')) || 1;
  return getUserById(activeId) || getUserById(1);
}

/** Format relative time */
function timeAgo(date) {
  const seconds = Math.floor((Date.now() - date.getTime()) / 1000);
  if (seconds < 60) return 'just now';
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  return `${days}d ago`;
}

/** Render a profile photo or the local fallback avatar. */
function renderAvatar(user, sizeClass = 'avatar-md') {
  const src = user.avatar || '../assets/avatars/user-5.svg';
  return `<img src="${src}" alt="${user.name}" class="avatar ${sizeClass}">`;
}

/** Check if two users are connected */
function areConnected(userId1, userId2) {
  const user1 = getUserById(userId1);
  return user1 && user1.connections.includes(userId2);
}

/** Check if a connection request exists */
function hasPendingRequest(fromId, toId) {
  return connectionRequests.some(
      r => r.fromId === fromId && r.toId === toId && r.status === 'pending');
}

/** Check if user is blocked */
function isBlocked(userId, blockedById) {
  return blockedUsers.some(
      b => b.userId === blockedById && b.blockedId === userId);
}

/** Get connection rating */
function getRating(fromId, toId) {
  const rating =
      connectionRatings.find(r => r.fromId === fromId && r.toId === toId);
  return rating ? rating.rating : null;
}

/** Set connection rating */
function setRating(fromId, toId, ratingValue) {
  const existing =
      connectionRatings.find(r => r.fromId === fromId && r.toId === toId);
  if (existing) {
    existing.rating = ratingValue;
  } else {
    connectionRatings.push({fromId, toId, rating: ratingValue});
  }
}

/** Get messages between two users */
function getConversation(userId1, userId2) {
  return messages
      .filter(
          m => (m.fromId === userId1 && m.toId === userId2) ||
              (m.fromId === userId2 && m.toId === userId1))
      .sort((a, b) => a.timestamp - b.timestamp);
}

/** Get unique conversation partners for a user */
function getConversationPartners(userId) {
  const partnerIds = new Set();
  messages.forEach(m => {
    if (m.fromId === userId) partnerIds.add(m.toId);
    if (m.toId === userId) partnerIds.add(m.fromId);
  });
  return Array.from(partnerIds)
      .map(id => {
        const partner = getUserById(id);
        const convo = getConversation(userId, id);
        const lastMsg = convo[convo.length - 1];
        const unreadCount =
            convo.filter(m => m.toId === userId && !m.read).length;
        return {...partner, lastMessage: lastMsg, unreadCount};
      })
      .sort((a, b) => b.lastMessage.timestamp - a.lastMessage.timestamp);
}

/** Get unread message count */
function getUnreadCount(userId) {
  return messages.filter(m => m.toId === userId && !m.read).length;
}

/** Show toast notification */
function showToast(message, type = 'success') {
  // Remove existing toast
  const existing = document.querySelector('.zd-toast');
  if (existing) existing.remove();

  const toastKinds = {
    success: {icon: 'check2', label: 'Action complete'},
    error: {icon: 'x-lg', label: 'Error occurred'},
    warning: {icon: 'exclamation', label: 'Action required'},
    info: {icon: 'info-lg', label: 'Notice'}
  };
  const toastKind = toastKinds[type] || toastKinds.info;
  const toast = document.createElement('div');
  toast.className = `zd-toast zd-toast-${toastKinds[type] ? type : 'info'}`;
  toast.setAttribute('role', type === 'error' ? 'alert' : 'status');
  toast.setAttribute('aria-live', type === 'error' ? 'assertive' : 'polite');
  toast.innerHTML = `
    <span class="zd-toast-icon">${zdIcon(toastKind.icon)}</span>
    <div class="zd-toast-copy">
      <strong>${toastKind.label}</strong>
      <span>${escapeHTML(message)}</span>
    </div>
    <button class="zd-toast-dismiss" type="button" onclick="this.closest('.zd-toast').remove()" aria-label="Dismiss notification">${
      zdIcon('x-lg')}</button>
  `;
  document.body.appendChild(toast);

  // Trigger animation
  requestAnimationFrame(() => {
    toast.classList.add('show');
  });

  // Hide the toast after a short delay.
  window.setTimeout(() => {
    if (!toast.isConnected) return;
    toast.classList.add('is-leaving');
    window.setTimeout(() => toast.remove(), 220);
  }, 5200);
}

/** Check login state — redirect to login if not authenticated */
function checkAuth() {
  const loggedIn = sessionStorage.getItem('zd_logged_in');
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  if (!loggedIn && currentPage !== 'index.html') {
    navigateTo('index.html');
    return false;
  }
  return true;
}

/** Get posts sorted by author's last activity */
function getHomeFeed(userId) {
  const user = getUserById(userId);
  if (!user) return [];

  // Get posts from connections + own posts
  return posts
      .filter(
          p => (user.connections.includes(p.authorId) ||
                p.authorId === userId) &&
              !isBlocked(p.authorId, userId))
      .sort((a, b) => b.timestamp - a.timestamp);
}

/** Build the top navigation HTML for pages */
function buildNavigation(activePage) {
  const user = getCurrentUser();
  const unread = getUnreadCount(user.id);
  const pendingRequests =
      connectionRequests
          .filter(r => r.toId === user.id && r.status === 'pending')
          .length;
  const messagesFab = activePage === 'messages' ?
      '' :
      `
    <a class="messages-fab" href="messages.html" aria-label="Open messages${
          unread ? `, ${unread} unread` : ''}">
      ${zdIcon('chat-left-text')}<span>Messages</span>${
          unread ? `<b class="messages-fab-count">${unread}</b>` : ''}
    </a>`;

  return `
  <nav class="zd-topnav" id="main-nav">
    <div class="brand">
      <a href="home.html" style="text-decoration:none;display:flex;align-items:center;gap:0.75rem;">
        <img class="brand-mark" src="../assets/icons/ZeroDay-Logo.png" alt="ZeroDay">
        <div class="brand-copy">
          <div class="brand-name" aria-label="ZER0DAY">ZER<span class="brand-zero">0</span>DAY</div>
          <div class="brand-tagline">Ideas worth sharing.</div>
        </div>
      </a>
    </div>

    <button class="nav-toggle" id="nav-toggle" type="button" aria-label="Open navigation" aria-expanded="false" aria-controls="nav-links"><i class="bi bi-list" aria-hidden="true"></i></button>

    <div class="nav-links" id="nav-links">
      <a href="home.html" class="nav-link ${
      activePage === 'home' ? 'active' : ''}">
        ${zdIcon('activity')} Signals
      </a>
      <a href="discover.html" class="nav-link ${
      activePage === 'discover' ? 'active' : ''}">
        ${zdIcon('compass')} Discover
      </a>
      <a href="learn.html" class="nav-link ${
      activePage === 'learn' ? 'active' : ''}">
        ${zdIcon('journal-bookmark')} Learn
      </a>
      <a href="threat-watch.html" class="nav-link ${
      activePage === 'threat-watch' ? 'active' : ''}">
        ${zdIcon('exclamation-triangle')} Threat Watch
      </a>
      <a href="connections.html" class="nav-link ${
      activePage === 'connections' ? 'active' : ''}">
        ${zdIcon('people')} Network${
      pendingRequests > 0 ?
          ` <span class="badge bg-danger" style="font-size:0.55rem;padding:0.15rem 0.4rem;border-radius:8px;">${
              pendingRequests}</span>` :
          ''}
      </a>
    </div>

    <div class="nav-user">
      <a href="profile.html" class="nav-profile ${
      activePage === 'profile' ? 'active' : ''}" aria-label="Open profile">
        ${renderAvatar(user, 'avatar-sm')}
        <span>${user.name.split(' ')[0]}</span>
      </a>
    </div>
  </nav>
  ${messagesFab}
  <button class="scroll-top-fab" type="button" aria-label="Scroll to top" title="Scroll to top" hidden>
    ${zdIcon('arrow-up')}
  </button>
  `;
}

/** Return a themed SVG icon by name. */
function zdIcon(name, className = '') {
  return `<i class="bi bi-${name}${
      className ? ` ${className}` : ''}" aria-hidden="true"></i>`;
}

/** Build the shared theme switch control. */
function themeSwitchMarkup(extraClass = '') {
  const isLight = document.documentElement.dataset.theme === 'light';
  return `<button class="theme-switch ${
      extraClass}" type="button" role="switch"
    aria-checked="${
      isLight}" aria-label="Switch color theme" title="Switch color theme"
    onclick="toggleTheme()">
    <span class="theme-switch-sky" aria-hidden="true">
      <span class="theme-switch-stars"></span>
      <span class="theme-switch-clouds"></span>
      <span class="theme-switch-thumb"><i class="bi ${
      isLight ? 'bi-sun-fill' : 'bi-moon-stars-fill'}"></i></span>
    </span>
  </button>`;
}

/** Initialize navigation toggle for mobile */
function initNavToggle() {
  const toggle = document.getElementById('nav-toggle');
  const links = document.getElementById('nav-links');
  if (toggle && links) {
    toggle.addEventListener('click', () => {
      const expanded = links.classList.toggle('show');
      toggle.setAttribute('aria-expanded', String(expanded));
      toggle.setAttribute(
          'aria-label', expanded ? 'Close navigation' : 'Open navigation');
      toggle.innerHTML = `<i class="bi bi-${
          expanded ? 'x-lg' : 'list'}" aria-hidden="true"></i>`;
    });
  }
}

/** Show the back-to-top control after scrolling. */
function syncScrollTopButton() {
  const button = document.querySelector('.scroll-top-fab');
  if (!button) return;
  const visible = window.scrollY > 320;
  button.hidden = !visible;
  button.classList.toggle('is-visible', visible);
}

window.addEventListener('scroll', syncScrollTopButton, {passive: true});
document.addEventListener('zd:page-ready', syncScrollTopButton);
document.addEventListener('click', event => {
  if (!event.target.closest('.scroll-top-fab')) return;
  window.scrollTo({
    top: 0,
    behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' :
                                                                       'smooth'
  });
});

/** Logout */
function logout() {
  if (document.getElementById('logout-confirm-modal')) return;

  const modalElement = document.createElement('div');
  modalElement.className = 'modal fade';
  modalElement.id = 'logout-confirm-modal';
  modalElement.tabIndex = -1;
  modalElement.setAttribute('aria-labelledby', 'logout-confirm-title');
  modalElement.setAttribute('aria-describedby', 'logout-confirm-copy');
  modalElement.innerHTML = `
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h2 class="modal-title fs-5" id="logout-confirm-title">Log out of ZeroDay?</h2>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <p id="logout-confirm-copy" class="mb-0">Are you sure you want to log out of your account?</p>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn-zd-secondary" data-bs-dismiss="modal">Stay signed in</button>
          <button type="button" class="btn-zd-danger" id="confirm-logout">Log out</button>
        </div>
      </div>
    </div>`;
  document.body.append(modalElement);

  const modal = new bootstrap.Modal(modalElement);
  let confirmed = false;
  modalElement.querySelector('#confirm-logout')
      .addEventListener('click', () => {
        confirmed = true;
        modal.hide();
      });
  modalElement.addEventListener('hidden.bs.modal', () => {
    modal.dispose();
    modalElement.remove();
    if (confirmed) {
      sessionStorage.removeItem('zd_logged_in');
      sessionStorage.removeItem('zd_user_id');
      navigateTo('index.html');
    }
  }, {once: true});
  modal.show();
}

/** Render a signal category badge */
function renderCategoryBadge(category) {
  const cat = category.toLowerCase();
  const icons = {
    threat: 'exclamation-triangle',
    research: 'search',
    learning: 'book',
    tool: 'wrench',
    ctf: 'flag',
    alert: 'bell',
    discussion: 'chat-dots',
    general: 'bookmark'
  };
  return `<span class="signal-category category-${cat}">${
      zdIcon(icons[cat] || 'tag')} ${category}</span>`;
}

/** Render risk badge */
function renderRiskBadge(risk) {
  if (!risk) return '';
  return `<span class="signal-risk risk-${risk}">${
      zdIcon('exclamation-triangle')} ${risk} risk</span>`;
}

/** Render a full signal card */
function renderSignalCard(post, showActions = true) {
  const author = getUserById(post.authorId);
  if (!author) return '';

  const currentUser = getCurrentUser();
  const userReaction = post.reactions[currentUser.id];
  const comments = post.comments || seedPostComments(post.id);
  post.comments = comments;

  return `
  <article class="signal-card post-card signal-${
      post.category.toLowerCase()}" data-post-id="${post.id}">
    <div class="post-card-heading">
      <div class="signal-author post-author">
        ${renderAvatar(author, 'avatar-sm')}
        <div class="post-author-copy">
          <div class="signal-author-name">${author.name}</div>
          <div class="post-author-handle">@${author.username} · active ${
      timeAgo(author.lastActive)}</div>
        </div>
      </div>
      <div class="post-heading-tools">
        <div class="signal-meta">
          ${renderCategoryBadge(post.category)}
          ${renderRiskBadge(post.risk)}
        </div>
        <div class="post-menu-wrap">
          <button class="post-more" type="button" aria-label="More options for ${
      post.title}" aria-haspopup="menu" aria-expanded="false" onclick="togglePostMenu(event, ${
      post.id})">${zdIcon('three-dots')}</button>
          <div class="post-menu" role="menu" hidden>
            <button type="button" role="menuitem" onclick="removePost(${
      post.id})">${zdIcon('trash3')} Remove post</button>
            <button type="button" role="menuitem" onclick="blockPostAuthor(${
      post.id})">${zdIcon('person-slash')} Block user</button>
            <button type="button" role="menuitem" onclick="toggleSavePost(${
      post.id})">${
      zdIcon(
          savedPostIds.has(post.id) ? 'bookmark-check' : 'bookmark')} <span>${
      savedPostIds.has(post.id) ? 'Remove saved post' :
                                  'Save post'}</span></button>
          </div>
        </div>
      </div>
    </div>

    <h2 class="signal-title">${post.title}</h2>
    <div class="signal-body">${post.content}</div>
    ${
      post.mediaType === 'video' && post.media ?
          `<video class="signal-video" controls muted loop playsinline preload="none" aria-label="Video attached to ${
              post.title}"><source src="${post.media}" type="${
              post.mediaMime || 'video/mp4'}"></video>` :
          post.media ? `<img loading="lazy" decoding="async" src="${
                           post.media}" alt="Media attached to ${
                           post.title}" class="signal-image">` :
          post.image ? `<img loading="lazy" decoding="async" src="${
                           post.image}" alt="Media attached to ${
                           post.title}" class="signal-image">` :
                       ''}

    ${
      showActions ?
          `
    <div class="signal-actions post-actions">
      <div class="post-action-group">
      <button class="reaction-btn ${
              userReaction === 'useful' ? 'active-useful' : ''}"
              onclick="toggleReaction(${post.id}, 'useful')" id="useful-btn-${
              post.id}" aria-label="Mark post useful">
        ${zdIcon('hand-thumbs-up')} <span>Useful</span> <span class="reaction-count" id="useful-count-${
              post.id}">${post.useful}</span>
      </button>
      <button class="reaction-btn ${
              userReaction === 'not-useful' ? 'active-not-useful' : ''}"
              onclick="toggleReaction(${
              post.id}, 'not-useful')" id="not-useful-btn-${
              post.id}" aria-label="Mark post not useful">
        ${zdIcon('hand-thumbs-down')} <span>Not useful</span> <span class="reaction-count" id="not-useful-count-${
              post.id}">${post.notUseful}</span>
      </button>
      </div>
      <div class="post-action-group post-action-group-secondary">
      <button class="reaction-btn comment-action" type="button" onclick="focusPostComment(${
              post.id})" aria-expanded="false" aria-controls="post-discussion-${
              post.id}" aria-label="Show comments">
        ${zdIcon('chat-square-text')} <span class="comment-action-label">Comment</span> <span class="reaction-count">${
              comments.length}</span>
      </button>
      <button class="btn-zd-secondary btn-zd-sm" onclick="openShareModal(${
              post.id})">
        ${zdIcon('share')} Share
      </button>
      </div>
    </div>
    <section class="post-discussion" id="post-discussion-${
              post.id}" aria-label="Comments on ${post.title}" hidden>
      <div class="post-comments">${
              comments.slice(0, 3)
                  .map(comment => renderPostComment(comment))
                  .join('')}</div>
      <form class="post-comment-form" onsubmit="submitPostComment(event, ${
              post.id})">
        ${renderAvatar(currentUser, 'avatar-xs')}
        <label class="visually-hidden" for="comment-${
              post.id}">Write a comment</label>
        <input id="comment-${
              post.id}" name="comment" type="text" maxlength="240" placeholder="Add a thoughtful comment…" required>
        <button type="submit" aria-label="Post comment">${
              zdIcon('arrow-up-right')}</button>
      </form>
    </section>
    ` :
          ''}
  </article>
  `;
}

/** Close any open post action menu. */
function closePostMenus() {
  document.querySelectorAll('.post-menu:not([hidden])').forEach(menu => {
    menu.hidden = true;
    menu.closest('.post-menu-wrap')
        ?.querySelector('.post-more')
        ?.setAttribute('aria-expanded', 'false');
  });
}

/** Toggle a post's action menu. */
function togglePostMenu(event, postId) {
  event.stopPropagation();
  const card = document.querySelector(`[data-post-id="${postId}"]`);
  const menu = card?.querySelector('.post-menu');
  const trigger = card?.querySelector('.post-more');
  if (!menu || !trigger) return;
  const shouldOpen = menu.hidden;
  closePostMenus();
  menu.hidden = !shouldOpen;
  trigger.setAttribute('aria-expanded', String(shouldOpen));
}

/** Remove a post from the local feed. */
function removePost(postId) {
  const postIndex = posts.findIndex(post => post.id === postId);
  if (postIndex < 0) return;
  posts.splice(postIndex, 1);
  closePostMenus();
  document.querySelectorAll(`[data-post-id="${postId}"]`)
      .forEach(card => card.remove());
  if (document.getElementById('signals-feed') &&
      typeof renderFeed === 'function') {
    renderFeed(typeof currentFilter === 'string' ? currentFilter : 'all');
  }
  showToast('Post removed.', 'success');
}

/** Block the author and remove their posts from view. */
function blockPostAuthor(postId) {
  const post = posts.find(item => item.id === postId);
  if (!post) return;
  const currentUserId = getCurrentUser().id;
  if (post.authorId === currentUserId) {
    showToast('You cannot block your own account.', 'error');
    closePostMenus();
    return;
  }
  if (!isBlocked(post.authorId, currentUserId)) {
    blockedUsers.push({userId: currentUserId, blockedId: post.authorId});
    localStorage.setItem('zd_blocked_users', JSON.stringify(blockedUsers));
  }
  closePostMenus();
  if (document.getElementById('signals-feed') &&
      typeof renderFeed === 'function') {
    renderFeed(typeof currentFilter === 'string' ? currentFilter : 'all');
  } else {
    document.querySelectorAll(`[data-post-id]`).forEach(card => {
      const item =
          posts.find(candidate => candidate.id === Number(card.dataset.postId));
      if (item?.authorId === post.authorId) card.remove();
    });
  }
  showToast(
      `${getUserById(post.authorId)?.name || 'This user'} is now blocked.`,
      'success');
}

/** Save or unsave a post in local storage. */
function toggleSavePost(postId) {
  const wasSaved = savedPostIds.has(postId);
  if (wasSaved)
    savedPostIds.delete(postId);
  else
    savedPostIds.add(postId);
  localStorage.setItem(
      'zd_saved_posts', JSON.stringify(Array.from(savedPostIds)));
  const card = document.querySelector(`[data-post-id="${postId}"]`);
  const saveAction = card?.querySelector('.post-menu button:last-child');
  if (saveAction) {
    saveAction.innerHTML =
        `${zdIcon(wasSaved ? 'bookmark' : 'bookmark-check')} <span>${
            wasSaved ? 'Save post' : 'Remove saved post'}</span>`;
  }
  showToast(
      wasSaved ? 'Post removed from saved items.' : 'Post saved.', 'success');
}

document.addEventListener('click', event => {
  if (!event.target.closest('.post-menu-wrap')) closePostMenus();
});
document.addEventListener('keydown', event => {
  if (event.key === 'Escape') {
    const trigger = document.querySelector('.post-more[aria-expanded="true"]');
    closePostMenus();
    trigger?.focus();
    return;
  }
  const item = event.target.closest('.post-menu button');
  if (!item || !['ArrowDown', 'ArrowUp', 'Home', 'End'].includes(event.key))
    return;
  const items =
      Array.from(item.closest('.post-menu').querySelectorAll('button'));
  const currentIndex = items.indexOf(item);
  const nextIndex = event.key === 'Home' ?
      0 :
      event.key === 'End' ?
      items.length - 1 :
      (currentIndex + (event.key === 'ArrowDown' ? 1 : -1) + items.length) %
          items.length;
  event.preventDefault();
  items[nextIndex]?.focus();
});

/** Return sample comments for a post. */
function seedPostComments(postId) {
  const examples = {
    1: [
      {
        authorId: 1,
        content:
            'Thanks for sharing this. Checking the sender domain before clicking is such a useful habit.'
      },
      {
        authorId: 5,
        content:
            'The lookalike portal detail is helpful. I have shared this with our student group.'
      }
    ],
    2: [
      {
        authorId: 3,
        content:
            'The object-level authorization point is easy to overlook. Great breakdown.'
      },
      {
        authorId: 4,
        content: 'Testing with two accounts catches a lot of these IDOR cases.'
      }
    ],
    3: [
      {
        authorId: 2,
        content:
            'A hardware security key is a great next step for important accounts.'
      },
      {
        authorId: 1,
        content:
            'Passkeys have made this much easier for non-technical family members too.'
      }
    ],
    4: [
      {
        authorId: 3,
        content:
            'Nice work finishing the room. What did you use to practice SSRF afterward?'
      },
      {
        authorId: 5,
        content: 'A short checklist for the tricky challenges would be useful.'
      }
    ],
    5: [
      {
        authorId: 2,
        content:
            'Long encoded subdomains are a good signal to investigate alongside volume and destination.'
      },
      {
        authorId: 1,
        content:
            'Good reminder to report the symptoms rather than trying to investigate on your own.'
      }
    ],
    6: [
      {
        authorId: 4,
        content:
            'We added it to our container pipeline last month. The reports are straightforward to act on.'
      },
      {
        authorId: 2,
        content: 'The misconfiguration checks are especially useful in CI.'
      }
    ],
    7: [
      {
        authorId: 5,
        content:
            'We are starting with an inventory of long-lived certificates and external dependencies.'
      },
      {
        authorId: 3,
        content:
            'Crypto agility is a good first conversation to have with the platform team.'
      }
    ],
    8: [
      {
        authorId: 5,
        content:
            'Keep a small lab journal. Writing down what surprised you helps a lot.'
      },
      {
        authorId: 3,
        content:
            'PortSwigger Web Security Academy is a solid companion for web topics.'
      }
    ],
    9: [
      {
        authorId: 1,
        content:
            'Nice overview. It is good to see the people side of the field too.'
      },
      {
        authorId: 5,
        content:
            'The day-to-day collaboration is a big part of incident response.'
      }
    ]
  };
  return (examples[postId] || [])
      .map(
          comment => ({...comment, timestamp: new Date(Date.now() - 3600000)}));
}

/** Render one comment in a post discussion. */
function renderPostComment(comment) {
  const author = getUserById(comment.authorId);
  if (!author) return '';
  return `<div class="post-comment">${
      renderAvatar(
          author, 'avatar-xs')}<div class="post-comment-copy"><div><strong>${
      author.name}</strong><span>${timeAgo(comment.timestamp)}</span></div><p>${
      escapeHTML(comment.content)}</p></div></div>`;
}

/** Escape text before inserting it into HTML. */
function escapeHTML(value) {
  return String(value).replace(/[&<>"']/g, char => ({
                                             '&': '&amp;',
                                             '<': '&lt;',
                                             '>': '&gt;',
                                             '"': '&quot;',
                                             '\'': '&#39;'
                                           }[char]));
}

/** Toggle a post discussion and focus its comment field. */
function focusPostComment(postId) {
  const card = document.querySelector(`[data-post-id="${postId}"]`);
  const discussion = card?.querySelector('.post-discussion');
  const trigger = card?.querySelector('.comment-action');
  if (!discussion || !trigger) return;

  const shouldOpen = discussion.hidden;
  discussion.hidden = !shouldOpen;
  trigger.setAttribute('aria-expanded', String(shouldOpen));
  trigger.setAttribute(
      'aria-label', shouldOpen ? 'Hide comments' : 'Show comments');
  const label = trigger.querySelector('.comment-action-label');
  if (label) label.textContent = shouldOpen ? 'Hide comments' : 'Comment';

  if (shouldOpen) {
    document.getElementById(`comment-${postId}`)?.focus();
  } else {
    trigger.focus();
  }
}

/** Add a comment and refresh the post. */
function submitPostComment(event, postId) {
  event.preventDefault();
  const post = posts.find(item => item.id === postId);
  const input = event.currentTarget.elements.comment;
  const content = input.value.trim();
  if (!post || !content) return;
  post.comments = post.comments || seedPostComments(post.id);
  post.comments.unshift(
      {authorId: getCurrentUser().id, content, timestamp: new Date()});
  sendRealtimeEvent({type: 'post:comment', postId, comment: post.comments[0]});
  const wrapper = document.createElement('div');
  wrapper.innerHTML = renderSignalCard(post, true).trim();
  event.currentTarget.closest('[data-post-id]')
      ?.replaceWith(wrapper.firstElementChild);
  focusPostComment(postId);
}

/** Toggle reaction (useful / not useful) */
function toggleReaction(postId, type) {
  const post = posts.find(p => p.id === postId);
  if (!post) return;

  const userId = getCurrentUser().id;
  const currentReaction = post.reactions[userId];

  if (currentReaction === type) {
    // Remove reaction
    delete post.reactions[userId];
    if (type === 'useful')
      post.useful--;
    else
      post.notUseful--;
  } else {
    // If switching from other reaction
    if (currentReaction === 'useful') post.useful--;
    if (currentReaction === 'not-useful') post.notUseful--;

    // Add new reaction
    post.reactions[userId] = type;
    if (type === 'useful')
      post.useful++;
    else
      post.notUseful++;
  }

  sendRealtimeEvent({
    type: 'post:reaction',
    postId,
    useful: post.useful,
    notUseful: post.notUseful,
    reactions: post.reactions
  });

  // Update UI
  updateReactionUI(postId, post);
}

/** Update reaction button UI */
function updateReactionUI(postId, post) {
  const userId = getCurrentUser().id;
  const reaction = post.reactions[userId];

  const usefulBtn = document.getElementById(`useful-btn-${postId}`);
  const notUsefulBtn = document.getElementById(`not-useful-btn-${postId}`);
  const usefulCount = document.getElementById(`useful-count-${postId}`);
  const notUsefulCount = document.getElementById(`not-useful-count-${postId}`);

  if (usefulBtn) {
    usefulBtn.classList.toggle('active-useful', reaction === 'useful');
  }
  if (notUsefulBtn) {
    notUsefulBtn.classList.toggle(
        'active-not-useful', reaction === 'not-useful');
  }
  if (usefulCount) usefulCount.textContent = post.useful;
  if (notUsefulCount) notUsefulCount.textContent = post.notUseful;
}

/** Open share modal */
function openShareModal(postId) {
  const post = posts.find(p => p.id === postId);
  if (!post) return;

  const currentUser = getCurrentUser();
  const connections =
      currentUser.connections.map(id => getUserById(id)).filter(Boolean);

  const modalHTML = `
  <div class="modal fade" id="shareModal" tabindex="-1">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title"><span class="technical-label">SHARE SIGNAL</span></h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
        </div>
        <div class="modal-body">
          <p class="text-muted-zd" style="font-size:0.85rem;">Share "${
      post.title}" with:</p>

          <div class="mb-3">
            <div class="share-recipient" onclick="selectAllRecipients(true)">
              <input type="checkbox" id="share-all" checked>
              <label for="share-all" style="cursor:pointer;font-weight:600;">All Connections</label>
            </div>
          </div>

          <div class="technical-label mb-2">Or select specific connections:</div>
          <div id="share-recipients">
            ${
      connections
          .map(
              c => `
              <div class="share-recipient">
                <input type="checkbox" class="share-check" id="share-${
                  c.id}" value="${c.id}" checked>
                <label for="share-${
                  c.id}" style="cursor:pointer;display:flex;align-items:center;gap:0.5rem;">
                  ${renderAvatar(c, 'avatar-xs')}
                  ${c.name}
                </label>
              </div>
            `)
          .join('')}
          </div>
        </div>
        <div class="modal-footer">
          <button class="btn-zd-secondary" data-bs-dismiss="modal">Cancel</button>
          <button class="btn-zd-primary" onclick="executeShare(${
      postId})">Transmit Signal</button>
        </div>
      </div>
    </div>
  </div>
  `;

  // Remove existing modal
  const existing = document.getElementById('shareModal');
  if (existing) existing.remove();

  document.body.insertAdjacentHTML('beforeend', modalHTML);
  const modal = new bootstrap.Modal(document.getElementById('shareModal'));
  modal.show();
}

/** Select/deselect all share recipients */
function selectAllRecipients(checked) {
  document.querySelectorAll('.share-check').forEach(cb => cb.checked = checked);
}

/** Execute share */
function executeShare(postId) {
  const selected = Array.from(document.querySelectorAll('.share-check:checked'))
                       .map(cb => parseInt(cb.value));
  const shareAll = document.getElementById('share-all')?.checked;

  if (!shareAll && selected.length === 0) {
    showToast('Select at least one connection to share with.', 'error');
    return;
  }

  const post = posts.find(p => p.id === postId);
  if (post) {
    post.sharedWith = shareAll ? 'all' : selected;
  }

  const modal =
      bootstrap.Modal.getInstance(document.getElementById('shareModal'));
  if (modal) modal.hide();

  showToast(
      `Signal shared with ${
          shareAll ? 'all connections' : selected.length + ' connection(s)'}`,
      'success');
}

/** Apply a theme to the document and controls. */
function applyTheme(theme) {
  document.documentElement.dataset.theme = theme;
  localStorage.setItem('zd_theme', theme);
  syncThemeSwitches(theme);
}
/** Keep all theme switches in sync. */
function syncThemeSwitches(theme = document.documentElement.dataset.theme) {
  document.querySelectorAll('.theme-switch').forEach(toggle => {
    const isLight = theme === 'light';
    toggle.setAttribute('aria-checked', String(isLight));
    const thumb = toggle.querySelector('.theme-switch-thumb');
    if (thumb)
      thumb.innerHTML = `<i class="bi ${
          isLight ? 'bi-sun-fill' : 'bi-moon-stars-fill'}"></i>`;
  });
}
/** Toggle and persist the selected theme. */
function toggleTheme() {
  applyTheme(
      document.documentElement.dataset.theme === 'light' ? 'dark' : 'light');
}
applyTheme(
    localStorage.getItem('zd_theme') ||
    (matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark'));
if (!document.querySelector('link[rel="icon"]')) {
  const favicon = document.createElement('link');
  favicon.rel = 'icon';
  favicon.type = 'image/png';
  favicon.sizes = '96x96';
  favicon.href = '../assets/icons/favicon.png';
  document.head.append(favicon);
}

/** Navigate within the application. */
function navigateTo(url) {
  const target = new URL(url, location.href);
  if (target.origin === location.origin && target.href !== location.href) {
    document.documentElement.classList.add('zd-is-loading');
    window.location.href = target.href;
  }
}

document.addEventListener('click', event => {
  const link = event.target.closest('a[href]');
  if (!link || event.defaultPrevented || event.button !== 0 || event.metaKey ||
      event.ctrlKey || event.shiftKey || event.altKey || link.target ||
      link.hasAttribute('download'))
    return;
  const target = new URL(link.href, location.href);
  if (target.origin === location.origin && target.href !== location.href)
    document.documentElement.classList.add('zd-is-loading');
});

// ---- Ephemeral multi-window realtime updates ----
let realtimeSocket = null;
let realtimeReconnectTimer = null;
let realtimeUnavailableNoticeShown = false;
const pendingRealtimeEvents = [];

/** Connect this signed-in session to the WebSocket relay. */
function connectRealtime() {
  if (!sessionStorage.getItem('zd_logged_in')) {
    if (realtimeSocket) realtimeSocket.close();
    realtimeSocket = null;
    return;
  }
  if (location.protocol === 'file:' || !window.WebSocket) return;
  if (realtimeSocket &&
      (realtimeSocket.readyState === WebSocket.OPEN ||
       realtimeSocket.readyState === WebSocket.CONNECTING))
    return;

  const scheme = location.protocol === 'https:' ? 'wss:' : 'ws:';
  const isLocalPreview =
      location.hostname === 'localhost' || location.hostname === '127.0.0.1';
  const socketHost =
      isLocalPreview ? `${location.hostname}:3000` : location.host;
  const url = `${scheme}//${socketHost}/realtime?userId=${getCurrentUser().id}`;
  realtimeSocket = new WebSocket(url);
  realtimeSocket.addEventListener('open', () => {
    clearTimeout(realtimeReconnectTimer);
    if (realtimeUnavailableNoticeShown)
      showToast('Live chat and feed updates are connected again.', 'success');
    realtimeUnavailableNoticeShown = false;
    while (pendingRealtimeEvents.length) {
      realtimeSocket.send(JSON.stringify(pendingRealtimeEvents.shift()));
    }
  });
  realtimeSocket.addEventListener('message', event => {
    try {
      applyRealtimeEvent(JSON.parse(event.data));
    } catch (error) {
      console.warn('A realtime update could not be read.', error);
    }
  });
  realtimeSocket.addEventListener('close', () => {
    if (sessionStorage.getItem('zd_logged_in')) {
      if (!realtimeUnavailableNoticeShown) {
        showToast(
            'Live updates are offline. Start ZeroDay with npm start.',
            'warning');
        realtimeUnavailableNoticeShown = true;
      }
      clearTimeout(realtimeReconnectTimer);
      realtimeReconnectTimer = setTimeout(connectRealtime, 1800);
    }
  });
  realtimeSocket.addEventListener('error', () => realtimeSocket.close());
}

/** Send an event through the relay or queue it until connected. */
function sendRealtimeEvent(event) {
  if (!sessionStorage.getItem('zd_logged_in')) return;
  const payload = {...event, actorId: getCurrentUser().id};
  if (realtimeSocket?.readyState === WebSocket.OPEN) {
    realtimeSocket.send(JSON.stringify(payload));
  } else {
    pendingRealtimeEvents.push(payload);
    connectRealtime();
  }
}

/** Apply an update received from another session. */
function applyRealtimeEvent(event) {
  if (!event || !event.type) return;
  if (event.type === 'post:create' && event.post) {
    if (posts.some(post => post.id === event.post.id)) return;
    const post = {...event.post, timestamp: new Date(event.post.timestamp)};
    posts.unshift(post);
    if (typeof renderFeed === 'function' &&
        document.getElementById('signals-feed'))
      renderFeed(typeof currentFilter === 'undefined' ? 'all' : currentFilter);
    return;
  }

  if (event.type === 'post:reaction') {
    const post = posts.find(item => item.id === event.postId);
    if (!post) return;
    post.useful = event.useful;
    post.notUseful = event.notUseful;
    post.reactions = event.reactions || {};
    updateReactionUI(post.id, post);
    return;
  }

  if (event.type === 'post:comment' && event.comment) {
    const post = posts.find(item => item.id === event.postId);
    if (!post) return;
    post.comments = post.comments || seedPostComments(post.id);
    post.comments.unshift(
        {...event.comment, timestamp: new Date(event.comment.timestamp)});
    const card = document.querySelector(`[data-post-id="${post.id}"]`);
    const wasOpen = card && !card.querySelector('.post-discussion')?.hidden;
    if (card) {
      const wrapper = document.createElement('div');
      wrapper.innerHTML = renderSignalCard(post, true).trim();
      card.replaceWith(wrapper.firstElementChild);
      if (wasOpen) focusPostComment(post.id);
    }
    return;
  }

  if (event.type === 'message:send' && event.message) {
    if (messages.some(message => message.id === event.message.id)) return;
    messages.push(
        {...event.message, timestamp: new Date(event.message.timestamp)});
    if (typeof renderChannelsList === 'function' &&
        document.getElementById('channels-list'))
      renderChannelsList(
          document.getElementById('channel-search')?.value || '');
    if (typeof currentActiveChatUserId !== 'undefined' &&
        Number(currentActiveChatUserId) === event.message.fromId &&
        typeof renderChatMessages === 'function')
      renderChatMessages();
    if (event.toId === getCurrentUser().id &&
        typeof currentActiveChatUserId !== 'undefined' &&
        Number(currentActiveChatUserId) !== event.message.fromId &&
        document.getElementById('messaging-workspace'))
      showToast(
          `New message from ${
              getUserById(event.message.fromId)?.name || 'a connection'}.`,
          'info');
    return;
  }

  if (event.type === 'connection:request' && event.request) {
    const request = {
      ...event.request,
      timestamp: new Date(event.request.timestamp)
    };
    if (connectionRequests.some(
            item => item.fromId === request.fromId &&
                item.toId === request.toId && item.status === 'pending'))
      return;
    connectionRequests.push(request);
    if (typeof updatePendingBadge === 'function') updatePendingBadge();
    if (typeof renderPending === 'function' &&
        document.getElementById('tab-pending'))
      renderPending();
    if (request.toId === getCurrentUser().id)
      showToast(
          `${
              getUserById(request.fromId)?.name ||
              'A member'} sent you a connection request.`,
          'info');
  }
}

document.addEventListener('zd:page-ready', connectRealtime);

/** Initialize page-ready listeners and finish the loader. */
function firePageReady() {
  document.dispatchEvent(new Event('zd:page-ready'));
  requestAnimationFrame(updatePageLoaderBounds);
  const elapsed = performance.now() - pageLoaderStartedAt;
  window.setTimeout(() => {
    document.documentElement.classList.remove('zd-is-loading');
  }, Math.max(0, 1000 - elapsed));
}

/** Place the page loader below the navigation bar. */
function updatePageLoaderBounds() {
  const navigation = document.querySelector('#nav-container .zd-topnav');
  if (navigation) {
    const bottom = Math.max(0, navigation.getBoundingClientRect().bottom);
    pageLoader.style.setProperty('--zd-loader-top', `${bottom}px`);
  }
}

const pageLoaderStartedAt = performance.now();
const pageLoader = document.createElement('div');
pageLoader.className = 'zd-page-loader';
pageLoader.setAttribute('role', 'status');
pageLoader.setAttribute('aria-live', 'polite');
pageLoader.innerHTML = `
  <div class="zd-page-loader-content">
    <span class="zd-loader-globe" aria-hidden="true">
      <span class="zd-loader-globe-meridian"></span>
      <span class="zd-loader-globe-equator"></span>
      <span class="zd-loader-globe-latitude"></span>
    </span>
    <span class="zd-loader-wordmark">ZER<span>0</span>DAY</span>
    <span class="zd-loader-caption">Loading your community</span>
  </div>
`;
document.body.append(pageLoader);
document.documentElement.classList.add('zd-is-loading');
window.addEventListener('resize', updatePageLoaderBounds, {passive: true});

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', firePageReady, {once: true});
} else {
  firePageReady();
}
