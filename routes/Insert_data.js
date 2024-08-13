// routes/Insert_data.js
const express = require('express');
const { Insertdata } = require('../controllers/Insert_data'); // Make sure this path is correct

const router = express.Router();

// Route to insert data
router.post('/insertdata', Insertdata);

module.exports = router;
