const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

// Función para generar un token JWT
function generateToken(userId) {
  return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: '1h' });
}

const userController = {
  register: async (req, res) => {
    try {
      const { firstName, lastName, email, password, dateOfBirth, rut } = req.body;

      // Verificar si el usuario ya existe
      const existingUser = await User.findOne({ $or: [{ email }, { rut }] });
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
        rut,
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

  getCurrentUser: async (req, res) => {
    try {
      // Obtén el userId desde el middleware jwtMiddleware
      const userId = req.userId;

      // Busca el usuario por ID
      const user = await User.findById(userId);

      if (!user) {
        return res.status(404).json({ message: 'Usuario no encontrado.' });
      }

      // Devuelve la información del usuario
      res.status(200).json({
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        dateOfBirth: user.dateOfBirth,
        rut: user.rut, // Agregado el campo RUT
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error al obtener información del usuario.' });
    }
  },

  updateProfile: async (req, res) => {
    try {
      const { firstName, lastName, email, dateOfBirth } = req.body;
      const userId = req.userId;

      // Verificar si el usuario existe
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ message: 'Usuario no encontrado.' });
      }

      // Actualizar la información del usuario
      user.firstName = firstName || user.firstName;
      user.lastName = lastName || user.lastName;
      user.email = email || user.email;
      user.dateOfBirth = dateOfBirth || user.dateOfBirth;

      // Guardar los cambios
      await user.save();

      res.status(200).json({ message: 'Información del perfil actualizada correctamente.' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error al actualizar información del perfil.' });
    }
  },

  getAllUsers: async (req, res) => {
    try {
      // Obtener todos los usuarios
      const users = await User.find({}, '-password'); // Excluir el campo de contraseña
      res.status(200).json(users);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error al obtener la lista de usuarios.' });
    }
  },
  
updateUserPassword: async (req, res) => {
  const userId = req.userId;
  const { password } = req.body;

  // Hash de la contraseña
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    // Obtener el usuario desde el token
    const user = await User.findById(userId);

    // Actualizar la contraseña
    user.password = hashedPassword;
    await user.save();

    res.json({ message: 'Contraseña actualizada con éxito' });
  } catch (error) {
    console.error('Error al actualizar la contraseña:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
},

  protectedRoute: async (req, res) => {
    res.status(200).json({ message: 'Ruta protegida, usuario autenticado.' });
  },
  generateToken,
};

module.exports = userController;
