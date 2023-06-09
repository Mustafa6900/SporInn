import React from 'react';
import { Text, StyleSheet, TouchableOpacity, View, ScrollView,Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const MyPaymentMethods = ({ item }) => {
  return (
    <ScrollView style={styles.container}>
      {item.creditCard.map((creditCard, index) => (
        <View
          style={styles.button}
          key={index}
        >
          <View style={styles.buttontext}>
          <Image source={require("../../../assets/paymentpic/mastercard.png")} style={{ width: 50, height: 50, marginLeft: 20 }} />
            <View style={{ flexDirection: "column" }}>
              <Text style={{ fontSize: 20, marginLeft: 20, fontWeight: '900' }}>{creditCard.cardName}</Text>
              <Text style={{ fontSize: 15, marginLeft: 20 ,width:230}}>{creditCard.cardNo}</Text>
            </View>
            <Ionicons name="trash-outline" size={50} style={{ marginLeft: "auto", marginRight: 20 }} />
          </View>
        </View>
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

export default MyPaymentMethods;
