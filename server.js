import express from 'express';
import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import path from 'path';

const app = express();
app.use(express.json());

const dbPromise = open({
  filename: path.join(process.cwd(), 'database.db'),
  driver: sqlite3.Database
});

app.get('/api/stats', async (req, res) => {
  const db = await dbPromise;
  const row = await db.get('SELECT activeCases, weeklyHearings, openTasks, frozenCases FROM stats WHERE id = 1');
  res.json(row || {});
});

app.get('/api/hearings', async (req, res) => {
  const db = await dbPromise;
  const rows = await db.all('SELECT * FROM hearings ORDER BY date');
  res.json(rows);
});

app.get('/api/cases', async (req, res) => {
  const db = await dbPromise;
  const rows = await db.all('SELECT * FROM cases');
  res.json(rows);
});

app.post('/api/cases', async (req, res) => {
  const { appealNumber, appellants, subject, status, nextHearing, type } = req.body;
  const db = await dbPromise;
  const result = await db.run(
    'INSERT INTO cases (appealNumber, appellants, subject, status, nextHearing, type) VALUES (?,?,?,?,?,?)',
    [appealNumber, appellants, subject, status, nextHearing, type]
  );
  res.json({ id: result.lastID });
});

app.get('/api/tasks', async (req, res) => {
  const db = await dbPromise;
  const rows = await db.all('SELECT * FROM tasks');
  res.json(rows);
});

app.get('/api/tasks/urgent', async (req, res) => {
  const db = await dbPromise;
  const rows = await db.all(
    "SELECT title, caseNumber, priority FROM tasks WHERE priority IN ('urgent','high','medium') ORDER BY CASE priority WHEN 'urgent' THEN 1 WHEN 'high' THEN 2 WHEN 'medium' THEN 3 ELSE 4 END LIMIT 3"
  );
  res.json(rows);
});

app.post('/api/tasks', async (req, res) => {
  const { title, description, caseNumber, assignedTo, priority, dueDate } = req.body;
  const db = await dbPromise;
  const result = await db.run(
    'INSERT INTO tasks (title, description, caseNumber, assignedTo, priority, status, dueDate, createdDate) VALUES (?,?,?,?,?,?,?,?)',
    [title, description, caseNumber, assignedTo, priority, 'פתוחה', dueDate, new Date().toISOString().split('T')[0]]
  );
  res.json({ id: result.lastID });
});

app.listen(3001, () => {
  console.log('API server listening on http://localhost:3001');
});
