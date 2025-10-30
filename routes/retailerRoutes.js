const express = require('express');
const router = express.Router();
const retailerController = require('../controllers/retailerController');

// Save retailer data
router.post('/save', retailerController.saveRetailerData);

module.exports = router;