import React from 'react';
import { Text, StyleSheet, TouchableOpacity, View, ScrollView,Image,SafeAreaView } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Header from '../../../components/header';
import BackButton from '../../../components/backbutton';

export default function Help(){
    return(
        <SafeAreaView style={styles.container}>
            <Header title="Yardım" />
            <BackButton left={15} top={43} />
            <View style={{marginTop:10}}>
            <TouchableOpacity style={styles.buttons}>
                <Text style={{ fontSize: 14, marginLeft: 20, fontWeight: '700', marginBottom: "auto", marginTop: "auto" }}>Hakkımızda</Text> 
                <MaterialCommunityIcons name="chevron-right" size={40} style={{marginLeft:"auto", marginBottom: "auto", marginTop: "auto",}}/>
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttons}>
                <Text style={{ fontSize: 14, marginLeft: 20, fontWeight: '700', marginBottom: "auto", marginTop: "auto" }}>Müşteri Kişisel Verilerinin Korunması Politikası</Text>
                <MaterialCommunityIcons name="chevron-right" size={40} style={{marginLeft:"auto", marginBottom: "auto", marginTop: "auto",}}/>
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttons}>
                <Text style={{ fontSize: 14, marginLeft: 20, fontWeight: '700', marginBottom: "auto", marginTop: "auto" }}>MasterPass</Text>
                <MaterialCommunityIcons name="chevron-right" size={40} style={{marginLeft:"auto", marginBottom: "auto", marginTop: "auto",}}/>
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttons}>
                <Text style={{ fontSize: 14, marginLeft: 20, fontWeight: '700', marginBottom: "auto", marginTop: "auto" }}>SSS</Text>
                <MaterialCommunityIcons name="chevron-right" size={40} style={{marginLeft:"auto", marginBottom: "auto", marginTop: "auto",}}/>
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttons}>
                <Text style={{ fontSize: 14, marginLeft: 20, fontWeight: '700', marginBottom: "auto", marginTop: "auto" }}>SporInn - Müşteri Kişisel Verileri Aydınlatma Metni</Text>
                <MaterialCommunityIcons name="chevron-right" size={40} style={{marginLeft:"auto", marginBottom: "auto", marginTop: "auto",}}/>
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttons}>
                <Text style={{ fontSize: 14, marginLeft: 20, fontWeight: '700', marginBottom: "auto", marginTop: "auto" }}>Tanımlama Teknolojileri Hakkında Bilgilendirme</Text>
                <MaterialCommunityIcons name="chevron-right" size={40} style={{marginLeft:"auto", marginBottom: "auto", marginTop: "auto",}}/>
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttons}>
                <Text style={{ fontSize: 14, marginLeft: 20, fontWeight: '700', marginBottom: "auto", marginTop: "auto" }}>Gizlilik Politikası</Text>
                <MaterialCommunityIcons name="chevron-right" size={40} style={{marginLeft:"auto", marginBottom: "auto", marginTop: "auto",}}/>
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttons}>
                <Text style={{ fontSize: 14, marginLeft: 20, fontWeight: '700', marginBottom: "auto", marginTop: "auto" }}>Kullanım Koşulları</Text>
                <MaterialCommunityIcons name="chevron-right" size={40} style={{marginLeft:"auto", marginBottom: "auto", marginTop: "auto",}}/>
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttons}>
                <Text style={{ fontSize: 14, marginLeft: 20, fontWeight: '700', marginBottom: "auto", marginTop: "auto" }}>İşlem Rehberi</Text>
                <MaterialCommunityIcons name="chevron-right" size={40} style={{marginLeft:"auto", marginBottom: "auto", marginTop: "auto",}}/>
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
        height:40,
        borderRadius:3,
        marginBottom:10,
      
    },

});