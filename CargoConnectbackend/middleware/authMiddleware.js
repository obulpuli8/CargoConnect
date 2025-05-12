const jwt = require('jsonwebtoken');
const User = require('../models/user');  // Adjust path if needed

const authMiddleware = async (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    return res.status(401).json({ message: 'Access denied. No token provided.' });
  }

  try {
    const decoded = jwt.verify(token, 'your_secret_key');  // Make sure to use same secret as in auth.js
    const user = await User.findByPk(decoded.id);

    if (!user) {
      return res.status(401).json({ message: 'Invalid token. User not found.' });
    }

    req.user = user; // Attach user to request object
    next();          // Continue to next middleware or route
  } catch (err) {
    console.error('Auth error:', err.message);
    res.status(400).json({ message: 'Invalid token.' });
  }
};

module.exports = authMiddleware;
