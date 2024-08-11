// const express = require('express');
// const bodyParser = require('body-parser');
// const { connectDB } = require('./config/db');
// const queryRoutes = require('./routes/query');

// const app = express();

// // Middleware to parse JSON bodies
// app.use(bodyParser.json());

// // Connect to the database
// connectDB();

// // Routes
// app.use('/api', queryRoutes);

// // Start the server
// const port = process.env.PORT || 5000;
// app.listen(port, () => {
//   console.log(`Server running on port ${port}`);
// });




// const express = require('express');
// const bodyParser = require('body-parser');
// const { connectDB } = require('./config/db');
// const queryRoutes = require('./routes/query');
// const authRoutes = require('./routes/auth');
// const aggregateRoutes = require('./routes/aggregate');

// const app = express();

// // Middleware to parse JSON bodies
// app.use(bodyParser.json());

// // Connect to the database
// connectDB();

// // Routes
// app.use('/api', queryRoutes);
// app.use('/api', authRoutes);
// app.use('/api', aggregateRoutes);

// // Start the server
// const port = process.env.PORT || 5000;
// app.listen(port, () => {
//   console.log(`Server running on port ${port}`);
// });


// const express = require('express');
// const bodyParser = require('body-parser');
// const { connectDB } = require('./config/db');
// const queryRoutes = require('./routes/query');
// const authRoutes = require('./routes/auth');
// const aggregateRoutes = require('./routes/aggregate');

// const app = express();

// // Middleware to parse JSON bodies
// app.use(bodyParser.json());

// // Connect to the database
// connectDB();

// // Routes
// app.use('/api', queryRoutes);
// app.use('/api', authRoutes);
// app.use('/api', aggregateRoutes);

// // Start the server
// const port = process.env.PORT || 5000;
// app.listen(port, () => {
//   console.log(`Server running on port ${port}`);
// });
/////////////////////////////////////////////////////////////
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors'); // Include CORS middleware
const { connectDB } = require('./config/db');
const queryRoutes = require('./routes/query');
const authRoutes = require('./routes/auth');
const aggregateRoutes = require('./routes/aggregate');

const app = express();

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Configure CORS to allow requests from your frontend
app.use(cors({
  origin: 'http://localhost:5173', // Allow requests from the frontend
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Specify allowed methods
  allowedHeaders: ['Content-Type', 'Authorization'], // Specify allowed headers
}));

// Connect to the database
connectDB();

// Routes
app.use('/api', queryRoutes);
app.use('/api', authRoutes);
app.use('/api', aggregateRoutes);

// Start the server
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
