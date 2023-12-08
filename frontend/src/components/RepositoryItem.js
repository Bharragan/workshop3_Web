/**
 * Componente RepositoryItem.
 * @component
 *
 * @param {Object} props - Propiedades del componente.
 * @param {Object} props.repo - Información del repositorio.
 * @param {string} props.repo.name - Nombre del repositorio.
 * @param {string} props.repo.pushed_at - Fecha de la última modificación del repositorio.
 * @param {number} props.repo.commitCount - Número de commits en el repositorio.
 * @returns {JSX.Element} - Elemento JSX que representa un ítem de repositorio.
 *
 * @example
 * // Ejemplo de uso del componente RepositoryItem
 * <RepositoryItem repo={{ name: 'MiRepo', pushed_at: '2023-01-01', commitCount: 5 }} />
 */
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Card, Title, Paragraph, useTheme } from 'react-native-paper';
import { theme } from '../core/theme';

/**
 * Componente RepositoryItem.
 * @param {Object} props - Propiedades del componente.
 * @param {Object} props.repo - Información del repositorio.
 * @param {string} props.repo.name - Nombre del repositorio.
 * @param {string} props.repo.pushed_at - Fecha de la última modificación del repositorio.
 * @param {number} props.repo.commitCount - Número de commits en el repositorio.
 * @returns {JSX.Element} - Elemento JSX que representa un ítem de repositorio.
 */
const RepositoryItem = ({ repo }) => {
  const theme = useTheme();

  return (
    <Card style={styles.card}>
      <View style={styles.header}>
        <Title style={styles.title}>{repo.name}</Title>
      </View>
      <Card.Content style={{ backgroundColor: '#f7f3f9' }}>
        <Paragraph style={styles.info}>Última Modificación: {new Date(repo.pushed_at).toLocaleDateString()}</Paragraph>
        <Paragraph style={styles.info}>Commits: {repo.commitCount}</Paragraph>
      </Card.Content>
    </Card>
  );
};

// Estilos del componente.
const styles = StyleSheet.create({
  card: {
    margin: 16,
    borderRadius: 8,
    elevation: 4,
  },
  header: {
    backgroundColor: "#6750a4",
    padding: 12,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  title: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  info: {
    color: theme.colors.text,
    fontSize: 16,
    marginBottom: 8,
  },
});

export default RepositoryItem;
