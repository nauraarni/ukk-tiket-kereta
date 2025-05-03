const express = require('express');
const pelangganController = require('../controllers/pelangganController');
const router = express.Router();
const authenticateUser = require('../middleware/isUser')

router.post('/', authenticateUser, pelangganController.createPelanggan);
router.get('/getAll', authenticateUser, pelangganController.getAllPelanggan);
router.get('/:id_pelanggan', authenticateUser, pelangganController.getPelangganByUser);
router.put('/:id_pelanggan', authenticateUser, pelangganController.updatePelanggan);
router.delete('/:id_pelanggan', authenticateUser, pelangganController.deletePelanggan);


module.exports = router;