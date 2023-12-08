import React, { useState } from 'react';
import { View, Text, Alert } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Background from '../components/Background'
import Logo from '../components/Logo'
import Header from '../components/Header'
import Button from '../components/Button'
import TextInput from '../components/TextInput'
import BackButton from '../components/BackButton'

import { REACT_APP_API_URL } from '@env';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleLogin = async () => {
    try {
      // Validaciones básicas antes de realizar la solicitud
      if (!email.trim() || !password.trim()) {
        setErrorMessage('Por favor, complete todos los campos.');
        return;
      }

      // Validación de formato de correo electrónico
      if (!isValidEmail(email)) {
        setErrorMessage('Ingrese un correo electrónico válido.');
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
        setErrorMessage(error.response.data.message);
      } else {
        // Si no, muestra un mensaje genérico
        setErrorMessage('Hubo un problema al iniciar sesión. Por favor, inténtalo de nuevo.');
      }
    }
  };

  // Función para validar el formato del correo electrónico
  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  return (
    <Background>
      <BackButton goBack={navigation.goBack} />
      <Logo />
      <Header>Bienvenido.</Header>
      <TextInput
        placeholder="Correo electrónico"
        value={email}
        onChangeText={(text) => {
          setEmail(text);
          setEmailError('');
          setErrorMessage('');
        }}
        keyboardType="email-address"
        autoCapitalize="none"
        error={!!emailError}
        errorText={emailError}
      />
      <TextInput
        placeholder="Contraseña"
        value={password}
        onChangeText={(text) => {
          setPassword(text);
          setPasswordError('');
          setErrorMessage('');
        }}
        secureTextEntry
        error={!!passwordError}
        errorText={passwordError}
      />
      <Button mode="contained" onPress={handleLogin}>
        Iniciar Sesión
      </Button>
      {errorMessage ? (
        <View style={{ marginTop: 10 }}>
          <Text style={{ color: 'red' }}>{errorMessage}</Text>
        </View>
      ) : null}
    </Background>
  );
};

export default LoginScreen;
