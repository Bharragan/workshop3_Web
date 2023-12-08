import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Card, Title, Paragraph } from 'react-native-paper';

const CommitItem = ({ commit }) => (
  <Card style={styles.card}>
    <Card.Content>
      <Title>{commit.commit.author.name}</Title>
      <Paragraph>{commit.commit.message}</Paragraph>
      <Paragraph>Fecha: {new Date(commit.commit.author.date).toLocaleDateString()}</Paragraph>
    </Card.Content>
  </Card>
);

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
