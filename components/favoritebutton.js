import React, { useState } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export default function FavoriteButton({ left, top }) {
  const navigation = useNavigation();
  const [isFavorite, setIsFavorite] = useState(false);

  const handlePress = () => {
    setIsFavorite(!isFavorite); // Durumu tersine çevir

    if (isFavorite) {
      console.log("Favoriden çıkarıldı");
    } else {
      console.log("Favoriye eklendi");
    }
  };

  const buttonStyle = {
    left: left,
    top: top,
    position: 'absolute',
  };

  const heartIcon = isFavorite ? "heart" : "heart-outline";
  const heartColor = isFavorite ? "black" : "black";

  return (
    <TouchableOpacity onPress={handlePress} style={buttonStyle}>
      <Ionicons name={heartIcon} size={40} color={heartColor} />
    </TouchableOpacity>
  );
}
