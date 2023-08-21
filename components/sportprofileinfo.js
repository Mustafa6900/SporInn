import React, { useState, useContext,useEffect } from 'react';
import { View, Image, TouchableOpacity, Text, StyleSheet, Modal, TextInput, Alert } from 'react-native';
import ItemTitleFavorite from './titleFavorite';
import { FontAwesome } from "react-native-vector-icons";
import CommentList from './commentList';
import * as Animatable from 'react-native-animatable';
import { MaterialIcons } from '@expo/vector-icons';
import { supabase } from '../supabaseClient';
import { AuthContext } from '../pages/Auth/AuthContext';
import StarRating from 'react-native-star-rating-fixed-viewproptype';
import { useNavigation } from '@react-navigation/native';

const SportProfileInfo = ({ items }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [isCommentModalVisible, setIsCommentModalVisible] = useState(false);
  const [newComment, setNewComment] = useState('');
  const [rating, setRating] = useState(3);
  
  const [latitudes, setLatitudes] = useState([]);
  const [longitudes, setLongitudes] = useState([]);
  const { session } = useContext(AuthContext);
  const navigation = useNavigation();

  const userName = session.user?.user_metadata?.first_name;
  const lastName = session.user?.user_metadata?.last_name;

  const locationArray = items.location.split(',').map(coord => parseFloat(coord));

  const latitude = locationArray[0]; // Enlem (Latitude)
  const longitude = locationArray[1]; // Boylam (Longitude)
  
  const handleImagePress = () => {
    setIsModalVisible(true);
  };

  const closeModal = () => {
    setIsModalVisible(false);
  };

  const handleCommentsPress = () => {
    setShowComments(!showComments);
  };

  const handleNewCommentPress = () => {
    setIsCommentModalVisible(true); // Yorum yap popup'ını açmak için modalı görünür yap
  };

  const handleNewCommentSubmit = async () => {
    if(items.type === "fitness_center"){
    try {
        const { data, error } = await supabase.from('comments').insert({
          created_at: new Date(),
          fitness_centers_id: items.id,
          created_id: session.user.id,
          rating: rating,
          comments_text: newComment, 
        });
        if (error) {
          console.error("Error inserting comment:", error.message);
        } else {
          Alert.alert("Yorumunuz başarıyla eklendi!");
        }
        setNewComment('');
        setRating(0);
        setIsCommentModalVisible(false);
      
    } catch (error) {
      console.error("Error:", error.message);
    }
  }
  else if(items.type === "sports_facility"){
    try {
      const { data, error } = await supabase.from('comments').insert({
        created_at: new Date(),
        sports_facilities_id: items.id,
        created_id: session.user.id,
        rating: rating,
        comments_text: newComment,
      });
      if (error) {
        console.error("Error inserting comment:", error.message);
      } else {
        Alert.alert("Yorumunuz başarıyla eklendi!");
      }
      setNewComment('');
      setRating(0);
      setIsCommentModalVisible(false);
    
  } catch (error) {
    console.error("Error:", error.message);
  }
  };
  };


  return (
    <View>
      <Animatable.View
        animation="zoomIn"
        duration={1000}
        style={styles.container}
      >
        <Image source={{ uri: items.imageData?.publicUrl }} style={styles.image} />
        <ItemTitleFavorite title={items.name} point= {items.rating !== null ? items.rating : "0.0"} />
        <TouchableOpacity onPress={handleImagePress}>
          {isModalVisible ? null : (
            <FontAwesome name="angle-double-down" color="#FF6F25" size={30} style={{ left: "47%", bottom: "1%" }} />
          )}
        </TouchableOpacity>
      </Animatable.View>
      {isModalVisible && (
        <Animatable.View
          animation="zoomIn"
          duration={1000}
          style={styles.container}
        >
          <View style={styles.modalContainer}>
            {showComments && (
              <Animatable.View
                animation="zoomInRight"
                duration={1500}
                style={styles.container}
              >
                <CommentList item={items} />
              </Animatable.View>
            )}
            {!showComments && (
              <>
                <Animatable.View
                  animation="zoomInLeft"
                  duration={1500}
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

            <View style={{ flexDirection: "row", justifyContent: 'space-between', top: 5 }}>
              <TouchableOpacity onPress={handleCommentsPress} style={styles.commentButton}>
                {showComments ? (
                  <>
                  {items.type === "fitness_center" ? (
                    <>
                    <MaterialIcons name={"fitness-center"} color={"#0d0d0d"} size={20} style={{ position: "absolute", left: 10 }} />
                    <Text style={styles.commentText}>Salon Detayları</Text>
                    </>
                  ) : (
                    <>
                    <Text style={styles.commentText}>Tesis Detayları    </Text>
                    </>
                  )}
                  </>
                ) : (
                  <>
                    <FontAwesome name={"comments"} color={"#0d0d0d"} size={20} style={{ position: "absolute", left: 20 }} />
                    <Text style={styles.commentText}>Yorumlar</Text>
                  </>
                )}
              </TouchableOpacity>
              {showComments ? (
                <TouchableOpacity onPress={handleNewCommentPress} style={styles.commentButton}>
                  <FontAwesome name={"comment"} color={"#0d0d0d"} size={20} style={{ position: "absolute", left: 20 }} />
                  <Text style={styles.commentText}>Yorum Yap</Text>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                onPress={() =>
                    navigation.navigate('Maps', {
                        districtLat: latitude,
                        districtLng: longitude,
                        directions: true,
                    })
                }
                style={styles.commentButton}
                >
                  <FontAwesome name={"location-arrow"} color={"#0d0d0d"} size={20} style={{ position: "absolute", left: 20 }} />
                  <Text style={styles.commentText}>Yol Tarifi</Text>
                </TouchableOpacity>
              )}
            </View>
            <TouchableOpacity onPress={closeModal} style={styles.closeButton}>
              <FontAwesome name={"angle-double-up"} color={"#292929"} size={30} style={{ left: "1%", top: "1%" }} />
            </TouchableOpacity>

           
            <Modal visible={isCommentModalVisible} transparent animationType="fade">
        <View style={styles.commentModalContainer}>
          <Text style={styles.commentModalText}>Yorum Yap</Text>
          <Text style={styles.commentNameText}> {userName} {lastName} </Text> 
          <StarRating
            disabled={false}
            maxStars={5}
            rating={rating}

            selectedStar={(rating) => setRating(rating)}
            fullStarColor="#FF6F25"
            starSize={30}
            starStyle={{ marginHorizontal: 5 }}
          />
          <TextInput
            style={styles.commentInput}
            placeholder="Yorumunuzu buraya girin..."
            value={newComment}
            onChangeText={(text) => setNewComment(text)}
            textAlignVertical="top"
            multiline={true}
            fontFamily="Arial"
          />
          <TouchableOpacity onPress={handleNewCommentSubmit} style={styles.submitButton}>
            <Text style={styles.submitButtonText}>Gönder</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setIsCommentModalVisible(false)} style={styles.closeCommentButton}>
            <FontAwesome name={"close"} color={"#FFF"} size={40} />
          </TouchableOpacity>
        </View>
      </Modal>

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

  // Yorum yap popup stilleri
  commentModalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  commentModalText: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#FF6F25',
    marginBottom: 15,
  },
  commentNameText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 15,
  },

  commentInput: {
    backgroundColor: '#FFFFFF',
    width: '80%',
    height: 100,
    padding: 10,
    borderRadius: 7,
    marginBottom: 20,
    marginTop:20,
    textAlignVertical: 'top',
  },
  submitButton: {
    backgroundColor: '#FF6F25',
    paddingHorizontal: 30,
    paddingVertical: 10,
    borderRadius: 7,
  },
  submitButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  closeCommentButton: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
});

export default SportProfileInfo;
