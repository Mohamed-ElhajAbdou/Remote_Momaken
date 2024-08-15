// services/authService.js
const { connectDB } = require('../config/mongoConfig');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const JWT_SECRET='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEyMzQ1Njc4OTAiLCJ1c2VybmFtZSI6ImpvaG5kb2UifQ.s3cr3tK3y'
const signupService = async (username, password) => {
  const db = await connectDB();
  const collection = db.collection('users');

  // Check if the user already exists
  const existingUser = await collection.findOne({ username });
  if (existingUser) {
    return true; // User already exists
  }

  // Hash the password before storing it
  const hashedPassword = await bcrypt.hash(password, 10);

  // Insert the new user
  await collection.insertOne({ username, password: hashedPassword });
  return false;
};


const loginService = async (username, password) => {
  const db = await connectDB();
  const collection = db.collection('users');

  // Find the user
  const user = await collection.findOne({ username });
  if (!user) {
    return null; // User not found
  }

  // Compare the password
  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    return null; // Passwords do not match
  }
console.log(process.env.JWT_SECRET)
  // Generate JWT token
  const token = jwt.sign(
    { id: user._id, username: user.username },
    JWT_SECRET,
    { expiresIn: '1h' } // Token expires in 1 hour
  );

  return { user, token }; // Return user and token
};


module.exports = { signupService, loginService };
