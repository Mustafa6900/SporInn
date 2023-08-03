import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Modal } from 'react-native';
import { FontAwesome } from "react-native-vector-icons";
import { AntDesign } from '@expo/vector-icons';
import { supabase } from '../supabaseClient';

const CommentList = ({ item }) => {
  const [comments, setComments] = useState([]);
  const [selectedComment, setSelectedComment] = useState(null);
  const [selectedCommentUser, setSelectedCommentUser] = useState(null);

  
  useEffect(() => {
    if(item.type === 'fitness_center'){
    const fetchComments = async () => {
      const { data: fetchedComments, error } = await supabase
        .from('comments')
        .select('*,profiles(first_name,last_name)') 
        .eq('fitness_centers_id', item.id);
      if (error) {
        console.error(error);
      } else {
        setComments(fetchedComments);
      }
    };
    fetchComments();
  }
  else if(item.type === 'sports_facility'){
    const fetchComments = async () => {
      const { data: fetchedComments, error } = await supabase
        .from('comments')
        .select('*,profiles(first_name,last_name)') 
        .eq('sports_facilities_id', item.id);
      if (error) {
        console.error(error);
      } else {
        setComments(fetchedComments);
      }
    }
    fetchComments();
  }
  }, []);


  const renderItem = ({ item, index }) => (
    <TouchableOpacity onPress={() => [setSelectedComment(comments[index].comments_text), setSelectedCommentUser(comments[index].profiles.first_name) ]}>
      <View style={styles.commentContainer}>
        <FontAwesome name={"comment"} color={"#AAAAAA"} size={20} style={{ marginRight: 10, marginLeft: 10 }} />
        <Text style={styles.commentText}>{item.comments_text}</Text>
        <AntDesign name="star" size={24} color="#FF6F25" style={{ left: "79%", position: "absolute" }} />
        <Text style={{ fontSize: 20, fontWeight: "800", left: "87%", fontFamily: 'Roboto', position: "absolute", color: "#AAAAAA" }}>{item.rating}.0</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
    {comments.length > 0 ? (
      <FlatList
        data={comments}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        showsVerticalScrollIndicator={false}
      />
    ) : (
      <Text style={styles.noCommentText}>Henüz gösterilebilecek bir yorum yok</Text>
    )}


    <Modal visible={selectedComment !== null} transparent animationType="fade">
      <View style={styles.modalContainer}>
        <Text style={styles.modalUserText}>{selectedCommentUser}</Text>
        <Text style={styles.modalText}>{selectedComment}</Text>
        <TouchableOpacity onPress={() => setSelectedComment(null)} style={styles.closeButton}>
          <FontAwesome name={"close"} color={"#0D0D0D"} size={40} />
        </TouchableOpacity>
      </View>
    </Modal>
  </View>
  );
};

const styles = StyleSheet.create({
  container: {
    minHeight: 175,
    maxHeight: 175,
    borderRadius: 7,
    borderColor: '#FF6F25',
    borderWidth: 1.5,
    backgroundColor: "#292929"
  },
  commentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
  },
  commentText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#AAAAAA',
    width: "65%",
  },
  noCommentText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#AAAAAA',
    textAlign: 'center',
    marginTop: 10,
    marginBottom: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
  },
  modalText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#EEEEEE',
    padding: 20,
    borderRadius: 10,
    backgroundColor: '#292929',
  },
  modalUserText: {
    fontSize: 20,
    fontWeight: '500',
    color: '#FF6F25',
    padding: 20,
    borderRadius: 10,
    backgroundColor: '#292929',
    top: 10,
    left: 10,
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
});

export default CommentList;
