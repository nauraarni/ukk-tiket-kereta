const express = require('express');
const router = express.Router();
const gerbongController = require('../controllers/gerbongController');

router.post('/', gerbongController.createGerbong);
router.get('/', gerbongController.getAllGerbongs);
router.get('/:id_kereta', gerbongController.getGerbongById);
router.put('/:id_kereta', gerbongController.updateGerbong);
router.delete('/:id_kereta', gerbongController.deleteGerbong);

module.exports = router;