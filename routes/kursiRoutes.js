const express = require('express');
const router = express.Router();
const kursiController = require('../controllers/kursiController');

router.post('/', kursiController.createKursi);
router.get('/', kursiController.getAllKursis);
router.get('/:id_gerbong', kursiController.getKursiByIdGerbong);
router.put('/:id_gerbong', kursiController.updateKursi);
router.delete('/:id_gerbong', kursiController.deleteKursi);

module.exports = router;