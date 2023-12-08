/**
 * Pantalla de Registro.
 *
 * Permite a los usuarios registrarse proporcionando información como nombre, apellido,
 * correo electrónico, RUT y fecha de nacimiento. Realiza diversas validaciones, incluyendo
 * la verificación de la unicidad de correo electrónico y RUT, y realiza una solicitud al
 * servidor para registrar al nuevo usuario.
 *
 * @component
 *
 * @param {Object} props - Propiedades de la pantalla.
 * @param {Object} props.navigation - Objeto de navegación que permite la transición entre pantallas.
 *
 * @returns {JSX.Element} - Elemento JSX que representa la pantalla de registro.
 *
 * @example
 * // Ejemplo de uso en una navegación de React Navigation:
 * <Stack.Screen name="Register" component={RegisterScreen} />
 */

import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Alert,
  ScrollView,
} from 'react-native';
import TextInput from '../components/TextInput';
import DatePicker from 'react-native-date-picker';
import axios from 'axios';
import { REACT_APP_API_URL } from '@env';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Background from '../components/Background';
import Logo from '../components/Logo';
import Header from '../components/Header';
import Button from '../components/Button';
import BackButton from '../components/BackButton';

const RegisterScreen = ({ navigation }) => {
  const [firstName, setFirstName] = useState({ value: '', error: '' });
  const [lastName, setLastName] = useState({ value: '', error: '' });
  const [email, setEmail] = useState({ value: '', error: '' });
  const [rut, setRut] = useState({ value: '', error: '' });
  const [dateOfBirth, setDateOfBirth] = useState(new Date());
  const [allUsers, setAllUsers] = useState([]);

  useEffect(() => {
    // Cargar la lista de todos los usuarios al montar el componente
    loadAllUsers();
  }, []);

  const loadAllUsers = async () => {
    try {
      const apiUrl = REACT_APP_API_URL || 'http://localhost:3001';
      const response = await axios.get(`${apiUrl}/api/users/all-users`);
      setAllUsers(response.data);
    } catch (error) {
      console.error('Error al cargar la lista de usuarios:', error);
    }
  };

  const handleRegister = async () => {
    // Validaciones
    const emailError = !isValidEmail(email.value)
      ? 'Ingrese un correo electrónico válido con dominio de la UCN.'
      : '';
    const rutError = !isValidRut(rut.value) ? 'Ingrese un RUT válido.' : '';
    const rutDigitError = !isValidRutDigit(rut.value)
      ? 'El dígito verificador del RUT no es válido.'
      : '';
    const birthYearError = !isValidBirthYear(dateOfBirth.getFullYear())
      ? 'Ingrese un año de nacimiento válido.'
      : '';
    const fullNameError = !isValidFullName(firstName.value, lastName.value)
      ? 'Ingrese un nombre completo válido.'
      : '';

    // Validar que el email y el rut sean únicos
    const isEmailUnique = !allUsers.some((user) => user.email === email.value);
    const isRutUnique = !allUsers.some((user) => user.rut === rut.value);

    if (!isEmailUnique) {
      setEmail({ ...email, error: 'Este correo electrónico ya está registrado.' });
    } else {
      setEmail({ ...email, error: emailError });
    }

    if (!isRutUnique) {
      setRut({ ...rut, error: 'Este RUT ya está registrado.' });
    } else {
      setRut({ ...rut, error: rutError || rutDigitError });
    }

    setFirstName({ ...firstName, error: fullNameError });
    setLastName({ ...lastName, error: fullNameError });

    if (
      emailError ||
      rutError ||
      rutDigitError ||
      birthYearError ||
      fullNameError ||
      !isEmailUnique ||
      !isRutUnique
    ) {
      return;
    }

    // Registro de usuario
    try {
      const apiUrl = REACT_APP_API_URL || 'http://localhost:3001';
      const response = await axios.post(`${apiUrl}/api/users/register`, {
        firstName: firstName.value,
        lastName: lastName.value,
        email: email.value,
        password: rut.value.replace(/[.-]/g, ''), // Contraseña será el RUT sin puntos ni guion
        dateOfBirth,
        rut: rut.value,
      });

      showAlert('Éxito', response.data.message);

      await AsyncStorage.setItem('jwtToken', response.data.token);

      navigation.navigate('Home'); // Asegúrate de tener una ruta 'Home' configurada en tu navegación
      // Redirige a la página de inicio después del registro exitoso
      // Aquí debes manejar la navegación de acuerdo a tu estructura de navegación
    } catch (error) {
      console.error('Error al registrar usuario:', error);
      showAlert(
        'Error',
        'Hubo un problema al registrar el usuario. Por favor, inténtalo de nuevo.',
      );
    }
  };

  const isValidEmail = email => {
    const ucnDomainRegex =
      /^[a-zA-Z0-9._-]+@(ucn\.cl|alumnos\.ucn\.cl|disc\.ucn\.cl|ce\.ucn\.cl)$/;
    return ucnDomainRegex.test(email);
  };

  const isValidRut = rut => {
    const rutRegex = /^(\d{1,3}(\.?\d{3}){1,2}-[\dkK])$/;
    return rutRegex.test(rut);
  };

  const isValidRutDigit = rut => {
    const cleanRut = rut.replace(/[.-]/g, '');
    const rutDigits = cleanRut.slice(0, -1);
    const verifierDigit = cleanRut.slice(-1).toUpperCase();

    const calculatedVerifier = calculateRutVerifier(rutDigits);
    return verifierDigit === calculatedVerifier;
  };

  const calculateRutVerifier = rutDigits => {
    const reversedDigits = Array.from(rutDigits, Number).reverse();
    let sum = 0;
    let multiplier = 2;

    for (let digit of reversedDigits) {
      sum += digit * multiplier;
      multiplier = multiplier < 7 ? multiplier + 1 : 2;
    }

    const remainder = sum % 11;
    const result = remainder === 0 ? 0 : 11 - remainder;

    return result === 10 ? 'K' : String(result);
  };

  const isValidBirthYear = year => {
    const currentYear = new Date().getFullYear();
    return year >= 1900 && year <= currentYear;
  };

  const isValidFullName = (firstName, lastName) => {
    return (
      firstName.length + lastName.length >= 10 &&
      firstName.length + lastName.length <= 150
    );
  };

  const formatRut = rut => {
    const [digits, verifier] = rut.split('-');
    const formattedDigits = digits.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
    return `${formattedDigits}-${verifier}`;
  };

  const showAlert = (title, message) => {
    Alert.alert(title, message, [{text: 'OK', onPress: () => {}}]);
  };

  return (
    <Background>
      <BackButton goBack={navigation.goBack} />
      <Logo />
      <Header>Registro</Header>
      <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <TextInput
          label="Nombre"
          value={firstName.value}
          onChangeText={text => setFirstName({value: text, error: ''})}
          error={!!firstName.error}
          errorText={firstName.error}
        />

        <TextInput
          label="Apellido"
          value={lastName.value}
          onChangeText={text => setLastName({value: text, error: ''})}
          error={!!lastName.error}
          errorText={lastName.error}
        />

        <TextInput
          label="Correo electrónico"
          value={email.value}
          onChangeText={text => setEmail({value: text, error: ''})}
          keyboardType="email-address"
          error={!!email.error}
          errorText={email.error}
        />

        <TextInput
          label="RUT (con puntos y guión)"
          value={rut.value}
          onChangeText={text => setRut({value: text, error: ''})}
          error={!!rut.error}
          errorText={rut.error}
        />

        <DatePicker
          mode={'date'}
          date={dateOfBirth}
          onDateChange={setDateOfBirth}
        />
      </ScrollView>
    </SafeAreaView>
      <Button mode="contained" onPress={handleRegister} style={{marginTop: 24}}>
        Registrarse
      </Button>
    </Background>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  input: {
    marginTop: 10,
  },
});

export default RegisterScreen;
