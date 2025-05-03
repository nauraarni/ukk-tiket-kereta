const jwt = require('jsonwebtoken');
const { User } = require('../models');

// Middleware untuk verifikasi token
const authenticateUser = async (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: 'Access denied. No token provided.' });
  }

  try {
    const decoded = jwt.verify(token.replace('Bearer ', ''), process.env.JWT_SECRET);
    const user = await User.findByPk(decoded.id);

    if (!user) {
      return res.status(401).json({ message: 'Invalid token. User not found.' });
    }

    req.user = user; // Simpan user di request
    next();
  } catch (error) {
    res.status(401).json({ message: 'Invalid token.', error: error.message });
  }
};

// Middleware untuk izin khusus admin
const authorizeAdmin = async (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: 'Access denied. No token provided.' });
  }

  try {
    const decoded = jwt.verify(token.replace('Bearer ', ''), process.env.JWT_SECRET);
    const user = await User.findByPk(decoded.id);

    if (!user) {
      return res.status(401).json({ message: 'Invalid token. User not found.' });
    }

    req.user = user; // Simpan user di request
    
  } catch (error) {
    res.status(401).json({ message: 'Invalid token.', error: error.message });
  }

  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Access denied. Admins only.' });
  }
  next();
};

module.exports = { authenticateUser, authorizeAdmin };
