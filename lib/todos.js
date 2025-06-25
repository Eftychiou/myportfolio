import path from 'path';
import { fileURLToPath } from 'url';
import sql from 'better-sqlite3';

const getDatabase = () => {
  const dbPath = process.env.DATABASE_LOCATION;

  if (!dbPath) {
    throw new Error('DATABASE_LOCATION environment variable is not set');
  }

  console.log('Using database at:', dbPath);
  const db = new sql(dbPath);
  return db;
};

function initDb() {
  getDatabase().exec(`
    CREATE TABLE IF NOT EXISTS todos (
      id INTEGER PRIMARY KEY, 
      text TEXT
    )`);
}

initDb();

export function addTodo(message) {
  getDatabase().prepare('INSERT INTO todos (text) VALUES (?)').run(message);
}

export function getTodos() {
  return getDatabase().prepare('SELECT * FROM todos').all();
}

export function deleteTodoById(id) {
  const result = getDatabase().prepare('DELETE FROM todos WHERE id = ?').run(id);
  return result.changes > 0;
}
