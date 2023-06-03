import React from 'react';
import { TouchableOpacity, StyleSheet, Text } from 'react-native';

const CheckButton = ({ title, onPress, checked }) => {
  return (
    <TouchableOpacity
      style={[styles.button, checked ]}
      onPress={onPress}
    >
      <Text style={[styles.buttonText, checked && styles.checkedButtonText]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#292929',
    borderRadius: 7,
    borderWidth: 1.5,
    borderColor: '#0D0D0D',
    height: 35,
    width: 35,
  },
  checkedButtonText: {
    color: '#0d0d0d',
  },
  buttonText: {
    color: '#292929',
    fontWeight: '900',
    fontSize: 25,
    textAlign: 'center',
    
  },
});

export default CheckButton;

// Onaylamalar için kullanılan check butonu.
