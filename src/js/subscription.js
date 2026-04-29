import { subscribeUser } from './api.js';

const form = document.querySelector('[data-subscribe-form]');

form?.addEventListener('submit', async event => {
  event.preventDefault();

  const email = event.currentTarget.elements.email.value.trim();

  try {
    await subscribeUser(email);
    alert('Subscription created successfully');
    form.reset();
  } catch {
    alert('Subscription failed. Try another email.');
  }
});
