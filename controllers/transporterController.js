const Transporter = require('../models/transporter');

// Save or update transporter data
exports.saveTransporterData = async (req, res) => {
  try {
    const {
      shipmentId,
      productName,
      sender,
      receiver,
      status,
      blockchainTxHash
    } = req.body;

    console.log('Received transporter data:', req.body);

    // Check if record already exists for this shipment
    const existingRecord = await Transporter.findOne({ shipmentId });

    if (existingRecord) {
      // UPDATE existing record - add receiver address
      existingRecord.receiver = receiver || existingRecord.receiver;
      existingRecord.status = status || existingRecord.status;
      existingRecord.blockchainTxHash = blockchainTxHash || existingRecord.blockchainTxHash;
      
      await existingRecord.save();
      console.log('Transporter data updated successfully');
    } else {
      // CREATE new record - receiver can be empty initially
      const newRecord = new Transporter({
        shipmentId,
        productName,
        sender,
        receiver: receiver || '',
        status,
        blockchainTxHash
      });

      await newRecord.save();
      console.log('Transporter data saved successfully');
    }

    res.status(201).json({
      success: true,
      message: 'Transporter data processed successfully'
    });
  } catch (error) {
    console.error('Error saving transporter data:', error);
    res.status(500).json({
      success: false,
      message: 'Error saving transporter data',
      error: error.message
    });
  }
};