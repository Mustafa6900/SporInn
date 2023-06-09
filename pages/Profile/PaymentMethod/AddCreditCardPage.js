import React, { useState } from "react";
import { Text, StyleSheet, TouchableOpacity, View, Image, SafeAreaView, TextInput } from "react-native";
import Header from "../../../components/header";
import BackButton from "../../../components/backbutton";
import CheckButton from "../../../components/checkbutton";
import CustomButton from "../../../components/custombutton";
import { useNavigation } from "@react-navigation/native";
const AddAdressPage = () => {
    const navigation = useNavigation();
  const [cardName, setCardName] = useState("");
  const [cardNo, setCardNo] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [checked, setChecked] = useState(false);

  console.log(cardName, cardNo, month, year, checked, "cardName, cardNo, month, year, checked");

  return (
    <SafeAreaView style={styles.container}>
      <Header title="Kart Ekle" />
      <BackButton left={15} top={43} />
      <View style={styles.cardcontainer}>
        <View style={styles.securitycontainer}>
          <Image source={require("../../../assets/profilepic/security.png")} style={{ width: 50, height: 50, marginLeft: 20, marginTop: 20 }} />
          <View style={styles.security}>
            <Text style={{ fontSize: 20, marginLeft: 20, fontWeight: '900', marginBottom: 10, marginTop: 20 }}>Güvenlik</Text>
            <Text style={{ fontSize: 15, marginLeft: 20, width: 320, marginBottom: 20, fontWeight: '500' }}>Ödeme altyapımız MasterCard uygulaması olan MasterPass tarafından sağlanmaktadır ve işlem güvenliğiniz Mastercard güvencesi altındadır..</Text>
          </View>
        </View>
        <View style={styles.addcardcontainer}>
          <View style={styles.cardnamenumber}>
            <TextInput
              placeholder="  Kart Adı"
              placeholderTextColor="#AAAAAA"
              color="#FFFFFF"
              style={styles.textinputmax}
              value={cardName}
              onChangeText={setCardName}
            />
            <TextInput
              placeholder="  Kart Numarası"
              placeholderTextColor="#AAAAAA"
              color="#FFFFFF"
              style={styles.textinputmax}
              value={cardNo}
              onChangeText={setCardNo}
            />
          </View>
          <View style={styles.date}>
            <TextInput
              placeholder="  Ay"
              placeholderTextColor="#AAAAAA"
              color="#FFFFFF"
              style={styles.textinputmin}
              value={month}
              onChangeText={setMonth}
            />
            <TextInput
              placeholder="  Yıl"
              placeholderTextColor="#AAAAAA"
              color="#FFFFFF"
              style={styles.textinputmin}
              value={year}
              onChangeText={setYear}
            />
          </View>
          <View style={{ flexDirection: "row" }}>
            <CheckButton
              title="✓"
              styletip={{ marginLeft: 20, marginTop: 10, backgroundColor: "#AAAAAA" }}
              checked={checked}
              onPress={() => setChecked(!checked)}
            />
            <Text style={{ fontSize: 15, marginLeft: 20, marginTop: 10, fontWeight: '500', color: "#0D0D0D", width: 340 }}>Kullanım Koşullarını’nı okudum ve kabul ediyorum.</Text>
          </View>
        </View>
        <Image source={require("../../../assets/profilepic/cardslogos.png")} style={{ width: 415, height: 50,marginBottom:10}} />
      </View>
        <CustomButton
            title="Devam Et"
            style={{width:"75%",marginLeft:"auto",marginRight:"auto",marginBottom:40,marginTop:170}}
            onPress={() => navigation.navigate("AddCardsNextPage")}
            
        />     
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#292929",
    },
    cardcontainer: {
        flexDirection: "column",
        backgroundColor: "#AAAAAA",    
        marginBottom: 20,
        marginTop:20,
    },
    securitycontainer: {
        flexDirection: "row",
        alignItems: "center",
        width: "100%",
        backgroundColor: "#AAAAAA",
        borderRadius: 3,
    
    },
    security: {
        flexDirection: "column",
        marginBottom: "auto",
        marginTop: "auto",
    },
    addcardcontainer: {
        backgroundColor: "#AAAAAA",
        marginBottom: 20,
        marginTop:20,
    },
    cardnamenumber: {
        flexDirection: "column",
        marginBottom: "auto",
        marginTop: "auto",
    },
    date: {
        flexDirection: "row",
        marginBottom: "auto",
        marginTop: "auto",
    },
    textinputmax: {
        height: 50,
        backgroundColor: "#0D0D0D",
        borderRadius: 3,
        marginBottom: 20,
        marginLeft: 20,
        marginRight: 20,
        paddingLeft: 10,
        fontSize: 15,
    },
    textinputmin: {
        height: 50,
        backgroundColor: "#0D0D0D",
        borderRadius: 3,
        marginBottom: 20,
        marginLeft: 20,
        
        paddingLeft: 10,
        fontSize: 15,
        width: 166,
    },
   
    buttontext: {
        fontSize: 15,
        fontFamily: 'Roboto',
        fontWeight: 'bold',
        letterSpacing: 0.4,
    },


});


export default AddAdressPage;

