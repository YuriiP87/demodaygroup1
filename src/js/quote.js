import { getQuote } from './api.js';
import { STORAGE_KEYS } from './constants.js';

const quoteEl = document.querySelector('[data-quote]');

function getToday() {
  return new Date().toISOString().split('T')[0];
}

function renderQuote({ quote, author }) {
  if (!quoteEl) return;

  quoteEl.innerHTML = `
    <div class="quote-head">
      <span>🏃</span>
      <h3>Quote of the day</h3>
      <span>“</span>
    </div>
    <p>${quote}</p>
    <strong>${author}</strong>
  `;
}

async function initQuote() {
  if (!quoteEl) return;

  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEYS.quote));
    const today = getToday();

    if (saved && saved.date === today) {
      renderQuote(saved.data);
      return;
    }

    const data = await getQuote();

    localStorage.setItem(
      STORAGE_KEYS.quote,
      JSON.stringify({
        date: today,
        data,
      })
    );

    renderQuote(data);
  } catch (error) {
    quoteEl.innerHTML = '<p>Quote is temporarily unavailable.</p>';
  }
}

initQuote();