/**
 * Pantalla de Bienvenida.
 *
 * Proporciona a los usuarios la opción de iniciar sesión o registrarse en la aplicación.
 * Muestra el logo y un mensaje de bienvenida, junto con botones para iniciar sesión o
 * registrarse.
 *
 * @component
 *
 * @param {Object} props - Propiedades de la pantalla.
 * @param {Object} props.navigation - Objeto de navegación que permite la transición entre pantallas.
 *
 * @returns {JSX.Element} - Elemento JSX que representa la pantalla de bienvenida.
 *
 * @example
 * // Ejemplo de uso en una navegación de React Navigation:
 * <Stack.Screen name="Welcome" component={WelcomeScreen} />
 */

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
