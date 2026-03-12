const express = require('express');
const router = express.Router();
const { executeQuery } = require('../db/connection');

// Add option to a question
router.post('/:questionId', async (req, res) => {
  const { questionId } = req.params;
  const { option_text, is_correct } = req.body;

  try {
    const result = await executeQuery(
      'INSERT INTO options (question_id, option_text, is_correct) VALUES (?, ?, ?)',
      [questionId, option_text, is_correct]
    );
    res.status(201).json({ id: result.insertId, question_id: questionId, option_text, is_correct });
  } catch (err) {
    res.status(500).json({ error: 'Error adding option', message: err.message });
  }
});

// Get options for a question
router.get('/:questionId', async (req, res) => {
  try {
    const rows = await executeQuery('SELECT * FROM options WHERE question_id = ?', [req.params.questionId]);
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: 'Error fetching options', message: err.message });
  }
});

module.exports = router;