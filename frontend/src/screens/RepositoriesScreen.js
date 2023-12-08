import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Background from '../components/Background';
import BackButton from '../components/BackButton';
import Header from '../components/Header';
import RepositoryItem from '../components/RepositoryItem';
import { REACT_APP_API_URL } from '@env';

const RepositoriesScreen = () => {
  const [repos, setRepos] = useState([]);
  const username = 'bharragan';
  const navigation = useNavigation();

  useEffect(() => {
    const fetchRepositories = async () => {
      try {
        const token = await AsyncStorage.getItem('jwtToken');
  
        if (!token) {
          navigation.navigate('Welcome');
          return;
        }
  
        const apiUrl = `${REACT_APP_API_URL}/github/user/${username}/repos`;
        const response = await axios.get(apiUrl, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
  
        const reposWithCommits = await Promise.all(
          response.data.map(async (repo) => {
            const commitsUrl = `${repo.url}/commits`;
            const commitsResponse = await axios.get(commitsUrl);
            const commitCount = commitsResponse.data.length;
  
            return { ...repo, commitCount };
          })
        );
  
        // Ordenar repositorios por fecha de última modificación (de más reciente a más antiguo)
        reposWithCommits.sort((a, b) => new Date(b.pushed_at) - new Date(a.pushed_at));
  
        setRepos(reposWithCommits);
      } catch (error) {
        console.error('Error al obtener repositorios:', error);
      }
    };
  
    fetchRepositories();
  }, [username]);
  

  const handleRepositoryPress = (repoName) => {
    navigation.navigate('RepositoryDetail', { username, repoName });
  };

  const renderRepositoryItem = ({ item }) => (
    <TouchableOpacity onPress={() => handleRepositoryPress(item.name)}>
      <RepositoryItem repo={item} />
    </TouchableOpacity>
  );

  return (
    <Background>
      <BackButton goBack={navigation.goBack} />
      <Header mode="big">Repositorios de {username}</Header>

      <FlatList
        data={repos}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderRepositoryItem}
      />
    </Background>
  );
};

export default RepositoriesScreen;
