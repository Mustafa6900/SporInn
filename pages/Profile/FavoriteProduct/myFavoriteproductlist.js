import React from 'react';
import { Text, StyleSheet, TouchableOpacity, Image, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const MyFavoriteproductlist = ({ item }) => {
    
    const navigation = useNavigation();

    const handleItemPress = (packet, price, shortdetail,bigdetail) => {
      navigation.navigate('PackageDetailPage', { packet, price, shortdetail,bigdetail});
    };

  return (
    <View style={styles.container}>
      {item.favoriteProducts.map((favoriteProducts, index) => ( 
          <TouchableOpacity
            key={index}
            style={styles.item}
            onPress={() => handleItemPress(favoriteProducts.name,favoriteProducts.price, "","")}
            >
                
            <Image source={ require('../../../assets/productcategoriespic/supplement.png')} style={styles.itemImage} />
            <View style={styles.itemInfo}>
              <Text style={styles.itemName}>{favoriteProducts.name}</Text>
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
    marginTop: '10%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  item: {
    flexDirection: 'column',
    marginBottom: 55,
    height: 150,
    width: 100,
    borderRadius: 7,
  },
  itemImage: {
    width: '100%',
    height: '70%',
    marginRight: 10,
    borderRadius: 7,
    borderColor: '#FF6F25',
    borderWidth: 0.5,
  },
  itemInfo: {
    marginTop: 10,
    alignItems: 'center',
  },
  itemName: {
    fontSize: 15,
    fontWeight: '700',
    color: '#AAAAAA',
    textAlign: 'center',
  },
});

export default MyFavoriteproductlist;

// Spor listesi (kategoriler) için kullanılan component