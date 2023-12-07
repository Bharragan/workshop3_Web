// routes/githubRoutes.js
const express = require('express');
const githubController = require('../controllers/githubController');

const router = express.Router();

// Ruta para obtener información completa de un usuario de GitHub
router.get('/user/:username/info', githubController.getGithubUserInfo);

// Ruta para obtener repositorios de un usuario de GitHub
router.get('/user/:username/repos', githubController.getGithubUserRepos);

// Ruta para obtener commits de un repositorio de GitHub
router.get('/user/:username/repos/:repoName/commits', githubController.getGithubRepoCommits);

module.exports = router;
