const { Kursi } = require('../models');

// Create a new Kursi
const createKursi = async (req, res) => {
  try {
    const { no_kursi, id_gerbong } = req.body;
    const newKursi = await Kursi.create({ no_kursi, id_gerbong });
    res.status(201).json({
      message: 'Kursi created successfully',
      data: newKursi,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error creating Kursi', error: error.message });
  }
};

// Get all Kursis
const getAllKursis = async (req, res) => {
  try {
    const kursis = await Kursi.findAll();
    res.status(200).json({ data: kursis });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching Kursis', error: error.message });
  }
};

// Get Kursi by ID Gerbong
const getKursiByIdGerbong = async (req, res) => {
  try {
    const { id_gerbong } = req.params;
    const kursi = await Kursi.findAll({ where: { id_gerbong } });

    if (!kursi.length) {
      return res.status(404).json({ message: 'No Kursi found for this Gerbong' });
    }

    res.status(200).json({ data: kursi });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching Kursi', error: error.message });
  }
};

// Update Kursi
const updateKursi = async (req, res) => {
  try {
    const { id_gerbong } = req.params;
    const { no_kursi } = req.body;

    const kursi = await Kursi.findOne({ where: { id_gerbong } });
    if (!kursi) {
      return res.status(404).json({ message: 'Kursi not found' });
    }

    await kursi.update({ no_kursi });

    res.status(200).json({
      message: 'Kursi updated successfully',
      data: kursi,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error updating Kursi', error: error.message });
  }
};

// Delete Kursi
const deleteKursi = async (req, res) => {
  try {
    const { id_gerbong } = req.params;
    const kursi = await Kursi.findOne({ where: { id_gerbong } });

    if (!kursi) {
      return res.status(404).json({ message: 'Kursi not found' });
    }

    await kursi.destroy();
    res.status(200).json({ message: 'Kursi deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting Kursi', error: error.message });
  }
};

module.exports = {
  createKursi,
  getAllKursis,
  getKursiByIdGerbong,
  updateKursi,
  deleteKursi,
};
