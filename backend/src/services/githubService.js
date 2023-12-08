/**
 * @fileoverview Servicios para interactuar con la API de GitHub.
 * @module services/githubService
 */

const { Octokit } = require('@octokit/rest');
const dotenv = require('dotenv');

dotenv.config();

// Instancia de Octokit con autenticación utilizando el token de GitHub
const octokit = new Octokit({
  auth: process.env.GIT_SECRET,
});

/**
 * Obtiene la lista de repositorios de un usuario en GitHub.
 * @function
 * @async
 * @param {string} username - Nombre de usuario de GitHub.
 * @returns {Promise<Array>} - Promesa que se resuelve con la lista de repositorios del usuario.
 * @throws {Object} - Objeto de error en caso de fallo en la solicitud.
 */
const getUserRepos = async (username) => {
  try {
    const response = await octokit.request('GET /users/{username}/repos', {
      username,
      headers: {
        'X-GitHub-Api-Version': '2022-11-28',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching user repositories:', error.message);
    throw error;
  }
};

/**
 * Obtiene la lista de commits de un repositorio en GitHub.
 * @function
 * @async
 * @param {string} username - Nombre de usuario de GitHub.
 * @param {string} repoName - Nombre del repositorio.
 * @returns {Promise<Array>} - Promesa que se resuelve con la lista de commits del repositorio.
 * @throws {Object} - Objeto de error en caso de fallo en la solicitud.
 */
const getRepoCommits = async (username, repoName) => {
  try {
    const response = await octokit.repos.listCommits({
      owner: username,
      repo: repoName,
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching repository commits:', error.message);
    throw error;
  }
};

/**
 * Obtiene la información del usuario de GitHub, incluyendo repositorios y commits.
 * @function
 * @async
 * @param {string} username - Nombre de usuario de GitHub.
 * @returns {Promise<Array>} - Promesa que se resuelve con la información del usuario, incluyendo repositorios y commits.
 * @throws {Object} - Objeto de error en caso de fallo en la solicitud.
 */
const getUserInfo = async (username) => {
  try {
    const userRepos = await getUserRepos(username);

    // Obtener commits para cada repositorio
    const reposWithCommits = await Promise.all(
      userRepos.map(async (repo) => {
        const commits = await getRepoCommits(username, repo.name);
        return { ...repo, commits };
      })
    );

    return reposWithCommits;
  } catch (error) {
    console.error('Error fetching user information:', error.message);
    throw error;
  }
};

module.exports = { getUserInfo, getUserRepos, getRepoCommits };
