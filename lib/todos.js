import sql from 'better-sqlite3';

let db = null;

function getDatabase() {
  if (!db) {
    const dbPath = process.env.DATABASE_LOCATION;
    if (!dbPath) throw new Error('DATABASE_LOCATION is not set');
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
  const result = getDatabase().prepare('INSERT INTO todos (text) VALUES (?)').run(message);
  return result.changes > 0;
}

export function getTodos() {
  return getDatabase().prepare('SELECT * FROM todos').all();
}

export function deleteTodoById(id) {
  const result = getDatabase().prepare('DELETE FROM todos WHERE id = ?').run(id);
  return result.changes > 0;
}
