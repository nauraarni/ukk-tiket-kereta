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

    const idGerbongList = gerbongs.map((gerbong) => gerbong.id_gerbong);

    if (idGerbongList.some(id => id == null)) {
      return res.status(400).json({ message: 'There is a gerbong with invalid id_gerbong (NULL)' });
    }

    const semuaKursi = await Kursi.findAll({
      where: { id_gerbong: idGerbongList }
    });

    if (semuaKursi.length === 0) {
      return res.status(404).json({ message: 'There are no seats for this schedule' });
    }

    // Ambil daftar pembelian tiket berdasarkan id_jadwal
    const pembelianTiket = await Pembeliantiket.findAll({
      where: { id_jadwal },
      attributes: ['id_pembelian_tiket']
    });

    // Jika tidak ada pembelian tiket, semua kursi tersedia
    if (!pembelianTiket.length) {
      return res.status(200).json({
        message: 'No seats have been reserved. All seats are available!',
        data: semuaKursi.map(kursi => ({
          id_kursi: kursi.id_kursi,
          no_kursi: kursi.no_kursi,
          id_gerbong: kursi.id_gerbong,
        })),
      });
    }

    // Ambil id_pembelian_tiket untuk mencari id_kursi yang sudah dipesan
    const idPembelianList = pembelianTiket.map(p => p.id_pembelian_tiket);

    // Cari id_kursi yang sudah dipesan di Detailpembelian
    const detailPembelian = await Detailpembelian.findAll({
      where: {
        id_pembelian_tiket: idPembelianList
      },
      attributes: ['id_kursi']
    });

    // Buat Set kursi yang sudah dipesan untuk pengecekan lebih cepat
    const kursiDipesanSet = new Set(detailPembelian.map((d) => d.id_kursi));

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
    const hasil = Object.values(gerbongMap);

    res.status(200).json({
      message: 'List of available seats by schedule',
      data: hasil,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error occurred', error: error.message });
  }
};


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

    // Ambil semua id_kursi dari penumpang
const kursiDiminta = penumpang.map(p => p.id_kursi);

// 1. Validasi: Pastikan semua kursi yang diminta memang ada di tabel Kursi
const kursiValid = await Kursi.findAll({
  where: {
    id_kursi: kursiDiminta
  }
});

if (kursiValid.length !== kursiDiminta.length) {
  return res.status(400).json({ message: 'Beberapa kursi tidak valid atau tidak ditemukan' });
}

// 2. Cek apakah ada kursi yang diminta sudah dipesan di jadwal ini
const kursiSudahDipesan = await Detailpembelian.findAll({
  include: [{ model: Pembeliantiket, as: "pembelian_tiket", where: { id_jadwal } }],
  where: {
    id_kursi: kursiDiminta
  },
  attributes: ['id_kursi']
});

if (kursiSudahDipesan.length > 0) {
  const kursiConflict = kursiSudahDipesan.map(k => k.id_kursi);
  return res.status(400).json({
    message: `Kursi dengan ID berikut sudah dipesan: ${kursiConflict}`
  });
}

// 3. Ambil semua kursi yang tersedia dari seluruh gerbong di jadwal ini
let semuaKursiTersedia = [];

for (const gerbong of gerbongs) {
  const kursiGerbong = await Kursi.findAll({ where: { id_gerbong: gerbong.id_gerbong } });

  kursiGerbong.forEach((kursi) => {
    const sudahDipesan = kursiSudahDipesan.some(k => k.id_kursi === kursi.id_kursi);
    if (!sudahDipesan) {
      semuaKursiTersedia.push(kursi);
    }
  });
}

// 4. Validasi: Jumlah kursi tersedia cukup?
if (semuaKursiTersedia.length < penumpang.length) {
  return res.status(400).json({ message: 'Kursi tidak tersedia untuk jumlah penumpang' });
}

    // Buat data pembelian tiket
    const pembelian = await Pembeliantiket.create({
      tanggal_pembelian: new Date(),
      id_pelanggan,
      id_jadwal,
    });
    console.log(pembelian.id_pembelian_tiket);

    // Tambahkan data detail pembelian tiket
    const tiketDibeli = [];

    for (let i = 0; i < penumpang.length; i++) {
      if (!penumpang[i].id_kursi) {
        return res.status(400).json({ message: `Seat ID is required for passenger ${i + 1}` });
      }
    
      const detailTiket = await Detailpembelian.create({
        id_pembelian_tiket: pembelian.id_pembelian_tiket,
        id_kursi: penumpang[i].id_kursi,
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

const PDFDocument = require('pdfkit');

const cetakPDFById = async (req, res) => {
  try {
    const { id_pembelian_tiket } = req.params;

    // Ambil data pembelian tiket
    const pembelian = await Pembeliantiket.findByPk(id_pembelian_tiket);
    if (!pembelian) {
      return res.status(404).json({ message: 'Pembelian tiket tidak ditemukan' });
    }

    // Ambil detail penumpang
    const detailPenumpang = await Detailpembelian.findAll({
      where: { id_pembelian_tiket },
      attributes: ['id_kursi', 'nik', 'nama_penumpang']
    });

    if (!detailPenumpang.length) {
      return res.status(404).json({ message: 'Data penumpang tidak ditemukan' });
    }

    // Generate PDF
    const doc = new PDFDocument();

    res.setHeader('Content-disposition', 'inline; filename="tiket.pdf"');
    res.setHeader('Content-type', 'application/pdf');
    doc.pipe(res);

    // Header Tiket
    doc.fontSize(18).text('E-TIKET KERETA API', { align: 'center' });
    doc.moveDown();
    doc.fontSize(12).text(`ID Pembelian: ${pembelian.id_pembelian_tiket}`);
    doc.text(`Tanggal Pembelian: ${new Date(pembelian.tanggal_pembelian).toLocaleString()}`);
    doc.text(`ID Jadwal: ${pembelian.id_jadwal}`);
    doc.moveDown();

    // Data Penumpang
    doc.fontSize(14).text('Data Penumpang', { underline: true });
    doc.moveDown(0.5);
    detailPenumpang.forEach((p, i) => {
      doc.fontSize(12).text(`${i + 1}. Nama: ${p.nama_penumpang}`);
      doc.text(`   NIK: ${p.nik}`);
      doc.text(`   ID Kursi: ${p.id_kursi}`);
      doc.moveDown(0.5);
    });

    doc.end();

  } catch (error) {
    res.status(500).json({ message: 'Gagal mencetak tiket', error: error.message });
  }
};

const getHistoryByUser = async (req, res) => {
  try {
    const { id_pelanggan } = req.params; // ambil dari parameter

    if (!id_pelanggan) {
      return res.status(400).json({ message: 'id_pelanggan harus diisi di parameter' });
    }

    const history = await Pembeliantiket.findAll({
      where: { id_pelanggan },
      include: [
        {
          model: Detailpembelian,
          as: 'detail_pembelian', // pastikan alias sesuai di model
          attributes: ['id_kursi', 'nik', 'nama_penumpang'],
        },
        {
          model: Jadwal,
          attributes: ['tanggal_berangkat', 'waktu_berangkat'],
        }
      ]
    });

    res.status(200).json({
      message: 'Berhasil mengambil history user',
      data: history
    });
  } catch (error) {
    res.status(500).json({
      message: 'Gagal mengambil history',
      error: error.message
    });
  }
};

const getAllTransactionHistory = async (req, res) => {
  try {
    const { bulan, tahun } = req.query;

    if (!bulan || !tahun) {
      return res.status(400).json({ message: 'Harap sertakan bulan dan tahun' });
    }

    const awal = new Date(tahun, bulan - 1, 1);
    const akhir = new Date(tahun, bulan, 0, 23, 59, 59);

    const history = await Pembeliantiket.findAll({
      where: {
        tanggal_pembelian: {
          [Op.between]: [awal, akhir]
        }
      },
      include: [
        {
          model: Detailpembelian,
          include: [{ model: Kursi }]
        },
        {
          model: Jadwal
        }
      ],
      order: [['tanggal_pembelian', 'DESC']]
    });

    res.status(200).json({
      message: 'Riwayat semua transaksi berhasil diambil',
      data: history
    });
  } catch (err) {
    res.status(500).json({ message: 'Gagal mengambil riwayat transaksi', error: err.message });
  }
};

module.exports = {
  cekKursi,
  orderTiket,
  cetakPDFById,
  getHistoryByUser,
  getAllTransactionHistory
};