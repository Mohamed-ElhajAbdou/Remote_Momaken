
// controllers/authController.js
const { signupService, loginService } = require('../services/auth_services');

const signup = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ error: 'Username and password are required' });
    }

    const userExists = await signupService(username, password);
    if (userExists) {
      return res.status(409).json({ message: 'User already exists' });
    }

    res.status(201).json({ message: 'User registered successfully!' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to register user', details: err.message });
  }
};

const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ error: 'Username and password are required' });
    }

    const result = await loginService(username, password);
    if (!result) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const { user, token } = result;

    res.status(200).json({ message: 'Login successful!', token, user });
  } catch (err) {
    res.status(500).json({ error: 'Failed to login', details: err.message });
  }
};


module.exports = { signup, login };
