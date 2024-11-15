// db.js
const mongoose = require('mongoose');
require('dotenv').config();

const connectDb = async () => {
  try {
    if (mongoose.connection.readyState >= 1) {
      return;
    }
    await mongoose.connect('mongodb+srv://shivpratikhande2017:nzQFW1uQXrmzMDCD@cluster0.5e3x6.mongodb.net/');
    console.log('MongoDB connected');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

module.exports = connectDb;

//nzQFW1uQXrmzMDCD