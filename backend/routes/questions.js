const express = require('express');
const router = express.Router();
const { executeQuery } = require('../db/connection');

// Add a question to a quiz
router.post('/:quizId', async (req, res) => {
  const { quizId } = req.params;
  const { question_text } = req.body;

  try {
    const result = await executeQuery(
      'INSERT INTO questions (quiz_id, question_text) VALUES (?, ?)',
      [quizId, question_text]
    );
    res.status(201).json({ id: result.insertId, quiz_id: quizId, question_text });
  } catch (err) {
    res.status(500).json({ error: 'Error adding question', message: err.message });
  }
});

// Get questions by quiz
router.get('/:quizId', async (req, res) => {
  try {
    const rows = await executeQuery('SELECT * FROM questions WHERE quiz_id = ?', [req.params.quizId]);
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: 'Error fetching questions', message: err.message });
  }
});

module.exports = router;