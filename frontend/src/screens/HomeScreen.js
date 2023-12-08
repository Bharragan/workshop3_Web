/**
 * Pantalla de Inicio (Home).
 *
 * Representa la pantalla principal de la aplicación después de que el usuario ha iniciado sesión.
 * Proporciona accesos directos a otras funciones, como ver repositorios, editar información de perfil,
 * cambiar contraseña y cerrar sesión.
 *
 * @component
 *
 * @param {Object} props - Propiedades de la pantalla.
 * @param {Object} props.navigation - Objeto de navegación que permite la transición entre pantallas.
 *
 * @returns {JSX.Element} - Elemento JSX que representa la pantalla de inicio.
 *
 * @example
 * // Ejemplo de uso en una navegación de React Navigation:
 * <Stack.Screen name="Home" component={HomeScreen} />
 */

import React, { useEffect } from 'react';
import { View, Text } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Logo from '../components/Logo';
import Header from '../components/Header';
import Background from '../components/Background'
import Paragraph from '../components/Paragraph';
import Button from '../components/Button';



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
  const goToChangePass = () => {
    // Navegar a la pantalla de repositorios
    navigation.navigate('ChangePassword');
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
    <Background>
      <Logo />
      <Header>Mobile Hub</Header>
      <Paragraph>
        Bienvenido a casa!
      </Paragraph>
      <Button
        mode="contained"
        onPress={goToRepositories}
      >
      Ver Repositorios
      </Button>
      <Button
        mode="outlined"
        onPress={goToEditInfo}
      >
      Editar Información
      </Button>
      <Button
        mode="contained"
        onPress={goToChangePass}
      >
      Actualizar contraseña
      </Button>
      <Button
        mode="outlined"
        onPress={handleLogout}
      >
      Cerrar Sesión
      </Button>
    </Background>
  );
};

export default HomeScreen;
