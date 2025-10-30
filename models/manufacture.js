const mongoose = require('mongoose');

const ManufacturerSchema = new mongoose.Schema({
  shipmentId: {
    type: Number,
    required: true,
    unique: true // ADD THIS to ensure only one record per shipment
  },
  productName: {
    type: String,
    required: true
  },
  sender: {
    type: String,
    required: true
  },
  receiver: {
    type: String,
    default: '' // Change to empty string by default
  },
  status: {
    type: String,
    required: true
  },
  blockchainTxHash: {
    type: String,
    required: true
  },
  timestamp: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Manufacturer', ManufacturerSchema);