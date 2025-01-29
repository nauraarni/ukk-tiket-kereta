const { Pelanggan } = require('../models');

// Create a new pelanggan
const createPelanggan = async (req, res) => {
  const { nik, nama_penumpang, alamat, telp } = req.body;
  const id_user = req.user.id; // Ambil id_user dari JWT melalui middleware

  try {
    const newPelanggan = await Pelanggan.create({
      nik,
      nama_penumpang,
      alamat,
      telp,
      id_user,
    });

    res.status(201).json({
      message: 'Pelanggan created successfully',
      data: newPelanggan,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error creating pelanggan', error: error.message });
  }
};

// Get all pelanggan
const getAllPelanggan = async (req, res) => {
  try {
    const pelanggans = await Pelanggan.findAll(); // Mengambil semua pelanggan
    res.status(200).json({ data: pelanggans });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching pelanggan', error: error.message });
  }
};


// Get all pelanggan for the authenticated user
const getPelangganByUser = async (req, res) => {
  const id_user = req.user.id; // Ambil id_user dari JWT melalui middleware

  try {
    const pelanggans = await Pelanggan.findAll({ where: { id_user } });
    res.status(200).json({ data: pelanggans });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching pelanggan', error: error.message });
  }
};

// Update pelanggan by ID
const updatePelanggan = async (req, res) => {
  const { id_user } = req.params; // ID pelanggan
  const { nik, nama_penumpang, alamat, telp } = req.body;

  try {
    const pelanggan = await Pelanggan.findByPk(id_user);

    if (!pelanggan) {
      return res.status(404).json({ message: 'Pelanggan not found' });
    }

    pelanggan.nik = nik || pelanggan.nik;
    pelanggan.nama_penumpang = nama_penumpang || pelanggan.nama_penumpang;
    pelanggan.alamat = alamat || pelanggan.alamat;
    pelanggan.telp = telp || pelanggan.telp;

    await pelanggan.save();

    res.status(200).json({
      message: 'Pelanggan updated successfully',
      data: pelanggan,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error updating pelanggan', error: error.message });
  }
};

// Delete pelanggan by ID
const deletePelanggan = async (req, res) => {
  const { id } = req.params;
  const id_user = req.user.id; // Ambil id_user dari JWT melalui middleware

  try {
    const pelanggan = await Pelanggan.findByPk(id_user);

    if (!pelanggan) {
      return res.status(404).json({ message: 'Pelanggan not found' });
    }

    await pelanggan.destroy();

    res.status(200).json({ message: 'Pelanggan deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting pelanggan', error: error.message });
  }
};

module.exports = {
  createPelanggan,
  getPelangganByUser,
  updatePelanggan,
  deletePelanggan,
};
