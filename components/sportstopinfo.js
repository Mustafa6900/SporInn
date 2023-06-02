import React from 'react';
import { StyleSheet, ImageBackground, View } from 'react-native';
import CustomButton from './custombutton';
const SportsTopInfo = ({ navigation }) => {

    return (
        <ImageBackground source={require(".././assets/sliderpic/e.jpg")} style={styles.container}>
            <View style={styles.viewcontainer}>
                <CustomButton
                    title="Adres Belirle veya Seç"
                    onPress={() => navigation.navigate('Budy')}
                    style={styles.button1}
                    titleStyle={{ color: '#AAAAAA' }}
                    icon="radar"
                    iconStyle={{ fontSize: 28, marginLeft: "40%" }}

                />
                <CustomButton
                    title="Listeler "
                    onPress={() => navigation.navigate('Budy')}
                    style={styles.button2}
                />
            </View>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        height: 248,
        resizeMode: 'cover',
        top: -25,
    },
    viewcontainer: {
        flex: 1,
        justifyContent: 'center',
        borderRadius: 7,
        width: "90%",
        height: 160,
        position: 'absolute',
        backgroundColor: '#AAAAAA',
        top: 115,
        left: "5%",
    },
    button1: {
        backgroundColor: '#0D0D0D',
        width: "90%",
        marginLeft: 17,
        marginBottom: 10,
    }
    ,
    button2: {
        width: "90%",
        marginLeft: 17,
        
    }

});

export default SportsTopInfo;