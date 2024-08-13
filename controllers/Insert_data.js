// // // controllers/Insert_data.js
// // const { insertDataService } = require('../services/insertDataService');

// // const Insertdata = async (req, res) => {
// //   try {
// //     const data = req.body; // Assume the incoming data is in 'data' key
// //     if (!data || !Array.isArray(data)) {
// //       return res.status(400).json({ error: "Invalid input: 'data' should be an array of objects." });
// //     }

// //     const result = await insertDataService(data);
// //     res.status(200).json({ message: 'Data added successfully!', insertedCount: result.insertedCount });
// //   } catch (err) {
// //     res.status(500).json({ error: 'Failed to add data', details: err.message });
// //   }
// // };

// // module.exports = { Insertdata };



// const { insertDataService } = require('../services/insertData');

// const Insertdata = async (req, res) => {
//   try {
//     const { collectionName, data } = req.body; // Extract both collectionName and data from the request body

//     if (!collectionName) {
//       return res.status(400).json({ error: "Invalid input: 'collectionName' is required." });
//     }

//     if (!data || !Array.isArray(data)) {
//       return res.status(400).json({ error: "Invalid input: 'data' should be an array of objects." });
//     }

//     const result = await insertDataService(collectionName, data);
//     res.status(200).json({ message: 'Data added successfully!', insertedCount: result.insertedCount });
//   } catch (err) {
//     res.status(500).json({ error: 'Failed to add data', details: err.message });
//   }
// };

// module.exports = { Insertdata };



const { insertDataService } = require('../services/insertData');

const Insertdata = async (req, res) => {
  try {
    const { collectionName, data } = req.body;

    if (!collectionName) {
      return res.status(400).json({ error: "Invalid input: 'collectionName' is required." });
    }

    if (!data || !Array.isArray(data)) {
      return res.status(400).json({ error: "Invalid input: 'data' should be an array of objects." });
    }

    const result = await insertDataService(collectionName, data);
    res.status(200).json({ message: 'Data added successfully!', insertedCount: result.insertedCount });
  } catch (err) {
    res.status(500).json({ error: 'Failed to add data', details: err.message });
  }
};

module.exports = { Insertdata };
