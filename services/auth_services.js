// services/authService.js
const { connectDB } = require('../config/mongoConfig');
const bcrypt = require('bcrypt');

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

  return user; // Login successful
};

module.exports = { signupService, loginService };
