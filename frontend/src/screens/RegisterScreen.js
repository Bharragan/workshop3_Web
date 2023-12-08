import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, ScrollView, Alert } from 'react-native';
import Input from '../components/Input';
import DatePickerField from '../components/DatePickerField';
import axios from 'axios';
import { REACT_APP_API_URL } from '@env';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Importa AsyncStorage


const RegisterScreen = ({ navigation }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [rut, setRut] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState(new Date());

  const handleRegister = async () => {
    // Validaciones
    if (!isValidEmail(email)) {
      showAlert('Error', 'Ingrese un correo electrónico válido con dominio de la UCN.');
      return;
    }

    if (!isValidRut(rut)) {
      showAlert('Error', 'Ingrese un RUT válido.');
      return;
    }

    if (!isValidRutDigit(rut)) {
      showAlert('Error', 'El dígito verificador del RUT no es válido.');
      return;
    }

    if (!isValidBirthYear(dateOfBirth.getFullYear())) {
      showAlert('Error', 'Ingrese un año de nacimiento válido.');
      return;
    }

    if (!isValidFullName(firstName, lastName)) {
      showAlert('Error', 'Ingrese un nombre completo válido.');
      return;
    }

    // Registro de usuario
    try {
      const apiUrl = REACT_APP_API_URL || 'http://localhost:3001';
      const response = await axios.post(`${apiUrl}/api/users/register`, {
        firstName,
        lastName,
        email,
        password: rut.replace(/[.-]/g, ''), // Contraseña será el RUT sin puntos ni guion
        dateOfBirth,
        rut,
      });

      showAlert('Éxito', response.data.message);

      await AsyncStorage.setItem('jwtToken', response.data.token);

      navigation.navigate('Home'); // Asegúrate de tener una ruta 'Home' configurada en tu navegación
      // Redirige a la página de inicio después del registro exitoso
      // Aquí debes manejar la navegación de acuerdo a tu estructura de navegación
    } catch (error) {
      console.error('Error al registrar usuario:', error);
      showAlert('Error', 'Hubo un problema al registrar el usuario. Por favor, inténtalo de nuevo.');
    }
  };

  const isValidEmail = (email) => {
    const ucnDomainRegex = /^[a-zA-Z0-9._-]+@(ucn\.cl|alumnos\.ucn\.cl|disc\.ucn\.cl|ce\.ucn\.cl)$/;
    return ucnDomainRegex.test(email);
  };

  const isValidRut = (rut) => {
    const rutRegex = /^(\d{1,3}(\.?\d{3}){1,2}-[\dkK])$/;
    return rutRegex.test(rut);
  };

  const isValidRutDigit = (rut) => {
    const cleanRut = rut.replace(/[.-]/g, '');
    const rutDigits = cleanRut.slice(0, -1);
    const verifierDigit = cleanRut.slice(-1).toUpperCase();

    const calculatedVerifier = calculateRutVerifier(rutDigits);
    return verifierDigit === calculatedVerifier;
  };

  const calculateRutVerifier = (rutDigits) => {
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

  const isValidBirthYear = (year) => {
    const currentYear = new Date().getFullYear();
    return year >= 1900 && year <= currentYear;
  };

  const isValidFullName = (firstName, lastName) => {
    return firstName.length + lastName.length >= 10 && firstName.length + lastName.length <= 150;
  };

  const formatRut = (rut) => {
    // Formatea el RUT agregando puntos y guión
    const [digits, verifier] = rut.split('-');
    const formattedDigits = digits.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
    return `${formattedDigits}-${verifier}`;
  };

  const showAlert = (title, message) => {
    Alert.alert(title, message, [{ text: 'OK', onPress: () => {} }]);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Registro</Text>

      <Input
        placeholder="Nombre"
        value={firstName}
        onChangeText={setFirstName}
        style={styles.input}
      />

      <Input
        placeholder="Apellido"
        value={lastName}
        onChangeText={setLastName}
        style={styles.input}
      />

      <Input
        placeholder="Correo electrónico (dominio UCN)"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
        keyboardType="email-address"
      />

      <Input
        placeholder="RUT (con puntos y guión)"
        value={rut}
        onChangeText={setRut}
        style={styles.input}
      />

      <DatePickerField
        label="Fecha de Nacimiento"
        value={dateOfBirth}
        onChange={setDateOfBirth}
      />

      <Button title="Registrarse" onPress={handleRegister} />
    </ScrollView>
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
