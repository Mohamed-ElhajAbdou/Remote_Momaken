// const { sql } = require('../config/db');
// const bcrypt = require('bcrypt');

// const signup = async (req, res) => {
//   const { userName, email, password } = req.body;
//   if (!userName || !email || !password) {
//     return res.status(400).send({ error: 'Missing required fields' });
//   }

//   try {
//     const hashedPassword = await bcrypt.hash(password, 10);
//     const result = await new sql.Request()
//       .input('UserName', sql.NVarChar, userName)
//       .input('Email', sql.NVarChar, email)
//       .input('PasswordHash', sql.NVarChar, hashedPassword)
//       .query(`
//         INSERT INTO Users (UserName, Email, PasswordHash) 
//         OUTPUT inserted.UserID 
//         VALUES (@UserName, @Email, @PasswordHash)
//       `);

//     res.status(201).send({ message: 'User created successfully', userId: result.recordset[0].UserID });
//   } catch (err) {
//     console.error('Error during signup:', err);
//     res.status(500).send(err);
//   }
// };

// const login = async (req, res) => {
//   const { email, password } = req.body;
//   if (!email || !password) {
//     return res.status(400).send({ error: 'Missing required fields' });
//   }

//   try {
//     const result = await new sql.Request()
//       .input('Email', sql.NVarChar, email)
//       .query('SELECT * FROM Users WHERE Email = @Email');

//     const user = result.recordset[0];
//     if (!user || !await bcrypt.compare(password, user.PasswordHash)) {
//       return res.status(401).send({ error: 'Invalid email or password' });
//     }

//     res.send({ message: 'Login successful', userId: user.UserID });
//   } catch (err) {
//     console.error('Error during login:', err);
//     res.status(500).send(err);
//   }
// };

// module.exports = {
//   signup,
//   login
// };




// controllers/authController.js
const { signupService, loginService } = require('../services/auth_services');

const signup = async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({ error: 'Username and password are required' });
    }

    const userId = await signupService(username, password);
    res.status(201).json({ message: 'User created successfully', userId });
  } catch (err) {
    if (err.message === 'User already exists') {
      return res.status(409).json({ error: 'User already exists' });
    }
    res.status(500).json({ error: 'Failed to create user', details: err.message });
  }
};

const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({ error: 'Username and password are required' });
    }

    const user = await loginService(username, password);
    res.status(200).json({ message: 'Login successful', user });
  } catch (err) {
    res.status(401).json({ error: 'Invalid username or password', details: err.message });
  }
};

module.exports = { signup, login };
