import React from 'react';
import { Text,SafeAreaView,StyleSheet } from 'react-native';
import Header from '../../components/header';
import BackButton from '../../components/backbutton';

const QrCodePage = ({ route }) => {
    const { item } = route.params;
    console.log("itemmsmsms",item)

    return(
        <SafeAreaView style={styles.container}>
            <Header title="Qr Code & NFC"/>
            <BackButton left={15} top={43} />
            <Text style={{color:"#AAA",marginTop:400,marginLeft:"auto",marginRight:"auto"}}>{item.name+"'e ait Qr Code Sayfası"}</Text>
        </SafeAreaView>

    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#292929',
    },
});

export default QrCodePage;
