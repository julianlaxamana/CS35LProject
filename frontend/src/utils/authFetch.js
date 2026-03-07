const API_BASE = 'http://localhost:5000';

export async function authFetch(endpoint, options = {}) {
  const config = {
    ...options,
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  };

  const res = await fetch(`${API_BASE}${endpoint}`, config);

  // If unauthorized, clear auth state and redirect
  if (res.status === 401) {
    localStorage.removeItem('userID');
    window.location.href = '/login';
    throw new Error('Session expired. Please log in again.');
  }

  return res;
}
