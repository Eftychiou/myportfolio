import sql from 'better-sqlite3';

const db = new sql('todos.db');

function initDb() {
  db.exec(`
    CREATE TABLE IF NOT EXISTS todos (
      id INTEGER PRIMARY KEY, 
      text TEXT
    )`);
}

initDb();

export function addTodo(message) {
  db.prepare('INSERT INTO todos (text) VALUES (?)').run(message);
}

export function getTodos() {
  return db.prepare('SELECT * FROM todos').all();
}

export function deleteTodoById(id) {
  const result = db.prepare('DELETE FROM todos WHERE id = ?').run(id);
  return result.changes > 0; // Returns true if a row was deleted, false otherwise
}
