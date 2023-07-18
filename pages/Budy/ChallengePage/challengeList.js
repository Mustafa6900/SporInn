import React from 'react';
import { Text, StyleSheet, TouchableOpacity, Image, View, FlatList } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const ItemList = ({ items}) => {
  
    const navigation = useNavigation();

    const handleItemPress = (eventId,eventName, person, event,adress,bigdetail,eventStartTime,eventEndTime) => {
      navigation.navigate('ChallengeDetailPage', {eventId, eventName, person, event,adress,bigdetail,eventStartTime,eventEndTime});
    };

    const formatDate = (startDateString, endDateString) => {
      const startDate = new Date(startDateString);
      const startHours = String(startDate.getHours()).padStart(2, '0');
      const startMinutes = String(startDate.getMinutes()).padStart(2, '0');
      const monthNames = new Intl.DateTimeFormat('tr', { month: 'long' }).format;
      const startMonth = monthNames(startDate);
      const formattedStartDate = `${startDate.getDate()} ${startMonth} ${startDate.getFullYear()}`;
  
      return `${startHours}:${startMinutes} /  ${formattedStartDate}`;
    };
  const renderItem = ({ item }) => (
    <View style={styles.container}>
    <TouchableOpacity
      style={styles.Item}
      onPress={() => handleItemPress(item.id,item.name,item.capacity, item.small_description,item.map_url,item.description,item.start_date,item.end_date)}
      >
      <Image source={require('../../../assets/buttonpicture.png')} style={styles.itemImage} />
      <View style={styles.itemInfo}>
        <Text style={styles.itemName}>{item.name}</Text>
        <Text style={styles.iteminfo}>{item.small_description}</Text>
        <View style={styles.itemInfo2}> 
          <Text style={styles.iteminfo2}>{formatDate(item.start_date,item.end_date)}</Text>
        </View>
      </View>
    </TouchableOpacity>
    </View>

  );

  return (
    <View style={styles.container}>
      <FlatList
        data={items}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        showsVerticalScrollIndicator={false}
       
      />
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
        width: "95%",
        marginLeft: "auto",
        marginRight: "auto",
        paddingTop: 10,
        paddingBottom: 10, 
    },
  
    Item: {
      flexDirection: 'column',
      backgroundColor: "#AAAAAA",
      height: 240,
      borderRadius: 7,
    },
    itemImage: {
      width: "100%",
      height: "70%",
      marginRight: 10,
      borderRadius: 7,
    },
    itemInfo: {
        padding: 13,
        flexDirection: 'column',
         
    },
    itemInfo2: {
        justifyContent: "center",
        alignItems: "center",
        position: "absolute",
        flexDirection: 'row',
        marginLeft: "70%",
        marginTop: "6%", 
    },
    itemName: {
      fontSize: 16,
      fontWeight: '900',
      color: "#0D0D0D",
      marginBottom: 10,
    },
    iteminfo: {
      fontSize: 11,
      fontWeight: '800',
      color: "#292929",
      
    },
    iteminfo2: {
      fontSize: 15,
      fontWeight: '900',
      color: "#0D0D0D",
    },
   
  });

export default ItemList;

// Seçilen kategoriye göre Tüm Ürünlerin listelendiği component fotoğraf,başlık,puan ve bilgi kısmı bulunmaktadır.
