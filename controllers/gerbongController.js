const { Gerbong } = require('../models');

// Create a new Gerbong
const createGerbong = async (req, res) => {
  try {
    const { nama_gerbong, kuota, id_kereta } = req.body;
    const newGerbong = await Gerbong.create({ nama_gerbong, kuota, id_kereta });
    res.status(201).json({
      message: 'Gerbong created successfully',
      data: newGerbong,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error creating Gerbong', error: error.message });
  }
};

// Get all Gerbongs
const getAllGerbongs = async (req, res) => {
  try {
    const gerbongs = await Gerbong.findAll();
    res.status(200).json({ data: gerbongs });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching Gerbongs', error: error.message });
  }
};

// Get Gerbong by ID
const getGerbongById = async (req, res) => {
  try {
    const { id_kereta } = req.params;
    const gerbong = await Gerbong.findOne({ where: { id_kereta } });

    if (!gerbong) {
      return res.status(404).json({ message: 'Gerbong not found' });
    }

    res.status(200).json({ data: gerbong });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching Gerbong', error: error.message });
  }
};

// Update Gerbong
const updateGerbong = async (req, res) => {
  try {
    const { id_kereta } = req.params;
    const { nama_gerbong, kuota } = req.body;

    const gerbong = await Gerbong.findOne({ where: { id_kereta } });
    if (!gerbong) {
      return res.status(404).json({ message: 'Gerbong not found' });
    }

    await gerbong.update({ nama_gerbong, kuota });

    res.status(200).json({
      message: 'Gerbong updated successfully',
      data: gerbong,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error updating Gerbong', error: error.message });
  }
};

// Delete Gerbong
const deleteGerbong = async (req, res) => {
  try {
    const { id_kereta } = req.params;
    const gerbong = await Gerbong.findOne({ where: { id_kereta } });

    if (!gerbong) {
      return res.status(404).json({ message: 'Gerbong not found' });
    }

    await gerbong.destroy();
    res.status(200).json({ message: 'Gerbong deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting Gerbong', error: error.message });
  }
};

module.exports = {
  createGerbong,
  getAllGerbongs,
  getGerbongById,
  updateGerbong,
  deleteGerbong,
};
