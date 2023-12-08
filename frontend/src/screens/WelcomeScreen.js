import React from 'react';
import { View, Text, Button } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import Logo from '../components/Logo';

const WelcomeScreen = ({ navigation }) => {
  return (
    <View>
      <Logo />
      <Text>Bienvenido a MobileHub</Text>
      <Button
        title="Iniciar Sesión"
        onPress={() => navigation.navigate('Login')}
      />
      <Button
        title="Registrarse"
        onPress={() => navigation.navigate('Register')}
      />
    </View>
  );
};

export default WelcomeScreen;
