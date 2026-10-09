/* ============================================
   ZeroDay — Signup (signup.js)
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
  // If already logged in, redirect to home
  if (localStorage.getItem('zd_currentUser')) {
    window.location.href = 'home.html';
  }

  const form = document.getElementById('signup-form');
  const nameInput = document.getElementById('reg-name');
  const usernameInput = document.getElementById('reg-username');
  const passwordInput = document.getElementById('reg-password');
  
  const nameError = document.getElementById('name-error');
  const usernameError = document.getElementById('username-error');
  const passwordError = document.getElementById('password-error');
  const signupError = document.getElementById('signup-error');

  // Clear errors on input
  [nameInput, usernameInput, passwordInput].forEach(input => {
    if (input) {
      input.addEventListener('input', () => {
        input.classList.remove('is-invalid');
        if (input.id === 'reg-name' && nameError) nameError.classList.remove('show');
        if (input.id === 'reg-username' && usernameError) usernameError.classList.remove('show');
        if (input.id === 'reg-password' && passwordError) passwordError.classList.remove('show');
        if (signupError) signupError.classList.remove('show');
      });
    }
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    let valid = true;
    const name = nameInput.value.trim();
    const username = usernameInput.value.trim().toLowerCase();
    const password = passwordInput.value;

    if (!name) {
      nameInput.classList.add('is-invalid');
      nameError.classList.add('show');
      valid = false;
    }
    
    if (!username) {
      usernameInput.classList.add('is-invalid');
      usernameError.textContent = "Username is required.";
      usernameError.classList.add('show');
      valid = false;
    } else if (users.some(u => u.username === username)) {
      usernameInput.classList.add('is-invalid');
      usernameError.textContent = "Username is already taken.";
      usernameError.classList.add('show');
      valid = false;
    }

    if (!password || password.length < 8) {
      passwordInput.classList.add('is-invalid');
      passwordError.classList.add('show');
      valid = false;
    }

    if (valid) {
      // Create new user in the mock database (in-memory)
      const newUser = {
        id: users.length + 1,
        name: name,
        username: username,
        password: password,
        bio: `New user on the ZeroDay network. Focused on expanding cybersecurity knowledge.`,
        interests: ["Security Fundamentals", "Networking"],
        level: 1,
        xp: 0,
        xpToNext: 1000,
        status: "online",
        lastActive: new Date(),
        avatar: null,
        achievements: [],
        connections: [] // Starts with 0 connections
      };

      // Since users is a global constant mock array in app.js, we just push to it.
      // In a real app this would be an API call.
      users.push(newUser);

      // Log the user in
      sessionStorage.setItem('zd_logged_in', 'true');
      sessionStorage.setItem('zd_user_id', newUser.id.toString());

      // Redirect to home
      window.location.href = 'home.html';
    }
  });
});
