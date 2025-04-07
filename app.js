// app.js
const express = require("express");
const bodyParser = require("body-parser");
const db = require("./db"); // Importar la base de datos

const app = express();
const PORT = 8000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// GET - Todos los estudiantes
app.get("/students", (req, res) => {
  db.all("SELECT * FROM students", [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

// POST - Crear estudiante
app.post("/students", (req, res) => {
  const { firstname, lastname, gender, age } = req.body;
  const sql = `INSERT INTO students (firstname, lastname, gender, age) VALUES (?, ?, ?, ?)`;
  db.run(sql, [firstname, lastname, gender, age], function (err) {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json({ message: "Estudiante creado", id: this.lastID });
  });
});

// GET - Un solo estudiante
app.get("/student/:id", (req, res) => {
  db.get("SELECT * FROM students WHERE id = ?", [req.params.id], (err, row) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!row) return res.status(404).json({ error: "Estudiante no encontrado" });
    res.json(row);
  });
});

// PUT - Actualizar estudiante
app.put("/student/:id", (req, res) => {
  const { firstname, lastname, gender, age } = req.body;
  const sql = `UPDATE students SET firstname = ?, lastname = ?, gender = ?, age = ? WHERE id = ?`;
  db.run(sql, [firstname, lastname, gender, age, req.params.id], function (err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: "Estudiante actualizado", changes: this.changes });
  });
});

// DELETE - Eliminar estudiante
app.delete("/student/:id", (req, res) => {
  db.run("DELETE FROM students WHERE id = ?", [req.params.id], function (err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: "Estudiante eliminado", changes: this.changes });
  });
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
