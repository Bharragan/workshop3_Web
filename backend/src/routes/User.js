const express = require('express');
const router = express.Router();
const userController = require('../controllers/User.js');
const jwtMiddleware = require('../middleware/jwtMiddleware');

// Ruta de registro
router.post('/register', userController.register);

// Ruta de inicio de sesión
router.post('/login', userController.login);

// Ruta para obtener la información del usuario actual
router.get('/current-user', jwtMiddleware, userController.getCurrentUser);

// Ruta para la actualización de información del usuario
router.put('/update-profile', jwtMiddleware, userController.updateProfile);

// Ruta para obtener la lista de todos los usuarios
router.get('/all-users', userController.getAllUsers);

// Ruta para cambiar la contraseña del usuario
router.put('/change-password', jwtMiddleware, userController.updateUserPassword);

module.exports = router;
