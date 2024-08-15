const express = require('express');
const router = express.Router();
const { signup, login } = require('../controllers/authController');
const { authenticateToken } = require('../middleware/authMiddleware');

router.get('/protected-route', authenticateToken, (req, res) => {
  res.json({ message: 'This is a protected route', user: req.user });
});

router.post('/signup', signup);
router.post('/login', login);

module.exports = router;
