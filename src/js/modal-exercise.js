import { getExerciseById } from './api.js';
import { STORAGE_KEYS } from './constants.js';

const modal = document.querySelector('[data-modal]');
const modalContent = document.querySelector('[data-modal-content]');
const closeBtn = document.querySelector('[data-modal-close]');

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
  const buttonText = isFavorite(exercise._id) ? 'Remove from favorites' : 'Add to favorites';

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
          <button type="button" data-fav-btn>${buttonText} ♡</button>
        </div>
      </div>
    </div>
  `;

  modalContent.querySelector('[data-fav-btn]').addEventListener('click', () => {
    toggleFavorite(exercise);
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
  document.body.classList.remove('no-scroll');
}

if (closeBtn) closeBtn.addEventListener('click', closeModal);

if (modal) {
  modal.addEventListener('click', event => {
    if (event.target === modal) closeModal();
  });
}

document.addEventListener('keydown', event => {
  if (event.key === 'Escape') closeModal();
});