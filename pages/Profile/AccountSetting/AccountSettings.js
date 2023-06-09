import React from 'react';
import { TouchableOpacity, Image, Alert, SafeAreaView,View,StyleSheet,Text } from 'react-native';
import Header from '../../../components/header';
import BackButton from '../../../components/backbutton';
import { MaterialCommunityIcons } from '@expo/vector-icons';
export default function AccountSettings(){

    return(
        <SafeAreaView style={styles.container}>
            <Header title="Hesap Ayarları" />
            <BackButton left={15} top={43} />
            <View style={{marginTop:20}}>
            <TouchableOpacity style={styles.buttons}>
             <Image source={require("../../../assets/profilepic/facebooklogo.png")} style={{ width: 50, height: 50, marginLeft: 20,marginBottom:"auto",marginTop:"auto" }} />
                <Text style={{ fontSize: 20, marginLeft: 30, fontWeight: '700', marginBottom: "auto", marginTop: "auto"}}>Facebook</Text>
                <Text style={{ fontSize: 15, marginLeft: 60, width: 320, marginBottom: "auto", marginTop: "auto", fontWeight: '500' }}>Hesabını bağla</Text>
                <MaterialCommunityIcons name="chevron-right" size={50} style={{marginLeft:"auto", marginBottom: "auto", marginTop: "auto",}}/>

            </TouchableOpacity>
            <TouchableOpacity style={styles.buttons}>
             <Image source={require("../../../assets/profilepic/googlelogo.png")} style={{ width: 50, height: 50, marginLeft: 20,marginBottom:"auto",marginTop:"auto" }} />
                <Text style={{ fontSize: 20, marginLeft: 30, fontWeight: '700', marginBottom: "auto", marginTop: "auto"}}>Google</Text>
                <Text style={{ fontSize: 15, marginLeft: 85, width: 320, marginBottom: "auto", marginTop: "auto", fontWeight: '500' }}>Hesabını bağla</Text>
                <MaterialCommunityIcons name="chevron-right" size={50} style={{marginLeft:"auto", marginBottom: "auto", marginTop: "auto",}}/>
            </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:"#292929"
    },
    buttons:{
        flexDirection:"row",
        backgroundColor:"#AAAAAA",
        height:90,
        borderRadius:3,
        marginBottom:10,
       
    },
})

