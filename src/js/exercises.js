import axios from 'axios';
import { getExercises } from './api.js';
import { state } from './filters.js';
import { openExerciseModal } from './modal-exercise.js';

const runningIcon = new URL('../images/icons/iconrunning.svg', import.meta.url).href;
const arrowIcon = new URL('../images/icons/btnstart.svg', import.meta.url).href;

const exercisesList = document.querySelector('[data-exercises-list]');
const searchForm = document.querySelector('[data-search-form]');
const paginationEl = document.querySelector('[data-pagination]');

let activeController = null;

function getExerciseParams() {
  const params = {
    page: state.page,
    limit: 10,
    keyword: state.keyword,
  };

  const keyMap = {
    Muscles: 'muscles',
    'Body parts': 'bodypart',
    Equipment: 'equipment',
  };

  params[keyMap[state.filter]] = state.category.toLowerCase();

  return params;
}

function exerciseMarkup(exercise) {
  return `
    <li class="exercise-card">
      <div class="exercise-card-top">
        <div class="exercise-card-meta">
          <span class="badge">Workout</span>
          <span class="exercise-rating">${exercise.rating || '0.0'} ★</span>
        </div>

        <button class="start-btn" type="button" data-start="${exercise._id}">
          Start
          <img src="${arrowIcon}" alt="" />
        </button>
      </div>

      <div class="exercise-card-title">
        <span class="exercise-icon" aria-hidden="true">
          <img src="${runningIcon}" alt="" />
        </span>

        <h3>${exercise.name}</h3>
      </div>

      <p class="exercise-info">
        <span>Burned calories: <b>${exercise.burnedCalories}</b> / 3 min</span>
        <span>Body part: <b>${exercise.bodyPart}</b></span>
        <span>Target: <b>${exercise.target}</b></span>
      </p>
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

export async function loadExercises() {
  if (!exercisesList) return;

  exercisesList.innerHTML = '<li>Loading...</li>';

  activeController?.abort();
  activeController = new AbortController();

  try {
    const data = await getExercises(getExerciseParams(), {
      signal: activeController.signal,
    });

    const results = data.results || [];

    if (!results.length) {
      exercisesList.innerHTML = '<li>No exercises found.</li>';

      if (paginationEl) {
        paginationEl.innerHTML = '';
      }

      return;
    }

    exercisesList.innerHTML = results.map(exerciseMarkup).join('');

    renderPagination(data.totalPages || 3);

    exercisesList.querySelectorAll('[data-start]').forEach(button => {
      button.addEventListener('click', () => {
        openExerciseModal(button.dataset.start);
      });
    });
  } catch (error) {
    if (axios.isCancel(error)) return;

    exercisesList.innerHTML = '<li>Failed to load exercises.</li>';

    if (paginationEl) {
      paginationEl.innerHTML = '';
    }
  }
}

paginationEl?.addEventListener('click', event => {
  if (!event.target.classList.contains('pagination-btn')) return;
  if (state.mode !== 'exercises') return;

  state.page = Number(event.target.dataset.page);

  loadExercises();
});

if (searchForm) {
  searchForm.addEventListener('submit', event => {
    event.preventDefault();
    state.keyword = event.currentTarget.elements.search.value.trim();
    state.page = 1;
    loadExercises();
  });
}