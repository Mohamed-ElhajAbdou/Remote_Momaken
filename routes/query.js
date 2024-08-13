const express = require('express');
const router = express.Router();
const { executeCustomQuery } = require('../controllers/Mongo_queryController');

router.post('/QueryDB_sql', executeCustomQuery);

module.exports = router;
