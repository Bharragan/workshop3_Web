/**
 * Pantalla de Detalles del Repositorio.
 *
 * Muestra una lista de commits de un repositorio específico de un usuario, con detalles
 * como el mensaje del commit, el autor y la fecha. Permite al usuario navegar hacia atrás
 * a la pantalla anterior.
 *
 * @component
 *
 * @returns {JSX.Element} - Elemento JSX que representa la pantalla de detalles del repositorio.
 *
 * @example
 * // Ejemplo de uso en una navegación de React Navigation:
 * <Stack.Screen name="RepositoryDetail" component={RepositoryDetailScreen} />
 */

import React, { useState, useEffect } from 'react';
import { View, FlatList } from 'react-native';
import axios from 'axios';
import { useRoute } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Header from '../components/Header';
import Background from '../components/Background';
import CommitItem from '../components/CommitItem';
import BackButton from '../components/BackButton';
import { useNavigation } from '@react-navigation/native';
import { REACT_APP_API_URL } from '@env';

const RepositoryDetailScreen = () => {
  const [commits, setCommits] = useState([]);
  const route = useRoute();
  const { username, repoName } = route.params;
  const navigation = useNavigation();

  useEffect(() => {
    const fetchCommits = async () => {
      try {
        const token = await AsyncStorage.getItem('jwtToken');

        if (!token) {
          navigation.navigate('Welcome');
          return;
        }

        const apiUrl = `${REACT_APP_API_URL}/github/user/${username}/repos/${repoName}/commits`;
        const response = await axios.get(apiUrl, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        // Ordenar commits por fecha de última modificación (de más reciente a más antiguo)
        response.data.sort((a, b) => new Date(b.commit.author.date) - new Date(a.commit.author.date));

        setCommits(response.data);
      } catch (error) {
        console.error('Error al obtener commits:', error);
      }
    };

    fetchCommits();
  }, [username, repoName, navigation]);

  const renderCommitItem = ({ item }) => <CommitItem commit={item} />;

  return (
    <Background>
      <BackButton goBack={navigation.goBack} />
      <Header mode="big">Visualizar commits de un repositorio</Header>
      <FlatList
        data={commits}
        keyExtractor={(item) => item.sha}
        renderItem={renderCommitItem}
      />
    </Background>
  );
};

export default RepositoryDetailScreen;
