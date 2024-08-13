const { db } = require('../config/mongoConfig'); // Import db connection

const executeQuery = async (query) => {
  try {
    // Assuming `query` is a MongoDB query object { collection: 'collectionName', action: 'find', data: {} }
    const collection = db.collection(query.collection);
    let result;

    switch (query.action) {
      case 'find':
        result = await collection.find(query.data).toArray();
        break;
      case 'insert':
        result = await collection.insertMany(query.data);
        break;
      case 'update':
        result = await collection.updateMany(query.filter, { $set: query.data });
        break;
      case 'delete':
        result = await collection.deleteMany(query.data);
        break;
      default:
        throw new Error('Invalid action');
    }

    return result;
  } catch (err) {
    throw new Error(`Database query failed: ${err.message}`);
  }
};

module.exports = {
  executeQuery
};
