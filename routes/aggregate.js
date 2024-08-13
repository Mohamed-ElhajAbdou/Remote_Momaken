// routes/aggregateRoutes.js
const express = require('express');
const { getAggregates } = require('../controllers/aggregateController');

const router = express.Router();

// Route to calculate aggregates
router.post('/aggregates', getAggregates);

module.exports = router;
