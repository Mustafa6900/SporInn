import React from 'react';
import { Text, StyleSheet, TouchableOpacity, Image, View } from 'react-native';

const SportList = ({ categories, onCategoryPress }) => {
  const handleCategoryPress = (category) => {
    onCategoryPress(category);
  };

  return (
    <View style={styles.container}>
      {categories.map((category, index) => (
        <TouchableOpacity
          key={index}
          style={styles.category}
          onPress={() => handleCategoryPress(category)}
        >
          <Image source={category.image} style={styles.categoryImage} />
          <View style={styles.categoryInfo}>
            <Text style={styles.categoryName}>{category.name}</Text>
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignSelf: 'center',
    width: '90%',
    marginTop: '35%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  category: {
    flexDirection: 'column',
    marginBottom: 70,
    height: 120,
    width: 80,
    borderRadius: 7,
  },
  categoryImage: {
    width: '100%',
    height: '70%',
    marginRight: 10,
    borderRadius: 7,
    borderColor: '#FF6F25',
    borderWidth: 0.5,
  },
  categoryInfo: {
    marginTop: 10,
    alignItems: 'center',
  },
  categoryName: {
    fontSize: 15,
    fontWeight: '700',
    color: '#AAAAAA',
    textAlign: 'center',
  },
});

export default SportList;

// Spor listesi (kategoriler) için kullanılan component