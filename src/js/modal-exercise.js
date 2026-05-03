import { getExerciseById } from './api.js';
import { STORAGE_KEYS } from './constants.js';

const modal = document.querySelector('[data-modal]');
const modalContent = document.querySelector('[data-modal-content]');
const closeBtn = document.querySelector('[data-modal-close]');

let currentExercise = null;
let selectedRating = 0;

function getFavorites() {
  return JSON.parse(localStorage.getItem(STORAGE_KEYS.favorites)) || [];
}

function saveFavorites(items) {
  localStorage.setItem(STORAGE_KEYS.favorites, JSON.stringify(items));
}

function isFavorite(id) {
  return getFavorites().some(item => item._id === id);
}

function createRatingMarkup(rating) {
  const normalizedRating = Number(rating) || 0;
  const filledStars = Math.round(normalizedRating);

  return Array.from({ length: 5 }, (_, index) => {
    const isFilled = index < filledStars;
    return `<span class="${isFilled ? 'is-active' : ''}">★</span>`;
  }).join('');
}

function createInteractiveRatingMarkup(rating = 0) {
  return Array.from({ length: 5 }, (_, index) => {
    const value = index + 1;
    const isActive = value <= rating;

    return `
      <button
        class="rating-star ${isActive ? 'is-active' : ''}"
        type="button"
        data-rating-value="${value}"
        aria-label="Rate ${value}"
      >
        ★
      </button>
    `;
  }).join('');
}

function toggleFavorite(exercise) {
  const favorites = getFavorites();

  if (isFavorite(exercise._id)) {
    saveFavorites(favorites.filter(item => item._id !== exercise._id));
  } else {
    saveFavorites([...favorites, exercise]);
  }

  renderModal(exercise);
}

function renderModal(exercise) {
  currentExercise = exercise;

  const buttonText = isFavorite(exercise._id)
    ? 'Remove from favorites'
    : 'Add to favorites';

  modalContent.innerHTML = `
    <div class="modal-content-grid">
      <img class="modal-img" src="${exercise.gifUrl}" alt="${exercise.name}" />

      <div class="modal-details">
        <h2>${exercise.name}</h2>

        <div class="modal-rating">
          <span class="modal-rating-number">${Number(exercise.rating || 0).toFixed(1)}</span>

          <div class="modal-stars">
            ${createRatingMarkup(exercise.rating)}
          </div>
        </div>

        <ul class="modal-info">
          <li><b>Target</b><span>${exercise.target}</span></li>
          <li><b>Body Part</b><span>${exercise.bodyPart}</span></li>
          <li><b>Equipment</b><span>${exercise.equipment}</span></li>
          <li><b>Popular</b><span>${exercise.popularity}</span></li>
          <li><b>Burned calories</b><span>${exercise.burnedCalories} / 3 min</span></li>
        </ul>

        <p class="modal-description">${exercise.description}</p>

        <div class="modal-actions">
          <button class="favorite-btn" type="button" data-fav-btn>
            ${buttonText}
            <span>♡</span>
          </button>

          <button class="rating-btn" type="button" data-open-rating>
            Give a rating
          </button>
        </div>
      </div>
    </div>
  `;

  modalContent
    .querySelector('[data-fav-btn]')
    ?.addEventListener('click', () => {
      toggleFavorite(exercise);
    });

  modalContent
    .querySelector('[data-open-rating]')
    ?.addEventListener('click', () => {
      renderRatingModal();
    });
}

function renderRatingModal() {
  selectedRating = 0;

  modalContent.innerHTML = `
    <form class="rating-form" data-rating-form>
      <label class="rating-label">Rating</label>

      <div class="rating-form-top">
        <span class="rating-current" data-rating-current>0.0</span>

        <div class="rating-stars-interactive" data-rating-stars>
          ${createInteractiveRatingMarkup(selectedRating)}
        </div>
      </div>

      <input
        class="rating-input"
        type="email"
        name="email"
        placeholder="Email"
        required
      />

      <textarea
        class="rating-textarea"
        name="comment"
        placeholder="Your comment"
        required
      ></textarea>

      <button class="rating-send-btn" type="submit">
        Send
      </button>
    </form>
  `;

  const ratingCurrent = modalContent.querySelector('[data-rating-current]');
  const ratingStars = modalContent.querySelector('[data-rating-stars]');
  const ratingForm = modalContent.querySelector('[data-rating-form]');

  ratingStars?.addEventListener('click', event => {
    const starBtn = event.target.closest('[data-rating-value]');
    if (!starBtn) return;

    selectedRating = Number(starBtn.dataset.ratingValue);
    ratingCurrent.textContent = selectedRating.toFixed(1);
    ratingStars.innerHTML = createInteractiveRatingMarkup(selectedRating);
  });

  ratingForm?.addEventListener('submit', event => {
    event.preventDefault();

    if (!currentExercise) {
      closeModal();
      return;
    }

    renderModal(currentExercise);
  });
}

export async function openExerciseModal(id) {
  if (!modal || !modalContent) return;

  modal.classList.remove('is-hidden');
  document.body.classList.add('no-scroll');

  modalContent.innerHTML = '<p class="modal-loading">Loading...</p>';

  try {
    const exercise = await getExerciseById(id);
    renderModal(exercise);
  } catch (error) {
    modalContent.innerHTML =
      '<p class="modal-error">Failed to load exercise.</p>';
  }
}

function closeModal() {
  if (!modal) return;

  modal.classList.add('is-hidden');
  document.body.classList.remove('no-scroll');
  currentExercise = null;
  selectedRating = 0;
}

closeBtn?.addEventListener('click', closeModal);

modal?.addEventListener('click', event => {
  if (event.target === modal) {
    closeModal();
  }
});

document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && !modal?.classList.contains('is-hidden')) {
    closeModal();
  }
});
