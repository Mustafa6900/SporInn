import * as React from 'react';
import { SafeAreaView,StyleSheet,Text,View,ScrollView } from 'react-native';
import Header from '../../components/header';
import PictureButton from '../../components/picturebutton';

export default function QrCode({ navigation }) {
         return (
            <SafeAreaView style={styles.container}>
            <Header title="QrCode" />
            <View style={{ alignItems:"center", paddingTop:30}}>
           
            <PictureButton 
            title="Spor Salonlarım"
            onPress={() => navigation.navigate('MyEventPage',{ category: "Spor Salonlarım" }) }
            backgroundImage={require('../../assets/budypic/pt.png')}
            style={{top:30, marginBottom: 60}}
            />
            <PictureButton 
            title="Randevularım"
            onPress={() => navigation.navigate('MyEventPage',{ category: "Randevularım" }) }
            backgroundImage={require('../../assets/budypic/allsports.png')}
            style={{marginBottom: 30}}
            />
            <PictureButton 
            title="Challenge'larım"
            onPress={() => navigation.navigate('MyEventPage',{ category: "Challenge" }) }
            backgroundImage={require('../../assets/budypic/challenge.png')}
            style={{marginBottom: 30}}
            />
            </View>
            </SafeAreaView>
        );
    }

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#292929',
    },
});