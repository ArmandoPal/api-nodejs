// db.js
const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("students.sqlite", (err) => {
  if (err) return console.error("Error al conectar a SQLite:", err.message);
  console.log("Conectado a la base de datos SQLite");
});

// Crear tabla si no existe
db.run(`CREATE TABLE IF NOT EXISTS students (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  firstname TEXT NOT NULL,
  lastname TEXT NOT NULL,
  gender TEXT NOT NULL,
  age TEXT
)`);

// Exportar la base de datos para usarla en otros archivos
module.exports = db;
