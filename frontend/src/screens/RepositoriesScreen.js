import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Importa AsyncStorage

import { REACT_APP_API_URL } from '@env';

const RepositoriesScreen = () => {
  const [repos, setRepos] = useState([]);
  const username = 'bharragan'; // Puedes cambiar esto por el username que necesitas
  const navigation = useNavigation();

  useEffect(() => {
    const fetchRepositories = async () => {
      try {
        // Obtén el token almacenado en AsyncStorage
        const token = await AsyncStorage.getItem('jwtToken');

        // Si no hay token, redirige al usuario a la pantalla de inicio de sesión
        if (!token) {
          // Puedes redirigir al usuario a donde prefieras, por ejemplo, la pantalla de inicio
          navigation.navigate('Welcome');
          return;
        }

        const apiUrl = `${REACT_APP_API_URL}/github/user/${username}/repos`;
        const response = await axios.get(apiUrl, {
          headers: {
            Authorization: `Bearer ${token}`, // Añade el token al encabezado
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
      <View>
        <Text>{item.name}</Text>
        <Text>Last Modified: {new Date(item.pushed_at).toLocaleDateString()}</Text>
        <Text>Commits: {item.commitCount}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View>
      <Text>Repositorios de {username}</Text>
      <FlatList
        data={repos}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderRepositoryItem}
      />
    </View>
  );
};

export default RepositoriesScreen;
