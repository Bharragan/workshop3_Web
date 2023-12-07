const express = require('express');
const router = express.Router();
const userController = require('../controllers/User.js');
const jwtMiddleware = require('../middleware/jwtMiddleware');

// Ruta de registro
router.post('/register', userController.register);

// Ruta de inicio de sesión
router.post('/login', userController.login);

// Ejemplo de ruta protegida con JWT
router.get('/protected', jwtMiddleware, (req, res) => {
  res.status(200).json({ message: 'Ruta protegida, usuario autenticado.' });
});

module.exports = router;
