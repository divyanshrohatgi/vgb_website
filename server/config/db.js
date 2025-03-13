// server/config/db.js
const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    console.log('Connecting to MongoDB...');
    console.log('MONGO_URI exists:', !!process.env.MONGO_URI);
    
    // Hide sensitive info from logs but show part of the connection string for debugging
    const mongoUriPreview = process.env.MONGO_URI 
      ? `${process.env.MONGO_URI.substring(0, 20)}...${process.env.MONGO_URI.substring(process.env.MONGO_URI.length - 20)}`
      : 'undefined';
    console.log('MONGO_URI preview:', mongoUriPreview);
    
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log(`MongoDB Connected: ${conn.connection.host}`);
    return true;
  } catch (error) {
    console.error(`Error connecting to MongoDB: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;