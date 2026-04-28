import axios from 'axios';
import iziToast from 'izitoast';
import { BASE_URL, REQUEST_TIMEOUT_MS } from './constants.js';

const http = axios.create({
  baseURL: BASE_URL,
  timeout: REQUEST_TIMEOUT_MS,
  headers: { 'Content-Type': 'application/json' },
});

http.interceptors.response.use(
  response => response.data,
  error => {
    if (axios.isCancel(error) || error.code === 'ERR_CANCELED') {
      return Promise.reject(error);
    }

    const status = error.response?.status;
    const message =
      error.code === 'ECONNABORTED'
        ? 'Request timed out. Please try again.'
        : status
          ? `Request failed (${status}).`
          : 'Network error. Please check your connection.';

    iziToast.error({ title: 'Error', message, position: 'topRight' });

    return Promise.reject(error);
  }
);

export function getFilters(
  filter = 'Muscles',
  page = 1,
  limit = 12,
  { signal } = {}
) {
  return http.get('/filters', { params: { filter, page, limit }, signal });
}

export function getExercises(params, { signal } = {}) {
  return http.get('/exercises', { params, signal });
}

export function getExerciseById(id, { signal } = {}) {
  return http.get(`/exercises/${id}`, { signal });
}

export function getQuote({ signal } = {}) {
  return http.get('/quote', { signal });
}

export function subscribeUser(email) {
  return http.post('/subscription', { email });
}

export function addRating(id, data) {
  return http.patch(`/exercises/${id}/rating`, data);
}
