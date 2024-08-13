// // services/insertDataService.js
// const { connectDB } = require('../config/mongoConfig');

// const insertDataService = async (data) => {
//   const db = await connectDB();
//   const collection = db.collection('dataCollection'); // You can change 'dataCollection' to any collection name you want

//   try {
//     const result = await collection.insertMany(data);
//     return result;
//   } catch (err) {
//     console.error('Failed to insert data:', err);
//     throw err;
//   }
// };

// module.exports = { insertDataService };


const { connectDB } = require('../config/mongoConfig');

const insertDataService = async (collectionName, data) => {
  const db = await connectDB();
  const collection = db.collection(collectionName);

  try {
    const result = await collection.insertMany(data); // Expects data to be an array
    return result;
  } catch (err) {
    console.error('Failed to insert data:', err);
    throw err;
  }
};

module.exports = { insertDataService };
