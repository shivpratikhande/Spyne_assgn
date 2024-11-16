const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');
const User = require('../models/userModel');  // Create this model later

const router = express.Router();

// Register Route
router.post(
  '/register',
  [
    body('email').isEmail().withMessage('Please enter a valid email'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
  ],
  async (req, res) => {
    // Check validation
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      // Check if user already exists
      const userExists = await User.findOne({ email });
      if (userExists) {
        return res.status(400).json({ msg: 'User already exists' });
      }

      // Hash the password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      // Create a new user
      const newUser = new User({
        email,
        password: hashedPassword,
      });

      await newUser.save();

      // Create and sign JWT token
      const payload = { userId: newUser._id };
      const token = jwt.sign(payload, "shivv", { expiresIn: '1h' });

      res.status(201).json({ token });
    } catch (error) {
      console.error(error);
      res.status(500).json({ msg: 'Server Error' });
    }
  }
);

// Login Route
router.post(
  '/login',
  [
    body('email').isEmail().withMessage('Please enter a valid email'),
    body('password').exists().withMessage('Please enter your password'),
  ],
  async (req, res) => {
    // Check validation
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      // Check if user exists
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ msg: 'Invalid credentials' });
      }

      // Compare entered password with the hashed password
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ msg: 'Invalid credentials' });
      }

      // Create and sign JWT token
      const payload = { userId: user._id };
      const token = jwt.sign(payload, "shivv", { expiresIn: '1h' });

      res.json({ token });
    } catch (error) {
      console.error(error);
      res.status(500).json({ msg: 'Server Error' });
    }
  }
);

module.exports = router;
