/**
 * @fileoverview Middleware para verificar la validez de los tokens JWT.
 * @module middleware/jwtMiddleware
 */

const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

/**
 * Middleware para verificar la validez de los tokens JWT.
 * @function
 * @param {Object} req - Objeto de solicitud express.
 * @param {Object} res - Objeto de respuesta express.
 * @param {Function} next - Función para pasar el control al siguiente middleware/ruta.
 * @throws {Object} - Objeto de error en caso de token inválido o no proporcionado.
 */
function jwtMiddleware(req, res, next) {
  const tokenHeader = req.header('Authorization');

  if (!tokenHeader) {
    return res.status(401).json({ message: 'Acceso no autorizado, token no proporcionado.' });
  }

  try {
    // Elimina la palabra "Bearer " del token
    const token = tokenHeader.replace('Bearer ', '');

    // Verifica la validez del token utilizando la clave secreta
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.userId;
    next();
  } catch (error) {
    console.error(error);
    res.status(401).json({ message: 'Token no válido.' });
  }
}

module.exports = jwtMiddleware;

