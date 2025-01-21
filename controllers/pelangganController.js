const { Pelanggan } = require('../models');
const jwt = require('jsonwebtoken');

module.exports = {
  async createPelanggan(req, res) {
    try {
      // Extract token from header
      const token = req.headers.authorization?.split(' ')[1];
      if (!token) {
        return res.status(401).json({ message: 'Token not provided' });
      }

      // Decode the JWT to get the user ID
      const decoded = jwt.verify(token, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJldmVseW4iLCJyb2xlIjoiIiwiaWF0IjoxNzM3MDMyNTY3LCJleHAiOjE3MzcwMzYxNjd9.h8w8ukE6mRBX3mT4MD-rOobr5Prn1N9fwdjfQsDVa-Y');
      const userId = decoded.id;

      // Extract other data from the request body
      const { nik, nama_penumpang, alamat, telp } = req.body;

      // Create a new Pelanggan record
      const newPelanggan = await Pelanggan.create({
        nik,
        nama_penumpang,
        alamat,
        telp,
        id_user: userId,
      });

      return res.status(201).json({
        message: 'Pelanggan created successfully',
        data: newPelanggan,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        message: 'Internal server error',
        error: error.message,
      });
    }
  },

  async getPelanggan(req, res) {
    try {
      const token = req.headers.authorization?.split(' ')[1];
      if (!token) {
        return res.status(401).json({ message: 'Token not provided' });
      }

      // Decode the JWT to get the user ID
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const userId = decoded.id;

      // Retrieve pelanggan data for the logged-in user
      const pelanggan = await Pelanggan.findOne({ where: { id_user: userId } });

      if (!pelanggan) {
        return res.status(404).json({ message: 'Pelanggan not found' });
      }

      return res.status(200).json({
        message: 'Pelanggan retrieved successfully',
        data: pelanggan,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        message: 'Internal server error',
        error: error.message,
      });
    }
  },
};
