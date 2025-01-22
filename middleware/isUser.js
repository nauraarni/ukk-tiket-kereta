const jwt = require('jsonwebtoken');
require('dotenv').config(); // Untuk memuat variabel dari file .env

const SECRET_KEY = process.env.JWT_SECRET;
const authenticateUser = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({ message: 'No token provided' });
    }

    const token = authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'Token is missing' });
    }
    
    try {
        const decoded = jwt.verify(token, SECRET_KEY); // Verifikasi token
        req.user = decoded; // Menyimpan data pengguna yang terotentikasi
        next(); // Lanjutkan ke middleware/rute berikutnya
    } catch (error) {
        return res.status(403).json({ message: 'Invalid token', error: error.message });
    }
};

module.exports = authenticateUser;
