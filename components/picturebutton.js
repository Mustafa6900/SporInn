import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View, Image } from 'react-native';

const PictureButton = ({ onPress, title, style, titleStyle, backgroundImage }) => {
  return (
    <TouchableOpacity style={[styles.button, style]} onPress={onPress}>
      <View style={[styles.imageContainer, { backgroundImage }]}>
        <Image source={backgroundImage} style={styles.imageBackground} />
      </View>
      <Text style={[styles.buttonText, titleStyle]}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 180,
    width: 365,
    paddingHorizontal: 15,
    borderRadius: 7,
    borderWidth: 1,
    borderColor: '#FF6F25',
    
  },
  buttonText: {
    color: '#AAAAAA',
    fontSize: 40,
    fontFamily: 'Roboto',
    fontWeight: '700',
    letterSpacing: 0.4,
  },
  imageContainer: {
    borderRadius: 7,
    overflow: 'hidden',
    position: 'absolute',
    
  },
  imageBackground: {
     width: 362,
     height: 177,
    resizeMode: 'cover',
    justifyContent: 'center',
    alignItems: 'center',

  },
});

export default PictureButton;
