// routes/queryRoutes.js
const express = require('express');
const { QueryDB } = require('../controllers/queryController');

const router = express.Router();
const { executeCustomQuery } = require('../controllers/queryController');

router.post('/Query_DB', executeCustomQuery);

module.exports = router;
