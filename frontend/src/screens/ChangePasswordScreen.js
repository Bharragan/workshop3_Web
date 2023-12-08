/**
 * Pantalla de Cambio de Contraseña.
 *
 * Esta pantalla permite al usuario cambiar su contraseña. Muestra campos para ingresar la nueva
 * contraseña y confirmarla. Realiza validaciones en el lado del cliente y hace una solicitud al
 * servidor para actualizar la contraseña.
 *
 * @component
 *
 * @param {Object} props - Propiedades de la pantalla.
 * @param {Object} props.navigation - Objeto de navegación que permite la transición entre pantallas.
 *
 * @returns {JSX.Element} - Elemento JSX que representa la pantalla de cambio de contraseña.
 *
 * @example
 * // Ejemplo de uso en una navegación de React Navigation:
 * <Stack.Screen name="ChangePassword" component={ChangePasswordScreen} />
 */

import React, { useState } from 'react';
import { View, Alert, Text } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Header from '../components/Header';
import Background from '../components/Background';
import Button from '../components/Button';
import BackButton from '../components/BackButton';
import Logo from '../components/Logo';
import TextInput from '../components/TextInput';
import { REACT_APP_API_URL } from '@env';

const ChangePasswordScreen = ({ navigation }) => {
  const [password, setPassword] = useState({ value: '', error: '' });
  const [confirmPassword, setConfirmPassword] = useState({ value: '', error: '' });

  const handleChangePassword = async () => {
    // Validaciones
    const passwordError = !isValidPassword(password.value)
      ? 'La contraseña debe tener al menos 6 caracteres.'
      : '';
    const confirmPasswordError = password.value !== confirmPassword.value
      ? 'Las contraseñas no coinciden.'
      : '';

    setPassword({ ...password, error: passwordError });
    setConfirmPassword({ ...confirmPassword, error: confirmPasswordError });

    if (passwordError || confirmPasswordError) {
      return;
    }

    // Lógica de cambio de contraseña
    try {
      const token = await AsyncStorage.getItem('jwtToken');
      const apiUrl = `${REACT_APP_API_URL}/api/users/change-password`;

      const response = await axios.put(
        apiUrl,
        { password: password.value },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      Alert.alert('Éxito', response.data.message);
      navigation.navigate('Home');
    } catch (error) {
      console.error('Error al cambiar la contraseña:', error);

      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        Alert.alert('Error', error.response.data.message);
      } else {
        Alert.alert(
          'Error',
          'Hubo un problema al cambiar la contraseña. Por favor, inténtalo de nuevo.',
        );
      }
    }
  };

  const isValidPassword = (password) => {
    return password.length >= 6;
  };

  return (
    <Background>
      <BackButton goBack={navigation.goBack} />
      <Logo />
      <Header>Cambiar Contraseña</Header>
      <TextInput
        placeholder="Nueva Contraseña"
        secureTextEntry
        value={password.value}
        onChangeText={(text) => setPassword({ value: text, error: '' })}
      />
      {password.error ? <Text>{password.error}</Text> : null}
      <TextInput
        placeholder="Confirmar Nueva Contraseña"
        secureTextEntry
        value={confirmPassword.value}
        onChangeText={(text) => setConfirmPassword({ value: text, error: '' })}
      />
      {confirmPassword.error ? <Text>{confirmPassword.error}</Text> : null}
      <Button mode="contained" onPress={handleChangePassword}>
        Cambiar Contraseña
      </Button>
    </Background>
  );
};

export default ChangePasswordScreen;
