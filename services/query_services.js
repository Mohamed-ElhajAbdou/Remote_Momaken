// services/queryService.js
const { connectDB } = require('../config/mongoConfig');

const queryDataService = async (query) => {
  const db = await connectDB();
  console.log(query)
  const collection = db.collection('dataCollection'); // Ensure this is the correct collection name

  try {
    const result = await collection.find(query).toArray(); // Use find() to perform the query
    console.log('result',result)
    return result;
  } catch (err) {
    console.error('Failed to execute query:', err);
    throw err;
  }
};

module.exports = { queryDataService };
