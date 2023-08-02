import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Modal } from 'react-native';
import { FontAwesome } from "react-native-vector-icons";
import { AntDesign } from '@expo/vector-icons';

const CommentList = () => {

  const comments = [
    "Bu ürün harika!",
    "Çok memnun kaldım!",
    "Bu ürünü çok beğendim!",
    "Bu ürünü çok beğendim!",
    "Bu ürünü çok beğendim!",
    "Bu ürünü çok beğendim!",
    "Bu ürünü çok beğendim!",
    "Bu ürünü çok beğendim!",
    "Bu ürünü çok beğendim!",
    "Bu ürünü çok beğendim!",
    "Bu ürünü çok beğendim!",
  ];

  const point = [
    "4.8",
  ]; 

  const [selectedComment, setSelectedComment] = useState(null);

  const renderItem = ({ item, index }) => (
    <TouchableOpacity onPress={() => setSelectedComment(comments[index])}>
      <View style={styles.commentContainer}>
        <FontAwesome name={"comment"} color={"#AAAAAA"} size={20} style={{ marginRight: 10,marginLeft:10 }} />
        <Text style={styles.commentText}>{item}</Text>
        <AntDesign name="star" size={24} color="#FF6F25" style={{left:"79%",position:"absolute"}} />
        <Text style={{fontSize:20,fontWeight:"800",left:"87%",fontFamily:'Roboto',position:"absolute",color:"#AAAAAA"}}>{point}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={comments}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        showsVerticalScrollIndicator={false}
      />

      {/* Modal */}
      <Modal visible={selectedComment !== null} transparent animationType="fade">
        <View style={styles.modalContainer}>
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
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
    padding: 20,
    borderRadius: 10,
    backgroundColor: '#292929',
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
});

export default CommentList;
