const mongoose = require('mongoose');

const TransporterSchema = new mongoose.Schema({
  shipmentId: {
    type: Number,
    required: true,
    unique: true
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
    default: ''
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

module.exports = mongoose.model('Transporter', TransporterSchema);