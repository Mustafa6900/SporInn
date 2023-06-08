import React from 'react';
import { View, Text, StyleSheet,Image,SafeAreaView } from 'react-native';
import Header from '../../../components/header';
import BackButton from '../../../components/backbutton';
import OutputText from '../../../components/outputText';
import QrButton from '../../../components/qrbutton';
const MyEventDetailPage = ({ route }) => {
    const { item } = route.params;


    return (
        <SafeAreaView style={styles.container}>
        <Header title={item.name} />
        <BackButton left={15} top={43} />
        <View style={styles.topContainer}>
        <Image source={ require('../../../assets/buttonpicture.png') } style={styles.topContainerImage} />
        <Text style={styles.text}>{item.name}</Text>
        </View>
        <OutputText text={item.maincategory+ "\n\n"+item.packetsBigDetail+"\n\n"+item.info2+"\n\n"+item.info} left={20} top={-30} />
        <QrButton item={item} />
        </SafeAreaView>
    );

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#292929',
    },
    topContainer: {
        backgroundColor:"#AAAAAA",
        marginTop:-5,
        borderRadius: 0

    },
    topContainerImage: {
        width: 375,
        height: 180,
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
        fontWeight: '600',
        letterSpacing: 0.4,
        marginLeft:"auto",
        marginRight:"auto",
        marginTop: 10,
        marginBottom: 10,
    },

    });

export default MyEventDetailPage;

