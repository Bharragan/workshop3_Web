import React, { useEffect } from 'react';
import { View, Text, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const HomeScreen = ({ navigation }) => {
  useEffect(() => {
    checkToken(); // Verifica el token al cargar la pantalla
  }, []);

  const checkToken = async () => {
    try {
      // Obtén el token JWT almacenado
      const jwtToken = await AsyncStorage.getItem('jwtToken');

      // Si no hay un token, redirige al usuario a la pantalla de bienvenida
      if (!jwtToken) {
        navigation.navigate('Welcome');
      }
    } catch (error) {
      console.error('Error al verificar el token:', error);
      // Maneja errores aquí
    }
  };

  const goToRepositories = () => {
    // Navegar a la pantalla de repositorios
    navigation.navigate('Repositories');
  };

  const goToEditInfo = () => {
    // Navegar a la pantalla de edición de información
    navigation.navigate('EditProfile'); // Asegúrate de que el nombre coincida con la ruta de EditProfileScreen
  };
  
  const handleLogout = async () => {
    try {
      // Elimina el token JWT almacenado
      await AsyncStorage.removeItem('jwtToken');
      // Redirige al usuario a la pantalla de bienvenida u otra pantalla de inicio
      navigation.navigate('Welcome');
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
      // Maneja errores aquí
    }
  };

  return (
    <View>
      <Text>Bienvenido a la pantalla principal</Text>
      <Button title="Ver Repositorios" onPress={goToRepositories} />
      <Button title="Editar Información" onPress={goToEditInfo} />
      <Button title="Cerrar Sesión" onPress={handleLogout} />
    </View>
  );
};

export default HomeScreen;
