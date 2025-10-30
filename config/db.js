// /backend/config/db.js

const mongoose = require('mongoose');


// Get MongoDB connection URI from environment
const mongoURI = process.env.MONGODB_URL || 'mongodb://127.0.0.1:27017/supplychain';

// Connect to MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB Connected!');
  } catch (error) {
    console.error('MongoDB Connection Error:', error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
