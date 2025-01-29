const { Kereta } = require('../models');

// Create a new kereta
const createKereta = async (req, res) => {
    const { id_kereta, nama_kereta, deskripsi, kelas } = req.body;
  
    try {
      const newKereta = await Kereta.create({ id_kereta, nama_kereta, deskripsi, kelas });
      res.status(201).json({
        message: 'Kereta created successfully',
        data: newKereta,
      });
    } catch (error) {
      res.status(500).json({ message: 'Error creating kereta', error: error.message });
    }
};
  
// Get all kereta
const getAllKereta = async (req, res) => {
    try {
      const keretas = await Kereta.findAll();
      res.status(200).json({ data: keretas });
    } catch (error) {
      res.status(500).json({ message: 'Error fetching kereta', error: error.message });
    }
};
  
// Get kereta by ID
const getKeretaById = async (req, res) => {
    const { id_kereta } = req.params;
  
    try {
      const kereta = await Kereta.findOne({ where: { id_kereta } });
  
      if (!kereta) {
        return res.status(404).json({ message: 'Kereta not found' });
      }
  
      res.status(200).json({ data: kereta });
    } catch (error) {
      res.status(500).json({ message: 'Error fetching kereta', error: error.message });
    }
};
  
// Update kereta by ID
const updateKereta = async (req, res) => {
    const { id_kereta } = req.params;
    const { nama_kereta, deskripsi, kelas } = req.body;
  
    try {
      const kereta = await Kereta.findOne({ where: { id_kereta } });
  
      if (!kereta) {
        return res.status(404).json({ message: 'Kereta not found' });
      }
  
      kereta.nama_kereta = nama_kereta || kereta.nama_kereta;
      kereta.deskripsi = deskripsi || kereta.deskripsi;
      kereta.kelas = kelas || kereta.kelas;
  
      await kereta.save();
  
      res.status(200).json({
        message: 'Kereta updated successfully',
        data: kereta,
      });
    } catch (error) {
      res.status(500).json({ message: 'Error updating kereta', error: error.message });
    }
};
  
// Delete kereta by ID
const deleteKereta = async (req, res) => {
    const { id_kereta } = req.params;
  
    try {
      const kereta = await Kereta.findOne({ where: { id_kereta } });
  
      if (!kereta) {
        return res.status(404).json({ message: 'Kereta not found' });
      }
  
      await kereta.destroy();
  
      res.status(200).json({ message: 'Kereta deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Error deleting kereta', error: error.message });
    }
};  

module.exports = {
  createKereta,
  getAllKereta,
  getKeretaById,
  updateKereta,
  deleteKereta,
};
