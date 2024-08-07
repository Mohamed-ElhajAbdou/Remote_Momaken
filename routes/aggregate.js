const express = require('express');
const router = express.Router();
const { getAggregates } = require('../controllers/aggregateController');

router.post('/aggregates', getAggregates);

module.exports = router;
