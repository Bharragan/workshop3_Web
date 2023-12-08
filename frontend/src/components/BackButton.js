/**
 * Botón de retroceso reutilizable para navegar hacia atrás en la aplicación.
 * @component
 *
 * @param {function} goBack - Función para navegar hacia atrás, proporcionada por React Navigation.
 *
 * @example
 * <BackButton goBack={() => navigation.goBack()} />
 */
import React from 'react';
import { TouchableOpacity, Image, StyleSheet } from 'react-native';
import { getStatusBarHeight } from 'react-native-status-bar-height';

/**
 * Componente BackButton.
 * @param {Object} props - Propiedades del componente.
 * @param {function} props.goBack - Función para navegar hacia atrás.
 * @returns {JSX.Element} - Elemento JSX que representa el botón de retroceso.
 */
export default function BackButton({ goBack }) {
  return (
    <TouchableOpacity onPress={goBack} style={styles.container}>
      <Image
        style={styles.image}
        source={require('../assets/arrow_back.png')}
      />
    </TouchableOpacity>
  );
}

// Estilos del componente.
const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 10 + getStatusBarHeight(),
    left: 4,
  },
  image: {
    width: 24,
    height: 24,
  },
});
