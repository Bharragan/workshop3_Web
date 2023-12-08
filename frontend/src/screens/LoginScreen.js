import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { REACT_APP_API_URL } from '@env';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      // Validaciones básicas antes de realizar la solicitud
      if (!email.trim() || !password.trim()) {
        Alert.alert('Campos Vacíos', 'Por favor, complete todos los campos.');
        return;
      }

      // Validación de formato de correo electrónico
      if (!isValidEmail(email)) {
        Alert.alert('Correo Electrónico Inválido', 'Ingrese un correo electrónico válido.');
        return;
      }

      const apiUrl = `${REACT_APP_API_URL}/api/users/login`;
      const data = { email, password };

      const response = await axios.post(apiUrl, data);

      // Almacena el token JWT en AsyncStorage
      await AsyncStorage.setItem('jwtToken', response.data.token);

      // Redirige al usuario a la pantalla de inicio (cambiado de 'Home')
      navigation.navigate('Home');
    } catch (error) {
      console.error('Error al iniciar sesión:', error);

      // Maneja errores aquí
      if (error.response && error.response.data && error.response.data.message) {
        // Si hay un mensaje de error proporcionado por el servidor, úsalo
        Alert.alert('Error', error.response.data.message);
      } else {
        // Si no, muestra un mensaje genérico
        Alert.alert('Error', 'Hubo un problema al iniciar sesión. Por favor, inténtalo de nuevo.');
      }
    }
  };

  // Función para validar el formato del correo electrónico
  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  return (
    <View>
      <Text>Iniciar Sesión</Text>
      <TextInput
        placeholder="Correo electrónico"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        placeholder="Contraseña"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button title="Iniciar Sesión" onPress={handleLogin} />
    </View>
  );
};

export default LoginScreen;
