const express = require('express');
const router = express.Router();
const authenticateToken = require('../middleware/authMiddleware');
const User = require('../models/user');

// GET user profile
router.get('/', authenticateToken, async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id, {
      attributes: ['firstName', 'lastName', 'email', 'mobile', 'address', 'description']
    });
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json({ user });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch user profile' });
  }
});

// PUT update user profile
router.put('/', authenticateToken, async (req, res) => {
  const { firstName, lastName, mobile, address, description } = req.body;
  try {
    const user = await User.findByPk(req.user.id);
    if (!user) return res.status(404).json({ error: 'User not found' });

    user.firstName = firstName;
    user.lastName = lastName;
    user.mobile = mobile;
    user.address = address;
    user.description = description;

    await user.save();

    res.json({ message: 'Profile updated successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to update profile' });
  }
});

module.exports = router;
