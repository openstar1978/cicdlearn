import { getToken, isTokenExpired, logout } from 'utils/auth';

const API_URL = import.meta.env.VITE_API_URL || '';

const buildUrl = (url, params) => {
  const target = new URL(`${API_URL}${url}`, window.location.origin);

  Object.entries(params || {}).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') target.searchParams.set(key, value);
  });

  return target.toString();
};

const request = async (url, options = {}) => {
  const token = getToken();

  if (token && isTokenExpired()) {
    logout();
    throw new Error('Token expired');
  }

  const response = await fetch(buildUrl(url, options.params), {
    method: options.method || 'GET',
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token.replace(/^"|"$/g, '')}` }),
      ...(options.headers || {})
    },
    ...(options.body !== undefined && { body: JSON.stringify(options.body) })
  });

  const contentType = response.headers.get('content-type') || '';
  const data = contentType.includes('application/json') ? await response.json() : await response.text();

  if (!response.ok) {
    const error = new Error(data?.message || response.statusText || 'Request failed');
    error.response = { status: response.status, data };
    throw error;
  }

  return { data };
};

const api = {
  get: (url, options) => request(url, options),
  post: (url, body, options) => request(url, { ...options, method: 'POST', body }),
  put: (url, body, options) => request(url, { ...options, method: 'PUT', body }),
  delete: (url, options) => request(url, { ...options, method: 'DELETE' })
};

export default api;
