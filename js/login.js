/* ============================================
   ZeroDay — Login Logic (login.js)
   ============================================ */

document.addEventListener('zd:page-ready', () => {
  if (!document.getElementById('login-form')) return;
  // If already logged in, redirect to home
  if (sessionStorage.getItem('zd_logged_in')) {
    navigateTo('home.html');
    return;
  }

  const form = document.getElementById('login-form');
  const usernameInput = document.getElementById('login-username');
  const passwordInput = document.getElementById('login-password');
  const usernameError = document.getElementById('username-error');
  const passwordError = document.getElementById('password-error');
  const authError = document.getElementById('auth-error');

  // Clear errors on input
  usernameInput.addEventListener('input', () => {
    usernameInput.classList.remove('is-invalid');
    usernameError.classList.remove('show');
    authError.classList.remove('show');
  });

  passwordInput.addEventListener('input', () => {
    passwordInput.classList.remove('is-invalid');
    passwordError.classList.remove('show');
    authError.classList.remove('show');
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    let valid = true;
    const username = usernameInput.value.trim();
    const password = passwordInput.value.trim();

    // Validate username
    if (!username) {
      usernameInput.classList.add('is-invalid');
      usernameError.classList.add('show');
      valid = false;
    }

    // Validate password
    if (!password) {
      passwordInput.classList.add('is-invalid');
      passwordError.classList.add('show');
      valid = false;
    }

    if (!valid) return;

    // Authenticate against mock data
    const user =
        users.find(u => u.username === username && u.password === password);

    if (user) {
      // Login success
      sessionStorage.setItem('zd_logged_in', 'true');
      sessionStorage.setItem('zd_user_id', user.id.toString());

      // Update the button to show success state
      const submitBtn = document.getElementById('login-submit');
      submitBtn.textContent = 'ACCESS GRANTED';
      submitBtn.style.background = 'var(--zd-highlight)';
      submitBtn.style.color = '#000';
      submitBtn.disabled = true;

      // Update system status
      const status = document.getElementById('system-status');
      status.innerHTML =
          '<span class="status-indicator"></span> AUTHENTICATED — REDIRECTING...';
      status.style.color = 'var(--zd-action)';

      // Redirect after brief delay
      setTimeout(() => {
        navigateTo('home.html');
      }, 800);
    } else {
      // Login failed
      authError.classList.add('show');
      usernameInput.classList.add('is-invalid');
      passwordInput.classList.add('is-invalid');

      // Shake animation
      const panel = document.querySelector('.auth-card');
      if (panel) {
        panel.style.animation = 'shake 0.4s ease';
        setTimeout(() => panel.style.animation = '', 400);
      }
    }
  });
});

// Shake keyframes (added dynamically)
const shakeStyle = document.createElement('style');
shakeStyle.textContent = `
  @keyframes shake {
    0%, 100% { transform: translateX(0); }
    20% { transform: translateX(-8px); }
    40% { transform: translateX(8px); }
    60% { transform: translateX(-5px); }
    80% { transform: translateX(5px); }
  }
`;
document.head.appendChild(shakeStyle);
