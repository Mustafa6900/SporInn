import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { Ionicons } from '@expo/vector-icons';
const ProfileTopInfo = ({session }) => {
 
    const { user } = session;

    return (
        <View style={styles.container}>
        <Image source={require("../assets/profilepic/user.png")} style={styles.topContainerImage} />
        <Text style={styles.text}>{user?.user_metadata.first_name+" "+user?.user_metadata.last_name}</Text>
        <View style={{flexDirection:"row", marginLeft:20,marginBottom:10}}>
        <Ionicons name="mail-outline" size={40}></Ionicons>
        <Text style={{fontSize:20,marginTop:10,marginLeft:10}}>{user.email}</Text>
        </View>
        <View style={{flexDirection:"row", marginLeft:20,marginBottom:20}}>
        <Ionicons name="phone-portrait-outline" size={35}></Ionicons>
        <Text style={{fontSize:20,marginTop:10,marginLeft:15}}>{user?.user_metadata.phone}</Text>
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