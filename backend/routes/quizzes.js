const express = require('express');
const router = express.Router();
const { executeQuery } = require('../db/connection');

// Create a new quiz
router.post('/', async (req, res) => {
  const { title, description } = req.body;
  try {
    const result = await executeQuery(
      'INSERT INTO quizzes (title, description) VALUES (?, ?)',
      [title, description]
    );
    res.status(201).json({ id: result.insertId, title, description });
  } catch (err) {
    res.status(500).json({ error: 'Error creating quiz', message: err.message });
  }
});

// Get all quizzes
router.get('/', async (req, res) => {
  try {
    const quizzes = await executeQuery('SELECT * FROM quizzes');
    res.json(quizzes);
  } catch (err) {
    res.status(500).json({ error: 'Error fetching quizzes', message: err.message });
  }
});

// Get quiz by ID with questions and options
router.get('/:id', async (req, res) => {
  const quizId = req.params.id;

  try {
    // 1️⃣ Fetch quiz info
    const quizRows = await executeQuery('SELECT * FROM quizzes WHERE id = ?', [quizId]);
    if (quizRows.length === 0) return res.status(404).json({ error: 'Quiz not found' });
    const quiz = quizRows[0];

    // 2️⃣ Fetch questions for this quiz
    const questions = await executeQuery(
      'SELECT id, question_text FROM questions WHERE quiz_id = ?',
      [quizId]
    );

    // 3️⃣ Fetch options for each question
    for (let q of questions) {
      const options = await executeQuery(
        'SELECT id, option_text FROM options WHERE question_id = ?',
        [q.id]
      );
      q.options = options;
    }

    // 4️⃣ Return combined quiz object
    res.json({
      id: quiz.id,
      title: quiz.title,
      description: quiz.description,
      questions
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error fetching quiz', message: err.message });
  }
});

module.exports = router;