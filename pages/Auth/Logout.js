import * as React from 'react';
import { StyleSheet, View, ImageBackground,Text, Dimensions,SafeAreaView } from 'react-native';
import CustomButton from '../../components/custombutton.js';

export default function Logout({ navigation }) {

    return (
        <SafeAreaView style={styles.container}>
        <ImageBackground
          source={require('../../assets/authpic/logoutpic.png')}
          style={styles.backgroundImage}
        >
            <ImageBackground
                source={require('../../assets/authpic/bkpic.png')}
                style={{width: 300,height: 125,top: 55,left: 60,position: "absolute",resizeMode: "contain"}}
                />
            <Text style={{ color: "#FF6F25", fontFamily:"serif",fontStyle:"normal",fontWeight: 900, fontSize: 50,textAlign:"center",alignItems:"center",top:80}}>SporInn</Text>
            {  
            <View style={styles.buttonscontainer}>
                
                <View style={styles.containertext}>
                <Text style={{ color: "#E0E0E0", fontStyle:"normal",fontWeight: 900, fontSize: 25}}>Hoş geldiniz!</Text>
                <Text style={{ color: "#AAAAAA", fontStyle:"normal",fontWeight: 700, fontSize: 19,marginTop:20,marginLeft:-4,textAlign:"center",alignItems:"center"}}>Devam etmek için kayıt ol ya da giriş yap</Text>
                </View>
                <View style={styles.buttons}>
                <CustomButton  
                title="GİRİŞ YAP"
                style={styles.button1}
                onPress={() => navigation.navigate('ExampleLogin')}
                />
                <CustomButton  
                title="KAYIT OL"
                style={styles.button2}
                onPress={() => navigation.navigate('ExampleSignUp')}
                titleStyle={styles.customTitleStyle}
                /></View>
                </View>
        }
        </ImageBackground>
      </SafeAreaView>
    );
}

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    backgroundImage: {
        flex: 1,
        resizeMode: "repeat", // Resmin ekrana sığması için ölçeklendirme
    },
    buttonscontainer: {  
        alignSelf: 'center',
        top: 250,
        borderRadius:7,
        backgroundColor: "#292929",
        shadowColor: '#fff',
        elevation: 4,
        width: 350,
        height: 330,
    },
    containertext: {
        height: 75,
        width: 274,
        top: 25,
        left: 35,
        position: "absolute",
        },
    button1:{
        height: 50,
        width: 274,
        marginBottom: 10,
    },
    button2:{
        height: 50,
        width: 274,
        marginTop: 20,
        backgroundColor: "#0D0D0D",
    },
    customTitleStyle: {
        color: '#585858',
    },
    buttons: {
        alignItems: 'center',
        justifyContent: 'center',
        alignContent: 'center',
        top: 170,
        left: 35,
        position: "absolute",
    },
  });