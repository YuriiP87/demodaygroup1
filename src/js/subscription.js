
const EMAIL_PATTERN = /^\w+(\.\w+)?@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;

const API_URL = 'https://your-energy.b.goit.study/api/subscription';


const form = document.getElementById('subscriptionForm');
const input = document.getElementById('subscriptionEmail');
const error = document.getElementById('emailError');
const btn = form.querySelector('.footer__btn');

function isValid(value) {
  return EMAIL_PATTERN.test(value.trim());
}
function showError() {
  input.classList.add('is-invalid');
  input.classList.remove('is-valid');
  error.classList.add('visible');
}

function showSuccess() {
  input.classList.remove('is-invalid');
  input.classList.add('is-valid');
  error.classList.remove('visible');
}

function clearState() {
  input.classList.remove('is-invalid', 'is-valid');
  error.classList.remove('visible');
}

input.addEventListener('input', () => {
  if (input.value.trim() === '') {
    clearState();
    return;
  }
  isValid(input.value) ? showSuccess() : showError();
});

function showToast(message, type = 'success') {
  document.querySelector('.footer-toast')?.remove();

  const toast = document.createElement('div');
  toast.className = 'footer-toast';
  toast.textContent = message;

  Object.assign(toast.style, {
    position: 'fixed',
    bottom: '32px',
    right: '32px',
    padding: '14px 24px',
    borderRadius: '8px',
    fontSize: '14px',
    fontWeight: '500',
    color: '#fff',
    zIndex: '9999',
    background: type === 'success' ? '#27ae60' : '#e74c3c',
    boxShadow: '0 4px 16px rgba(0,0,0,0.25)',
    opacity: '1',
    transition: 'opacity 0.3s ease',
  });

  document.body.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}

form.addEventListener('submit', async event => {
  event.preventDefault();

  const email = input.value.trim();

  if (!isValid(email)) {
    showError();
    input.focus();
    return;
  }

  btn.disabled = true;
  btn.textContent = 'Sending...';

  try {

    const response = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    });


    if (!response.ok) {
      const data = await response.json().catch(() => ({}));
      throw new Error(data.message || `Error ${response.status}`);
    }


    form.reset();
    clearState();
    showToast('Successfully subscribed! 🎉', 'success');

  } catch (err) {
    showToast(err.message || 'Something went wrong. Try again.', 'error');

  } finally {
    btn.disabled = false;
    btn.textContent = 'Send';
  }
});
