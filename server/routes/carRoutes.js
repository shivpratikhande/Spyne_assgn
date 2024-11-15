// routes/carRoutes.js
const express = require('express');
const multer = require('multer');
const carController = require('../controller/carController');

const router = express.Router();

const upload = multer({ dest: 'uploads/' });

router.post('/cars', upload.array('images', 10), carController.createCar);

router.get('/cars', carController.getCars);

router.get('/cars/:id', carController.getCarById);

router.put('/cars/:id', carController.updateCar);

router.delete('/cars/:id', carController.deleteCar);

module.exports = router;
