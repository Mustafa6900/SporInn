import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { FontAwesome } from "react-native-vector-icons";

const CommentList = () => {
  const comments = [
    "Bu ürün harika!",
    "Çok memnun kaldım!",
    "Harika bir deneyimdi.",
    "Harika bir deneyimdi.",
    "Harika bir deneyimdi.",
    "Harika bir deneyimdi.",
    "Harika bir deneyimdi.",
    "Harika bir deneyimdi.",
    "Harika bir deneyimdi.",
    "Harika bir deneyimdi.",
    "Harika bir deneyimdi.",
    "Harika bir deneyimdi.",
    "Harika bir deneyimdi.",
    "Harika bir deneyimdi.",
    "Harika bir dasdddddddddddddddddddddddddddassssssssssssssssseneyimdi.",
  ];

  const renderItem = ({ item }) => (
    <View style={styles.commentContainer}>
      <FontAwesome name={"comments"} color={"#0d0d0d"} size={20} style={{ marginRight: 10 }} />
      <Text style={styles.commentText}>{item}</Text>
    </View>
  );

  return (
    <FlatList
      data={comments}
      renderItem={renderItem}
      keyExtractor={(item, index) => index.toString()}
      contentContainerStyle={styles.container}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
  },
  commentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  commentText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#0d0d0d',
  },
});

export default CommentList;
