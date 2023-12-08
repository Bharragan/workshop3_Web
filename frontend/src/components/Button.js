/**
 * Botón reutilizable para la aplicación.
 * @component
 *
 * @param {Object} props - Propiedades del componente.
 * @param {string} props.mode - Modo del botón ('contained' o 'outlined').
 * @param {Object} [props.style] - Estilos adicionales para el botón.
 * @param {Object} [props.props] - Propiedades adicionales del botón.
 *
 * @example
 * <Button mode="contained" onPress={handlePress}>
 *   Iniciar Sesión
 * </Button>
 */
import React from 'react';
import { StyleSheet } from 'react-native';
import { Button as PaperButton } from 'react-native-paper';
import { theme } from '../core/theme';

/**
 * Componente Button.
 * @param {Object} props - Propiedades del componente.
 * @param {string} props.mode - Modo del botón ('contained' o 'outlined').
 * @param {Object} [props.style] - Estilos adicionales para el botón.
 * @param {Object} [props.props] - Propiedades adicionales del botón.
 * @returns {JSX.Element} - Elemento JSX que representa un botón.
 */
export default function Button({ mode, style, ...props }) {
  return (
    <PaperButton
      style={[
        styles.button,
        mode === 'outlined' && { backgroundColor: theme.colors.surface },
        style,
      ]}
      labelStyle={styles.text}
      mode={mode}
      {...props}
    />
  );
}

// Estilos del componente.
const styles = StyleSheet.create({
  button: {
    width: '100%',
    marginVertical: 10,
    paddingVertical: 2,
  },
  text: {
    fontWeight: 'bold',
    fontSize: 15,
    lineHeight: 26,
  },
});
