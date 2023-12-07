const { Octokit } = require('@octokit/rest');
const dotenv = require('dotenv');

dotenv.config();

const octokit = new Octokit({
  auth: process.env.GIT_SECRET,
});

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

module.exports = { getUserInfo, getUserRepos, getRepoCommits};
