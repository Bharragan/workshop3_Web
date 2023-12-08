import React, { useState, useEffect } from 'react';
import { View, Text, FlatList } from 'react-native';
import axios from 'axios';
import { useRoute } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Importa AsyncStorage

import { REACT_APP_API_URL } from '@env';


const RepositoryDetailScreen = () => {
  const [commits, setCommits] = useState([]);
  const route = useRoute();
  const { username, repoName } = route.params;

  // Dentro de la función RepositoryDetailScreen
useEffect(() => {
  const fetchCommits = async () => {
    try {
      // Obtén el token almacenado en AsyncStorage
      const token = await AsyncStorage.getItem('jwtToken');

      // Si no hay token, redirige al usuario a la pantalla de inicio de sesión
      if (!token) {
        navigation.navigate('Welcome');
        return;
      }

      const apiUrl = `${REACT_APP_API_URL}/github/user/${username}/repos/${repoName}/commits`;
      const response = await axios.get(apiUrl, {
        headers: {
          Authorization: `Bearer ${token}`, // Añade el token al encabezado
        },
      });

      setCommits(response.data);
    } catch (error) {
      console.error('Error al obtener commits:', error);
    }
  };

  fetchCommits();
}, [username, repoName]);


  const renderCommitItem = ({ item }) => (
    <View>
      <Text>Author: {item.commit.author.name}</Text>
      <Text>Message: {item.commit.message}</Text>
      <Text>Date: {new Date(item.commit.author.date).toLocaleDateString()}</Text>
    </View>
  );

  return (
    <View>
      <Text>Visualizar commits de un repositorio</Text>
      <FlatList
        data={commits}
        keyExtractor={(item) => item.sha}
        renderItem={renderCommitItem}
      />
    </View>
  );
};

export default RepositoryDetailScreen;
