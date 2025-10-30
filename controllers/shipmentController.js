const Shipment = require('../models/Shipment');

// Only create shipment - no other operations
exports.createShipment = async (req, res) => {
  try {
    const { shipmentId, product, sender, receiver, blockHash } = req.body;
    
    // Basic validation
    if (!shipmentId || !product || !sender || !receiver || !blockHash) {
      return res.status(400).json({ 
        error: 'Missing required fields' 
      });
    }

    // Create and save the shipment
    const newShipment = new Shipment({
      shipmentId,
      product,
      sender,
      receiver,
      blockHash,
      status: 'Created'
    });

    await newShipment.save();

    res.status(201).json({ 
      message: 'Shipment saved successfully'
    });
  } catch (error) {
    console.error("Error saving shipment:", error);
    
    // Handle duplicate shipment ID error
    if (error.code === 11000) {
      return res.status(400).json({ 
        error: 'A shipment with this ID already exists.' 
      });
    }
    
    res.status(500).json({ 
      error: 'Server error while saving shipment.' 
    });
  }
};