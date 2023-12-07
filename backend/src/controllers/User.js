const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const userController = {
  register: async (req, res) => {
    try {
      const { firstName, lastName, email, password, dateOfBirth } = req.body;

      // Verificar si el usuario ya existe
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: 'El usuario ya está registrado.' });
      }

      // Hash de la contraseña
      const hashedPassword = await bcrypt.hash(password, 10);

      // Crear nuevo usuario
      const newUser = new User({
        firstName,
        lastName,
        email,
        password: hashedPassword,
        dateOfBirth,
      });

      await newUser.save();

      // Después de registrar al usuario, generamos un token JWT y lo enviamos en la respuesta
      const token = generateToken(newUser._id);
      res.status(201).json({ message: 'Usuario registrado exitosamente.', token });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error al registrar usuario.' });
    }
  },

  login: async (req, res) => {
    try {
      const { email, password } = req.body;

      // Verificar si el usuario existe
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(404).json({ message: 'Usuario no encontrado.' });
      }

      // Verificar la contraseña
      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch) {
        return res.status(401).json({ message: 'Contraseña incorrecta.' });
      }

      // Después de verificar la contraseña, generamos un token JWT y lo enviamos en la respuesta
      const token = generateToken(user._id);
      res.status(200).json({ message: 'Inicio de sesión exitoso.', token });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error al iniciar sesión.' });
    }
  },

  protectedRoute: async (req, res) => {
    res.status(200).json({ message: 'Ruta protegida, usuario autenticado.' });
  },
};

// Función para generar un token JWT
function generateToken(userId) {
  return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: '1h' });
}

module.exports = userController;
