// controller/carController.js
const cloudinary = require('../cloudinary'); // Import Cloudinary config
const Car = require('../models/carModels');

// Create a new car
exports.createCar = async (req, res) => {
  try {
    const { title, description, tags } = req.body;
    const imagePromises = req.files.map(async (file) => {
      return new Promise((resolve, reject) => {
        cloudinary.uploader.upload_stream(
          { 
            public_id: `car_images/${Date.now()}`, // Unique identifier for each image
            resource_type: 'auto', // Automatically determine the file type (image or video)
          },
          (error, result) => {
            if (error) {
              reject(error);  // Reject the promise if the upload fails
            } else {
              resolve(result.secure_url); // Resolve with the Cloudinary image URL
            }
          }
        ).end(file.buffer);  // Send the image buffer to Cloudinary
      });
    });

    // Wait for all image uploads to complete
    const imageUrls = await Promise.all(imagePromises);

    const newCar = new Car({
      title,
      description,
      tags,
      images: imageUrls,  // Store Cloudinary URLs of the images
    });

    await newCar.save();
    res.status(201).json(newCar);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to create car' });
  }
};

// Get all cars
exports.getCars = async (req, res) => {
  try {
    const cars = await Car.find();
    res.json(cars);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch cars' });
  }
};

// Get a single car by ID
exports.getCarById = async (req, res) => {
  try {
    const car = await Car.findById(req.params.id);
    if (!car) {
      return res.status(404).json({ error: 'Car not found' });
    }
    res.json(car);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch car' });
  }
};

// Update a car
exports.updateCar = async (req, res) => {
  try {
    const car = await Car.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!car) {
      return res.status(404).json({ error: 'Car not found' });
    }
    res.json(car);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update car' });
  }
};

// Delete a car
exports.deleteCar = async (req, res) => {
  try {
    const car = await Car.findByIdAndDelete(req.params.id);
    if (!car) {
      return res.status(404).json({ error: 'Car not found' });
    }
    res.json({ message: 'Car deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete car' });
  }
};
