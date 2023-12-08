import React from 'react';
import { TextInput, StyleSheet } from 'react-native';

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
