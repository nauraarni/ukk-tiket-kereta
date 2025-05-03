const express = require('express');
const router = express.Router();
const pembelianController = require('../controllers/pembelianController');
const { authenticateUser, authorizeAdmin } = require('../middleware/authMiddleware');

router.get('/:id_jadwal', pembelianController.cekKursi);
router.get('/:id_pembelian_tiket/pdf', pembelianController.cetakPDFById);
router.get('/history/user/:id_pelanggan', authenticateUser, pembelianController.getHistoryByUser);
router.get('/history/all', authenticateUser, authorizeAdmin, pembelianController.getAllTransactionHistory);
router.post('/', pembelianController.orderTiket);

module.exports = router;
