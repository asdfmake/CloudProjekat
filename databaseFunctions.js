import sqlite3 from 'sqlite3';

const database = sqlite3.verbose();
const db = new database.Database(':memory:');

db.run(`CREATE TABLE users (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT NOT NULL,
                email TEXT UNIQUE,
                created_at DATETIME DEFAULT CURRENT_TIMESTAMP
            );`);
db.run(`CREATE TABLE tasks (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            user_id INTEGER,
            title TEXT NOT NULL,
            description TEXT,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (user_id) REFERENCES users(id)
        );`);
            
export const createUser = (name, email) => {
    return new Promise((resolve, reject) => {
        const stmt = db.prepare("INSERT INTO users (name, email) VALUES (?, ?)");
        stmt.run(name, email, function(err) {
            if (err) {
                reject(err);
            } else {
                resolve(this.lastID);
            }
        });
        stmt.finalize();
    });
}

export const createTask = (userId, title, description) => {
    return new Promise((resolve, reject) => {
        const stmt = db.prepare("INSERT INTO tasks (user_id, title, description) VALUES (?, ?, ?)");
        stmt.run(userId, title, description, function(err) {
            if (err) {
                reject(err);
            } else {
                resolve(this.lastID);
            }
        });
        stmt.finalize();
    });
}

export const getAllUsers = () => {
    return new Promise((resolve, reject) => {
        db.all("SELECT * FROM users", [], (err, rows) => {
            if (err) {
                reject(err);
            } else {
                resolve(rows);
            }
        });
    });
}

export const getAllTasks = () => {
  return new Promise((resolve, reject) => {
    db.all("SELECT * FROM tasks", [], (err, rows) => {
      if (err) {
        reject(err);
      } else {

        const promises = rows.map(row => {
          return new Promise((res, rej) => {
            db.get("SELECT * FROM users WHERE id = ?", [row.user_id], (err, user) => {
              if (err) {
                rej(err);
              } else {
                row.user = user; 
                res(row);
              }
            });
          });
        });

        Promise.all(promises)
          .then(results => resolve(results))
          .catch(error => reject(error));
      }
    });
  });
};

export const deleteTask = (taskId) => {
    return new Promise((resolve, reject) => {
        const stmt = db.prepare("DELETE FROM tasks WHERE id = ?");
        stmt.run(taskId, function(err) {
            if (err) {
                reject(err);
            } else {
                resolve(this.changes);
            }
        });
        stmt.finalize();
    });
}