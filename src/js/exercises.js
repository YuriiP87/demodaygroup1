import { getExercises } from './api.js';
import { state } from './filters.js';
import { openExerciseModal } from './modal-exercise.js';

const exercisesList = document.querySelector('[data-exercises-list]');
const searchForm = document.querySelector('[data-search-form]');

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
        <span class="badge">Workout</span>
        <span>${exercise.rating || '0.0'} ★</span>
        <button type="button" data-start="${exercise._id}">Start →</button>
      </div>

      <h3>🏃 ${exercise.name}</h3>

      <p>
        Burned calories: <b>${exercise.burnedCalories}</b> / 3 min
        &nbsp; Body part: <b>${exercise.bodyPart}</b>
        &nbsp; Target: <b>${exercise.target}</b>
      </p>
    </li>
  `;
}

export async function loadExercises() {
  if (!exercisesList) return;

  exercisesList.innerHTML = '<li>Loading...</li>';

  try {
    const data = await getExercises(getExerciseParams());
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
  } catch {
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