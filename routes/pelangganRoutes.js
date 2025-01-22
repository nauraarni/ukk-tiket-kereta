const express = require('express');
const pelangganController = require('../controllers/pelangganController');
const router = express.Router();
const authenticateUser = require('../middleware/isUser')

// Create Pelanggan
router.post('/', authenticateUser, pelangganController.createPelanggan);
router.get('/', authenticateUser, pelangganController.getPelanggan);
router.put('/:id', authenticateUser, pelangganController.updatePelanggan);
router.delete('/:id', authenticateUser, pelangganController.deletePelanggan);

module.exports = router;