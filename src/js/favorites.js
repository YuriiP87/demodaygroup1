import { STORAGE_KEYS } from './constants.js';
import { openExerciseModal } from './modal-exercise.js';

const list = document.querySelector('[data-favorites-list]');
const empty = document.querySelector('[data-favorites-empty]');

function getFavorites() {
  return JSON.parse(localStorage.getItem(STORAGE_KEYS.favorites)) || [];
}

function saveFavorites(items) {
  localStorage.setItem(STORAGE_KEYS.favorites, JSON.stringify(items));
}

function markup(exercise) {
  return `
    <li class="exercise-card">
      <div class="exercise-card-top">
        <div class="exercise-card-actions">
          <span class="badge">Workout</span>

          <button class="remove-btn" type="button" data-remove="${exercise._id}" aria-label="Remove from favorites">
            🗑
          </button>
        </div>

        <button class="start-btn" type="button" data-start="${exercise._id}">
          Start →
        </button>
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

function renderFavorites() {
  if (!list) return;

  const favorites = getFavorites();

  if (!favorites.length) {
    list.innerHTML = '';
    empty?.classList.remove('is-hidden');
    return;
  }

  empty?.classList.add('is-hidden');
  list.innerHTML = favorites.map(markup).join('');

  list.querySelectorAll('[data-start]').forEach(button => {
    button.addEventListener('click', () => openExerciseModal(button.dataset.start));
  });

  list.querySelectorAll('[data-remove]').forEach(button => {
    button.addEventListener('click', () => {
      const updated = getFavorites().filter(item => item._id !== button.dataset.remove);
      saveFavorites(updated);
      renderFavorites();
    });
  });
}

renderFavorites();