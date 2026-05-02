import { STORAGE_KEYS } from './constants.js';
import { openExerciseModal } from './modal-exercise.js';

const runningIcon = new URL('../images/icons/iconrunning.svg', import.meta.url).href;
const arrowIcon = new URL('../images/icons/btnstart.svg', import.meta.url).href;

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

          <button
            class="remove-btn"
            type="button"
            data-remove="${exercise._id}"
            aria-label="Remove from favorites"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path
                d="M10.6667 4.00004V3.46671C10.6667 2.71997 10.6667 2.3466 10.5213 2.06139C10.3935 1.8105 10.1895 1.60653 9.93865 1.4787C9.65344 1.33337 9.28007 1.33337 8.53333 1.33337H7.46667C6.71993 1.33337 6.34656 1.33337 6.06135 1.4787C5.81046 1.60653 5.60649 1.8105 5.47866 2.06139C5.33333 2.3466 5.33333 2.71997 5.33333 3.46671V4.00004M6.66667 7.66671V11M9.33333 7.66671V11M2 4.00004H14M12.6667 4.00004V11.4667C12.6667 12.5868 12.6667 13.1469 12.4487 13.5747C12.2569 13.951 11.951 14.257 11.5746 14.4487C11.1468 14.6667 10.5868 14.6667 9.46667 14.6667H6.53333C5.41323 14.6667 4.85318 14.6667 4.42535 14.4487C4.04903 14.257 3.74307 13.951 3.55132 13.5747C3.33333 13.1469 3.33333 12.5868 3.33333 11.4667V4.00004"
                stroke="#242424"
                stroke-width="1.3"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </button>
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
    button.addEventListener('click', () => {
      openExerciseModal(button.dataset.start);
    });
  });

  list.querySelectorAll('[data-remove]').forEach(button => {
    button.addEventListener('click', () => {
      const updated = getFavorites().filter(
        item => item._id !== button.dataset.remove
      );

      saveFavorites(updated);
      renderFavorites();
    });
  });
}

renderFavorites();