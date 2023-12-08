import React from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { theme } from '../core/theme';

export default function Logo() {
  return (
    <View style={styles.container}>
      <Image source={require('../assets/logo.png')} style={styles.image} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 110,
    height: 110,
    backgroundColor: 'white',
    borderRadius: 55, // La mitad del ancho y alto para hacer un círculo perfecto
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
    borderWidth: 8, // Ancho del borde
    borderColor: theme.colors.deluxe, // Color del borde
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50, // La mitad del ancho y alto de la imagen
  },
});
