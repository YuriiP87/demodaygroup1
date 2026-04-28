import { BASE_URL } from './constants.js';

async function request(url, options) {
  const response = await fetch(url, options);

  if (!response.ok) {
    throw new Error(`Request failed: ${response.status}`);
  }

  return response.json();
}

export function getFilters(filter = 'Muscles', page = 1, limit = 12) {
  const params = new URLSearchParams({ filter, page, limit });
  return request(`${BASE_URL}/filters?${params}`);
}

export function getExercises(params) {
  const searchParams = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value) searchParams.append(key, value);
  });

  return request(`${BASE_URL}/exercises?${searchParams}`);
}

export function getExerciseById(id) {
  return request(`${BASE_URL}/exercises/${id}`);
}

export function getQuote() {
  return request(`${BASE_URL}/quote`);
}

export function subscribeUser(email) {
  return request(`${BASE_URL}/subscription`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email }),
  });
}

export function addRating(id, data) {
  return request(`${BASE_URL}/exercises/${id}/rating`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
}