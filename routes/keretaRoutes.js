const express = require('express');
const router = express.Router();
const keretaController = require('../controllers/keretaController');
const { authenticateUser, authorizeAdmin } = require('../middleware/authMiddleware');

router.post('/', authenticateUser, authorizeAdmin, keretaController.createKereta);
router.get('/', keretaController.getAllKereta);
router.get('/:id_kereta', keretaController.getKeretaById);
router.put('/:id_kereta', authenticateUser, authorizeAdmin, keretaController.updateKereta);
router.delete('/:id_kereta', authenticateUser, authorizeAdmin, keretaController.deleteKereta);

module.exports = router;
