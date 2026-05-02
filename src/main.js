import 'izitoast/dist/css/iziToast.min.css';
import './css/reset.css';
import './css/base.css';
import './css/header.css';
import './css/hero.css';
import './css/filters.css';
import './css/categories.css';
import './css/exercises.css';
import './css/quote.css';
import './css/modal.css';
import './css/favorites.css';
import './css/footer.css';
import './css/loader.css';

import './js/mobile-menu.js';
import './js/quote.js';
import './js/exercises.js';
import './js/modal-exercise.js';
import './js/favorites.js';
import './js/subscription.js';
import './js/pagination.js';
import './js/scroll-up.js';

import { initFilters } from './js/filters.js';
import { loadCategories } from './js/categories.js';

document.addEventListener('DOMContentLoaded', () => {
  initFilters(loadCategories);
  loadCategories();
});
