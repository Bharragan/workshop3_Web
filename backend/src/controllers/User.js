/**
 * @fileoverview Controladores para manejar las solicitudes relacionadas con usuarios.
 * @module controllers/userController
 */

const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

/**
 * Función para generar un token JWT.
 * @function
 * @param {string} userId - Identificador único del usuario.
 * @returns {string} - Token JWT generado.
 */

function generateToken(userId) {
  return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: "1h" });
}
/**
 * Controladores relacionados con el registro, inicio de sesión y gestión de usuarios.
 * @namespace
 * @property {Function} register - Registra un nuevo usuario.
 * @property {Function} login - Inicia sesión de un usuario.
 * @property {Function} getCurrentUser - Obtiene la información del usuario actual.
 * @property {Function} updateProfile - Actualiza la información del perfil del usuario.
 * @property {Function} getAllUsers - Obtiene la lista de todos los usuarios (sin contraseñas).
 * @property {Function} updateUserPassword - Actualiza la contraseña del usuario.
 * @property {Function} protectedRoute - Ruta protegida, verifica la autenticación del usuario.
 * @property {Function} generateToken - Genera un token JWT.
 */
const userController = {
  /**
   * Registra un nuevo usuario.
   * @function
   * @async
   * @param {Object} req - Objeto de solicitud express.
   * @param {Object} res - Objeto de respuesta express.
   * @returns {Object} - Mensaje de éxito y token JWT.
   * @throws {Object} - Objeto de error en caso de fallo.
   * @route {POST} /api/users/register
   */
  register: async (req, res) => {
    try {
      const { firstName, lastName, email, password, dateOfBirth, rut } =
        req.body;

      // Verificar si el usuario ya existe
      const existingUser = await User.findOne({ $or: [{ email }, { rut }] });
      if (existingUser) {
        return res
          .status(400)
          .json({ message: "El usuario ya está registrado." });
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
      res
        .status(201)
        .json({ message: "Usuario registrado exitosamente.", token });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error al registrar usuario." });
    }
  },
  /**
   * Inicia sesión de un usuario.
   * @function
   * @async
   * @param {Object} req - Objeto de solicitud express.
   * @param {Object} res - Objeto de respuesta express.
   * @returns {Object} - Mensaje de éxito y token JWT.
   * @throws {Object} - Objeto de error en caso de fallo.
   * @route {POST} /api/users/login
   */
  login: async (req, res) => {
    try {
      const { email, password } = req.body;

      // Verificar si el usuario existe
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(404).json({ message: "Usuario no encontrado." });
      }

      // Verificar la contraseña
      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch) {
        return res.status(401).json({ message: "Contraseña incorrecta." });
      }

      // Después de verificar la contraseña, generamos un token JWT y lo enviamos en la respuesta
      const token = generateToken(user._id);
      res.status(200).json({ message: "Inicio de sesión exitoso.", token });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error al iniciar sesión." });
    }
  },
  /**
   * Obtiene la información del usuario actual.
   * @function
   * @async
   * @param {Object} req - Objeto de solicitud express.
   * @param {Object} res - Objeto de respuesta express.
   * @returns {Object} - Información del usuario actual.
   * @throws {Object} - Objeto de error en caso de fallo.
   * @route {GET} /api/users/current-user
   */
  getCurrentUser: async (req, res) => {
    try {
      // Obtén el userId desde el middleware jwtMiddleware
      const userId = req.userId;

      // Busca el usuario por ID
      const user = await User.findById(userId);

      if (!user) {
        return res.status(404).json({ message: "Usuario no encontrado." });
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
      res
        .status(500)
        .json({ message: "Error al obtener información del usuario." });
    }
  },
  /**
   * Actualiza la información del perfil del usuario.
   * @function
   * @async
   * @param {Object} req - Objeto de solicitud express.
   * @param {Object} res - Objeto de respuesta express.
   * @returns {Object} - Mensaje de éxito.
   * @throws {Object} - Objeto de error en caso de fallo.
   * @route {PUT} /api/users/update-profile
   */
  updateProfile: async (req, res) => {
    try {
      const { firstName, lastName, email, dateOfBirth } = req.body;
      const userId = req.userId;

      // Verificar si el usuario existe
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ message: "Usuario no encontrado." });
      }

      // Actualizar la información del usuario
      user.firstName = firstName || user.firstName;
      user.lastName = lastName || user.lastName;
      user.email = email || user.email;
      user.dateOfBirth = dateOfBirth || user.dateOfBirth;

      // Guardar los cambios
      await user.save();

      res
        .status(200)
        .json({ message: "Información del perfil actualizada correctamente." });
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ message: "Error al actualizar información del perfil." });
    }
  },
  /**
   * Obtiene la lista de todos los usuarios (sin contraseñas).
   * @function
   * @async
   * @param {Object} req - Objeto de solicitud express.
   * @param {Object} res - Objeto de respuesta express.
   * @returns {Array} - Lista de usuarios.
   * @throws {Object} - Objeto de error en caso de fallo.
   * @route {GET} /api/users/all-users
   */
  getAllUsers: async (req, res) => {
    try {
      // Obtener todos los usuarios
      const users = await User.find({}, "-password"); // Excluir el campo de contraseña
      res.status(200).json(users);
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ message: "Error al obtener la lista de usuarios." });
    }
  },
  /**
   * Actualiza la contraseña del usuario.
   * @function
   * @async
   * @param {Object} req - Objeto de solicitud express.
   * @param {Object} res - Objeto de respuesta express.
   * @returns {Object} - Mensaje de éxito.
   * @throws {Object} - Objeto de error en caso de fallo.
   * @route {PUT} /api/users/update-password
   */
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

      res.json({ message: "Contraseña actualizada con éxito" });
    } catch (error) {
      console.error("Error al actualizar la contraseña:", error);
      res.status(500).json({ message: "Error interno del servidor" });
    }
  },
  /**
   * Ruta protegida, verifica la autenticación del usuario.
   * @function
   * @param {Object} req - Objeto de solicitud express.
   * @param {Object} res - Objeto de respuesta express.
   * @returns {Object} - Mensaje de éxito.
   * @route {GET} /api/users/protected-route
   */
  protectedRoute: async (req, res) => {
    res.status(200).json({ message: "Ruta protegida, usuario autenticado." });
  },
  /**
   * Genera un token JWT.
   * @function
   * @param {string} userId - Identificador único del usuario.
   * @returns {string} - Token JWT generado.
   */
  generateToken,
};

module.exports = userController;
