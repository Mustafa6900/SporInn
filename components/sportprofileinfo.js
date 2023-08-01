import React, { useState } from 'react';
import { View, Image, TouchableOpacity, Text, StyleSheet } from 'react-native';
import ItemTitleFavorite from './titleFavorite';
import { FontAwesome } from "react-native-vector-icons";

const SportProfileInfo = ({items}) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const handleImagePress = () => {
    setIsModalVisible(true);
  };

  const closeModal = () => {
    setIsModalVisible(false);
  };


  return (
    <View>
      <TouchableOpacity onPress={handleImagePress}>
        <Image source={{uri: items.imageData?.publicUrl}} style={styles.image} />
        <ItemTitleFavorite title={items.name} point="4.8" visible={isModalVisible} />
      </TouchableOpacity>
      
      {isModalVisible && (
        <View style={styles.modalContainer}>
          { items.type === "fitness_center" ? (
             <Text style={styles.modalText}>Adres: {items.address} </Text>)
              : (
                <Text style={styles.modalText}>Uzmanlık Alanı: {items.address} </Text>
              )}
         
          <Text style={styles.modalText}>Detayları: {items.description}</Text>
        
          <TouchableOpacity onPress={closeModal} style={styles.closeButton}>
          <FontAwesome name={"angle-double-up"} color={"#444"} size={30} style={{left:"3%",top:"1%"}}/>

          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  image: {
    width: 375,
    height: 180,
    marginBottom: 10,
    marginTop: 20,
    borderRadius: 7,
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  modalContainer: {
    backgroundColor: '#AAAAAA',
    paddingLeft: 25,
    borderRadius: 7,
    paddingTop:2,
    paddingBottom:10,
    width: 375,
  },
  modalText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#0d0d0d',
    marginBottom: 15,
  
    },
  closeButton: {
   
   
    marginTop: 10,
    alignSelf: 'center',
  },
  closeButtonText: {
    color: '#FFF',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default SportProfileInfo;
