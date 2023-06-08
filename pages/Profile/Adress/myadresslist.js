import React from 'react';
import { Text, StyleSheet, TouchableOpacity, View, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const myAdressList = ({ item }) => {
  return (
    <ScrollView style={styles.container}>
      {item.adresses.map((address, index) => (
        <TouchableOpacity
          style={styles.button}
          key={index}
        >
          <View style={styles.buttontext}>
            <MaterialCommunityIcons name="home-map-marker" size={50} style={{ marginLeft: 20 }} />
            <View style={{ flexDirection: "column" }}>
              <Text style={{ fontSize: 20, marginLeft: 20, fontWeight: '900' }}>{address.adressName}</Text>
              <Text style={{ fontSize: 15, marginLeft: 20 ,width:230}}>{address.adres}</Text>
            </View>
            <Ionicons name="trash-outline" size={50} style={{ marginLeft: "auto", marginRight: 20 }} />
          </View>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
 
    marginTop: 20,
  },
  button: {
    flexDirection: 'column',
    backgroundColor: "#AAAAAA",
    height: 100,
    borderRadius: 3,
    marginBottom: 20,
  },
  buttontext: {
    flexDirection: "row",
    marginBottom: "auto",
    marginTop: "auto",

  },
});

export default myAdressList;
