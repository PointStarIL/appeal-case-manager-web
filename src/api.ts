const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:3001/api';

export const fetchStats = async () => {
  const res = await fetch(`${API_BASE}/stats`);
  return res.json();
};

export const fetchHearings = async () => {
  const res = await fetch(`${API_BASE}/hearings`);
  return res.json();
};

export const fetchUrgentTasks = async () => {
  const res = await fetch(`${API_BASE}/tasks/urgent`);
  return res.json();
};

export const fetchCases = async () => {
  const res = await fetch(`${API_BASE}/cases`);
  return res.json();
};

export const fetchTasks = async () => {
  const res = await fetch(`${API_BASE}/tasks`);
  return res.json();
};

export const createTask = async (data: Record<string, unknown>) => {
  await fetch(`${API_BASE}/tasks`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
};

export const createCase = async (data: Record<string, unknown>) => {
  await fetch(`${API_BASE}/cases`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
};
