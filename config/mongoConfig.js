// config/mongoConfig.js
const { MongoClient } = require('mongodb');

const connectDB = async () => {
  const uri = 'mongodb+srv://Mohamed:Test%4012345@cluster0.u4juk.mongodb.net/myDatabase?retryWrites=true&w=majority&appName=Cluster0';

  // const client = new MongoClient(uri);

  const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 30000, // Increase timeout to 30 seconds
    socketTimeoutMS: 45000,          // Increase socket timeout to 45 seconds
  });
  
  try {
    await client.connect();
    console.log('Connected to MongoDB');
    return client.db(); // returns the database instance
  } catch (err) {
    console.error('MongoDB connection failed:', err);
    process.exit(1);
  }
};

module.exports = { connectDB };
