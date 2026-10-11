![ZeroDay Logo](assets/icons/ZeroDay-Logo.png)

<h1 align="center">ZeroDay</h1>

<p align="center">
  <strong>Stay Aware. Stay Secure. Stay Ahead.</strong>
</p>

<p align="center">
  A cybersecurity community built for sharing knowledge, discussing threats, and making the digital world safer.
</p>

<p align="center">
  <img src="https://img.shields.io/badge/STATUS-PROTOTYPE-E88A4A?style=flat-square" alt="Project Status">
  <img src="https://img.shields.io/badge/HTML5-E34F26?style=flat-square&logo=html5&logoColor=white" alt="HTML5">
  <img src="https://img.shields.io/badge/CSS3-1572B6?style=flat-square&logo=css3&logoColor=white" alt="CSS3">
  <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=javascript&logoColor=black" alt="JavaScript">
  <img src="https://img.shields.io/badge/Node.js-339933?style=flat-square&logo=nodedotjs&logoColor=white" alt="Node.js">
  <img src="https://img.shields.io/badge/WebSocket-Live%20Updates-E88A4A?style=flat-square" alt="WebSocket">
</p>

---

## About ZeroDay

**ZeroDay** is a cybersecurity-focused social platform prototype designed to bring security enthusiasts, developers, researchers, and everyday internet users together.

The platform provides a space where people can share cybersecurity updates, discuss vulnerabilities, explore learning resources, exchange ideas, and stay informed about emerging digital threats.

Unlike traditional social media platforms, ZeroDay focuses on cybersecurity awareness, technical knowledge, and meaningful community discussions.

Whether someone is an experienced security researcher or simply interested in staying safe online, ZeroDay aims to make cybersecurity knowledge more accessible.

## Platform Features

### Community & Social

- **Home Feed** — Explore community posts containing text, images, and videos.
- **Reactions & Comments** — Interact with posts and participate in discussions.
- **Connections** — Discover people and send connection requests.
- **Messaging** — Communicate with other community members.
- **User Profiles** — View individual profiles and community activity.
- **Search & Topics** — Find relevant discussions using search and topic filters.
- **Discover** — Explore community content and new discussions.

### Cybersecurity & Learning

- **Learn** — Access cybersecurity learning resources and educational content.
- **Threat Watch** — Explore cybersecurity threat awareness and security updates.
- **Security Awareness** — Share information about phishing, vulnerabilities, attacks, and online safety.
- **Community Knowledge** — Encourage cybersecurity discussions between beginners and experienced users.

### User Experience

- **Dark & Light Themes** — Switch between two interface themes.
- **Responsive Design** — Optimized layouts for mobile, tablet, and desktop.
- **Local Preferences** — Theme preferences are saved in browser storage.
- **Lazy-Loaded Videos** — Feed videos load as they approach the viewport.
- **Automatic Video Pausing** — Videos pause when they move outside the visible area.

### Live Communication

ZeroDay includes an optional WebSocket-based communication system that allows multiple open sessions to interact in real time.

Supported live updates include:

- New messages
- New posts
- New comments
- Updated reaction counts
- Outgoing connection requests

**Note:** Live updates are temporary and are not stored in a database.


## Technology Stack

| Technology | Purpose |
| :--- | :--- |
| HTML5 | Application structure |
| CSS3 | Styling, themes, and responsive layouts |
| JavaScript | Frontend functionality and interactions |
| Node.js | Local application server |
| WebSocket | Real-time communication between sessions |
| Local Storage | Saving user preferences |
| Bootstrap | UI components and responsive utilities |
| Google Fonts | Typography |

---

## Project Structure

```text
ZeroDay/
│
├── assets/
│   ├── avatars/
│   │   ├── user-1.svg
│   │   ├── user-2.svg
│   │   ├── user-3.svg
│   │   ├── user-4.svg
│   │   ├── user-5.svg
│   │   └── user-6.svg
│   │
│   ├── icons/
│   │   ├── favicon.png
│   │   └── ZeroDay-Logo.png
│   │
│   ├── posts/
│   │   ├── api-security-research.jpg
│   │   ├── campus-network-alert.jpg
│   │   └── university-phishing.jpg
│   │
│   └── videos/
│       ├── Cyber_Attack-sample-Video.mp4
│       ├── Zer0Day-DEMO-1791720656437.gif
│       └── zeroday-sample-video.mp4
│
├── css/
│   └── style.css
│
├── html/
│   ├── index.html
│   ├── home.html
│   ├── discover.html
│   ├── learn.html
│   ├── connections.html
│   ├── messages.html
│   ├── profile.html
│   └── threat-watch.html
│
├── js/
│   └── Shared scripts and page functionality
│
└── Chat_server/
    ├── Chat-Demo.md
    ├── package.json
    ├── package-lock.json
    └── server.js
```

---

## Getting Started

Follow these instructions to run ZeroDay locally.

### Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org/) (includes npm)
- A modern web browser
- Git (optional)

### Installation

**1. Clone the repository**

```bash
git clone https://github.com/codeBilal-exe/ZeroDay.git
```

**2. Navigate to the project directory**

```bash
cd ZeroDay
```

**3. Navigate to the server directory**

```bash
cd Chat_server
```

**4. Install dependencies**

```bash
npm install
```

**5. Start the application**

```bash
npm start
```

**6. Open ZeroDay**

Visit the following address in your browser:

```text
http://localhost:3000
```

Keep the Node.js server running while using the application.

---

## Demo Accounts

ZeroDay includes five predefined demo accounts for exploring the platform.

| Username | Password | Account Details |
| :--- | :--- | :--- |
| `bilal.asif` | `zeroday123` | Presenter Account |
| `usaid.rehan` | `zeroday` | Connected User |
| `raheemxd` | `zeroday` | Connected User |
| `mina.codes` | `zeroday` | Connected User |
| `daniyal.noor` | `zeroday` | Unconnected User |

### Testing Live Features

To demonstrate the real-time functionality:

1. Start the Node.js server.
2. Open ZeroDay in your regular browser.
3. Sign in using one demo account.
4. Open another browser profile or private window.
5. Sign in using a different demo account.
6. Try sending messages, creating posts, commenting, reacting, or sending connection requests.

Changes supported by the WebSocket relay will appear in relevant open sessions.

For a more detailed demonstration, see **[Chat-Demo.md](Chat_server/Chat-Demo.md)**.

---

## Important Notes & Limitations

ZeroDay is an educational and demonstration prototype. Some functionality is intentionally simplified.

| Feature | Current Implementation |
| :--- | :--- |
| Authentication | Predefined local demo accounts |
| User Data | Sample application data |
| Live Updates | Temporary WebSocket relay |
| Message History | Not persisted |
| Posts & Comments | Reset to sample data on refresh |
| Connection Requests | Outgoing requests synchronized between relevant sessions |
| Saved Posts | Stored locally, not synchronized |
| Theme Preferences | Saved in browser storage |
| Blocks & Request Decisions | Not synchronized |

### Additional Information

- The WebSocket server does not maintain a database or persistent message history.
- Refreshing the application or restarting the server restores the original sample data.
- Login credentials are mock data and are not suitable for production authentication.
- Bootstrap and Google Fonts are loaded through external CDNs and require an internet connection.
- Live communication requires the Node.js server to remain active.

---

## Project Purpose

ZeroDay was developed as a cybersecurity community platform prototype to demonstrate how web technologies can be used to build an interactive, responsive, and communication-focused application.

The project brings together social networking concepts and cybersecurity awareness through a single interface.

**The goal is simple: make cybersecurity knowledge easier to discover, discuss, and share.**

---

<p align="center">
  <strong>ZeroDay</strong>
  <br>
  Stay Aware. Stay Secure. Stay Ahead.
  <br><br>
  <sub>Developed by Bilal | Cybersecurity Community Project</sub>
</p>