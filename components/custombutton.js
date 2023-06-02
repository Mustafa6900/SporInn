import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons'; 

const CustomButton = ({ onPress, title, icon, style, titleStyle, iconStyle }) => {
  return (
    <TouchableOpacity style={[styles.button, style]} onPress={onPress}>
      <Text style={[styles.buttonText, titleStyle]}>{title}</Text>
      {icon && <MaterialCommunityIcons name={icon} style={[styles.icon, iconStyle]} />}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FF6F25',
    height: 50,
    paddingHorizontal: 15,
    borderRadius: 7,
  },
  buttonText: {
    fontSize: 15,
    fontFamily: 'Roboto',
    fontWeight: 'bold',
    letterSpacing: 0.4,
  },
  icon: {
    marginLeft: 50,
    fontSize: 20,
    color: '#AAAAAA',
  },
});

export default CustomButton;
