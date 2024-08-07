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


const express = require('express');
const bodyParser = require('body-parser');
const { connectDB } = require('./config/db');
const queryRoutes = require('./routes/query');
const authRoutes = require('./routes/auth');
const aggregateRoutes = require('./routes/aggregate');

const app = express();

// Middleware to parse JSON bodies
app.use(bodyParser.json());

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
