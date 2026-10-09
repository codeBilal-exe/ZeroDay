# ZeroDay

ZeroDay is a cybersecurity-focused social platform designed for security professionals, students, ethical hackers, developers, and everyday users to connect, share threat intelligence, learn safety practices, and stay informed about digital security issues.

## Overview

This project is a front-end web application that simulates a modern cyber awareness and community network. It includes a login flow, onboarding/signup, a social feed, learning resources, threat monitoring, messaging, connections, and profile management.

The app is built using plain HTML, CSS, and JavaScript, with mock data and client-side interactions for a realistic demo experience.

## Features

- Secure, cyber-themed login and signup experience
- Social feed for cybersecurity signals, articles, and threat updates
- Learning center with educational security content
- Discover page for communities and trending topics
- Connections directory and networking features
- Messaging interface for private communication
- Profile page with stats, interests, achievements, and activity
- Responsive UI with a dark, cyber-inspired aesthetic

## Pages

- `index.html` — login screen
- `signup.html` — account registration
- `home.html` — main dashboard/social feed
- `discover.html` — trending security content and communities
- `learn.html` — learning and cybersecurity education portal
- `connections.html` — network explorer and user connections
- `messages.html` — direct messaging experience
- `profile.html` — user profile and activity
- `threat-watch.html` — threat monitoring overview

## Tech Stack

- HTML5
- CSS3
- JavaScript
- Bootstrap 5
- No backend or database required for the current demo

## Project Structure

```text
ZeroDay/
├── assets/         # Images, icons, avatars, and static media
├── css/
│   └── style.css
├── js/
│   ├── app.js
│   ├── connections.js
│   ├── home.js
│   ├── login.js
│   ├── messages.js
│   ├── profile.js
│   └── signup.js
├── index.html
├── signup.html
├── home.html
├── discover.html
├── learn.html
├── connections.html
├── messages.html
├── profile.html
├── threat-watch.html
├── README.md
└── .gitignore
```

## Demo Credentials

The app includes demo login accounts for testing the interface:

- `bilal.asif` / `zeroday123`
- `sarah.khan` / `secresearch!`

## Running the Project Locally

Because this is a static front-end app, you can run it in any of the following ways:

### Option 1: Open directly in browser

1. Open the project folder in your file explorer.
2. Double-click `index.html` or open it in your browser.
3. Use the demo credentials above to sign in.

### Option 2: Run a local web server

From the project folder, run:

```bash
python -m http.server 8000
```

Then open:

```text
http://localhost:8000
```

## Notes

- This project uses mock data stored in JavaScript for demonstration purposes.
- No authentication backend, database, or API is connected in the current version.
- It is best suited as a prototype or UI mockup for a cybersecurity social platform.

## License

This project is intended for educational and demo purposes.
