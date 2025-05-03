const express = require('express');
const router = express.Router();
const gerbongController = require('../controllers/gerbongController');
const { authorizeAdmin } = require('../middleware/authMiddleware');

router.post('/', authorizeAdmin, gerbongController.createGerbong);
router.get('/', gerbongController.getAllGerbongs);
router.get('/:id_kereta', gerbongController.getGerbongById);
router.put('/:id_kereta', authorizeAdmin, gerbongController.updateGerbong);
router.delete('/:id_kereta', authorizeAdmin, gerbongController.deleteGerbong);

module.exports = router;