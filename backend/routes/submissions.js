const express = require('express');
const router = express.Router();
const { executeQuery } = require('../db/connection');

// Submit a quiz
router.post('/:quizId', async (req, res) => {
  const { quizId } = req.params;
  const { user_id, score } = req.body;

  try {
    const result = await executeQuery(
      'INSERT INTO submissions (user_id, quiz_id, score) VALUES (?, ?, ?)',
      [user_id, quizId, score]
    );
    res.status(201).json({ submission_id: result.insertId, user_id, quiz_id: quizId, score });
  } catch (err) {
    res.status(500).json({ error: 'Error submitting quiz', message: err.message });
  }
});

// Get submissions for a user
router.get('/user/:userId', async (req, res) => {
  try {
    const rows = await executeQuery('SELECT * FROM submissions WHERE user_id = ?', [req.params.userId]);
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: 'Error fetching submissions', message: err.message });
  }
});

module.exports = router;