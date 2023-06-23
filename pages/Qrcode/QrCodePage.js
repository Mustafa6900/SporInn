import React from 'react';
import { View,SafeAreaView,StyleSheet } from 'react-native';
import Header from '../../components/header';
import BackButton from '../../components/backbutton';
import SvgQRCode from 'react-native-qrcode-svg';

function Simple( {item}) {
    return <SvgQRCode value={item} size={300}/>;
  }
  

const QrCodePage = ({ route }) => {
    const { item } = route.params;
    console.log("itemmsmsms",item.qr_code)

    return(
        <SafeAreaView style={styles.container}>
            <Header title="Qr Code & NFC"/>
            <BackButton left={15} top={43} />
             <View style={{marginLeft:"auto",marginRight:"auto",marginTop:"auto",marginBottom:"auto"}}>
            <Simple item = {item.qr_code} />
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

export default QrCodePage;
