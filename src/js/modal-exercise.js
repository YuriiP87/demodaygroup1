import { getExerciseById, addRating } from './api.js';
import { STORAGE_KEYS } from './constants.js';

const modal = document.querySelector('[data-modal]');
const modalContent = document.querySelector('[data-modal-content]');
const closeBtn = document.querySelector('[data-modal-close]');
const ratingModal = document.querySelector('[data-rating-modal]');
const ratingModalContent = document.querySelector('[data-rating-modal-content]');
const ratingModalCloseBtn = document.querySelector('[data-rating-modal-close]');

let selectedRating = 0;

function updateRatingStars(rating) {
  selectedRating = rating;
  const ratingValue = ratingModalContent?.querySelector('[data-rating-value]');
  const starButtons = ratingModalContent?.querySelectorAll('[data-rating-star]');

  if (ratingValue) {
    ratingValue.textContent = rating.toFixed(1);
  }

  starButtons?.forEach(button => {
    const value = Number(button.dataset.ratingStar);
    button.classList.toggle('active', value <= rating);
  });
}

function bindRatingModalEvents(exerciseId) {
  ratingModalContent?.querySelectorAll('[data-rating-star]')?.forEach(button => {
    button.addEventListener('click', () => updateRatingStars(Number(button.dataset.ratingStar)));
  });

  const form = ratingModalContent?.querySelector('.rating-form');
  form?.addEventListener('submit', async event => {
    event.preventDefault();

    if (selectedRating === 0) {
      alert('Please select a rating.');
      return;
    }

    const formData = new FormData(form);
    const email = formData.get('email');
    const comment = formData.get('comment');

    try {
      await addRating(exerciseId, { rating: selectedRating, email, comment });
    } catch {
      // ignore API errors here
    }

    closeRatingModal();
    if (!modal.classList.contains('is-hidden')) {
      openExerciseModal(exerciseId);
    }
  });
}

function openRatingModal(exerciseId) {
  if (!ratingModal || !ratingModalContent) return;

  selectedRating = 0;
  ratingModal.classList.remove('is-hidden');
  document.body.classList.add('no-scroll');

  ratingModalContent.innerHTML = `
    <form class="rating-form">
      <div class="rating-modal-header">
        <p class="rating-modal-title">Rating</p>
        <span class="rating-value" data-rating-value>0.0</span>
      </div>
      <div class="rating-stars" data-rating-stars>
        <button type="button" class="rating-star" data-rating-star="1">★</button>
        <button type="button" class="rating-star" data-rating-star="2">★</button>
        <button type="button" class="rating-star" data-rating-star="3">★</button>
        <button type="button" class="rating-star" data-rating-star="4">★</button>
        <button type="button" class="rating-star" data-rating-star="5">★</button>
      </div>
      <label class="rating-field">
        <span>Email</span>
        <input type="email" name="email" placeholder="Email" required />
      </label>
      <label class="rating-field">
        <span>Your comment</span>
        <textarea name="comment" rows="4" placeholder="Your comment"></textarea>
      </label>
      <button type="submit" class="rating-submit">Send</button>
    </form>
  `;

  bindRatingModalEvents(exerciseId);
}

function closeRatingModal() {
  if (!ratingModal) return;

  ratingModal.classList.add('is-hidden');
  if (modal?.classList.contains('is-hidden')) {
    document.body.classList.remove('no-scroll');
  }
}

function getFavorites() {
  return JSON.parse(localStorage.getItem(STORAGE_KEYS.favorites)) || [];
}

function saveFavorites(items) {
  localStorage.setItem(STORAGE_KEYS.favorites, JSON.stringify(items));
}

function isFavorite(id) {
  return getFavorites().some(item => item._id === id);
}

function toggleFavorite(exercise) {
  const favorites = getFavorites();

  if (isFavorite(exercise._id)) {
    saveFavorites(favorites.filter(item => item._id !== exercise._id));
  } else {
    saveFavorites([...favorites, exercise]);
  }

  openExerciseModal(exercise._id);
}

function renderModal(exercise) {
  const favouritesButtonText = isFavorite(exercise._id)
    ? 'Remove from favorites'
    : 'Add to favorites';
  const GiveARating = "Give a rating"

  modalContent.innerHTML = `
    <div class="modal-content-grid">
      <img class="modal-img" src="${exercise.gifUrl}" alt="${exercise.name}" />

      <div>
        <h2>${exercise.name}</h2>
        <p>${exercise.rating} ★★★★★</p>

        <ul class="modal-info">
          <li><b>Target</b><span>${exercise.target}</span></li>
          <li><b>Body Part</b><span>${exercise.bodyPart}</span></li>
          <li><b>Equipment</b><span>${exercise.equipment}</span></li>
          <li><b>Popular</b><span>${exercise.popularity}</span></li>
          <li><b>Burned Calories</b><span>${exercise.burnedCalories} / 3 min</span></li>
        </ul>

        <p>${exercise.description}</p>

        <div class="modal-actions">
          <button type="button" data-fav-btn>${favouritesButtonText} ♡</button>
          <button type="button" class="btn-rating">${GiveARating}</button>
        </div>
      </div>
    </div>
  `;

  modalContent.querySelector('[data-fav-btn]').addEventListener('click', () => {
    toggleFavorite(exercise);
  });

  modalContent.querySelector('.btn-rating')?.addEventListener('click', () => {
    openRatingModal(exercise._id);
  });
}

export async function openExerciseModal(id) {
  if (!modal || !modalContent) return;

  modal.classList.remove('is-hidden');
  document.body.classList.add('no-scroll');
  modalContent.innerHTML = '<p>Loading...</p>';

  try {
    const exercise = await getExerciseById(id);
    renderModal(exercise);
  } catch {
    modalContent.innerHTML = '<p>Failed to load exercise.</p>';
  }
}

function closeModal() {
  if (!modal) return;

  modal.classList.add('is-hidden');
  if (ratingModal?.classList.contains('is-hidden')) {
    document.body.classList.remove('no-scroll');
  }
}

closeBtn?.addEventListener('click', closeModal);
ratingModalCloseBtn?.addEventListener('click', closeRatingModal);

modal?.addEventListener('click', event => {
  if (event.target === modal) {
    closeModal();
  }
});

ratingModal?.addEventListener('click', event => {
  if (event.target === ratingModal) {
    closeRatingModal();
  }
});

document.addEventListener('keydown', event => {
  if (event.key === 'Escape') {
    if (ratingModal && !ratingModal.classList.contains('is-hidden')) {
      closeRatingModal();
    } else {
      closeModal();
    }
  }
});
