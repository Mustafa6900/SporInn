import React from 'react';
import { View, Text, FlatList,StyleSheet } from 'react-native';

const SubCategories = ({ items, onItemPress }) => {
  const renderItem = ({ item }) => (
    <Text style={styles.categoryText} /*onPress={() => onItemPress(item)}*/>{item}</Text>
  );
  return (
    <View>
      <FlatList
        style={styles.container}
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
        marginLeft: 10,
        marginRight: 10,
        marginTop: 10,
        backgroundColor: "#1F1F1F",
        
    },
    });


export default SubCategories;

// Seçilen ürün için alt kategorileri gösteren component

