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


// const { executeQuery } = require('../services/db_Mongo_services');

// const executeCustomQuery = async (req, res) => {
//   console.log('We are in Query controller');
//   console.log('Request received:', req.body);

//   const query = req.body.query;
  
//   if (!query) {
//     console.log('No query provided');
//     return res.status(400).send({ error: 'No query provided' });
//   }

//   try {
//     console.log('Executing query:', query);
//     const result = await executeQuery(query);
//     console.log('Query result:', result);
//     res.json(result);
//   } catch (err) {
//     console.error('Error executing query:', err);
//     res.status(500).send(err.message);
//   }
// };

// module.exports = {
//   executeCustomQuery
// };


// controllers/queryController.js
const { queryDataService } = require('../services/query_services');

const QueryDB = async (req, res) => {
  try {
    const query = req.body.query; // Extract the query object from the request body

    if (!query || typeof query !== 'object') {
      return res.status(400).json({ error: "Invalid input: 'query' should be an object." });
    }

    const result = await queryDataService(query);
    res.status(200).json({ message: 'Query successful!', data: result });
  } catch (err) {
    res.status(500).json({ error: 'Failed to execute query', details: err.message });
  }
};

module.exports = { QueryDB };