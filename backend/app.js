require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({ origin: true, credentials: true }));
app.use(express.json());

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/quizzes', require('./routes/quizzes'));
app.use('/api/questions', require('./routes/questions'));
app.use('/api/options', require('./routes/options'));
app.use('/api/submissions', require('./routes/submissions'));
app.use('/api/attempts', require('./routes/attempts'));

// Health check
app.get('/api/health', (_, res) => {
  res.json({ status: 'healthy' });
});

// Global error handler
app.use((err, req, res, next) => {
  res.status(500).json({ error: 'Server error', message: err.message });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});