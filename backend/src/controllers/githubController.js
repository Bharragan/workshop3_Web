/**
 * @fileoverview Controladores para manejar las solicitudes relacionadas con la integración con GitHub.
 * @module controllers/githubController
 * @requires services/githubService
 */

const { getUserInfo, getUserRepos, getRepoCommits } = require('../services/githubService');

/**
 * Obtiene la información de un usuario de GitHub.
 * @function
 * @async
 * @param {Object} req - Objeto de solicitud express.
 * @param {Object} res - Objeto de respuesta express.
 * @returns {Object} - Información del usuario de GitHub.
 * @throws {Object} - Objeto de error en caso de fallo.
 * @route {GET} /github/user/:username
 */
const getGithubUserInfo = async (req, res) => {
  const { username } = req.params;

  try {
    const userInfo = await getUserInfo(username);
    res.json(userInfo);
  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

/**
 * Obtiene la lista de repositorios de un usuario de GitHub.
 * @function
 * @async
 * @param {Object} req - Objeto de solicitud express.
 * @param {Object} res - Objeto de respuesta express.
 * @returns {Array} - Lista de repositorios del usuario de GitHub.
 * @throws {Object} - Objeto de error en caso de fallo.
 * @route {GET} /github/user/:username/repos
 */
const getGithubUserRepos = async (req, res) => {
  const { username } = req.params;

  try {
    const userRepos = await getUserRepos(username);
    res.json(userRepos);
  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

/**
 * Obtiene la lista de commits de un repositorio de GitHub.
 * @function
 * @async
 * @param {Object} req - Objeto de solicitud express.
 * @param {Object} res - Objeto de respuesta express.
 * @returns {Array} - Lista de commits del repositorio de GitHub.
 * @throws {Object} - Objeto de error en caso de fallo.
 * @route {GET} /github/user/:username/repos/:repoName/commits
 */
const getGithubRepoCommits = async (req, res) => {
  const { username, repoName } = req.params;

  try {
    const repoCommits = await getRepoCommits(username, repoName);
    res.json(repoCommits);
  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = {
  getGithubUserInfo,
  getGithubUserRepos,
  getGithubRepoCommits
};
