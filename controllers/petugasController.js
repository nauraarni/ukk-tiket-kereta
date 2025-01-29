const { Petugas } = require('../models');

// Create a new petugas
const createPetugas = async (req, res) => {
  const { nama_petugas, alamat, telp, id_user } = req.body;

  try {
    const newPetugas = await Petugas.create({ nama_petugas, alamat, telp, id_user });
    res.status(201).json({
      message: 'Petugas created successfully',
      data: newPetugas,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error creating petugas', error: error.message });
  }
};

// Get all petugas
const getAllPetugas = async (req, res) => {
  try {
    const petugasList = await Petugas.findAll();
    res.status(200).json({ data: petugasList });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching petugas', error: error.message });
  }
};

// Get petugas by ID
const getPetugasById = async (req, res) => {
  const { id_user } = req.params;

  try {
    const petugas = await Petugas.findByPk(id_user);

    if (!petugas) {
      return res.status(404).json({ message: 'Petugas not found' });
    }

    res.status(200).json({ data: petugas });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching petugas', error: error.message });
  }
};

// Update petugas by ID
const updatePetugas = async (req, res) => {
  const { id_user } = req.params;
  const { nama_petugas, alamat, telp } = req.body;

  try {
    const petugas = await Petugas.findByPk(id_user);

    if (!petugas) {
      return res.status(404).json({ message: 'Petugas not found' });
    }

    petugas.nama_petugas = nama_petugas || petugas.nama_petugas;
    petugas.alamat = alamat || petugas.alamat;
    petugas.telp = telp || petugas.telp;

    await petugas.save();

    res.status(200).json({
      message: 'Petugas updated successfully',
      data: petugas,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error updating petugas', error: error.message });
  }
};

// Delete petugas by ID
const deletePetugas = async (req, res) => {
  const { id_user } = req.params;

  try {
    const petugas = await Petugas.findByPk(id_user);

    if (!petugas) {
      return res.status(404).json({ message: 'Petugas not found' });
    }

    await petugas.destroy();

    res.status(200).json({ message: 'Petugas deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting petugas', error: error.message });
  }
};

module.exports = {
  createPetugas,
  getAllPetugas,
  getPetugasById,
  updatePetugas,
  deletePetugas,
};
