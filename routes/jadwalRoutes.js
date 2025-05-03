const express = require('express');
const router = express.Router();
const jadwalController = require('../controllers/jadwalController');
const { authorizeAdmin } = require('../middleware/authMiddleware');

router.post('/', authorizeAdmin, jadwalController.createJadwal);
router.get('/', jadwalController.getAllJadwals);
router.get('/:id_jadwal', jadwalController.getJadwalByIdKereta);
router.put('/:id_jadwal', authorizeAdmin, jadwalController.updateJadwal);
router.delete('/:id_jadwal', authorizeAdmin, jadwalController.deleteJadwal);

module.exports = router;
