import React from 'react';
import { View, Text } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import Logo from '../components/Logo';
import Header from '../components/Header';
import Background from '../components/Background'
import Paragraph from '../components/Paragraph';
import Button from '../components/Button';

const WelcomeScreen = ({ navigation }) => {
  return (
    <Background>
      <Logo />
      <Header>Mobile Hub</Header>
      <Paragraph>
        Un lugar comodo para el desarrollador.
      </Paragraph>
      <Button
        mode="contained"
        onPress={() => navigation.navigate('Login')}
      >
      Iniciar Sesión
      </Button>
      <Button
        title="Registrarse"
        mode="outlined"
        onPress={() => navigation.navigate('Register')}
      >
        Registrarse
      </Button>

    </Background>
  );
};

export default WelcomeScreen;
