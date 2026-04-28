const menu = document.querySelector('[data-menu]');
const openBtn = document.querySelector('[data-menu-open]');
const closeBtn = document.querySelector('[data-menu-close]');

openBtn?.addEventListener('click', () => {
  menu?.classList.add('is-open');
  document.body.classList.add('no-scroll');
});

closeBtn?.addEventListener('click', () => {
  menu?.classList.remove('is-open');
  document.body.classList.remove('no-scroll');
});