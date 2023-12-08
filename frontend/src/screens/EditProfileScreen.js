import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, Alert, TouchableWithoutFeedback } from 'react-native';

import DateTimePicker from '@react-native-community/datetimepicker';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { REACT_APP_API_URL } from '@env';

const EditProfileScreen = ({ navigation }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

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
        setFirstName(firstName);
        setLastName(lastName);
        setEmail(email);
        setDateOfBirth(new Date(dateOfBirth));
      } catch (error) {
        console.error('Error al obtener información del usuario:', error);
      }
    };

    fetchCurrentUser();
  }, []);

  const handleUpdateProfile = async () => {
    try {
      const token = await AsyncStorage.getItem('jwtToken');
      const apiUrl = `${REACT_APP_API_URL}/api/users/update-profile`;

      const response = await axios.put(
        apiUrl,
        { firstName, lastName, email, dateOfBirth },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      Alert.alert('Éxito', response.data.message);
      navigation.navigate('Home');
    } catch (error) {
      console.error('Error al actualizar información del perfil:', error);

      if (error.response && error.response.data && error.response.data.message) {
        Alert.alert('Error', error.response.data.message);
      } else {
        Alert.alert('Error', 'Hubo un problema al actualizar el perfil. Por favor, inténtalo de nuevo.');
      }
    }
  };

  const handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || dateOfBirth;
    setShowDatePicker(false);
    setDateOfBirth(currentDate);
  };

  return (
    <View>
      <Text>Editar Perfil</Text>
      <TextInput placeholder="Nombre" value={firstName} onChangeText={setFirstName} />
      <TextInput placeholder="Apellido" value={lastName} onChangeText={setLastName} />
      <TextInput placeholder="Correo electrónico" value={email} onChangeText={setEmail} />

      <TouchableWithoutFeedback onPress={() => setShowDatePicker(true)}>
        <View>
          <Text>Seleccionar Fecha: {dateOfBirth.toDateString()}</Text>
        </View>
      </TouchableWithoutFeedback>

      {showDatePicker && (
        <DateTimePicker
          value={dateOfBirth}
          mode="date"
          display="default"
          onChange={handleDateChange}
        />
      )}

      <Button title="Guardar Cambios" onPress={handleUpdateProfile} />
    </View>
  );
};

export default EditProfileScreen;
