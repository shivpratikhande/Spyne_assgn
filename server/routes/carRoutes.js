// routes/carRoutes.js
const express = require('express');
const multer = require('multer');
const cloudinary = require('../cloudinary'); // Import Cloudinary config
const carController = require('../controller/carController');
const auth = require('../middleware/middleware');

const router = express.Router();

// Use memory storage instead of disk storage for multer
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post('/cars',  upload.array('images', 10), carController.createCar); // Handle multiple image uploads

router.get('/cars',   carController.getCars);

router.get('/cars/:id',   carController.getCarById);

router.put('/cars/:id', carController.updateCar);

router.delete('/cars/:id', carController.deleteCar);

module.exports = router;
