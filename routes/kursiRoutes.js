const express = require('express');
const router = express.Router();
const kursiController = require('../controllers/kursiController');
const { authorizeAdmin } = require('../middleware/authMiddleware');

router.post('/', authorizeAdmin, kursiController.createKursi);
router.get('/', kursiController.getAllKursis);
router.get('/:id_gerbong', kursiController.getKursiByIdGerbong);
router.put('/:id_gerbong', authorizeAdmin, kursiController.updateKursi);
router.delete('/:id_gerbong', authorizeAdmin, kursiController.deleteKursi);

module.exports = router;