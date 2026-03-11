const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export const fetchAPI = async (endpoint, method = 'GET', body) => {
  const options = {
    method,
    headers: { 'Content-Type': 'application/json' },
    body: body ? JSON.stringify(body) : undefined,
  };
  const res = await fetch(`${API_URL}${endpoint}`, options);
  return res.json();
};