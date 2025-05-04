const express = require('express');
const router = express.Router();
const pembelianController = require('../controllers/pembelianController');
const { authenticateUser, authorizeAdmin } = require('../middleware/authMiddleware');

router.get('/:id_jadwal', pembelianController.cekKursi);
router.get('/:id_pembelian_tiket/pdf', pembelianController.cetakPDFById);
router.get('/history/:tanggal', authenticateUser, pembelianController.getHistoryPembelianByDate);
router.get('/history/bulan/:year/:month', authenticateUser, authorizeAdmin, pembelianController.getHistoryPembelianByMonth);
router.get('/history/pelanggan/:id_pelanggan', authenticateUser, pembelianController.getHistoryPembelianByPelangganId);
router.get('/rekap/bulan/:year/:month', authenticateUser, authorizeAdmin, pembelianController.getRekapPemasukanPerMonth);
router.post('/', pembelianController.orderTiket);

module.exports = router;
