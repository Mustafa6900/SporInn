import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ImageBackground } from 'react-native';

const PictureButton = ({ onPress, title, style, titleStyle, backgroundImage }) => {
  return (
    <TouchableOpacity style={[styles.button, style]} onPress={onPress}>
      <ImageBackground source={backgroundImage} style={styles.imageBackground}>
        <Text style={[styles.buttonText, titleStyle]}>{title}</Text>
      </ImageBackground>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 180,
    width: 335,
    paddingHorizontal: 15,
    borderRadius: 7,
    borderWidth: 1,
    borderColor: '#FF6F25',
  },
  buttonText: {
    color: '#AAAAAA',
    fontSize: 50,
    fontFamily: 'Roboto',
    fontWeight: '700',
    letterSpacing: 0.4,
    width: 300,
    textAlign: 'center',
  },
  imageBackground: {
    height: 177,
    width: 332,
    borderRadius: 7,
    resizeMode: 'cover',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default PictureButton;

// Genel resimli buton için kullanılan component

