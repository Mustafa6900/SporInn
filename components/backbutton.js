import React from 'react';
import {TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function BackButton({ left,top }) {
  const navigation = useNavigation();

  const handlePress = () => {
    navigation.goBack(); // Geri gitme işlemi
  };

  const buttonStyle = {
    left: left,
    top: top,
  };

  return (
    <TouchableOpacity onPress={handlePress} style={ buttonStyle}>
      <Image
        source={require('../assets/back.png')}
      />
    </TouchableOpacity>
  );
}


