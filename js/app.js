/* ============================================
   ZeroDay — Core Application Module (app.js)
   Shared mock data, utilities, and navigation
   ============================================ */

// ---- Current Logged-In User ----
const CURRENT_USER_ID = 1;

// ---- Mock Users ----
const users = [
  {
    id: 1,
    name: "Bilal Asif",
    username: "bilal.asif",
    password: "zeroday123",

    bio: "Cybersecurity enthusiast at Air University. Focused on web application security and penetration testing fundamentals.",
    interests: ["Web Security", "Penetration Testing", "CTF", "OWASP"],
    level: 12,
    xp: 2450,
    xpToNext: 3000,
    status: "online",
    lastActive: new Date(Date.now() - 300000),
    avatar: null,
    achievements: ["First Signal", "Bug Hunter", "CTF Rookie", "10 Connections"],
    connections: [2, 3, 4, 5, 6]
  },
  {
    id: 2,
    name: "Ahmed Raza",
    username: "ahmed.raza",
    password: "penetester99",

    bio: "Red team operator with a focus on infrastructure and cloud security assessments.",
    interests: ["Red Teaming", "Cloud Security", "Network Security"],
    level: 18,
    xp: 4200,
    xpToNext: 5000,
    status: "online",
    lastActive: new Date(Date.now() - 120000),
    avatar: null,
    achievements: ["Threat Analyst", "Red Team", "50 Signals", "Trusted Member"],
    connections: [1, 3, 5, 7]
  },
  {
    id: 3,
    name: "Sarah Khan",
    username: "sarah.khan",
    password: "secresearch!",

    bio: "Publishing vulnerability research and threat intelligence. OSCP certified.",
    interests: ["Vulnerability Research", "Malware Analysis", "Threat Intelligence"],
    level: 22,
    xp: 5800,
    xpToNext: 6500,
    status: "online",
    lastActive: new Date(Date.now() - 60000),
    avatar: null,
    achievements: ["Published Researcher", "OSCP", "100 Signals", "Community Leader"],
    connections: [1, 2, 4, 6, 7, 8]
  },
  {
    id: 4,
    name: "Omar Farooq",
    username: "omar.farooq",
    password: "devopsec22",

    bio: "Integrating security into CI/CD pipelines. AWS & Azure security specialist.",
    interests: ["DevSecOps", "CI/CD Security", "Cloud Security", "Container Security"],
    level: 15,
    xp: 3100,
    xpToNext: 4000,
    status: "offline",
    lastActive: new Date(Date.now() - 3600000),
    avatar: null,
    achievements: ["Cloud Defender", "Pipeline Guardian", "25 Signals"],
    connections: [1, 3, 6, 8]
  },
  {
    id: 5,
    name: "Fatima Zahra",
    username: "fatima.zahra",
    password: "blueteam2025",

    bio: "Blue team analyst monitoring network threats. Splunk & SIEM expertise.",
    interests: ["SOC Operations", "SIEM", "Incident Response", "Threat Detection"],
    level: 16,
    xp: 3400,
    xpToNext: 4000,
    status: "online",
    lastActive: new Date(Date.now() - 180000),
    avatar: null,
    achievements: ["Blue Team", "Alert Responder", "Vigilant Eye"],
    connections: [1, 2, 7]
  },
  {
    id: 6,
    name: "Hassan Ali",
    username: "hassan.ali",
    password: "crypto2025",

    bio: "Exploring applied cryptography, PKI, and post-quantum encryption algorithms.",
    interests: ["Cryptography", "PKI", "Encryption", "Mathematics"],
    level: 10,
    xp: 1800,
    xpToNext: 2500,
    status: "offline",
    lastActive: new Date(Date.now() - 7200000),
    avatar: null,
    achievements: ["Cipher Master", "First Signal"],
    connections: [1, 3, 4]
  },
  {
    id: 7,
    name: "Zainab Malik",
    username: "zainab.malik",
    password: "awareness24",

    bio: "Teaching everyday users about phishing, social engineering, and digital safety.",
    interests: ["Security Awareness", "Phishing Prevention", "Digital Literacy"],
    level: 20,
    xp: 4800,
    xpToNext: 5500,
    status: "online",
    lastActive: new Date(Date.now() - 600000),
    avatar: null,
    achievements: ["Educator", "Community Leader", "100 Signals", "Mentor"],
    connections: [2, 3, 5, 8]
  },
  {
    id: 8,
    name: "Usman Tariq",
    username: "usman.tariq",
    password: "bugbounty88",

    bio: "Full-time bug bounty hunter. HackerOne & Bugcrowd contributor.",
    interests: ["Bug Bounty", "Web Security", "API Security", "Mobile Security"],
    level: 24,
    xp: 6200,
    xpToNext: 7000,
    status: "online",
    lastActive: new Date(Date.now() - 900000),
    avatar: null,
    achievements: ["Bug Hunter Elite", "200 Signals", "Hall of Fame", "Trusted Member"],
    connections: [3, 4, 7]
  }
];

// ---- Mock Posts / Security Signals ----
const posts = [
  {
    id: 1,
    authorId: 3,
    category: "THREAT",
    risk: "high",
    title: "Phishing Campaign Targeting University Students",
    content: "Detected a coordinated phishing campaign using fake university portal pages. The attackers are sending emails with subjects like 'Grade Update Required' and 'Scholarship Approval'. The landing pages replicate Air University and NUST login portals. Always verify URLs before entering credentials.",
    image: "https://images.unsplash.com/photo-1563206767-5b18f218e8de?q=80&w=800",
    timestamp: new Date(Date.now() - 720000),
    sharedWith: "all",
    useful: 24,
    notUseful: 1,
    reactions: {}
  },
  {
    id: 2,
    authorId: 2,
    category: "RESEARCH",
    risk: null,
    title: "Broken Access Control in REST APIs — Analysis",
    content: "Completed a research analysis on OWASP A01:2021 Broken Access Control patterns in modern REST APIs. Key findings: 67% of tested APIs lacked proper authorization checks on object-level access. Horizontal privilege escalation was possible in 40% of cases through IDOR vulnerabilities.",
    image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=800",
    timestamp: new Date(Date.now() - 1800000),
    sharedWith: "all",
    useful: 31,
    notUseful: 0,
    reactions: {}
  },
  {
    id: 3,
    authorId: 7,
    category: "LEARNING",
    risk: null,
    title: "Multi-Factor Authentication — Why Your Password Is Not Enough",
    content: "Even strong passwords can be compromised through data breaches, keyloggers, or social engineering. MFA adds an additional verification layer — something you have (phone, hardware key) or something you are (biometrics). Enable MFA on all accounts that support it, especially email, banking, and social media.",
    timestamp: new Date(Date.now() - 3600000),
    sharedWith: "all",
    useful: 45,
    notUseful: 2,
    reactions: {}
  },
  {
    id: 4,
    authorId: 8,
    category: "CTF",
    risk: null,
    title: "TryHackMe OWASP Top 10 Room — Walkthrough Notes",
    content: "Just completed the OWASP Top 10 room on TryHackMe. The injection challenges were excellent for understanding SQLi fundamentals. Sharing my approach notes for the command injection and SSRF sections — these are great practice for beginners getting into web security.",
    timestamp: new Date(Date.now() - 5400000),
    sharedWith: "all",
    useful: 18,
    notUseful: 0,
    reactions: {}
  },
  {
    id: 5,
    authorId: 5,
    category: "ALERT",
    risk: "medium",
    title: "Suspicious DNS Queries Detected on Campus Network",
    content: "SOC team detected unusual DNS resolution patterns suggesting potential DNS tunneling activity on the campus network. Multiple hosts are resolving long, encoded subdomains to an external server. If you notice unusual network slowdowns, report to the IT security team.",
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=800",
    timestamp: new Date(Date.now() - 7200000),
    sharedWith: "all",
    useful: 12,
    notUseful: 1,
    reactions: {}
  },
  {
    id: 6,
    authorId: 4,
    category: "TOOL",
    risk: null,
    title: "Trivy — Open Source Container Security Scanner",
    content: "Integrated Trivy into our CI/CD pipeline for container image scanning. It detects OS package vulnerabilities, application dependency issues, and infrastructure misconfigurations. Highly recommended for anyone working with Docker/Kubernetes. The GitHub Actions integration is straightforward.",
    timestamp: new Date(Date.now() - 9000000),
    sharedWith: "all",
    useful: 27,
    notUseful: 0,
    reactions: {}
  },
  {
    id: 7,
    authorId: 6,
    category: "DISCUSSION",
    risk: null,
    title: "Post-Quantum Cryptography — Is Your Organization Ready?",
    content: "NIST finalized its post-quantum cryptographic standards. CRYSTALS-Kyber for key encapsulation and CRYSTALS-Dilithium for digital signatures are now standardized. Organizations should start inventorying their cryptographic usage and planning migration timelines. What steps is your team taking?",
    timestamp: new Date(Date.now() - 10800000),
    sharedWith: "all",
    useful: 15,
    notUseful: 3,
    reactions: {}
  },
  {
    id: 8,
    authorId: 1,
    category: "GENERAL",
    risk: null,
    title: "Starting My OSCP Journey",
    content: "Enrolled in the PEN-200 course today. Planning to document my preparation journey here on ZeroDay. If anyone has study tips, lab strategies, or recommended practice platforms, I would appreciate the guidance. Let's connect if you're also preparing!",
    timestamp: new Date(Date.now() - 14400000),
    sharedWith: "all",
    useful: 9,
    notUseful: 0,
    reactions: {}
  }
];

// ---- Connection Requests ----
const connectionRequests = [
  { fromId: 8, toId: 1, status: "pending", timestamp: new Date(Date.now() - 1800000) },
  { fromId: 7, toId: 1, status: "pending", timestamp: new Date(Date.now() - 3600000) }
];

// ---- Blocked / Ignored Users ----
const blockedUsers = [
  // { userId: 1, blockedId: 9 }  // Example: user 1 has blocked user 9
];

// ---- Connection Ratings ----
const connectionRatings = [
  { fromId: 1, toId: 2, rating: "cool" },
  { fromId: 1, toId: 3, rating: "trustworthy" },
  { fromId: 2, toId: 1, rating: "cool" },
  { fromId: 3, toId: 1, rating: "trustworthy" },
  { fromId: 5, toId: 1, rating: "cool" }
];

// ---- Messages / Secure Channels ----
const messages = [
  {
    id: 1,
    fromId: 2,
    toId: 1,
    content: "Hey Bilal, saw your OSCP post. I passed last year — happy to share my notes and lab approach.",
    timestamp: new Date(Date.now() - 900000),
    read: false
  },
  {
    id: 2,
    fromId: 1,
    toId: 2,
    content: "That would be amazing, Ahmed! When are you free to chat about the lab methodology?",
    timestamp: new Date(Date.now() - 600000),
    read: true
  },
  {
    id: 3,
    fromId: 3,
    toId: 1,
    content: "Bilal, check the phishing alert I posted. We're seeing the same pattern at multiple universities.",
    timestamp: new Date(Date.now() - 1200000),
    read: false
  },
  {
    id: 4,
    fromId: 1,
    toId: 3,
    content: "Just saw it, Sarah. I'll share it with the CS department group. Should we document the indicators?",
    timestamp: new Date(Date.now() - 1000000),
    read: true
  },
  {
    id: 5,
    fromId: 5,
    toId: 1,
    content: "The DNS tunneling signatures I shared — can you review the PCAP analysis when you get a chance?",
    timestamp: new Date(Date.now() - 7200000),
    read: true
  },
  {
    id: 6,
    fromId: 1,
    toId: 5,
    content: "Will look at it tonight. Are the capture files available on the shared drive?",
    timestamp: new Date(Date.now() - 7000000),
    read: true
  },
  {
    id: 7,
    fromId: 7,
    toId: 1,
    content: "Hi Bilal! I run a cybersecurity awareness workshop every Friday. Interested in joining as a volunteer?",
    timestamp: new Date(Date.now() - 14400000),
    read: true
  },
  {
    id: 8,
    fromId: 8,
    toId: 1,
    content: "Great to see another student getting into bug bounty! Let me know if you want to practice together on HackerOne.",
    timestamp: new Date(Date.now() - 18000000),
    read: true
  }
];

// ---- Threat Watch Data ----
const threatWatchItems = [
  {
    id: 1,
    title: "Active Phishing Campaign — University Portals",
    description: "Fake university login pages are being distributed via email. Verify the URL domain before entering credentials.",
    severity: "critical",
    category: "Phishing",
    date: new Date(Date.now() - 3600000),
    source: "ZeroDay Threat Intel"
  },
  {
    id: 2,
    title: "CVE-2025-29813 — Azure DevOps Token Escalation",
    description: "A critical vulnerability in Azure DevOps Server allows pipeline token escalation. Update to the latest patch immediately.",
    severity: "critical",
    category: "Vulnerability",
    date: new Date(Date.now() - 7200000),
    source: "CISA Advisory"
  },
  {
    id: 3,
    title: "Credential Stuffing Attacks Increasing",
    description: "Multiple services reporting credential stuffing attempts using leaked databases. Enable MFA on all accounts.",
    severity: "high",
    category: "Account Security",
    date: new Date(Date.now() - 14400000),
    source: "OWASP Alert"
  },
  {
    id: 4,
    title: "Suspicious NPM Packages Identified",
    description: "Several typosquatting NPM packages discovered containing data exfiltration code. Verify package names before installing.",
    severity: "medium",
    category: "Supply Chain",
    date: new Date(Date.now() - 28800000),
    source: "Snyk Security"
  },
  {
    id: 5,
    title: "Wi-Fi Deauthentication Attacks on Campus",
    description: "Deauth attacks detected on campus Wi-Fi. Use WPA3-enabled networks when available and avoid open networks.",
    severity: "medium",
    category: "Network",
    date: new Date(Date.now() - 43200000),
    source: "Campus SOC"
  },
  {
    id: 6,
    title: "Browser Extension Permissions — Privacy Risk",
    description: "Review your browser extensions regularly. Some extensions request excessive permissions that could compromise browsing data.",
    severity: "low",
    category: "Privacy",
    date: new Date(Date.now() - 86400000),
    source: "Digital Safety Guide"
  }
];

// ---- Learn Content ----
const learnContent = [
  {
    id: 1,
    title: "Recognizing Phishing Emails",
    description: "Learn to identify phishing attempts by examining sender addresses, suspicious links, urgency tactics, and grammar inconsistencies.",
    level: "beginner",
    category: "Social Engineering",
    duration: "10 min",
    topics: ["Email headers", "URL inspection", "Reporting phishing", "Common tactics"]
  },
  {
    id: 2,
    title: "Password Security Best Practices",
    description: "Understand why unique, complex passwords matter and how to use password managers effectively.",
    level: "beginner",
    category: "Account Security",
    duration: "8 min",
    topics: ["Password strength", "Password managers", "Avoiding reuse", "Breach checking"]
  },
  {
    id: 3,
    title: "Understanding HTTPS and TLS",
    description: "How HTTPS protects data in transit, what TLS certificates mean, and how to verify a secure connection.",
    level: "beginner",
    category: "Web Security",
    duration: "12 min",
    topics: ["TLS handshake", "Certificate authorities", "Mixed content", "HSTS"]
  },
  {
    id: 4,
    title: "Introduction to OWASP Top 10",
    description: "Overview of the most critical web application security risks as defined by OWASP.",
    level: "intermediate",
    category: "Web Security",
    duration: "20 min",
    topics: ["Broken Access Control", "Injection", "Security Misconfiguration", "SSRF"]
  },
  {
    id: 5,
    title: "Network Security Fundamentals",
    description: "Firewalls, IDS/IPS, network segmentation, and monitoring strategies for securing infrastructure.",
    level: "intermediate",
    category: "Network Security",
    duration: "25 min",
    topics: ["Firewalls", "IDS vs IPS", "Network segmentation", "Monitoring"]
  },
  {
    id: 6,
    title: "Threat Modeling with STRIDE",
    description: "A systematic approach to identifying and categorizing security threats using the STRIDE framework.",
    level: "intermediate",
    category: "Security Engineering",
    duration: "18 min",
    topics: ["Spoofing", "Tampering", "Repudiation", "Info Disclosure", "DoS", "Elevation"]
  },
  {
    id: 7,
    title: "Web Application Penetration Testing",
    description: "Methodology for ethical testing of web applications: reconnaissance, enumeration, exploitation, and reporting.",
    level: "advanced",
    category: "Penetration Testing",
    duration: "35 min",
    topics: ["Recon", "Burp Suite", "SQLi", "XSS", "Auth bypass", "Reporting"]
  },
  {
    id: 8,
    title: "Incident Response Procedures",
    description: "Building an incident response plan: preparation, detection, containment, eradication, and lessons learned.",
    level: "advanced",
    category: "Incident Response",
    duration: "30 min",
    topics: ["IR framework", "Containment", "Forensics basics", "Post-incident review"]
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
  return getUserById(CURRENT_USER_ID);
}

/** Get user's initials for avatar placeholder */
function getInitials(name) {
  return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
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

/** Render avatar HTML (placeholder if no image) */
function renderAvatar(user, sizeClass = 'avatar-md') {
  if (user.avatar) {
    return `<img src="${user.avatar}" alt="${user.name}" class="avatar ${sizeClass}">`;
  }
  const size = sizeClass.replace('avatar-', '');
  const sizeMap = { xs: 24, sm: 32, md: 48, lg: 72, xl: 96 };
  const px = sizeMap[size] || 48;
  const fontSize = px * 0.38;
  return `<div class="avatar-placeholder ${sizeClass}" style="width:${px}px;height:${px}px;font-size:${fontSize}px;">${getInitials(user.name)}</div>`;
}

/** Check if two users are connected */
function areConnected(userId1, userId2) {
  const user1 = getUserById(userId1);
  return user1 && user1.connections.includes(userId2);
}

/** Check if a connection request exists */
function hasPendingRequest(fromId, toId) {
  return connectionRequests.some(r =>
    r.fromId === fromId && r.toId === toId && r.status === 'pending'
  );
}

/** Check if user is blocked */
function isBlocked(userId, blockedById) {
  return blockedUsers.some(b =>
    b.userId === blockedById && b.blockedId === userId
  );
}

/** Get connection rating */
function getRating(fromId, toId) {
  const rating = connectionRatings.find(r => r.fromId === fromId && r.toId === toId);
  return rating ? rating.rating : null;
}

/** Set connection rating */
function setRating(fromId, toId, ratingValue) {
  const existing = connectionRatings.find(r => r.fromId === fromId && r.toId === toId);
  if (existing) {
    existing.rating = ratingValue;
  } else {
    connectionRatings.push({ fromId, toId, rating: ratingValue });
  }
}

/** Get messages between two users */
function getConversation(userId1, userId2) {
  return messages.filter(m =>
    (m.fromId === userId1 && m.toId === userId2) ||
    (m.fromId === userId2 && m.toId === userId1)
  ).sort((a, b) => a.timestamp - b.timestamp);
}

/** Get unique conversation partners for a user */
function getConversationPartners(userId) {
  const partnerIds = new Set();
  messages.forEach(m => {
    if (m.fromId === userId) partnerIds.add(m.toId);
    if (m.toId === userId) partnerIds.add(m.fromId);
  });
  return Array.from(partnerIds).map(id => {
    const partner = getUserById(id);
    const convo = getConversation(userId, id);
    const lastMsg = convo[convo.length - 1];
    const unreadCount = convo.filter(m => m.toId === userId && !m.read).length;
    return { ...partner, lastMessage: lastMsg, unreadCount };
  }).sort((a, b) => b.lastMessage.timestamp - a.lastMessage.timestamp);
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

  const toast = document.createElement('div');
  toast.className = `zd-toast zd-toast-${type}`;
  toast.innerHTML = `
    <div style="display:flex;align-items:center;justify-content:space-between;gap:1rem;">
      <span>${message}</span>
      <button onclick="this.closest('.zd-toast').classList.remove('show')" style="background:none;border:none;color:var(--zd-muted);cursor:pointer;font-size:1.1rem;">&times;</button>
    </div>
  `;
  document.body.appendChild(toast);

  // Trigger animation
  requestAnimationFrame(() => {
    toast.classList.add('show');
  });

  // Auto-hide
  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 300);
  }, 4000);
}

/** Check login state — redirect to login if not authenticated */
function checkAuth() {
  const loggedIn = sessionStorage.getItem('zd_logged_in');
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  if (!loggedIn && currentPage !== 'index.html') {
    window.location.href = 'index.html';
  }
}

/** Get posts sorted by author's last activity */
function getHomeFeed(userId) {
  const user = getUserById(userId);
  if (!user) return [];

  // Get posts from connections + own posts
  return posts.filter(p =>
    user.connections.includes(p.authorId) || p.authorId === userId
  ).sort((a, b) => {
    // Sort by author's last active time, then by post timestamp
    const authorA = getUserById(a.authorId);
    const authorB = getUserById(b.authorId);
    const activityDiff = authorB.lastActive - authorA.lastActive;
    if (activityDiff !== 0) return activityDiff;
    return b.timestamp - a.timestamp;
  });
}

/** Build the top navigation HTML for pages */
function buildNavigation(activePage) {
  const user = getCurrentUser();
  const unread = getUnreadCount(user.id);
  const pendingRequests = connectionRequests.filter(r => r.toId === user.id && r.status === 'pending').length;

  return `
  <nav class="zd-topnav" id="main-nav">
    <div class="brand">
      <a href="home.html" style="text-decoration:none;display:flex;align-items:center;gap:0.75rem;">
        <div>
          <div class="brand-name">ZERODAY</div>
          <div class="brand-tagline">Know the Threat. Stay Ahead.</div>
        </div>
      </a>
    </div>

    <button class="nav-toggle" id="nav-toggle" aria-label="Toggle navigation">☰</button>

    <div class="nav-links" id="nav-links">
      <a href="home.html" class="nav-link ${activePage === 'home' ? 'active' : ''}">
        ◈ Signals
      </a>
      <a href="discover.html" class="nav-link ${activePage === 'discover' ? 'active' : ''}">
        ◎ Discover
      </a>
      <a href="learn.html" class="nav-link ${activePage === 'learn' ? 'active' : ''}">
        ▦ Learn
      </a>
      <a href="threat-watch.html" class="nav-link ${activePage === 'threat-watch' ? 'active' : ''}">
        ▲ Threat Watch
      </a>
      <a href="connections.html" class="nav-link ${activePage === 'connections' ? 'active' : ''}">
        ◇ Network${pendingRequests > 0 ? ` <span class="badge bg-danger" style="font-size:0.55rem;padding:0.15rem 0.4rem;border-radius:8px;">${pendingRequests}</span>` : ''}
      </a>
      <a href="messages.html" class="nav-link ${activePage === 'messages' ? 'active' : ''}">
        ▧ Channels${unread > 0 ? ` <span class="badge bg-danger" style="font-size:0.55rem;padding:0.15rem 0.4rem;border-radius:8px;">${unread}</span>` : ''}
      </a>
    </div>

    <div class="nav-user">
      <a href="profile.html" class="nav-link ${activePage === 'profile' ? 'active' : ''}" style="display:flex;align-items:center;gap:0.5rem;">
        ${renderAvatar(user, 'avatar-sm')}
        <span class="d-none d-md-inline" style="font-size:0.8rem;">${user.name.split(' ')[0]}</span>
      </a>
      <button onclick="logout()" class="btn-zd-secondary btn-zd-sm" style="font-size:0.65rem;">LOGOUT</button>
    </div>
  </nav>
  `;
}

/** Initialize navigation toggle for mobile */
function initNavToggle() {
  const toggle = document.getElementById('nav-toggle');
  const links = document.getElementById('nav-links');
  if (toggle && links) {
    toggle.addEventListener('click', () => {
      links.classList.toggle('show');
    });
  }
}

/** Logout */
function logout() {
  sessionStorage.removeItem('zd_logged_in');
  sessionStorage.removeItem('zd_user_id');
  window.location.href = 'index.html';
}

/** Render a signal category badge */
function renderCategoryBadge(category) {
  const cat = category.toLowerCase();
  return `<span class="signal-category category-${cat}">${category}</span>`;
}

/** Render risk badge */
function renderRiskBadge(risk) {
  if (!risk) return '';
  return `<span class="signal-risk risk-${risk}">${risk} risk</span>`;
}

/** Render a full signal card */
function renderSignalCard(post, showActions = true) {
  const author = getUserById(post.authorId);
  if (!author) return '';

  const currentUser = getCurrentUser();
  const userReaction = post.reactions[currentUser.id];

  return `
  <div class="signal-card signal-${post.category.toLowerCase()}" data-post-id="${post.id}">
    <div class="signal-meta">
      ${renderCategoryBadge(post.category)}
      ${renderRiskBadge(post.risk)}
      <span class="signal-time">${timeAgo(post.timestamp)}</span>
    </div>

    <div class="signal-author" style="margin-bottom:0.75rem;">
      ${renderAvatar(author, 'avatar-sm')}
      <div>
        <div class="signal-author-name">${author.name}</div>
      </div>
    </div>

    <div class="signal-title">${post.title}</div>
    <div class="signal-body">${post.content}</div>
    ${post.image ? `<img src="${post.image}" alt="Signal Image" class="signal-image">` : ''}

    ${showActions ? `
    <div class="signal-actions">
      <button class="reaction-btn ${userReaction === 'useful' ? 'active-useful' : ''}"
              onclick="toggleReaction(${post.id}, 'useful')" id="useful-btn-${post.id}">
        ▲ Useful <span class="reaction-count" id="useful-count-${post.id}">${post.useful}</span>
      </button>
      <button class="reaction-btn ${userReaction === 'not-useful' ? 'active-not-useful' : ''}"
              onclick="toggleReaction(${post.id}, 'not-useful')" id="not-useful-btn-${post.id}">
        ▼ Not Useful <span class="reaction-count" id="not-useful-count-${post.id}">${post.notUseful}</span>
      </button>
      <button class="btn-zd-secondary btn-zd-sm" onclick="openShareModal(${post.id})">
        ↗ Share
      </button>
    </div>
    ` : ''}
  </div>
  `;
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
    if (type === 'useful') post.useful--;
    else post.notUseful--;
  } else {
    // If switching from other reaction
    if (currentReaction === 'useful') post.useful--;
    if (currentReaction === 'not-useful') post.notUseful--;

    // Add new reaction
    post.reactions[userId] = type;
    if (type === 'useful') post.useful++;
    else post.notUseful++;
  }

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
    notUsefulBtn.classList.toggle('active-not-useful', reaction === 'not-useful');
  }
  if (usefulCount) usefulCount.textContent = post.useful;
  if (notUsefulCount) notUsefulCount.textContent = post.notUseful;
}

/** Open share modal */
function openShareModal(postId) {
  const post = posts.find(p => p.id === postId);
  if (!post) return;

  const currentUser = getCurrentUser();
  const connections = currentUser.connections.map(id => getUserById(id)).filter(Boolean);

  const modalHTML = `
  <div class="modal fade" id="shareModal" tabindex="-1">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title"><span class="technical-label">SHARE SIGNAL</span></h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
        </div>
        <div class="modal-body">
          <p class="text-muted-zd" style="font-size:0.85rem;">Share "${post.title}" with:</p>

          <div class="mb-md">
            <div class="share-recipient" onclick="selectAllRecipients(true)">
              <input type="checkbox" id="share-all" checked>
              <label for="share-all" style="cursor:pointer;font-weight:600;">All Connections</label>
            </div>
          </div>

          <div class="technical-label mb-sm">Or select specific connections:</div>
          <div id="share-recipients">
            ${connections.map(c => `
              <div class="share-recipient">
                <input type="checkbox" class="share-check" id="share-${c.id}" value="${c.id}" checked>
                <label for="share-${c.id}" style="cursor:pointer;display:flex;align-items:center;gap:0.5rem;">
                  ${renderAvatar(c, 'avatar-xs')}
                  ${c.name}
                </label>
              </div>
            `).join('')}
          </div>
        </div>
        <div class="modal-footer">
          <button class="btn-zd-secondary" data-bs-dismiss="modal">Cancel</button>
          <button class="btn-zd-primary" onclick="executeShare(${postId})">Transmit Signal</button>
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
  const selected = Array.from(document.querySelectorAll('.share-check:checked')).map(cb => parseInt(cb.value));
  const shareAll = document.getElementById('share-all')?.checked;

  if (!shareAll && selected.length === 0) {
    showToast('Select at least one connection to share with.', 'error');
    return;
  }

  const post = posts.find(p => p.id === postId);
  if (post) {
    post.sharedWith = shareAll ? 'all' : selected;
  }

  const modal = bootstrap.Modal.getInstance(document.getElementById('shareModal'));
  if (modal) modal.hide();

  showToast(`Signal shared with ${shareAll ? 'all connections' : selected.length + ' connection(s)'}`, 'success');
}
