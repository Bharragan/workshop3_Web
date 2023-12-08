/**
 * Campo de selección de fecha utilizando el componente DateTimePicker.
 * @component
 *
 * @param {Object} props - Propiedades del componente.
 * @param {string} props.label - Etiqueta que describe el propósito del campo.
 * @param {Date} props.value - Fecha actual seleccionada.
 * @param {Function} props.onChange - Función llamada al cambiar la fecha seleccionada.
 *
 * @example
 * <DatePickerField label="Fecha de Nacimiento" value={selectedDate} onChange={handleDateChange} />
 */
import React, { useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

/**
 * Componente DatePickerField.
 * @param {Object} props - Propiedades del componente.
 * @param {string} props.label - Etiqueta que describe el propósito del campo.
 * @param {Date} props.value - Fecha actual seleccionada.
 * @param {Function} props.onChange - Función llamada al cambiar la fecha seleccionada.
 * @returns {JSX.Element} - Elemento JSX que representa un campo de selección de fecha.
 */
const DatePickerField = ({ label, value, onChange }) => {
  const [showDatePicker, setShowDatePicker] = useState(false);

  /**
   * Maneja el cambio de fecha seleccionada.
   * @param {Event} event - Evento de cambio de fecha.
   * @param {Date} selectedDate - Fecha seleccionada.
   */
  const handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || value;
    setShowDatePicker(false);
    onChange(currentDate);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <Button title="Seleccionar Fecha" onPress={() => setShowDatePicker(true)} />
      {showDatePicker && (
        <DateTimePicker
          value={value}
          mode="date"
          display="default"
          onChange={handleDateChange}
        />
      )}
    </View>
  );
};

// Estilos del componente.
const styles = StyleSheet.create({
  container: {
    marginTop: 10,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
});

export default DatePickerField;
