// controllers/aggregateController.js
const { connectDB } = require('../config/mongoConfig');
const dfd = require('danfojs-node');

const getAggregates = async (req, res) => {
  console.log('Received request:', req.body);

  const { collectionName, columnName } = req.body;

  if (!collectionName) {
    console.log('Missing required field: collectionName');
    return res.status(400).json({ error: 'Missing required field: collectionName' });
  }

  if (!columnName) {
    console.log('Missing required field: columnName');
    return res.status(400).json({ error: 'Missing required field: columnName' });
  }

  try {
    const db = await connectDB();
    const collection = db.collection(collectionName);

    // Fetch the data from MongoDB
    const result = await collection.find({}, { projection: { [columnName]: 1, _id: 0 } }).toArray();
    console.log('Query result:', result);

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
