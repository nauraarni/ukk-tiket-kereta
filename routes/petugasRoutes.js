const express = require('express');
const router = express.Router();
const petugasController = require('../controllers/petugasController');
const authenticateUser = require('../middleware/isUser')

router.post('/', authenticateUser, petugasController.createPetugas);
router.get('/', authenticateUser, petugasController.getAllPetugas);
router.get('/:id_petugas', authenticateUser, petugasController.getPetugasById);
router.put('/:id_petugas', authenticateUser, petugasController.updatePetugas);
router.delete('/:id_petugas', authenticateUser, petugasController.deletePetugas);

module.exports = router;
