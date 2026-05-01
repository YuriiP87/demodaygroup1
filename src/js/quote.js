import { getQuote } from './api.js';
import { STORAGE_KEYS } from './constants.js';

const quoteEl = document.querySelector('[data-quote]');

function getToday() {
  return new Date().toISOString().split('T')[0];
}

function renderQuote({ quote, author }) {
  if (!quoteEl) return;

  quoteEl.innerHTML = `
    <div class='quote-block'>
      <div class='quote-icon-wrap'>
        <svg width='34' height='32' viewBox='0 0 34 32' fill='none' xmlns='http://www.w3.org/2000/svg'>
          <circle cx='16' cy='16' r='16' fill='rgba(244,244,244,0.15)'/>
          <circle cx='21' cy='9' r='2.5' fill='#f4f4f4'/>
          <path d='M20 12L17 17L13.5 21' stroke='#f4f4f4' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/>
          <path d='M20 12L22.5 15.5L20.5 20' stroke='#f4f4f4' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/>
          <path d='M15 15L21 13.5' stroke='#f4f4f4' stroke-width='1.5' stroke-linecap='round'/>
        </svg>
      </div>
      <div class='quote-text'>
        <h3 class='quote-title'>Quote of the day</h3>
        <p class='quote-body'>${quote}</p>
      </div>
    </div>
    <p class='quote-author'>${author}</p>
    <svg class='quote-commas' width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
      <path d='M4.583 17.321C3.553 16.227 3 15 3 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179zm10 0C13.553 16.227 13 15 13 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179z' fill='#f4f4f4'/>
    </svg>
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
  } catch {
    quoteEl.innerHTML = '<p>Quote is temporarily unavailable.</p>';
  }
}

initQuote();
