// require('dotenv').config();
// const { MongoClient } = require('mongodb');
// const { quote_plus } = require('urlencode');

// // URL encode username and password
// const username = quote_plus(process.env.DB_USER_Mongo);
// const password = quote_plus(process.env.DB_PASSWORD_Mongo);

// const uri = `mongodb://${username}:${password}@${process.env.DB_HOST_Mongo}/${process.env.DB_NAME_Mongo}?retryWrites=true&w=majority`;

// const client = new MongoClient(uri, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
//   connectTimeoutMS: 10000, // Optional: Configure connection timeout
//   socketTimeoutMS: 10000,  // Optional: Configure socket timeout
// });

// const connectDB = async () => {
//   try {
//     await client.connect();
//     console.log('Connected to MongoDB');
//     return client.db(); // returns the database instance
//   } catch (err) {
//     console.error('MongoDB connection failed:', err);
//     process.exit(1);
//   }
// };

// module.exports = { client, connectDB };


// require('dotenv').config();
// const { MongoClient } = require('mongodb');

// // URL encode username and password using encodeURIComponent
// // const username = encodeURIComponent(process.env.DB_USER_Mongo);
// // const password = encodeURIComponent(process.env.DB_PASSWORD_Mongo);


// // console.log(username,password)
// // const uri = `mongodb://${username}:${password}@${process.env.DB_HOST_Mongo}/${process.env.DB_NAME_Mongo}?retryWrites=true&w=majority`;


// // URL encode the username and password
// const username = encodeURIComponent(process.env.DB_USER_Mongo);
// const password = encodeURIComponent(process.env.DB_PASSWORD_Mongo);

// // Assemble the MongoDB URI
// // Notice that all options like retryWrites, majority, and appName are included directly in the DB_HOST_Mongo environment variable
// const uri = `mongodb://${username}:${password}@${process.env.DB_HOST_Mongo}/${process.env.DB_NAME_Mongo}`;

// console.log(username,password)


// const client = new MongoClient(uri, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
//   connectTimeoutMS: 10000, // Optional: Configure connection timeout
//   socketTimeoutMS: 10000,  // Optional: Configure socket timeout
// });

// const connectDB = async () => {
//   try {
//     await client.connect();
//     console.log('Connected to MongoDB');
//     return client.db(); // returns the database instance
//   } catch (err) {
//     console.error('MongoDB connection failed:', err);
//     process.exit(1);
//   }
// };

// module.exports = { client, connectDB };


require('dotenv').config();
const { MongoClient } = require('mongodb');

// URL encode the username and password
const username = encodeURIComponent(process.env.DB_USER_Mongo);
const password = encodeURIComponent(process.env.DB_PASSWORD_Mongo);
const host = process.env.DB_HOST_Mongo; // Make sure this does not include 'mongodb://' or credentials
const dbName = process.env.DB_NAME_Mongo; // Ensure this is just the database name without any path

// Assemble the MongoDB URI with the correct mongodb+srv protocol
const uri = `mongodb+srv://${username}:${password}@${host}/${dbName}?retryWrites=true&w=majority&appName=Cluster0`;

console.log("URI:", uri); // Optionally print the URI to debug

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  connectTimeoutMS: 10000, // Optional: Configure connection timeout
  socketTimeoutMS: 10000,  // Optional: Configure socket timeout
});

const connectDB = async () => {
  try {
    await client.connect();
    console.log('Connected to MongoDB');
    const db = client.db(dbName); // Ensure the database name is correctly set
    // Example operations
    // const result = await db.collection('exampleCollection').find({}).toArray();
    // console.log(result);
    return db;
  } catch (err) {
    console.error('MongoDB connection failed:', err);
    process.exit(1);
  }
};

const closeDB = async () => {
  try {
    await client.close();
    console.log('MongoDB connection closed');
  } catch (err) {
    console.error('Failed to close MongoDB connection:', err);
  }
};

module.exports = { connectDB, closeDB };