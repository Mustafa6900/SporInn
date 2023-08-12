import React, { useState,useContext } from "react";
import { Text, StyleSheet, TouchableOpacity, View, Image, SafeAreaView, TextInput,Alert } from "react-native";
import Header from "../../../components/header";
import BackButton from "../../../components/backbutton";
import CheckButton from "../../../components/checkbutton";
import CustomButton from "../../../components/custombutton";
import { useNavigation } from "@react-navigation/native";
import { AuthContext } from '../../Auth/AuthContext';
import { supabase } from "../../../supabaseClient";
import { Picker } from "@react-native-picker/picker";
const AddAdressPage = () => {
  const navigation = useNavigation();
  const [cardName, setCardName] = useState("");
  const [cardNo, setCardNo] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [checked, setChecked] = useState(false);
  const { session } = useContext(AuthContext);

  const months = Array.from({ length: 12 }, (_, index) => (index + 1).toString());
  const years = Array.from({ length: 20 }, (_, index) => (new Date().getFullYear() + index).toString());

  const handleContinue = () => {
    if (checked) {
      sendSupabase();
    } else {
      Alert.alert("Uyarı", "Kullanım koşullarını kabul etmelisiniz.");
    }
  };

  const sendSupabase = async () => {

    if (
      cardName === "" ||
      cardNo === "" ||
      month === "" ||
      year === ""
    ) 
    {
      Alert.alert(
        "Hata",
        "Lütfen tüm alanları doldurunuz.",
        [{ text: "Tamam" }],
        { cancelable: false }
      );
      return; 
    }
    if (cardNo.length !== 16) {
      Alert.alert('Hata', 'Kart numarası 16 karakter olmalıdır.');
      return;
    }
    const { data, error } = await supabase
      .from("credit_cards")
      .insert([
        {
          created_at: new Date(),
          user_id: session.user.id,
          card_name: cardName,
          card_number: cardNo,
          expiry_month: month,
          expiry_year: year,
          image_url: ""
        },
      ])
    if (error) {
      console.error(error);
    } else {
      navigation.replace('PaymentMethods');
    }
  };

      

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
              keyboardType="numeric"
              maxLength={16}
              onChangeText={setCardNo}
            />
          </View>
          <View style={styles.date}>
            <View style={styles.pickerContainer}>
            <Picker
              selectedValue={month}
              style={styles.dropdowns}
              dropdownIconColor={"#AAAAAA"}
              onValueChange={(itemValue, itemIndex) => setMonth(itemValue)}
            >
              <Picker.Item label="Ay" value="" />
              {months.map((month) => (
                <Picker.Item key={month} label={month} value={month} />
              ))}
            </Picker>
            </View>
            <View style={styles.pickerContainer}>
            <Picker
              selectedValue={year}
              style={styles.dropdowns}
              dropdownIconColor={"#AAAAAA"}
              onValueChange={(itemValue, itemIndex) => setYear(itemValue)}
            >
              <Picker.Item label="Yıl" value="" />
              {years.map((year) => (
                <Picker.Item key={year} label={year} value={year} />
              ))}
            </Picker>
            </View>
          </View>
          <View style={{ flexDirection: "row" }}>
            <CheckButton
              title="✓"
              styletip={{ marginLeft: 20, marginTop: 20, backgroundColor: "#AAAAAA" }}
              checked={checked}
              onPress={() => setChecked(!checked)}
            />
            <Text style={{ fontSize: 15, marginLeft: 20, marginTop: 30, fontWeight: '500', color: "#0D0D0D", width: 340 }}>Kullanım Koşullarını’nı okudum ve kabul ediyorum.</Text>
          </View>
        </View>
        <Image source={require("../../../assets/profilepic/cardslogos.png")} style={{ width: 415, height: 50,marginBottom:10}} />
      </View>
        <CustomButton
            title="Devam Et"
            style={{width:"75%",marginLeft:"auto",marginRight:"auto",marginBottom:40,marginTop:170}}
            onPress={handleContinue}
            
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
       
    
    },
    security: {
        flexDirection: "column",
        marginBottom: "auto",
        marginTop: "auto",
    },
    addcardcontainer: {
        backgroundColor: "#AAAAAA",
        marginBottom: 20,
     
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
        marginTop:10,
        marginBottom: 20,
        marginLeft: 20,
        marginRight: 20,
        paddingLeft: 10,
        fontSize: 15,
    },

    buttontext: {
        fontSize: 15,
        fontFamily: 'Roboto',
        fontWeight: 'bold',
        letterSpacing: 0.4,
    },
    dropdowns: {
      height: 50,
      width: 165,
      backgroundColor: "#0D0D0D",
      marginLeft: "auto",
      marginRight: "auto",
      color: "#AAAAAA",
      
    },
    pickerContainer: {
      marginTop: 10,
      marginBottom: 10,
      width: "40%",
      borderRadius: 3, // Gerekli yuvarlak köşe yarıçapı
      marginLeft: "auto",
      marginRight: "auto",
      overflow: "hidden", // İçeriklerin dışarı taşmasını engelle
    },


});


export default AddAdressPage;

