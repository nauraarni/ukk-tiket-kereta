const express = require('express');
const pelangganController = require('../controllers/pelangganController');
const router = express.Router();

// Create Pelanggan
router.post('/', pelangganController.createPelanggan);
router.get('/', pelangganController.getPelanggan);

module.exports = router;