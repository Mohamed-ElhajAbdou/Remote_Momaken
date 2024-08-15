// routes/insertDataRoute.js
const express = require('express');
const { Insertdata } = require('../controllers/Insert_data');

const router = express.Router();

// Route to insert data
router.post('/insertdata', Insertdata);

module.exports = router;
