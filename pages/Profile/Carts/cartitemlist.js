import React, { useState } from 'react';
import { Text, StyleSheet, TouchableOpacity, View, ScrollView,Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import CheckButton  from '../../../components/checkbutton';
const Cartitemlist = ({ item }) => {
    const [isChecked, setChecked] = useState(false);
    const handleButtonPress = () => {
      setChecked(!isChecked);
    };
  return (
    <ScrollView style={styles.container}>
      {item.cart.map((cart, index) => (
        <TouchableOpacity
          style={styles.button}
          key={index}
        >
          <View style={styles.allinfo}>
            <View style={styles.dealer}>
          <Text style={{ fontSize: 20, marginLeft: 20, fontWeight: '900' }}>{cart.dealerName}</Text>
          </View>
              <View style={styles.info}>
                <View style={{marginLeft:13}}>
              <CheckButton
                title="✓"
                onPress={handleButtonPress}
                checked={isChecked}
              /></View>
              
              <Image source={require("../../../assets/productcategoriespic/supplement.png")} style={{width: 80, height: 80,marginLeft:10}}/>
             
              <View style={styles.infodetail}>
            
              <Text style={{ fontSize: 20, marginLeft: 20, fontWeight: '900' }}>{cart.name}</Text>
              <Text style={{ fontSize: 15, marginLeft: 20 ,width:150}}>{cart.description}</Text>
              </View>
              <Text style={styles.price}>₺{cart.price}</Text>
            </View>
            
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
    width: "95%",

    marginBottom: 80,
    marginLeft:"auto",
    marginRight:"auto",
    
  },
  allinfo: {
    flexDirection: "column",
  },
    dealer:{
    height: 50,
    marginBottom:5,
    backgroundColor: "#AAAAAA",
    justifyContent: "center",
    borderTopLeftRadius: 7,
    borderTopRightRadius: 7,
    }
    ,
    info:{
    flexDirection: "row",
    backgroundColor: "#AAAAAA",
    height: 100,
    borderBottomLeftRadius: 7, 
    borderBottomRightRadius: 7,
    alignItems: "center",
    justifyContent: "center",
    padding: 5,
    minHeight: 150,
    }
    ,
    infodetail:{
    flexDirection: "column",
    marginBottom: "auto",
    marginTop: "auto",
    flexDirection: "column",
    },
    price:{
    fontSize: 20,
    marginLeft: 18,
    fontWeight: '800',
    marginTop: "auto",
    color: "#FF6F25",
    },
});

export default Cartitemlist;
