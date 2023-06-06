import * as React from 'react';
import { SafeAreaView,StyleSheet,Text,View,ScrollView } from 'react-native';
import Header from '../../components/header';
import PictureButton from '../../components/picturebutton';
export default function Budy({ navigation }) {
            return (
                <SafeAreaView style={styles.container}>
                <Header title="Budy" />
                <ScrollView  >
                 <View style={{ alignItems:"center", paddingTop:10,paddingBottom:100}}>
                <PictureButton 
                title="Kişisel Antrenör"
                onPress={() => navigation.navigate('PtDtitemPages',{ category: "Kişisel Antrenör" }) }
                backgroundImage={require('../../assets/budypic/pt.png')}
                style={{top:30, marginBottom: 60}}
                />
                
                <PictureButton 
                title="Diyetisyen"
                onPress={() => navigation.navigate('PtDtitemPages',{ category: "Diyetisyen" }) }
                backgroundImage={require('../../assets/budypic/diet.png')}
                style={{marginBottom: 30}}
                />
                <PictureButton 
                title="Müzik"
                onPress={() => console.log("Müzik tıklandı") }
                backgroundImage={require('../../assets/budypic/music.png')}
                style={{marginBottom: 30}}
                />
                <PictureButton 
                title="Challenge"
                onPress={() => console.log('challenge tıklandı') }
                backgroundImage={require('../../assets/budypic/challenge.png')}
                style={{marginBottom: 30}}
                />
                </View>
                </ScrollView>
                </SafeAreaView>
            );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#292929',
    },
});

