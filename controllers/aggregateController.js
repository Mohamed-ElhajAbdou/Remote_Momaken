const { executeQuery } = require('../services/dbService');
const dfd = require('danfojs-node');
const { connectDB } = require('../config/mongoConfig');

const getAggregates = async (req, res) => {
  console.log('Received request:', req.body);

  const { collectionName, columnName } = req.body;

  if (!tableName || !columnName) {
    console.log('Missing required fields');
    return res.status(400).send({ error: 'Missing required fields' });
  }

  try {
    console.log(`Executing query: SELECT ${columnName} FROM ${tableName}`);

    const result = await executeQuery(`SELECT ${columnName} FROM ${tableName}`);
    console.log('Query result:', result);



    // Map the result to extract the values of the specified column
    const data = result.map(row => row[columnName]);
    console.log('Mapped data:', data);

    if (data.length === 0) {
      console.log('No data found');
      return res.status(404).json({ error: 'No data found' });
    }

    // Create a DataFrame from the data array
    console.log('Creating DataFrame');
    const df = new dfd.DataFrame({ [columnName]: data });
    console.log('DataFrame created:', df);

    console.log('Calculating aggregates');
    const aggregates = {
      max: df[columnName].max(),
      min: df[columnName].min(),
      mean: df[columnName].mean(),
      median: df[columnName].median(),
      sum: df[columnName].sum(),
      std: df[columnName].std(),
      variance: df[columnName].var(),
      count: df[columnName].count(),
      unique: df[columnName].unique().length
    };

    console.log('Aggregates calculated:', aggregates);
    res.json(aggregates);
  } catch (err) {
    console.error('Error executing query:', err);
    res.status(500).json({ error: 'Failed to calculate aggregates', details: err.message });
  }
};

module.exports = { getAggregates };
