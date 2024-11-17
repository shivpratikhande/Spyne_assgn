// server.js
const express = require('express');
const cors = require('cors');
const connectDb = require('./db');
const carRoutes = require('./routes/carRoutes');
require('dotenv').config();
const authRoutes = require('./routes/authRoutes'); 

require('./cloudinary'); 

const app = express();
const port = process.env.PORT || 3000;

connectDb();

// Middleware
app.use(express.json());
app.use(cors());

app.use('/api/auth', authRoutes);

app.use('/api', carRoutes);

// Start the server
app.listen(port, '0.0.0.0', () => {
  console.log(`Server is running on port ${port}`);
});