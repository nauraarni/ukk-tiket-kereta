const express = require('express');
const pelangganController = require('../controllers/pelangganController');
const router = express.Router();
const authenticateUser = require('../middleware/isUser')

router.post('/', authenticateUser, pelangganController.createPelanggan);
router.get('/', authenticateUser, pelangganController.getPelangganByUser);
router.put('/:id_user', authenticateUser, pelangganController.updatePelanggan);
router.delete('/:id_user', authenticateUser, pelangganController.deletePelanggan);

module.exports = router;