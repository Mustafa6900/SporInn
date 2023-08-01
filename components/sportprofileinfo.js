import React, { useState } from 'react';
import { View, Image, TouchableOpacity, Text, StyleSheet } from 'react-native';
import ItemTitleFavorite from './titleFavorite';
import { FontAwesome } from "react-native-vector-icons";
import CommentList from './commentList';

const SportProfileInfo = ({items}) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [showComments, setShowComments] = useState(false); // Yeni showComments state

  const handleImagePress = () => {
    setIsModalVisible(true);
  };

  const closeModal = () => {
    setIsModalVisible(false);
  };

  const handleCommentsPress = () => {
    setShowComments(!showComments); // Yorumlar butonuna tıklandığında showComments durumunu değiştir
  };

  return (
    <View>
      <TouchableOpacity onPress={handleImagePress}>
        <Image source={{ uri: items.imageData?.publicUrl }} style={styles.image} />
        <ItemTitleFavorite title={items.name} point="4.8" />
        {isModalVisible ? null : (<FontAwesome name="angle-double-down" color="#FF6F25" size={30} style={{ left: "47%", bottom: "1%" }} />)}
      </TouchableOpacity>
      {showComments && <CommentList />}
      {isModalVisible && (
        <View style={styles.modalContainer}>
          {/* Eğer yorumlar gösterilmiyorsa adres ve detay bilgisini göster */}
          {!showComments && (
            <>
              {items.type === "fitness_center" ? (
                <Text style={styles.modalText}>Adres: {items.address} </Text>
              ) : (
                <Text style={styles.modalText}>Uzmanlık Alanı: {items.address} </Text>
              )}
              <Text style={styles.modalText}>Detayları: {items.description}</Text>
            </>
          )}

          <View style={{ flexDirection: "row", justifyContent: 'space-between' }}>
            <TouchableOpacity onPress={handleCommentsPress} style={styles.commentButton}>
              <FontAwesome name={"comments"} color={"#0d0d0d"} size={20} style={{ position: "absolute", left: 20 }} />
              <Text style={styles.commentText}>Yorumlar</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => console.log("Yol Tarifi")} style={styles.commentButton}>
              <FontAwesome name={"location-arrow"} color={"#0d0d0d"} size={20} style={{ position: "absolute", left: 20 }} />
              <Text style={styles.commentText}>Yol Tarifi</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity onPress={closeModal} style={styles.closeButton}>
            <FontAwesome name={"angle-double-up"} color={"#292929"} size={30} style={{ left: "1%", top: "1%" }} />
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
    marginTop:5
  
    },
  commentText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#0d0d0d',
    alignSelf: 'center',
    marginLeft:20
    
  },
  commentButton: {
    backgroundColor: '#FF6F25',
    marginTop: 10,
    alignSelf: 'center',
    width: 160,
    height: 30,
    borderRadius: 7,
    justifyContent: 'center',
    textAlign: 'center',

  },

  closeButton: {
    marginBottom:-5,
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
