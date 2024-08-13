// services/authService.js
const bcrypt = require('bcrypt');
const { connectDB } = require('../config/mongoConfig');

const signupService = async (username, password) => {
  const db = await connectDB();
  const usersCollection = db.collection('users');

  // Check if user already exists
  const existingUser = await usersCollection.findOne({ username });
  if (existingUser) {
    throw new Error('User already exists');
  }

  // Hash the password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Create new user
  const result = await usersCollection.insertOne({
    username,
    password: hashedPassword,
  });

  return result.insertedId;
};

const loginService = async (username, password) => {
  const db = await connectDB();
  const usersCollection = db.collection('users');

  // Check if user exists
  const user = await usersCollection.findOne({ username });
  if (!user) {
    throw new Error('Invalid username or password');
  }

  // Compare the password
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error('Invalid username or password');
  }

  return user; // You can return the user data or token, depending on your needs
};

module.exports = { signupService, loginService };
