const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const { executeQuery } = require('../db/connection');

// Register a new user
router.post('/register', async (req, res) => {
  const { username, password } = req.body;

  try {
    // Check if username already exists
    const existing = await executeQuery('SELECT * FROM users WHERE username = ?', [username]);
    if (existing.length > 0) {
      return res.status(400).json({ error: 'Username already exists' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert user
    const result = await executeQuery(
      'INSERT INTO users (username, password) VALUES (?, ?)',
      [username, hashedPassword]
    );

    res.status(201).json({ id: result.insertId, username });
  } catch (err) {
    res.status(500).json({ error: 'Error registering user', message: err.message });
  }
});

// Login user
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const rows = await executeQuery('SELECT * FROM users WHERE username = ?', [username]);
    if (rows.length === 0) {
      return res.status(400).json({ error: 'Invalid username or password' });
    }

    const user = rows[0];

    // Compare password
    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json({ error: 'Invalid username or password' });

    // For now, just return user info (later you can add JWT)
    res.json({ id: user.id, username: user.username });
  } catch (err) {
    res.status(500).json({ error: 'Error logging in', message: err.message });
  }
});

module.exports = router;