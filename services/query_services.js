// services/queryService.js
// // services/queryService.js
// const { connectDB } = require('../config/mongoConfig');

// const queryDataService = async (queryObject) => {
//   const db = await connectDB();

//   // Ensure that the collection name is provided
//   if (!queryObject.collectionName || typeof queryObject.collectionName !== 'string') {
//     throw new Error("Invalid or missing 'collectionName'");
//   }

//   const collection = db.collection(queryObject.collectionName); // Use the provided collection name

//   try {
//     const result = await collection.find(queryObject.query || {}, { projection: queryObject.projection || {} }).toArray();
//     return result;
//   } catch (err) {
//     console.error('Failed to execute query:', err);
//     throw err;
//   }
// };

// module.exports = { queryDataService };


const { connectDB } = require('../config/mongoConfig');

const queryDataService = async (queryObject) => {
  const db = await connectDB();

  // Ensure that the collection name is provided
  if (!queryObject.collectionName || typeof queryObject.collectionName !== 'string') {
    throw new Error("Invalid or missing 'collectionName'");
  }

  const collection = db.collection(queryObject.collectionName); // Use the provided collection name

  try {
    if (queryObject.pipeline && Array.isArray(queryObject.pipeline)) {
      // If pipeline is provided, use aggregation
      const result = await collection.aggregate(queryObject.pipeline).toArray();
      return result;
    } else {
      // Otherwise, use find with query and projection
      const result = await collection.find(queryObject.query || {}, { projection: queryObject.projection || {} }).toArray();
      return result;
    }
  } catch (err) {
    console.error('Failed to execute query:', err);
    throw err;
  }
};

module.exports = { queryDataService };
