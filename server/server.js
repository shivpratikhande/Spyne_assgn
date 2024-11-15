// server.js
const express = require('express');
const cors = require('cors');
const connectDb = require('./db');
const carRoutes = require('./routes/carRoutes');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

connectDb();

app.use(express.json());
app.use(cors());
app.use('/uploads', express.static('uploads')); 

app.use('/api', carRoutes);

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
