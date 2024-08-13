// const { sql } = require('../config/db');
// console.log('We are in Query controller')

// const executeQuery = async (req, res) => {
//   console.log(req)
//   const query = req.body.query;
  
//   if (!query) {
//     return res.status(400).send({ error: 'No query provided' });
//   }

//   try {
//     const result = await new sql.Request().query(query);
//     res.json(result.recordset);
//   } catch (err) {
//     console.error('Error executing query:', err);
//     res.status(500).send(err);
//   }
// };

// module.exports = {
//   executeQuery
// };

// // controllers/queryController.js
// const { queryDataService } = require('../services/query_services');

// const QueryDB = async (req, res) => {
//   try {
//     const query = req.body.query; // Extract the query object from the request body

//     if (!query || typeof query !== 'object') {
//       return res.status(400).json({ error: "Invalid query provided" });
//     }

//     const result = await queryDataService(query);
//     res.status(200).json({ message: 'Query successful!', data: result });
//   } catch (err) {
//     res.status(500).json({ error: 'Failed to execute query', details: err.message });
//   }
// };

// module.exports = { QueryDB };



// controllers/queryController.js
const { queryDataService } = require('../services/query_services');

const QueryDB = async (req, res) => {
  try {
    const { collectionName, query, projection } = req.body; // Destructure the required fields

    // Validate input
    if (!collectionName || typeof collectionName !== 'string') {
      return res.status(400).json({ error: "Invalid or missing 'collectionName'" });
    }

    const queryObject = {
      collectionName: collectionName,
      query: query || {}, // Default to an empty query if not provided
      projection: projection || {} // Default to an empty projection if not provided
    };

    const result = await queryDataService(queryObject);
    res.status(200).json({ message: 'Query successful!', data: result });
  } catch (err) {
    res.status(500).json({ error: 'Failed to execute query', details: err.message });
  }
};

module.exports = { QueryDB };
