const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const uri = process.env.MONGO_URI; // Ensure MONGO_URI is correctly set in your .env file

    await mongoose.connect(uri); // Removed deprecated options
    console.log('MongoDB connected successfully');
  } catch (err) {
    console.error('Error connecting to MongoDB:', err);
    process.exit(1); // Exit the process with failure
  }
};

module.exports = connectDB;