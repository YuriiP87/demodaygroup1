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

    button.classList.toggle('is-active-star', value <= rating);
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

  // Auto-resize textarea
  const textarea = ratingModalContent?.querySelector('textarea[name="comment"]');
  if (textarea) {
    textarea.addEventListener('input', function() {
      this.style.height = 'auto';
      this.style.height = this.scrollHeight + 'px';
    });
  }
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
      </div>
      <div class="rating-stars" data-rating-stars <span class="rating-value" data-rating-value>0.0</span>
        <button type="button" class="rating-star" data-rating-star="1"><svg width="19" height="18" viewBox="0 0 19 18" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M8.38586 0.691212C8.68521 -0.230099 9.98862 -0.2301 10.288 0.691211L11.8066 5.36497C11.9404 5.777 12.3244 6.05596 12.7576 6.05596H17.6719C18.6406 6.05596 19.0434 7.29557 18.2597 7.86497L14.284 10.7535C13.9335 11.0082 13.7868 11.4595 13.9207 11.8716L15.4393 16.5453C15.7386 17.4666 14.6842 18.2327 13.9004 17.6633L9.9247 14.7748C9.57421 14.5202 9.09962 14.5202 8.74913 14.7748L4.77339 17.6633C3.98968 18.2327 2.9352 17.4666 3.23455 16.5453L4.75314 11.8716C4.88702 11.4595 4.74036 11.0082 4.38987 10.7535L0.414135 7.86497C-0.369579 7.29557 0.0331967 6.05596 1.00192 6.05596H5.9162C6.34943 6.05596 6.73339 5.777 6.86726 5.36497L8.38586 0.691212Z" fill="currentColor"/>
</svg></button>
        <button type="button" class="rating-star" data-rating-star="2"><svg width="19" height="18" viewBox="0 0 19 18" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M8.38586 0.691212C8.68521 -0.230099 9.98862 -0.2301 10.288 0.691211L11.8066 5.36497C11.9404 5.777 12.3244 6.05596 12.7576 6.05596H17.6719C18.6406 6.05596 19.0434 7.29557 18.2597 7.86497L14.284 10.7535C13.9335 11.0082 13.7868 11.4595 13.9207 11.8716L15.4393 16.5453C15.7386 17.4666 14.6842 18.2327 13.9004 17.6633L9.9247 14.7748C9.57421 14.5202 9.09962 14.5202 8.74913 14.7748L4.77339 17.6633C3.98968 18.2327 2.9352 17.4666 3.23455 16.5453L4.75314 11.8716C4.88702 11.4595 4.74036 11.0082 4.38987 10.7535L0.414135 7.86497C-0.369579 7.29557 0.0331967 6.05596 1.00192 6.05596H5.9162C6.34943 6.05596 6.73339 5.777 6.86726 5.36497L8.38586 0.691212Z" fill="currentColor"/>
</svg></button>
        <button type="button" class="rating-star" data-rating-star="3"><svg width="19" height="18" viewBox="0 0 19 18" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M8.38586 0.691212C8.68521 -0.230099 9.98862 -0.2301 10.288 0.691211L11.8066 5.36497C11.9404 5.777 12.3244 6.05596 12.7576 6.05596H17.6719C18.6406 6.05596 19.0434 7.29557 18.2597 7.86497L14.284 10.7535C13.9335 11.0082 13.7868 11.4595 13.9207 11.8716L15.4393 16.5453C15.7386 17.4666 14.6842 18.2327 13.9004 17.6633L9.9247 14.7748C9.57421 14.5202 9.09962 14.5202 8.74913 14.7748L4.77339 17.6633C3.98968 18.2327 2.9352 17.4666 3.23455 16.5453L4.75314 11.8716C4.88702 11.4595 4.74036 11.0082 4.38987 10.7535L0.414135 7.86497C-0.369579 7.29557 0.0331967 6.05596 1.00192 6.05596H5.9162C6.34943 6.05596 6.73339 5.777 6.86726 5.36497L8.38586 0.691212Z" fill="currentColor"/>
</svg></button>
        <button type="button" class="rating-star" data-rating-star="4"><svg width="19" height="18" viewBox="0 0 19 18" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M8.38586 0.691212C8.68521 -0.230099 9.98862 -0.2301 10.288 0.691211L11.8066 5.36497C11.9404 5.777 12.3244 6.05596 12.7576 6.05596H17.6719C18.6406 6.05596 19.0434 7.29557 18.2597 7.86497L14.284 10.7535C13.9335 11.0082 13.7868 11.4595 13.9207 11.8716L15.4393 16.5453C15.7386 17.4666 14.6842 18.2327 13.9004 17.6633L9.9247 14.7748C9.57421 14.5202 9.09962 14.5202 8.74913 14.7748L4.77339 17.6633C3.98968 18.2327 2.9352 17.4666 3.23455 16.5453L4.75314 11.8716C4.88702 11.4595 4.74036 11.0082 4.38987 10.7535L0.414135 7.86497C-0.369579 7.29557 0.0331967 6.05596 1.00192 6.05596H5.9162C6.34943 6.05596 6.73339 5.777 6.86726 5.36497L8.38586 0.691212Z" fill="currentColor"/>
</svg></button>
        <button type="button" class="rating-star" data-rating-star="5"><svg width="19" height="18" viewBox="0 0 19 18" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M8.38586 0.691212C8.68521 -0.230099 9.98862 -0.2301 10.288 0.691211L11.8066 5.36497C11.9404 5.777 12.3244 6.05596 12.7576 6.05596H17.6719C18.6406 6.05596 19.0434 7.29557 18.2597 7.86497L14.284 10.7535C13.9335 11.0082 13.7868 11.4595 13.9207 11.8716L15.4393 16.5453C15.7386 17.4666 14.6842 18.2327 13.9004 17.6633L9.9247 14.7748C9.57421 14.5202 9.09962 14.5202 8.74913 14.7748L4.77339 17.6633C3.98968 18.2327 2.9352 17.4666 3.23455 16.5453L4.75314 11.8716C4.88702 11.4595 4.74036 11.0082 4.38987 10.7535L0.414135 7.86497C-0.369579 7.29557 0.0331967 6.05596 1.00192 6.05596H5.9162C6.34943 6.05596 6.73339 5.777 6.86726 5.36497L8.38586 0.691212Z" fill="currentColor"/>
</svg></button>
      </div>
      <label class="rating-field">
        
        <input type="email" name="email" placeholder="Email" required />
      </label>
      <label class="rating-field">
        
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
          <button type="button" class="btn-fav" data-fav-btn>${favouritesButtonText} 
          <svg width="19" height="17" viewBox="0 0 19 17" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M16.8261 2.09319C16.4004 1.66736 15.8951 1.32956 15.3389 1.09909C14.7827 0.868623 14.1865 0.75 13.5844 0.75C12.9823 0.75 12.3862 0.868623 11.8299 1.09909C11.2737 1.32956 10.7684 1.66736 10.3427 2.09319L9.45941 2.97652L8.57607 2.09319C7.71633 1.23344 6.55027 0.750446 5.33441 0.750446C4.11855 0.750446 2.95249 1.23344 2.09274 2.09319C1.233 2.95293 0.75 4.11899 0.75 5.33485C0.75 6.55072 1.233 7.71678 2.09274 8.57652L2.97607 9.45986L9.45941 15.9432L15.9427 9.45986L16.8261 8.57652C17.2519 8.15089 17.5897 7.64553 17.8202 7.08932C18.0506 6.5331 18.1693 5.93693 18.1693 5.33485C18.1693 4.73278 18.0506 4.13661 17.8202 3.58039C17.5897 3.02418 17.2519 2.51882 16.8261 2.09319Z" stroke="#242424" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
</svg></button>
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
