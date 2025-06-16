import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import path from 'path';

const db = await open({
  filename: path.join(process.cwd(), 'database.db'),
  driver: sqlite3.Database
});

await db.exec(`
CREATE TABLE IF NOT EXISTS stats (
  id INTEGER PRIMARY KEY,
  activeCases INTEGER,
  weeklyHearings INTEGER,
  openTasks INTEGER,
  frozenCases INTEGER
);
CREATE TABLE IF NOT EXISTS hearings (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  date TEXT,
  caseNumber TEXT,
  subject TEXT,
  status TEXT
);
CREATE TABLE IF NOT EXISTS cases (
  id INTEGER PRIMARY KEY,
  appealNumber TEXT,
  appellants TEXT,
  subject TEXT,
  status TEXT,
  nextHearing TEXT,
  type TEXT
);
CREATE TABLE IF NOT EXISTS tasks (
  id INTEGER PRIMARY KEY,
  title TEXT,
  description TEXT,
  caseNumber TEXT,
  assignedTo TEXT,
  priority TEXT,
  status TEXT,
  dueDate TEXT,
  createdDate TEXT
);
`);

await db.run('DELETE FROM stats');
await db.run(`INSERT INTO stats (id, activeCases, weeklyHearings, openTasks, frozenCases) VALUES (1, 45, 8, 12, 3)`);

await db.run('DELETE FROM hearings');
await db.run(`
INSERT INTO hearings (date, caseNumber, subject, status) VALUES
('2025-01-20', '1033/25', 'הרחבת בניין', 'scheduled'),
('2025-01-22', '8034/23', 'היטל השבחה', 'scheduled'),
('2025-01-25', '2156/24', 'תוספת קומה', 'scheduled');
`);

await db.run('DELETE FROM cases');
await db.run(`
INSERT INTO cases (id, appealNumber, appellants, subject, status, nextHearing, type) VALUES
(1, '1033/25', 'גלנסקי ל.', 'הרחבת בניין', 'פעיל', '2025-01-20', 'רישוי'),
(2, '8034/23', 'גולדמן ר.', 'היטל השבחה', 'מוקפא', 'טרם נקבע', 'היטל השבחה'),
(3, '8075/24', 'טור ז.', 'היטל השבחה', 'נסגר', 'הושלם', 'היטל השבחה'),
(4, '2156/24', 'כהן א.', 'תוספת קומה', 'פעיל', '2025-01-25', 'רישוי');
`);

await db.run('DELETE FROM tasks');
await db.run(`
INSERT INTO tasks (id, title, description, caseNumber, assignedTo, priority, status, dueDate, createdDate) VALUES
(1, 'עדכון שמאי מכריע', 'לעדכן פרטי שמאי מכריע בתיק', '8034/23', 'משתמש 1', 'urgent', 'פתוחה', '2025-01-20', '2025-01-15'),
(2, 'שליחת זימון לדיון', 'לשלוח זימון לכל הצדדים לדיון', '1033/25', 'משתמש 2', 'high', 'בטיפול', '2025-01-22', '2025-01-16'),
(3, 'הכנת פרוטוקול', 'להכין פרוטוקול מהדיון הקודם', '8075/24', 'משתמש 1', 'medium', 'הושלמה', '2025-01-18', '2025-01-10'),
(4, 'בדיקת מסמכים', 'לבדוק שלמות המסמכים בתיק', '2156/24', 'משתמש 2', 'low', 'פתוחה', '2025-01-25', '2025-01-17');
`);

await db.close();
console.log('Database seeded.');
