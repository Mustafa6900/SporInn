import React from 'react';
import { TextInput, StyleSheet } from 'react-native';

const CustomTextInput = ({ placeholder, value, onChangeText }) => {
    return (
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        placeholderTextColor="#585858" // Placeholder rengini burada belirleyebilirsiniz
        value={value}
        onChangeText={onChangeText}
      />
    );
  };

const styles = StyleSheet.create({
  input: {
    height: 50,
    paddingHorizontal: 15,
    marginBottom: 25,
    backgroundColor: '#0D0D0D',
    borderRadius: 7,
    
  },
});

export default CustomTextInput;
