const { executeQuery } = require('../services/db_Mongo_services');

const executeCustomQuery = async (req, res) => {
  console.log('Request received:', req.body);
  const query = req.body; // Directly using the structured query from the request

  if (!query || !query.collection || !query.action) {
    return res.status(400).send({ error: 'Invalid query provided' });
  }

  try {
    const result = await executeQuery(query);
    res.json(result);
  } catch (err) {
    console.error('Error executing query:', err);
    res.status(500).send(err.message);
  }
};

module.exports = {
  executeCustomQuery
};
