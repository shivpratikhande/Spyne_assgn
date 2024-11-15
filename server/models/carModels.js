const mongoose = require('mongoose');

const carSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  tags: {
    type: [String],
    required: true,
  },
  images: {
    type: [String],
    required: true,
  },
});

// Create Car model
const Car = mongoose.model('Car', carSchema);

module.exports = Car;
