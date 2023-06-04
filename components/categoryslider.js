import React from 'react';
import { View, Text, FlatList,StyleSheet } from 'react-native';

const SubCategories = ({ items, onItemPress }) => {
  const renderItem = ({ item }) => (
    
    <Text style={styles.categoryText} /*onPress={() => onItemPress(item)}*/>{item}</Text>
  );
  return (
    <View style={styles.container}>
      <FlatList
        style={styles.flatcontainer}
        data={items.subcategories}
        horizontal={true}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#AAAAAA",
        overflow: "hidden",
        marginTop: 25,
        height: 50,
        borderRadius: 3,  
    },
    flatcontainer: {
      paddingLeft: 25,
      
    },
    categoryText: {
        fontSize: 14,
        color: '#AAAAAA',
        fontFamily: 'Roboto',
        fontWeight: 'bold',
        letterSpacing: 0.4,
        borderWidth: 1,
        borderRadius: 7,
        height: 30,
        width:"auto",
        padding: 5,
       
        marginRight: 25,
        marginTop: 10,
        backgroundColor: "#1F1F1F",
        paddingLeft: 15,
        paddingRight: 15,
    },
    });


export default SubCategories;

// Seçilen ürün için alt kategorileri gösteren component

