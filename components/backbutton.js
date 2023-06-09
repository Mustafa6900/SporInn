import React from 'react';
import { TouchableOpacity, Image, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

export default function BackButton({ left, top, showConfirmation }) {
  const navigation = useNavigation();

  const handlePress = () => {
    if (showConfirmation) {
      Alert.alert(
        'Geri Dön',
        'Geri dönmek istediğinize emin misiniz?',
        [
          {
            text: 'Hayır',
            style: 'cancel',
          },
           
          {
            text: 'Evet',
            onPress: () => navigation.goBack(),
          },
        ],
      );
    } else {
      navigation.goBack();
    }
  };

  const buttonStyle = {
    left: left,
    top: top,
    position: 'absolute',
  };

  return (
    <TouchableOpacity onPress={handlePress} style={buttonStyle}>
      <Ionicons name="return-up-back-outline" size={45} />
    </TouchableOpacity>
  );
}
