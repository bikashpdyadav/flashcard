const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
const port = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use((req, res, next) => {
  res.setHeader(
    "Content-Security-Policy",
    "default-src 'self'; font-src 'self' https://flashcard-6yof.onrender.com; script-src 'self'; style-src 'self'; img-src 'self';"
  );
  next();
});

// MySQL Connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "12345",
  database: "flashboard_db",
  port: 3306,
});

db.connect((err) => {
  if (err) {
    console.error("Database connection failed:", err.stack);
    return;
  }
  console.log("Connected to database.");
});

// Get all flashcards
app.get("/flashcards", (req, res) => {
  db.query("SELECT * FROM flashcards", (err, results) => {
    if (err) throw err;
    res.send(results);
  });
});

// Add a new flashcard
app.post("/flashcards", (req, res) => {
  const { question, answer } = req.body;
  db.query(
    "INSERT INTO flashcards (question, answer) VALUES (?, ?)",
    [question, answer],
    (err, result) => {
      if (err) throw err;
      res.send({ id: result.insertId, question, answer });
    }
  );
});

// Update a flashcard
app.put("/flashcards/:id", (req, res) => {
  const { id } = req.params;
  const { question, answer } = req.body;
  db.query(
    "UPDATE flashcards SET question = ?, answer = ? WHERE id = ?",
    [question, answer, id],
    (err, result) => {
      if (err) throw err;
      res.send({ id, question, answer });
    }
  );
});

// Delete a flashcard
app.delete("/flashcards/:id", (req, res) => {
  const { id } = req.params;
  db.query("DELETE FROM flashcards WHERE id = ?", [id], (err, result) => {
    if (err) throw err;
    res.send({ message: "Flashcard deleted." });
  });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
