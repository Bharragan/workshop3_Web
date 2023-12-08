import { DefaultTheme } from 'react-native-paper';

// Función para ajustar la saturación y brillo de un color en formato HSL
const adjustColor = (hue, saturation, lightness) => `hsl(${hue}, ${saturation}%, ${lightness}%)`;

// Aplicamos la función a los colores base
const neonPurple = adjustColor(257, 100, 50);
const neonPurpleAdjusted = adjustColor(257, 90, 60);

export const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    text: '#000000',
    primary: neonPurple,
    secondary: '#414757',
    error: '#f13a59',
    deluxe: neonPurpleAdjusted,
  },
};
