// controllers/githubController.js
const { getUserInfo, getUserRepos, getRepoCommits } = require('../services/githubService');

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
