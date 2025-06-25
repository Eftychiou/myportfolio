import path from 'path';
import { fileURLToPath } from 'url';
import sql from 'better-sqlite3';

const getDatabase = () => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);

  const dbPath = path.join(__dirname, '..', 'todos.db');
  console.log('dbPath', dbPath);
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
  return result.changes > 0; // Returns true if a row was deleted, false otherwise
}
