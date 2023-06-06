import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const ItemList = ({ items }) => {
  const navigation = useNavigation();

  const handleItemPress = (packet, price, shortdetail, bigdetail, image) => {
    navigation.navigate('PackageDetailPage', { packet, price, shortdetail, bigdetail, image });
  };

  const renderItem = ({ item, index }) => (
    <TouchableOpacity
      style={styles.item}
      onPress={() => handleItemPress(item, items.packetsPrice[index], items.packetsDetail[index], items.packetsBigDetail[index], items.image)}
    >
      <View style={styles.info}>
        <Text style={styles.itemName}>{item}</Text>
        <Text style={styles.itemDetail}>{items.packetsDetail[index]}</Text>
        <Text style={styles.itemPrice}>{items.packetsPrice[index]}</Text>
      </View>
      <Image source={require('../../../assets/buttonpicture.png')} style={styles.itemImage} />
    </TouchableOpacity>
  );

  return (
    <FlatList
      style={styles.container}
      data={items.packets}
      renderItem={renderItem}
      keyExtractor={(item, index) => index.toString()}
      showsVerticalScrollIndicator={false}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    width: '95%',
    marginTop: 25,
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  item: {
    flexDirection: 'row',
    marginBottom: 20,
    backgroundColor: '#AAAAAA',
    height: 95,
    borderRadius: 7,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  info: {
    flexDirection: 'column',
    marginLeft: 10,
  },
  itemName: {
    fontSize: 16,
    color: '#0D0D0D',
    fontFamily: 'Roboto',
    fontWeight: 'bold',
    letterSpacing: 0.4,
  },
  itemImage: {
    width: '30%',
    height: '90%',
    marginRight: 10,
    borderRadius: 7,
  },
  itemDetail: {
    fontSize: 14,
    color: '#000000',
    opacity: 0.7,
    fontFamily: 'Roboto',
    marginTop: 5,
  },
  itemPrice: {
    fontSize: 16,
    color: '#FF6F25',
    fontFamily: 'Roboto',
    fontWeight: '700',
    marginTop: 5,
  },
});

export default ItemList;
