export const BASE_URL =
  import.meta.env.VITE_API_BASE_URL || 'https://your-energy.b.goit.study/api';

export const REQUEST_TIMEOUT_MS = Number(
  import.meta.env.VITE_API_TIMEOUT_MS || 10000
);

export const STORAGE_KEYS = {
  quote: 'your-energy-quote',
  favorites: 'your-energy-favorites',
};
