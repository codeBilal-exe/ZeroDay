<div align="center">

<img src="assets/icons/ZeroDay-Logo.png" alt="ZeroDay Logo" width="120" />

# ZeroDay

**A client-side social & learning platform prototype for cybersecurity professionals, researchers, and enthusiasts.**

[![Bootstrap 5](https://img.shields.io/badge/Bootstrap-v5.3-7952B3?style=for-the-badge&logo=bootstrap&logoColor=white)](https://getbootstrap.com/)
[![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![HTML5](https://img.shields.io/badge/HTML5-Semantic-E34F26?style=for-the-badge&logo=html5&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/HTML)
[![License: Educational](https://img.shields.io/badge/License-Educational-blue.svg?style=for-the-badge)](#license)

---

[Features](#key-features) • [Page Directory](#page-directory) • [Tech Stack](#tech-stack) • [Project Structure](#project-structure) • [Getting Started](#getting-started) • [Notes](#assignment-notes)

</div>

<br />

## Overview

**ZeroDay** is a community-focused web platform designed to connect security researchers, students, developers, and privacy advocates. The platform enables users to stay informed about threat landscapes, exchange security insights, learn best practices, and collaborate in a secure-first social environment.

> **Note:** This is an educational demo. Its WebSocket relay shares new messages, posts, comments, reactions, and connection requests between open app instances. Updates are held in server memory only and reset when the server restarts; the original sample content returns when a page is refreshed.

---

## Key Features

- **Mock Authentication System** — Pre-configured demo accounts for seamless multi-user interaction testing.
- **Dynamic Community Feed** — Post updates, react, leave comments, share insights, and view live author metadata.
- **Learning Hub & Discovery** — Specialized pages dedicated to cybersecurity topics, educational tracks, and sub-communities.
- **Threat Watch Console** — Dedicated dashboard for staying updated on emerging vulnerabilities and security alerts.
- **Live Direct Messaging & Connections** — Exchange messages and connection requests between open app instances over WebSockets.
- **Interactive User Profiles** — Showcases user achievements, security interests, activity logs, and personal metadata.
- **Persistent Theme Engine** — Seamless toggle between Dark and Light modes backed by browser state.

---

## Page Directory

| File | Page Name | Primary Purpose |
| :--- | :--- | :--- |
| `html/index.html` | **Login Portal** | Entry point; demo user profile selection and login simulation |
| `html/home.html` | **Community Feed** | Main social hub featuring feed posts, comments, and reactions |
| `html/discover.html` | **Discover Hub** | Browse trending security topics, groups, and micro-communities |
| `html/learn.html` | **Learning Center** | Educational security articles, modules, and vulnerability guides |
| `html/connections.html` | **Network & Invites** | Manage connections, inspect invitations, and view peer ratings |
| `html/messages.html` | **Direct Messages** | Private client-side messaging layout |
| `html/profile.html` | **User Profile** | Personal dashboard showing activity, achievements, and settings |
| `html/threat-watch.html` | **Threat Watch** | Community threat awareness board and security bulletins |

---

## Tech Stack

- **Markup & Layout:** HTML5, [Bootstrap 5](https://getbootstrap.com/)
- **Styling:** Custom CSS with CSS Variables / Design Tokens (supporting Light/Dark modes)
- **Logic & Storage:** JavaScript (ES6+), Web Storage API, Node.js, and WebSockets (`ws`)

---

## Project Structure

```text
ZeroDay/
├── assets/             # Images, icons, avatars, and sample video
├── css/
│   └── style.css
├── html/               # All app pages
│   ├── index.html
│   ├── home.html
│   ├── discover.html
│   ├── learn.html
│   ├── connections.html
│   ├── messages.html
│   ├── profile.html
│   └── threat-watch.html
├── js/                 # Shared app logic and page scripts
├── node_modules/       # Installed dependencies
├── package.json
├── package-lock.json
├── server.js           # Static page server and WebSocket relay
├── DEMO_GUIDE.md       # Steps for presenting the live demo
└── README.md
```

## Run the live demo

See [DEMO_GUIDE.md](DEMO_GUIDE.md) for a step-by-step presentation flow.

Install dependencies once, then start the local server:

```sh
npm install
npm start
```

Open `http://localhost:3000` in two separate browser sessions and sign in as different users. The demo accounts use these credentials:

| Username | Password | Network |
| :--- | :--- | :--- |
| `bilal.asif` | `zeroday123` | Connected to the demo group |
| `usaid.rehan` | `zeroday` | Connected to Bilal, Raheem, and Mina |
| `raheemxd` | `zeroday` | Connected to Bilal, Usaid, and Mina |
| `mina.codes` | `zeroday` | Connected to Bilal, Usaid, and Raheem |
| `daniyal.noor` | `zeroday` | Unconnected; use to try a friend request |

The added demo profiles use abstract, locally stored artwork instead of people photos. Keep the Node server running in one terminal while testing; opening the HTML file directly bypasses the WebSocket service.
