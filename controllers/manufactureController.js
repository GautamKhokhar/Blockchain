const Manufacturer = require('../models/manufacture');

// Save or update manufacturer data
exports.saveManufacturerData = async (req, res) => {
  try {
    const {
      shipmentId,
      productName,
      sender,
      receiver,
      status,
      blockchainTxHash
    } = req.body;

    console.log('Received manufacturer data:', req.body);

    // Check if record already exists for this shipment
    const existingRecord = await Manufacturer.findOne({ shipmentId });

    if (existingRecord) {
      // UPDATE existing record - add receiver address
      existingRecord.receiver = receiver || existingRecord.receiver;
      existingRecord.status = status || existingRecord.status;
      existingRecord.blockchainTxHash = blockchainTxHash || existingRecord.blockchainTxHash;
      
      await existingRecord.save();
      console.log('Manufacturer data updated successfully');
    } else {
      // CREATE new record - receiver can be empty initially
      const newRecord = new Manufacturer({
        shipmentId,
        productName,
        sender,
        receiver: receiver || '', // Empty if not provided
        status,
        blockchainTxHash
      });

      await newRecord.save();
      console.log('Manufacturer data saved successfully');
    }

    res.status(201).json({
      success: true,
      message: 'Manufacturer data processed successfully'
    });
  } catch (error) {
    console.error('Error saving manufacturer data:', error);
    res.status(500).json({
      success: false,
      message: 'Error saving manufacturer data',
      error: error.message
    });
  }
};