import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Card, Title, Paragraph, useTheme } from 'react-native-paper';
import { theme } from '../core/theme';

const RepositoryItem = ({ repo }) => {
  const theme = useTheme();

  return (
    <Card style={styles.card}>
      <View style={styles.header}>
        <Title style={styles.title}>{repo.name}</Title>
      </View>
      <Card.Content style={{ backgroundColor: '#f7f3f9' }}>
        <Paragraph style={styles.info}>Ultima Modificacion: {new Date(repo.pushed_at).toLocaleDateString()}</Paragraph>
        <Paragraph style={styles.info}>Commits: {repo.commitCount}</Paragraph>
      </Card.Content>
    </Card>
  );
};

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
