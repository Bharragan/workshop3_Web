/**
 * Componente de párrafo.
 * @component
 *
 * @param {Object} props - Propiedades del componente.
 * @returns {JSX.Element} - Elemento JSX que representa un párrafo de texto.
 *
 * @example
 * // Ejemplo de uso del componente Paragraph
 * <Paragraph>Este es un párrafo de ejemplo.</Paragraph>
 */
import React from 'react';
import { StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';

/**
 * Componente Paragraph.
 * @param {Object} props - Propiedades del componente.
 * @returns {JSX.Element} - Elemento JSX que representa un párrafo de texto.
 */
export default function Paragraph(props) {
  return <Text style={styles.text} {...props} />;
}

// Estilos del componente.
const styles = StyleSheet.create({
  text: {
    fontSize: 15,
    lineHeight: 21,
    textAlign: 'center',
    marginBottom: 12,
  },
});
