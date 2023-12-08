/**
 * Componente de entrada de texto reutilizable.
 * @component
 *
 * @param {Object} props - Propiedades del componente.
 * @param {string} [props.placeholder] - Texto de marcador de posición para la entrada de texto.
 * @param {function} [props.onChangeText] - Función de devolución de llamada que se ejecuta cuando cambia el texto.
 * @param {string} [props.value] - Valor actual de la entrada de texto.
 *
 * @example
 * // Ejemplo de uso del componente Input
 * <Input
 *   placeholder="Ingrese su nombre"
 *   onChangeText={(text) => console.log(text)}
 *   value="John Doe"
 * />
 */
import React from 'react';
import { TextInput, StyleSheet } from 'react-native';

/**
 * Componente Input.
 * @param {Object} props - Propiedades del componente.
 * @param {string} [props.placeholder] - Texto de marcador de posición para la entrada de texto.
 * @param {function} [props.onChangeText] - Función de devolución de llamada que se ejecuta cuando cambia el texto.
 * @param {string} [props.value] - Valor actual de la entrada de texto.
 * @returns {JSX.Element} - Elemento JSX que representa una entrada de texto.
 */
const Input = ({ placeholder, onChangeText, value }) => {
  return (
    <TextInput
      style={styles.input}
      placeholder={placeholder}
      onChangeText={onChangeText}
      value={value}
    />
  );
};

// Estilos del componente.
const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: 'gray',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
});

export default Input;
