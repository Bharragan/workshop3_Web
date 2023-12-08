/**
 * Componente de encabezado utilizado para mostrar títulos en la aplicación.
 * @component
 *
 * @param {Object} props - Propiedades del componente.
 * @param {string} [props.mode='default'] - Modo del encabezado ('default' o 'big').
 * @param {string} [props.style] - Estilo adicional para el encabezado.
 * @param {...any} props - Otras propiedades compatibles con el componente `Text` de `react-native-paper`.
 *
 * @example
 * // Ejemplo de uso del componente Header
 * <Header mode="big" style={{ marginBottom: 20 }}>Título Grande</Header>
 */
import React from 'react';
import { StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';
import { theme } from '../core/theme';

/**
 * Componente Header.
 * @param {Object} props - Propiedades del componente.
 * @param {string} [props.mode='default'] - Modo del encabezado ('default' o 'big').
 * @param {string} [props.style] - Estilo adicional para el encabezado.
 * @param {...any} props - Otras propiedades compatibles con el componente `Text` de `react-native-paper`.
 * @returns {JSX.Element} - Elemento JSX que representa un encabezado.
 */
export default function Header({ mode = 'default', ...props }) {
  // Estilos del encabezado dependiendo del modo
  const headerStyles =
    mode === 'big'
      ? {
          backgroundColor: "#6750a4",
          color: 'white',
          fontSize: 24,
          paddingVertical: 16,
          paddingHorizontal: 16,
          fontWeight: 'bold',
          borderRadius: 10, // Agrega esta línea para bordes redondeados
        }
      : {
          color: theme.colors.primary,
          fontSize: 21,
          paddingVertical: 12,
        };

  return <Text style={[styles.header, headerStyles, props.style]} {...props} />;
}

// Estilos del componente.
const styles = StyleSheet.create({
  header: {
    fontWeight: 'bold',
  },
});
