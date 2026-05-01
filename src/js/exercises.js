import axios from 'axios';
import { getExercises } from './api.js';
import { state } from './filters.js';
import { openExerciseModal } from './modal-exercise.js';

const exercisesList = document.querySelector('[data-exercises-list]');
const searchForm = document.querySelector('[data-search-form]');

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

function capitalize(text) {
  return text.charAt(0).toUpperCase() + text.slice(1);
}

function exerciseMarkup(exercise) {
  return `
    <li class="exercise-card">
      <div class="exercise-card-top">
        <span class="badge">Workout</span>
        <span class="exercise-rating">
        ${Math.round(Number(exercise.rating) || 0).toFixed(1)}
        <span class="rating-star">
        <svg viewBox="0 0 15 15">
        <path d="M6.47623 0.564643C6.84033 -0.188143 7.9126 -0.188143 8.2767 0.564643L9.7564 3.62401C9.90217 3.92538 10.1891 4.13382 10.5207 4.17932L13.8876 4.64121C14.7161 4.75486 15.0474 5.77465 14.444 6.35355L11.9916 8.70624C11.75 8.93799 11.6404 9.27526 11.6997 9.60475L12.3008 12.9496C12.4487 13.7726 11.5812 14.4029 10.8442 14.0079L7.84884 12.4025C7.55378 12.2444 7.19915 12.2444 6.90409 12.4025L3.90873 14.0079C3.17169 14.4029 2.30421 13.7726 2.45212 12.9496L3.05327 9.60475C3.11248 9.27526 3.0029 8.93799 2.76132 8.70624L0.308946 6.35355C-0.294485 5.77465 0.0368656 4.75486 0.86532 4.64121L4.23221 4.17932C4.56387 4.13382 4.85076 3.92538 4.99653 3.62401L6.47623 0.564643Z"/>
        </svg>
        </span>
        </span>
        <button type="button" data-start="${exercise._id}">Start 
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M7.5 14L14 7.5M14 7.5L7.5 1M14 7.5H1" stroke="#242424" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round" />
</svg>
        </button>
      </div>

      <h3 class="exercise-name">
      <span class="exercise-icon">
      <svg width="18" height="20" viewBox="0 0 18 20" xmlns="http://www.w3.org/2000/svg">
      <path d="M17.3232 5.90673C17.0611 5.59374 16.5944 5.55259 16.2814 5.81359L14.2301 7.53667L13.2868 5.19953C13.2533 5.1118 13.2024 5.03816 13.1439 4.97318C12.9511 4.5443 12.6164 4.17608 12.1551 3.96272C11.9547 3.87175 11.7479 3.82302 11.541 3.79919C11.4955 3.77536 11.4544 3.74396 11.4024 3.72771L7.79271 2.72159C7.59019 2.66636 7.38658 2.7021 7.2198 2.79957C7.02161 2.86672 6.85157 3.01076 6.77035 3.21978L5.41116 6.71466C5.26387 7.0948 5.45232 7.52367 5.83354 7.67313C6.21259 7.82042 6.64255 7.63089 6.79092 7.24967L7.93892 4.29846L9.58293 4.75549C9.54286 4.82047 9.49954 4.88112 9.46705 4.95043L7.3595 9.51858C7.32918 9.58573 7.31294 9.65396 7.29128 9.72327L4.72995 14.0174L0.443384 15.4513C-0.0418057 15.8141 -0.144692 16.4975 0.213785 16.9827C0.574429 17.469 1.25998 17.5719 1.74408 17.2134L6.13029 15.7026C6.26458 15.6051 6.36205 15.4773 6.4357 15.3398C6.49093 15.2813 6.55374 15.2347 6.59598 15.1622L8.12303 12.6019L10.8338 14.912L7.9335 18.1805C7.53387 18.6311 7.57394 19.3253 8.02664 19.7238C8.47826 20.1256 9.1703 20.0834 9.5721 19.6307L13.1915 15.5531C13.3042 15.4275 13.3713 15.2824 13.4168 15.1308C13.4439 15.0484 13.4439 14.9629 13.4504 14.8773C13.4504 14.834 13.4666 14.795 13.4634 14.7549C13.4536 14.456 13.3323 14.1658 13.0876 13.9589L10.5934 11.8319C10.7732 11.6608 10.9259 11.4572 11.0363 11.2178L12.6522 7.71861L13.1699 9.09729C13.1915 9.21967 13.2327 9.33988 13.3193 9.4406C13.3973 9.53374 13.4969 9.59547 13.6031 9.6388C13.6139 9.64421 13.6269 9.64529 13.6399 9.64854C13.707 9.67237 13.7753 9.69511 13.8457 9.69836C13.9291 9.70594 14.0135 9.69511 14.0991 9.67129C14.1013 9.6702 14.1023 9.6702 14.1023 9.6702C14.1251 9.66479 14.1478 9.66912 14.1706 9.65937C14.2908 9.61389 14.3828 9.53699 14.4619 9.4471L17.4055 6.94859C17.7185 6.68542 17.5864 6.21972 17.3232 5.90673Z" fill="white" />
      <path d="M13.6002 4.12628C14.7397 4.12628 15.6634 3.20258 15.6634 2.06314C15.6634 0.923699 14.7397 0 13.6002 0C12.4608 0 11.5371 0.923699 11.5371 2.06314C11.5371 3.20258 12.4608 4.12628 13.6002 4.12628Z" fill="white" />
      </svg>
      </span>
      <span class="exercise-title">${capitalize(exercise.name)}</span>
      </h3>

      <p class="exercise-info">
         <span class="info-item">
         <span class="info-label">Burned calories:</span>
         <span class="info-value">${exercise.burnedCalories} / 3 min</span>
         </span>
        <span class="info-item">
        <span class="info-label">Body part:</span>
        <span class="info-value">${capitalize(exercise.bodyPart)}</span>
        </span>
        <span class="info-item">
        <span class="info-label">Target:</span>
        <span class="info-value">${capitalize(exercise.target)}</span>
        </span>
        </p>
        `;
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
      return;
    }

    exercisesList.innerHTML = results.map(exerciseMarkup).join('');

    exercisesList.querySelectorAll('[data-start]').forEach(button => {
      button.addEventListener('click', () => {
        openExerciseModal(button.dataset.start);
      });
    });
  } catch (error) {
    if (axios.isCancel(error)) return;
    exercisesList.innerHTML = '<li>Failed to load exercises.</li>';
  }
}

if (searchForm) {
  searchForm.addEventListener('submit', event => {
    event.preventDefault();
    state.keyword = event.currentTarget.elements.search.value.trim();
    state.page = 1;
    loadExercises();
  });
}
