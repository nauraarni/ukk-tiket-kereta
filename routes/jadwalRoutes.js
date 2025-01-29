const express = require('express');
const router = express.Router();
const jadwalController = require('../controllers/jadwalController');

router.post('/', jadwalController.createJadwal);
router.get('/', jadwalController.getAllJadwals);
router.get('/:id_kereta', jadwalController.getJadwalByIdKereta);
router.put('/:id_kereta', jadwalController.updateJadwal);
router.delete('/:id_kereta', jadwalController.deleteJadwal);

module.exports = router;
