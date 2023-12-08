/**
 * Item de lista para representar un commit.
 * @component
 *
 * @param {Object} props - Propiedades del componente.
 * @param {Object} props.commit - Información del commit.
 * @param {Object} props.commit.commit - Información del commit, incluyendo autor y mensaje.
 *
 * @example
 * <CommitItem commit={commitData} />
 */
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Card, Title, Paragraph } from 'react-native-paper';

/**
 * Componente CommitItem.
 * @param {Object} props - Propiedades del componente.
 * @param {Object} props.commit - Información del commit.
 * @param {Object} props.commit.commit - Información del commit, incluyendo autor y mensaje.
 * @returns {JSX.Element} - Elemento JSX que representa un item de lista para un commit.
 */
const CommitItem = ({ commit }) => (
  <Card style={styles.card}>
    <Card.Content>
      <Title>{commit.commit.author.name}</Title>
      <Paragraph>{commit.commit.message}</Paragraph>
      <Paragraph>Fecha: {new Date(commit.commit.author.date).toLocaleDateString()}</Paragraph>
    </Card.Content>
  </Card>
);

// Estilos del componente.
const styles = StyleSheet.create({
  card: {
    marginVertical: 8,
    marginHorizontal: 16,
    padding: 12,
    borderRadius: 8,
    elevation: 4,
  },
});

export default CommitItem;
