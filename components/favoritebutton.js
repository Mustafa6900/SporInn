import React, { useState,useContext,useEffect } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity,Alert } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { AuthContext } from '../pages/Auth/AuthContext';
import { supabase } from '../supabaseClient';

export default function FavoriteButton({ left, top, item_id }) {

  const { session } = useContext(AuthContext);

  useEffect(() => {
    const fetchFavoriteProducts = async () => {
      try {
        const { data, error } = await supabase
          .from('users_favorite_products')
          .select('product_id')
          .eq('created_id', session.user.id);
        if (error) {
          console.error(error);
        } else {
          
          data.map((favoriteProduct) => {
            if (favoriteProduct.product_id === item_id) {
              setIsFavorite(true);
            }
          });
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchFavoriteProducts();
  }, []);



  const handleFavoriteProduct = async () => {
    try {
      const { data, error } = await supabase
        .from('users_favorite_products')
        .insert([
          {
            created_id: session.user.id,
            product_id: item_id,
            created_at: new Date(),
          },
        ]);
      if (error) {
        console.error(error);
      } else {
        Alert.alert('Favorilere Eklendi');
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteFavoriteProduct = async () => {
    try {
      const { data, error } = await supabase
        .from('users_favorite_products')
        .delete()
        .eq('created_id', session.user.id)
        .eq('product_id', item_id);
      if (error) {
        console.error(error);
      } else {
        Alert.alert('Favorilerden Çıkarıldı');
      }
    } catch (error) {
      console.error(error);
    }
  };

  


  const navigation = useNavigation();
  const [isFavorite, setIsFavorite] = useState(false);

  const handlePress = () => {
    setIsFavorite(!isFavorite); // Durumu tersine çevir

    if (isFavorite) {
      handleDeleteFavoriteProduct();
    } else {
      handleFavoriteProduct();
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
