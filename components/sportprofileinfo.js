import React, { useState } from 'react';
import { View, Image, TouchableOpacity, Text, StyleSheet, ScrollView } from 'react-native';
import ItemTitleFavorite from './titleFavorite';
import { FontAwesome } from "react-native-vector-icons";
import CommentList from './commentList';
import * as Animatable from 'react-native-animatable';
import {MaterialIcons} from '@expo/vector-icons';

const SportProfileInfo = ({ items }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [showComments, setShowComments] = useState(false);

  const handleImagePress = () => {
    setIsModalVisible(true);
  };

  const closeModal = () => {
    setIsModalVisible(false);
  };

  const handleCommentsPress = () => {
    setShowComments(!showComments);
  };

  return (
    <View>
         <Animatable.View
        animation="zoomIn" // İstediğiniz animasyonu buraya ekleyin
        duration={1000} // Animasyon süresini burada ayarlayın
        style={styles.container}
      >
      <Image source={{ uri: items.imageData?.publicUrl }} style={styles.image} />
      <ItemTitleFavorite title={items.name} point="4.8" />
      <TouchableOpacity onPress={handleImagePress}>
        {isModalVisible ? null : ( 
        <FontAwesome name="angle-double-down" color="#FF6F25" size={30} style={{ left: "47%", bottom: "1%" }} />
        )}
      </TouchableOpacity>
      </Animatable.View>
      {isModalVisible && (
        <Animatable.View
        animation="zoomIn" // İstediğiniz animasyonu buraya ekleyin
        duration={1000} // Animasyon süresini burada ayarlayın
        style={styles.container}
      >
        
        <View style={styles.modalContainer}>
            {showComments && (
             <Animatable.View
             animation="zoomInRight" // İstediğiniz animasyonu buraya ekleyin
             duration={1500} // Animasyon süresini burada ayarlayın
             style={styles.container}
           >
              <CommentList />
              </Animatable.View>
          )}
          {!showComments && (
            <>
             <Animatable.View
             animation="zoomInLeft" // İstediğiniz animasyonu buraya ekleyin
             duration={1500} // Animasyon süresini burada ayarlayın
             style={styles.container}
           >
              {items.type === "fitness_center" ? (
                <Text style={styles.modalText}>Adres: {items.address} </Text>
              ) : (
                <Text style={styles.modalText}>Uzmanlık Alanı: {items.address} </Text>
              )}
              <Text style={styles.modalText}>Detayları: {items.description}</Text>
              </Animatable.View>
            </>
          )}

          <View style={{ flexDirection: "row", justifyContent: 'space-between' }}>
            <TouchableOpacity onPress={handleCommentsPress} style={styles.commentButton}>
            {showComments ? ( 
              <>
                <MaterialIcons name={"fitness-center"} color={"#0d0d0d"} size={20} style={{ position: "absolute", left: 10 }} />
                <Text style={styles.commentText}>Salon Detayları</Text>
                </>
              ) : (
              <>
                <FontAwesome name={"comments"} color={"#0d0d0d"} size={20} style={{ position: "absolute", left: 20 }} />
              <Text style={styles.commentText}>Yorumlar</Text>
              </>

              )}
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
        </Animatable.View>
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
    paddingTop: 2,
    paddingBottom: 10,
    width: "95%",
  },
  modalText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#0d0d0d',
    marginBottom: 15,
    marginTop: 5
  },
  commentText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#0d0d0d',
    alignSelf: 'center',
    marginLeft: 20
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
    marginBottom: -5,
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
