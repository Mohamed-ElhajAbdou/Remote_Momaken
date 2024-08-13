// routes/queryRoutes.js
const express = require('express');
const { QueryDB } = require('../controllers/queryController');

const router = express.Router();

// Route to execute custom MongoDB queries
router.post('/Query_DB', QueryDB);

module.exports = router;
