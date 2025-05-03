const { Jadwal } = require('../models');

// CREATE: Tambah Jadwal Baru
const createJadwal = async (req, res) => {
  try {
    const { asal_keberangkatan, tujuan_keberangkatan, tanggal_berangkat, tanggal_kedatangan, harga, id_kereta } = req.body;
    const newJadwal = await Jadwal.create({ asal_keberangkatan, tujuan_keberangkatan, tanggal_berangkat, tanggal_kedatangan, harga, id_kereta });

    res.status(201).json({ message: 'Jadwal created successfully', data: newJadwal });
  } catch (error) {
    res.status(500).json({ message: 'Error creating Jadwal', error: error.message });
  }
};

// READ: Ambil Semua Jadwal
const getAllJadwals = async (req, res) => {
  try {
    const jadwals = await Jadwal.findAll();
    res.status(200).json({ data: jadwals });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching Jadwals', error: error.message });
  }
};

// READ: Ambil Jadwal Berdasarkan ID Kereta
const getJadwalByIdKereta = async (req, res) => {
  try {
    const { id_jadwal } = req.params;
    const jadwal = await Jadwal.findOne({ where: { id_jadwal } });

    if (!jadwal) {
      return res.status(404).json({ message: 'Jadwal not found' });
    }

    res.status(200).json({ data: jadwal });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching Jadwal', error: error.message });
  }
};

// UPDATE: Perbarui Jadwal Berdasarkan ID Kereta
const updateJadwal = async (req, res) => {
  try {
    const { id_jadwal } = req.params;
    const { asal_keberangkatan, tujuan_keberangkatan, tanggal_berangkat, tanggal_kedatangan, harga } = req.body;

    const jadwal = await Jadwal.findOne({ where: { id_jadwal } });
    if (!jadwal) {
      return res.status(404).json({ message: 'Jadwal not found' });
    }

    await jadwal.update({ asal_keberangkatan, tujuan_keberangkatan, tanggal_berangkat, tanggal_kedatangan, harga });

    res.status(200).json({ message: 'Jadwal updated successfully', data: jadwal });
  } catch (error) {
    res.status(500).json({ message: 'Error updating Jadwal', error: error.message });
  }
};

// DELETE: Hapus Jadwal Berdasarkan ID Kereta
const deleteJadwal = async (req, res) => {
  try {
    const { id_jadwal } = req.params;
    const jadwal = await Jadwal.findOne({ where: { id_jadwal } });

    if (!jadwal) {
      return res.status(404).json({ message: 'Jadwal not found' });
    }

    await jadwal.destroy();
    res.status(200).json({ message: 'Jadwal deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting Jadwal', error: error.message });
  }
};

module.exports = {
  createJadwal,
  getAllJadwals,
  getJadwalByIdKereta,
  updateJadwal,
  deleteJadwal,
};
