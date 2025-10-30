const express = require('express');
const router = express.Router();
const manufacturerController = require('../controllers/manufactureController');

// Save manufacturer data
router.post('/save', manufacturerController.saveManufacturerData);

module.exports = router;