/**
 * Fondo reutilizable para las pantallas de la aplicación.
 * @component
 *
 * @param {Object} props - Propiedades del componente.
 * @param {React.ReactNode} props.children - Componentes secundarios anidados dentro del fondo.
 *
 * @example
 * <Background>
 *   {/* Contenido de la pantalla }
 * </Background>
 */
import React from 'react';
import { ImageBackground, StyleSheet, KeyboardAvoidingView } from 'react-native';
import { theme } from '../core/theme';

/**
 * Componente Background.
 * @param {Object} props - Propiedades del componente.
 * @param {React.ReactNode} props.children - Componentes secundarios anidados dentro del fondo.
 * @returns {JSX.Element} - Elemento JSX que representa el fondo de la pantalla.
 */
export default function Background({ children }) {
  return (
    <ImageBackground
      source={require('../assets/background_dot.png')}
      resizeMode="repeat"
      style={styles.background}
    >
      <KeyboardAvoidingView style={styles.container} behavior="padding">
        {children}
      </KeyboardAvoidingView>
    </ImageBackground>
  );
}

// Estilos del componente.
const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    backgroundColor: theme.colors.surface,
  },
  container: {
    flex: 1,
    padding: 20,
    width: '100%',
    maxWidth: 340,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
