import React,{useState,useEffect} from 'react';
import { Text, StyleSheet, TouchableOpacity, Image, View, FlatList } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const ItemList = ({ items}) => {
  
  const navigation = useNavigation();
 
  const renderItem = ({ item }) => (
    <View style={styles.container}>
      
    <TouchableOpacity
      style={styles.Item}
      onPress={() => navigation.navigate('ItemPackagePage', { item })}
    >
      <Image source={{ uri: item.imageData?.publicUrl }} style={styles.itemImage} /> 
      <View style={styles.itemInfo}>
        <Text style={styles.itemName}>{item.name}</Text>
        <Text style={styles.iteminfo}>{item.small_description}</Text>
        <View style={styles.itemInfo2}>
          <AntDesign name="star" size={24} color="#FF6F25" />
          <Text style={styles.itemPoint}>{item.point}</Text>
        </View>
      </View>
    </TouchableOpacity>
    </View>

  );

  return (
    <View style={styles.container}>
      <FlatList
        data={items}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
        width: "95%",
        marginLeft: "auto",
        marginRight: "auto",
        paddingBottom: 20,
       
    },
    Item: {
      flexDirection: 'column',
      marginBottom: 10,
      backgroundColor: "#AAAAAA",
      height: 240,
      borderRadius: 7,
    },
    itemImage: {
      width: "100%",
      height: "70%",
      marginRight: 10,
      borderTopLeftRadius: 7,
      borderTopRightRadius: 7,
    },
    itemInfo: {
        padding: 13,
        flexDirection: 'column', 
    },
    itemInfo2: {
        justifyContent: "center",
        alignItems: "center",
        position: "absolute",
        flexDirection: 'row',
        marginLeft: "88%",
        marginTop: "6%", 
    },
   itemName: {
      fontSize: 16,
      fontWeight: '900',
      color: "#0D0D0D",
      marginBottom: 10,
    },
    iteminfo: {
      fontSize: 11,
      fontWeight: '800',
      color: "#292929",
      
    },
    iteminfo2: {
      fontSize: 20,
      fontWeight: '900',
      color: "#292929",
    },
    itemPoint: {
      fontSize: 20,
      fontWeight: '900',
      color: "#0D0D0D",
      marginLeft: 5,
    },
  });

export default ItemList;

// Seçilen kategoriye göre Tüm Ürünlerin listelendiği component fotoğraf,başlık,puan ve bilgi kısmı bulunmaktadır.
