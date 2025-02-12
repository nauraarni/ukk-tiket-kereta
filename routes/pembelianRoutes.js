const express = require('express');
const router = express.Router();
const pembelianController = require('../controllers/pembelianController');

router.get('/:id_jadwal', pembelianController.cekKursi);
router.post('/', pembelianController.orderTiket)

module.exports = router;
