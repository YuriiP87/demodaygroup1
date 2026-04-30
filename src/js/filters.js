const filterButtons = document.querySelectorAll('[data-filter]');
const searchForm = document.querySelector('[data-search-form]');
const currentCategoryEl = document.querySelector('[data-current-category]');

export const state = {
  filter: 'Muscles',
  category: '',
  keyword: '',
  page: 1,
  limit: 12,
  mode: 'categories',
};

export function initFilters(onFilterChange) {
  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      filterButtons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');

      state.filter = button.dataset.filter;
      state.category = '';
      state.keyword = '';
      state.page = 1;
      state.mode = 'categories';

      searchForm?.classList.add('is-hidden');

      if (currentCategoryEl) {
        currentCategoryEl.textContent = '';
      }

      onFilterChange();
    });
  });
}