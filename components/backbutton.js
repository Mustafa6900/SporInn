import React from 'react';
import {TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
export default function BackButton({ left,top }) {
  const navigation = useNavigation();

  const handlePress = () => {
    navigation.goBack(); // Geri gitme işlemi
  };

  const buttonStyle = {
    left: left,
    top: top,
    position: 'absolute',
  };

  return (
    <TouchableOpacity onPress={handlePress} style={ buttonStyle}>
 
      <Ionicons name="return-up-back-outline" size={45}></Ionicons>
    </TouchableOpacity>
  );
}

// Geri dönüş butonu için kullanılan component.
//<ion-icon name="return-up-back-outline"></ion-icon>