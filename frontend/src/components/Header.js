import React from 'react';
import { StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';
import { theme } from '../core/theme';

export default function Header({ mode = 'default', ...props }) {
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

  return <Text style={[styles.header, headerStyles]} {...props} />;
}

const styles = StyleSheet.create({
  header: {
    fontWeight: 'bold',
  },
});
