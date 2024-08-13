// const { executeQuery } = require('../services/dbService');
// const dfd = require('danfojs-node');

// const getAggregates = async (req, res) => {
//   console.log('Received request:', req.body);

//   const { tableName, columnName } = req.body;

//   if (!tableName || !columnName) {
//     console.log('Missing required fields');
//     return res.status(400).send({ error: 'Missing required fields' });
//   }

//   try {
//     console.log(`Executing query: SELECT ${columnName} FROM ${tableName}`);

//     const result = await executeQuery(`SELECT ${columnName} FROM ${tableName}`);
//     console.log('Query result:', result);

//     const data = result.map(row => row[columnName]);
//     console.log('Mapped data:', data);

//     console.log('Data length:', data.length);
//     console.log('Data:', data);

//     if (data.length === 0) {
//       console.log('No data found');
//       return res.status(404).send({ error: 'No data found' });
//     }

//     // Create a DataFrame from the data array
//     console.log('Creating DataFrame');
//     const df = new dfd.DataFrame({ [columnName]: data });
//     console.log('DataFrame created:', df);

//     console.log('Calculating aggregates');
//     const aggregates = {
//       max: df[columnName].max(),
//       min: df[columnName].min(),
//       mean: df[columnName].mean(),
//       median: df[columnName].median(),
//       sum: df[columnName].sum(),
//       std: df[columnName].std(),
//       variance: df[columnName].var(),
//       count: df[columnName].count()
//     //   unique: df[columnName].unique().length

//     };

//     console.log('Aggregates calculated:', aggregates);
//     res.json(aggregates);
//   } catch (err) {
//     console.error('Error executing query:', err);
//     res.status(500).send(err.message);
//   }
// };

// module.exports = {
//   getAggregates
// };

/////////////////////////////////////////////////////////////////////
// const { connectDB } = require('../config/mongoConfig');
// const dfd = require('danfojs-node');

// const getAggregates = async (req, res) => {
//   console.log('Received request:', req.body);

//   const { collectionName, columnName } = req.body;
// console.log(collectionName,columnName)
//   // if (!collectionName || !columnName) {
//   //   console.log('Missing required fields');
//   //   return res.status(400).send({ error: 'Missing required fields' });
//   // }

//   if (!collectionName) {
//     console.log('Missing required field: collectionName');
//     return res.status(400).send({ error: 'Missing required field: collectionName' });
//   }

//   if (!columnName) {
//     console.log('Missing required field: columnName');
//     return res.status(400).send({ error: 'Missing required field: columnName' });
//   }
//   try {
//     const db = await connectDB();
//     const collection = db.collection(collectionName);
    
//     // Fetch the data from MongoDB
//     const result = await collection.find({}, { projection: { [columnName]: 1, _id: 0 } }).toArray();
//     console.log('Query result:', result);

//     const data = result.map(row => row[columnName]);
//     console.log('Mapped data:', data);

//     if (data.length === 0) {
//       console.log('No data found');
//       return res.status(404).send({ error: 'No data found' });
//     }

//     // Create a DataFrame from the data array
//     console.log('Creating DataFrame');
//     const df = new dfd.DataFrame({ [columnName]: data });
//     console.log('DataFrame created:', df);

//     console.log('Calculating aggregates');
//     const aggregates = {
//       max: df[columnName].max(),
//       min: df[columnName].min(),
//       mean: df[columnName].mean(),
//       median: df[columnName].median(),
//       sum: df[columnName].sum(),
//       std: df[columnName].std(),
//       variance: df[columnName].var(),
//       count: df[columnName].count(),
//       unique: df[columnName].unique().length
//     };

//     console.log('Aggregates calculated:', aggregates);
//     res.json(aggregates);
//   } catch (err) {
//     console.error('Error executing query:', err);
//     res.status(500).send(err.message);
//   }
// };

// module.exports = {
//   getAggregates
// };



const { queryDataService } = require('../services/query_services');
const dfd = require('danfojs-node');
const { connectDB } = require('../config/mongoConfig');

const getAggregates = async (req, res) => {
  console.log('Received request:', req.body);

  const { collectionName, columnName } = req.body;

  if (!collectionName) {
    console.log('Missing required field: collectionName');
    return res.status(400).send({ error: 'Missing required field: collectionName' });
  }

  if (!columnName) {
    console.log('Missing required field: columnName');
    return res.status(400).send({ error: 'Missing required field: columnName' });
  }

  try {

 

    const db = await connectDB();
    const collections = await db.listCollections().toArray();
    // console.log(collections)
    const collection = db.collection(collectionName);
    // for (const collection of collections) {
    //   console.log(`\nCollection: ${collection.name}`);
      
    //   // Fetch a sample document from the collection to inspect its fields (columns)
    //   const sampleDoc = await db.collection(collection.name).findOne();
      
    //   if (sampleDoc) {
    //     const columns = Object.keys(sampleDoc);
    //     console.log('Columns:', columns.join(', '));
    //   } 
    //   else {
    //     console.log('No documents found in this collection.');
    //   }
    //   console.log('/////////////////////')
    // }

    // Execute the query directly using the MongoDB connection
    const result = await collection.find({}).toArray();

    // console.log('Query result:', result);



    // Map the result to extract the values of the specified column
    const data = result.map(row => row[columnName]);
    console.log('Mapped data:', data);

    if (data.length === 0) {
      console.log('No data found');
      return res.status(404).send({ error: 'No data found' });
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
    res.status(500).send(err.message);
  }
};

module.exports = { getAggregates };
