import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
export default function FavoriteButton({ left,top  }){

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
        <Ionicons name="heart-outline" size={40}></Ionicons>
      </TouchableOpacity>
    );
}