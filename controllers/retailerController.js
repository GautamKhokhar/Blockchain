const Retailer = require('../models/retailer');

// Save retailer data
exports.saveRetailerData = async (req, res) => {
  try {
    const {
      shipmentId,
      productName,
      sender,
      status,
      blockchainTxHash
    } = req.body;

    console.log('Received retailer data:', req.body);

    // Check if record already exists for this shipment
    const existingRecord = await Retailer.findOne({ shipmentId });

    if (existingRecord) {
      // UPDATE existing record
      existingRecord.status = status || existingRecord.status;
      existingRecord.blockchainTxHash = blockchainTxHash || existingRecord.blockchainTxHash;
      
      await existingRecord.save();
      console.log('Retailer data updated successfully');
    } else {
      // CREATE new record
      const newRecord = new Retailer({
        shipmentId,
        productName,
        sender,
        status,
        blockchainTxHash
      });

      await newRecord.save();
      console.log('Retailer data saved successfully');
    }

    res.status(201).json({
      success: true,
      message: 'Retailer data processed successfully'
    });
  } catch (error) {
    console.error('Error saving retailer data:', error);
    res.status(500).json({
      success: false,
      message: 'Error saving retailer data',
      error: error.message
    });
  }
};