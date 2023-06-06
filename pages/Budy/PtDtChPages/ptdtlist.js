import React from 'react';
import { Text, StyleSheet, TouchableOpacity, Image, View, FlatList } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const ItemList = ({ items, styletip,imagestyletip}) => {
  
  const navigation = useNavigation();

  const renderItem = ({ item }) => (
    <View style={styles.container}>
    <TouchableOpacity
      style={[styles.Item,imagestyletip]}
      onPress={() =>  console.log("tıklandı")}
    >
      <Image source={require('../../../assets/buttonpicture.png')} style={styles.itemImage} />
      <View style={styles.itemInfo}>
        <Text style={styles.itemName}>{item.name}</Text>
        <Text style={styles.iteminfo}>{item.info}</Text>
       
      </View>
    </TouchableOpacity>
    </View>

  );

  return (
    <View style={[styles.container, styletip]}>
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
        paddingTop: 15,
        paddingBottom: 10,
    },
  
    Item: {
      flexDirection: 'column',
      backgroundColor: "#AAAAAA",
      height: 240,
      borderRadius: 7,
    },
    itemImage: {
      width: "100%",
      height: "70%",
      marginRight: 10,
      borderRadius: 7,
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
        marginLeft: "70%",
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
   
  });

export default ItemList;

// Seçilen kategoriye göre Tüm Ürünlerin listelendiği component fotoğraf,başlık,puan ve bilgi kısmı bulunmaktadır.
