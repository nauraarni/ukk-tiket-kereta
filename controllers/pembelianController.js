const { Kursi, Gerbong, Jadwal, Pembeliantiket, Detailpembelian } = require('../models');
const { Op } = require('sequelize');

const cekKursi = async (req, res) => {
  try {
    const { id_jadwal } = req.params;

    // Search jadwal by ID Jadwal
    const jadwal = await Jadwal.findOne({ where: { id_jadwal } });

    if (!jadwal) {
      return res.status(404).json({ message: 'Schedule not found' });
    }

    const gerbongs = await Gerbong.findAll({
      where: { id_kereta: jadwal.id_kereta }
    });
    
    if (gerbongs.length === 0) {
      return res.status(404).json({ message: 'There are no cars for this schedule' });
    }
    
    // Tampilkan data gerbong yang berhasil diambil
    console.log('Data Gerbong:', gerbongs);
    
    // Ambil semua kursi yang tersedia di gerbong-gerbong tersebut
    const idGerbongList = gerbongs.map((gerbong) => gerbong.id_gerbong);
    
    // Cek jika id_gerbong ada dan valid
    if (idGerbongList.some(id => id == null)) {
      return res.status(400).json({ message: 'There is a gerbong with invalid id_gerbong (NULL)' });
    }
    
    const semuaKursi = await Kursi.findAll({
      where: { id_gerbong: idGerbongList }
    });
    
    if (semuaKursi.length === 0) {
      return res.status(404).json({ message: 'There are no seats for this schedule' });
    }
    
    // Tampilkan data kursi yang berhasil diambil
    console.log('Data Kursi:', semuaKursi);    

    // Ambil daftar kursi yang sudah dipesan berdasarkan id_jadwal
    const kursiDipesan = await Pembeliantiket.findAll({
      where: { id_jadwal }
    });

    // Cek apakah ada kursi yang sudah dipesan
    if (!kursiDipesan.length) {
      return res.status(200).json({
        message: 'No seats have been reserved. All seats are available!',
        data: semuaKursi.map(kursi => ({
          id_kursi: kursi.id_kursi,
          no_kursi: kursi.no_kursi,
          id_gerbong: kursi.id_gerbong,
        })),
      });
    }

    // Buat Set kursi yang sudah dipesan untuk pengecekan lebih cepat
    const kursiDipesanSet = new Set(kursiDipesan.map((k) => k.id_kursi));

    // Kelompokkan kursi berdasarkan gerbong
    const gerbongMap = gerbongs.reduce((acc, gerbong) => {
      acc[gerbong.id_gerbong] = {
        nama_gerbong: gerbong.nama_gerbong,
        kuota_total: gerbong.kuota,
        kursi_tersedia: [],
      };
      return acc;
    }, {});

    // Masukkan kursi ke gerbong yang sesuai (yang belum dipesan)
    semuaKursi.forEach((kursi) => {
      if (!kursiDipesanSet.has(kursi.id_kursi)) {
        gerbongMap[kursi.id_gerbong].kursi_tersedia.push(kursi.no_kursi);
      }
    });

    // Convert hasil ke array
    hasil = Object.values(gerbongMap);

    res.status(200).json({
      message: 'List of available seats by schedule',
      data: hasil,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error occurred', error: error.message });
  }
};

module.exports = { cekKursi };

const orderTiket = async (req, res) => {
  try {
    const { id_jadwal, id_pelanggan, penumpang } = req.body; 
    // `penumpang` harus berupa array [{ nik, nama_penumpang }, ...]

    if (!Array.isArray(penumpang) || penumpang.length === 0) {
      return res.status(400).json({ message: "Daftar penumpang harus diisi" });
    }

    // Cek apakah jadwal tersedia
    const jadwal = await Jadwal.findOne({ where: { id_jadwal } });

    if (!jadwal) {
      return res.status(404).json({ message: 'Jadwal tidak ditemukan' });
    }

    // Ambil semua gerbong berdasarkan id_kereta di jadwal
    const gerbongs = await Gerbong.findAll({ where: { id_kereta: jadwal.id_kereta } });

    if (!gerbongs.length) {
      return res.status(404).json({ message: 'Tidak ada gerbong untuk jadwal ini' });
    }

    // Ambil daftar kursi yang sudah dipesan berdasarkan id_jadwal
    const kursiDipesan = await Detailpembelian.findAll({
      include: [{ model: Pembeliantiket, where: { id_jadwal } }],
      attributes: ['id_kursi'],
    });

    const kursiDipesanSet = new Set(kursiDipesan.map((k) => k.id_kursi));

    // Ambil semua kursi yang tersedia
    let semuaKursiTersedia = [];

    for (const gerbong of gerbongs) {
      const kursiGerbong = await Kursi.findAll({ where: { id_gerbong: gerbong.id_gerbong } });

      kursiGerbong.forEach((kursi) => {
        if (!kursiDipesanSet.has(kursi.id_kursi)) {
          semuaKursiTersedia.push(kursi);
        }
      });
    }

    // Cek apakah jumlah kursi tersedia cukup
    if (semuaKursiTersedia.length < penumpang.length) {
      return res.status(400).json({ message: 'Kuota kursi tidak mencukupi untuk jumlah penumpang' });
    }

    // Buat data pembelian tiket
    const pembelian = await Pembeliantiket.create({
      tanggal_pembelian: new Date(),
      id_pelanggan,
      id_jadwal,
    });

    // Tambahkan data detail pembelian tiket
    const tiketDibeli = [];

    for (let i = 0; i < penumpang.length; i++) {
      const kursiDipilih = semuaKursiTersedia[i];

      const detailTiket = await Detailpembelian.create({
        id_pembelian_tiket: pembelian.id_pembelian_tiket,
        id_kursi: kursiDipilih.id_kursi,
        nik: penumpang[i].nik,
        nama_penumpang: penumpang[i].nama_penumpang,
      });

      tiketDibeli.push(detailTiket);
    }

    res.status(201).json({
      message: "Tiket berhasil dipesan",
      data: {
        pembelian,
        detail_pembelian: tiketDibeli
      }
    });

  } catch (error) {
    res.status(500).json({ message: 'Terjadi kesalahan', error: error.message });
  }
};

module.exports = { orderTiket };