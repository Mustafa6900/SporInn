import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { Ionicons } from '@expo/vector-icons';

const ProfileTopInfo = ({ item, session }) => {
    const [first_name, setFirst_Name] = useState('')
    const [last_name, setLast_Name] = useState('')
   
    console.log()
    return (
        <View style={styles.container}>
        <Image source={require("../assets/profilepic/user.png")} style={styles.topContainerImage} />
        <Text style={styles.text}>{item.name+" "+item.surname}</Text>
        <View style={{flexDirection:"row", marginLeft:20,marginBottom:10}}>
        <Ionicons name="mail-outline" size={40}></Ionicons>
        <Text style={{fontSize:20,marginTop:10,marginLeft:10}}>{item.email}</Text>
        </View>
        <View style={{flexDirection:"row", marginLeft:20,marginBottom:20}}>
        <Ionicons name="phone-portrait-outline" size={35}></Ionicons>
        <Text style={{fontSize:20,marginTop:10,marginLeft:15}}>{item.phone}</Text>
        </View>
        </View>
    );
    }

const styles = StyleSheet.create({
    container: {
        backgroundColor:"#AAAAAA",
        borderRadius: 3,
        
      
    }
    ,
    topContainerImage: {
        width: 90,
        height: 90,
        marginBottom: 10,
        marginTop: 20,
        borderRadius: 7,
        marginLeft:"auto",
        marginRight:"auto",
        

    },
    text: {
        fontSize: 30,
        color: '#0D0D0D',
        fontFamily: 'Roboto',
        fontWeight: '900',
        letterSpacing: 0.4,
        marginTop: 10,
        marginBottom: 10,
        marginLeft:"auto",
        marginRight:"auto",
    },
});

export default ProfileTopInfo;