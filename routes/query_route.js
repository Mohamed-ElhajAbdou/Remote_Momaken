// routes/queryRoutes.js
const express = require('express');
const { QueryDB } = require('../controllers/queryController');

const router = express.Router();

// Route to query data
router.post('/Query_DB', QueryDB);

module.exports = router;
