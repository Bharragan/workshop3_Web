/**
 * Componente TextInput.
 * @component
 *
 * @param {Object} props - Propiedades del componente.
 * @param {string} props.errorText - Texto de error, se muestra si hay un error.
 * @param {string} props.description - Descripción adicional para el campo de entrada.
 * @returns {JSX.Element} - Elemento JSX que representa un campo de entrada de texto.
 *
 * @example
 * // Ejemplo de uso del componente TextInput
 * <TextInput
 *   label="Correo Electrónico"
 *   value={email}
 *   onChangeText={(text) => setEmail(text)}
 *   errorText={errors.email}
 *   description="Introduce tu dirección de correo electrónico."
 * />
 */
import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { TextInput as Input } from 'react-native-paper';
import { theme } from '../core/theme';

/**
 * Componente TextInput.
 * @param {Object} props - Propiedades del componente.
 * @param {string} props.errorText - Texto de error, se muestra si hay un error.
 * @param {string} props.description - Descripción adicional para el campo de entrada.
 * @returns {JSX.Element} - Elemento JSX que representa un campo de entrada de texto.
 */
export default function TextInput({ errorText, description, ...props }) {
  return (
    <View style={styles.container}>
      <Input
        style={styles.input}
        selectionColor={theme.colors.primary}
        underlineColor="transparent"
        mode="outlined"
        {...props}
      />
      {description && !errorText ? (
        <Text style={styles.description}>{description}</Text>
      ) : null}
      {errorText ? <Text style={styles.error}>{errorText}</Text> : null}
    </View>
  );
}

// Estilos del componente.
const styles = StyleSheet.create({
  container: {
    width: '85%',
    marginVertical: 12,
  },
  input: {
    backgroundColor: theme.colors.surface,
  },
  description: {
    fontSize: 13,
    color: theme.colors.secondary,
    paddingTop: 8,
  },
  error: {
    fontSize: 13,
    color: theme.colors.error,
    paddingTop: 8,
  },
});
