import axios from 'axios';
import { getFilters } from './api.js';
import { state } from './filters.js';
import { loadExercises } from './exercises.js';

const categoriesList = document.querySelector('[data-categories-list]');
const exercisesList = document.querySelector('[data-exercises-list]');
const searchForm = document.querySelector('[data-search-form]');
const currentCategoryEl = document.querySelector('[data-current-category]');
const paginationEl = document.querySelector('[data-pagination]');

let activeController = null;

function categoryMarkup(category) {
  return `
    <li class="category-card" data-category="${category.name}">
      <img src="${category.imgURL}" alt="${category.name}" loading="lazy" />
      <div>
        <h3>${category.name}</h3>
        <p>${category.filter}</p>
      </div>
    </li>
  `;
}

function renderPagination(totalPages) {
  if (!paginationEl) return;

  const markup = Array.from({ length: totalPages }, (_, index) => {
    const page = index + 1;

    return `
      <button
        class="pagination-btn ${page === state.page ? 'active' : ''}"
        type="button"
        data-page="${page}"
      >
        ${page}
      </button>
    `;
  }).join('');

  paginationEl.innerHTML = markup;
}

export async function loadCategories() {
  if (!categoriesList) return;

  categoriesList.classList.remove('is-hidden');

  if (exercisesList) {
    exercisesList.classList.add('is-hidden');
  }

  categoriesList.innerHTML = '<li>Loading...</li>';

  activeController?.abort();
  activeController = new AbortController();

  try {
    const data = await getFilters(state.filter, state.page, state.limit, {
      signal: activeController.signal,
    });

    const results = data.results || [];

    if (!results.length) {
      categoriesList.innerHTML = '<li>No categories found.</li>';
      return;
    }

    categoriesList.innerHTML = results.map(categoryMarkup).join('');

    renderPagination(data.totalPages || 1);

    categoriesList.querySelectorAll('[data-category]').forEach(card => {
      card.addEventListener('click', () => {
        state.category = card.dataset.category;
        state.page = 1;
        state.mode = 'exercises';

        categoriesList.classList.add('is-hidden');
        exercisesList?.classList.remove('is-hidden');
        searchForm?.classList.remove('is-hidden');

        if (currentCategoryEl) {
          currentCategoryEl.textContent = `/ ${state.category}`;
        }

        loadExercises();
      });
    });
  } catch (error) {
    if (axios.isCancel(error)) return;
    categoriesList.innerHTML = '<li>Failed to load categories.</li>';
  }
}

paginationEl?.addEventListener('click', event => {
  if (!event.target.classList.contains('pagination-btn')) return;

  if (state.mode === 'exercises') return;

  state.page = Number(event.target.dataset.page);

  loadCategories();
});
