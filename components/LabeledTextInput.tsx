// LabeledTextInput.js
import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';

const LabeledTextInput = ({ label, value, onChangeText, placeholder }:any) => {
  return (
    <View style={styles.inputContainer}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    flex: 1,
    marginRight: 10, // Adjust spacing between the input fields
    marginBottom: 20,
    
  },
  label: {
    fontSize: 12,
    marginBottom: 5,
    color: 'black',
  },
  input: {
    height: 40,
    borderColor: '#D9D9D9',
    borderWidth: 2,
    borderRadius: 5,
    paddingHorizontal: 10,
    
  },
});

export default LabeledTextInput;
