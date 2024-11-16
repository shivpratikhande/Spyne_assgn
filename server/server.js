// server.js
const express = require('express');
const cors = require('cors');
const connectDb = require('./db');
const carRoutes = require('./routes/carRoutes');
require('dotenv').config();

// Import Cloudinary config (make sure cloudinaryConfig.js is in place)
require('./cloudinary'); // You just need to ensure it's initialized

const app = express();
const port = process.env.PORT || 3000;

// Connect to the database
connectDb();

// Middleware
app.use(express.json());
app.use(cors());
// No need to serve 'uploads' directory anymore, because Cloudinary handles image storage

// API Routes
app.use('/api', carRoutes);

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
