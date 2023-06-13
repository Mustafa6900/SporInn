import React, { useState } from 'react';
import { View,SafeAreaView, Text, StyleSheet,TextInput,TouchableOpacity,Alert } from 'react-native';
import Header from "../../../components/header";
import BackButton from "../../../components/backbutton";
import { useNavigation } from '@react-navigation/native';

const AddCardsNextPage = () => {
    const navigation = useNavigation();

    const [phoneCode, setPhoneCode] = useState("")
    console.log(phoneCode, "phoneCode");

    const handleGoBack = () => {
        Alert.alert(
          'Geri Dön',
          'Geri dönmek istediğinize emin misiniz? Bu işlemi iptal ederseniz kartınız kaydedilmeyecektir.',
          [
            {
              text: 'Hayır',
              style: 'cancel',
            },
            {
              text: 'Evet',
              onPress: () => navigation.goBack(),
            },
          ],
        );
      };
    return (
        <SafeAreaView style={styles.container}>
            <Header title="Kart Ekle" />
            <BackButton 
            left={15} 
            top={43}
            showConfirmation={true}
            />
            <View style={styles.phoneCodecontainer}>
                <Text style={{ marginTop:20,fontSize: 18, marginLeft: "auto",marginRight:"auto", width: 300, marginBottom: 30, fontWeight: '600',textAlign:"center" }}>
                    Kart sahibinin cep telefonuna SMS olarak gönderilen tek kullanımlık şifreyi girin.
                </Text>
                <TextInput
                    placeholder=" Kodu Gir"
                    placeholderTextColor="#AAAAAA"
                    color="#FFFFFF"
                    style={styles.textinput}
                    value={phoneCode}
                    onChangeText={setPhoneCode}
                />
         
            <TouchableOpacity
            style={styles.falsebutton}
            onPress={() => handleGoBack()}
            >
                <Text style={{ fontSize: 15, color: "#AAAAAA", fontWeight: 'bold', letterSpacing: 0.4, }}>İptal Et</Text>
            </TouchableOpacity>

            </View>
        </SafeAreaView>
    );
    }

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#292929",
    },
    phoneCodecontainer: {
        flexDirection: 'column',
        backgroundColor: "#AAAAAA",
        borderRadius: 3,
        marginBottom: 20,
        marginTop: 20,
    },
    textinput: {
        height: 50,
        backgroundColor: "#0D0D0D",
        borderRadius: 7,
        marginBottom: 20,
        marginLeft: "auto",
        marginRight: "auto",
        fontSize: 15,
        width: 200,
        textAlign: 'center'
    },
    truebutton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#FF6F25',
        height: 50,
        borderRadius: 7,
        marginLeft: "auto",
        marginRight: "auto",
        width: 150,
    },
    falsebutton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#292929',
        height: 50,
        borderRadius: 7,
        marginLeft: "auto",
        marginRight: "auto",
        width: 100,
        marginTop:20,
        marginBottom: 20,

    },


});

export default AddCardsNextPage;
    