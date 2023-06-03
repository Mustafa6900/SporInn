import React from 'react';
import { View, Text, StyleSheet,TouchableOpacity,ScrollView,Image } from 'react-native';
import CustomButton from '../../../components/custombutton';
const ItemList = ({ items, onItemPress }) => {
  const handleItemPress = (item) => {
    onItemPress(item);
  };

  return (
    <ScrollView style={styles.container}>
      {items.appointmentDay.map((appointment, index) => (
        <TouchableOpacity
          key={index}
          style={styles.item}
          /*onPress={() => handleItemPress(appointment)}*/
        >       
          <Text style={styles.itemAppointmentDay}>{appointment}</Text>
          <Text style={styles.itemAppointmentTime}>{items.appointmentTime[index]}</Text>
              
        </TouchableOpacity>
      ))}
        <CustomButton
            title="Randevu Al"
            style={{ marginTop:120}}
            titleStyle={{ color: '#0D0D0D',fontSize: 18,fontFamily: 'Roboto',fontWeight: '900',letterSpacing: 0.4, }}
        />

    </ScrollView>
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
    flexDirection: 'column',
    marginBottom: 20,
    backgroundColor: '#AAAAAA',
    height: 95,
    borderRadius: 7,
    justifyContent: 'center',
    alignItems: 'center',
     
  },

  itemAppointmentTime: {
    fontSize: 14,
    color: "#000000",
    opacity: 0.7,
    fontFamily: 'Roboto',
    marginTop: 5,
  },
  itemAppointmentDay: {
    fontSize: 16,
    color: "#000000",
    fontFamily: 'Roboto',
    fontWeight: '700',
    marginTop: 5,
  },


});

export default ItemList;

// Seçilen mekan için randevu gün ve saatlerini gösteren component