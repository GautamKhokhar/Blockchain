const mongoose = require('mongoose');

const ShipmentSchema = new mongoose.Schema({
  shipmentId: { 
    type: Number, 
    required: true, 
    unique: true 
  },
  product: { 
    type: String, 
    required: true 
  },
  sender: { 
    type: String, 
    required: true 
  },
  receiver: { 
    type: String, 
    required: true 
  },
  status: {
    type: String,
    default: 'Created'
  },
  blockHash: { 
    type: String, 
    required: true
  },
  timestamp: { 
    type: Date, 
    default: Date.now 
  }
});

module.exports = mongoose.model('Shipment', ShipmentSchema);