import sql from 'better-sqlite3';
import path from 'path';
import { fileURLToPath } from 'url';

let db = null;

function getDatabase() {
  if (!db) {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);

    const dbPath = path.join(__dirname, '..', 'todos.db');

    if (!dbPath) throw new Error('dbPath is not set');
    db = new sql(dbPath);

    // Initialize only once at runtime
    db.exec(`
      CREATE TABLE IF NOT EXISTS todos (
        id INTEGER PRIMARY KEY, 
        text TEXT
      )
    `);
  }

  return db;
}

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
