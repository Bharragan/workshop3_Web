import React, { useState, useEffect } from 'react';
import { View, Alert, Text } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DatePicker from 'react-native-date-picker';
import Header from '../components/Header';
import Background from '../components/Background';
import Button from '../components/Button';
import BackButton from '../components/BackButton';
import Logo from '../components/Logo';
import TextInput from '../components/TextInput';
import { REACT_APP_API_URL } from '@env';

const EditProfileScreen = ({ navigation }) => {
  const [firstName, setFirstName] = useState({ value: '', error: '' });
  const [lastName, setLastName] = useState({ value: '', error: '' });
  const [email, setEmail] = useState({ value: '', error: '' });
  const [dateOfBirth, setDateOfBirth] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [birthYearError, setBirthYearError] = useState('');

  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const token = await AsyncStorage.getItem('jwtToken');
        const apiUrl = `${REACT_APP_API_URL}/api/users/current-user`;

        const response = await axios.get(apiUrl, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const { firstName, lastName, email, dateOfBirth } = response.data;
        setFirstName({ value: firstName, error: '' });
        setLastName({ value: lastName, error: '' });
        setEmail({ value: email, error: '' });
        setDateOfBirth(new Date(dateOfBirth));
      } catch (error) {
        console.error('Error al obtener información del usuario:', error);
      }
    };

    fetchCurrentUser();
  }, []);

  const handleUpdateProfile = async () => {
    // Validaciones
    const emailError = !isValidEmail(email.value)
      ? 'Ingrese un correo electrónico válido.'
      : '';
    const fullNameError = !isValidFullName(firstName.value, lastName.value)
      ? 'Ingrese un nombre completo válido.'
      : '';
    const birthYearValidation = isValidBirthYear(dateOfBirth.getFullYear());
    setBirthYearError(birthYearValidation ? '' : 'Ingrese un año de nacimiento válido.');

    setEmail({ ...email, error: emailError });
    setFirstName({ ...firstName, error: fullNameError });
    setLastName({ ...lastName, error: fullNameError });

    if (emailError || fullNameError || !birthYearValidation) {
      return;
    }

    // Lógica de actualización del perfil
    try {
      const token = await AsyncStorage.getItem('jwtToken');
      const apiUrl = `${REACT_APP_API_URL}/api/users/update-profile`;

      const response = await axios.put(
        apiUrl,
        { firstName: firstName.value, lastName: lastName.value, email: email.value, dateOfBirth },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      Alert.alert('Éxito', response.data.message);
      navigation.navigate('Home');
    } catch (error) {
      console.error('Error al actualizar información del perfil:', error);

      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        Alert.alert('Error', error.response.data.message);
      } else {
        Alert.alert(
          'Error',
          'Hubo un problema al actualizar el perfil. Por favor, inténtalo de nuevo.',
        );
      }
    }
  };

  const handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || dateOfBirth;
    setShowDatePicker(false);
    setDateOfBirth(currentDate);
  };

  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const isValidFullName = (firstName, lastName) => {
    return (
      firstName.length + lastName.length >= 10 &&
      firstName.length + lastName.length <= 150
    );
  };

  const isValidBirthYear = (year) => {
    const currentYear = new Date().getFullYear();
    return year >= 1900 && year <= currentYear;
  };

  return (
    <Background>
      <BackButton goBack={navigation.goBack} />
      <Logo />
      <Header>Editar Perfil</Header>
      <TextInput
        placeholder="Nombre"
        value={firstName.value}
        onChangeText={(text) => setFirstName({ value: text, error: '' })}
        autoCapitalize="none"
      />
      <TextInput
        placeholder="Apellido"
        value={lastName.value}
        onChangeText={(text) => setLastName({ value: text, error: '' })}
        autoCapitalize="none"
      />
      {lastName.error ? <Text>{lastName.error}</Text> : null}
      <TextInput
        placeholder="Correo electrónico"
        value={email.value}
        onChangeText={(text) => setEmail({ value: text, error: '' })}
        autoCapitalize="none"
        keyboardType="email-address"
      />
      {email.error ? <Text>{email.error}</Text> : null}
      <DatePicker
        mode={'date'}
        value={dateOfBirth}
        date={dateOfBirth}
        onDateChange={setDateOfBirth}
      />
      {birthYearError ? <Text>{birthYearError}</Text> : null}
      <Button mode="contained" onPress={handleUpdateProfile}>
        Guardar Cambios
      </Button>
    </Background>
  );
};

export default EditProfileScreen;
