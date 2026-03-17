export const fetchAPI = async (path, method = 'GET', body) => {
  const res = await fetch(`http://localhost:5000${path}`, {
    method,
    headers: { 'Content-Type': 'application/json' },
    body: body ? JSON.stringify(body) : undefined
  });
  return res.json();
};