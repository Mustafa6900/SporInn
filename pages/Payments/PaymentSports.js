import React, { useState, useEffect } from "react";
import { Text, StyleSheet, TouchableOpacity, View, ScrollView, Image, Alert } from "react-native";
import Header from "../../components/header";
import BackButton from "../../components/backbutton";
import CheckButton from "../../components/checkbutton";
import SelectDropdown from "react-native-select-dropdown";
import CustomButton from "../../components/custombutton";
import { FontAwesome } from "react-native-vector-icons";
import { AntDesign } from "@expo/vector-icons";

export default function Payment({ route }) {
    const { items } = route.params;
    const [item, setItem] = useState(null);
  const [selectedOption, setSelectedOption] = useState(null);
  const [adresses, setAdresses] = useState([]);
  const [creditCard, setCreditCard] = useState([]);
  const [selectedCreditCard, setSelectedCreditCard] = useState(null);
  const [isCheckedCreditCard, setIsCheckedCreditCard] = useState(true);
  const [isCheckedSporInn, setIsCheckedSporInn] = useState(false);
  const [isCheckedAgreement, setIsCheckedAgreement] = useState(false);

  const handleCreditCardPress = () => {
    if (!isCheckedCreditCard) {
      setIsCheckedCreditCard(true);
      setIsCheckedSporInn(false);
    }
  };
  
  const handleSporInnPress = () => {
    if (!isCheckedSporInn) {
      setIsCheckedSporInn(true);
      setIsCheckedCreditCard(false);
    }
  };
  
  const handleAgreementPress = () => {
    setIsCheckedAgreement(!isCheckedAgreement);
  };

  useEffect(() => {
    if (item && item.adresses) {
      const addressNames = item.adresses.map((address) => address.adressName);
      setAdresses(addressNames);
    }
    if (item && item.creditCard) {
      const creditCardNames = item.creditCard.map((credit) => credit.cardName);
      setCreditCard(creditCardNames);
    }
  }, [item]);

  const handleSelect = (option) => {
    const selectedAddress = item.adresses.find((address) => address.adressName === option);
    if (selectedAddress) {
      const { adressName, city, district } = selectedAddress;
      const formattedOption = `${adressName}        (${city} ${district})`;
      console.log("Selected Address:", selectedAddress);
      setSelectedOption(formattedOption);
    }
    const selectedCreditCard = item.creditCard.find((credit) => credit.cardName === option);
    if (selectedCreditCard) {
      const { cardName, cardNo } = selectedCreditCard;
      const formattedOption = `${cardName}\n${cardNo}`;
      console.log("Selected Credit Card:", selectedCreditCard);
      setSelectedCreditCard(formattedOption);
    }
  };

  return (
    <View style={styles.container}>
      <Header title="Ödeme" />
      <BackButton left={15} top={43} />
      <View style={styles.adresinfo}>
        <View style={styles.andresinfotitle}>
          <Text style={styles.text}>Randevu Adresi</Text>
        </View>
        <View style={styles.andresinfodesc}>
            <Text style={{ fontSize: 15, marginLeft: 10, fontWeight: "700", maxWidth: 250,marginBottom:"auto",marginTop:5 }}>{items.name}</Text>
            <Text style={{ fontSize: 12, marginLeft: 10, fontWeight: "400", maxWidth: 350,maxHeight:60,marginBottom:"auto" }} >
               {items.info}
            </Text>
      
        </View>
      </View>
      <View style={styles.paymentinfo}>
        <View style={styles.andresinfotitle}>
          <Text style={styles.text}>Ödeme Bilgileri</Text>
        </View>
        <View>
          <View style={styles.paymentinfodesc}>
            <View style={styles.paymentcredit}>
              <CheckButton
                title="✓"
                onPress={handleCreditCardPress}
                checked={isCheckedCreditCard}
                styletip={{ marginLeft: 15, backgroundColor: "#AAAAAA" }}
              />
              <Image source={require("../../assets/paymentpic/mastercard.png")} style={{ width: 30, height: 30, marginLeft: 15 }} />
              <Text style={{ fontSize: 15, marginLeft: 15, marginRight: 10, fontWeight: "500", maxWidth: 125 }}>{selectedCreditCard}</Text>
              <SelectDropdown
                data={creditCard}
                onSelect={handleSelect}
                defaultButtonText="Kart Değiştir"
                buttonStyle={{ backgroundColor: "#0D0D0D", padding: 10, borderRadius: 7, maxWidth: 140 }}
                buttonTextStyle={{ fontSize: 16, color: "#AAAAAA" }}
                dropdownStyle={{ backgroundColor: "white" }}
                rowStyle={{ padding: 10 }}
                rowTextStyle={{ fontSize: 16 }}
                buttonTextAfterSelection={(selectedItem) => selectedItem}
                rowTextForSelection={(item) => item}
                renderDropdownIcon={(isOpened) => {
                  return <FontAwesome name={isOpened ? "chevron-up" : "chevron-down"} color={"#444"} size={18} />;
                }}
              />
            </View>
          </View>

          <View style={styles.paymentsporinncredit}>
            <CheckButton
              title="✓"
              onPress={handleSporInnPress}
              checked={isCheckedSporInn}
              styletip={{ marginLeft: 15, backgroundColor: "#AAAAAA" }}
            />
            <AntDesign name="wallet" size={30} color="black" style={{ marginLeft: 15 }} />
            <Text style={{ fontSize: 15, marginLeft: 15, fontWeight: "500", maxWidth: 250 }}>SporInn Cüzdan ile Öde</Text>
          </View>
        </View>
      </View>
      <View style={styles.paymentsummary}>
        <View style={styles.andresinfotitle}>
          <Text style={styles.text}>Ödeme Özeti</Text>
        </View>
        <View style={styles.cartprice}>
          <View style={{ flexDirection: "row", justifyContent: "space-between", padding: 10, marginBottom: 3, backgroundColor: "#AAAAAA" }}>
            <Text style={{ fontSize: 15, marginLeft: 10, fontWeight: "700", maxWidth: 250 }}>Randevu Tarihi</Text>
            <Text style={{ fontSize: 15, marginRight: 10, fontWeight: "700", maxWidth: 250 }}>{items.appointmentDay[0]}</Text>
          </View>
        
          <View style={{ flexDirection: "row", justifyContent: "space-between", padding: 10, backgroundColor: "#AAAAAA", marginBottom: 10, borderBottomLeftRadius: 7, borderBottomRightRadius: 7 }}>
            <Text style={{ fontSize: 15, marginLeft: 10, fontWeight: "700", maxWidth: 250,color:"#FF6F25" }}>Toplam Tutar:</Text>
            <Text style={{ fontSize: 15, marginRight: 10, fontWeight: "700", maxWidth: 250,color:"#FF6F25" }}>₺1500</Text>
          </View>
          <View style={{ flexDirection: "row", padding: 10, backgroundColor: "#AAAAAA", borderRadius: 7 }}>
            <CheckButton
              title="✓"
              onPress={handleAgreementPress}
              checked={isCheckedAgreement}
              styletip={{ marginLeft: 15, backgroundColor: "#AAAAAA" }}
            />
            <Text style={{ fontSize: 15, marginLeft: 20, fontWeight: "400", maxWidth: 300 }}>Ön bilgilendirme formu ve Mesafeli Satış Sözleşmesi’ni okudum ve kabul ediyorum.</Text>
          </View>
        </View>
      </View>
      <View style={styles.bottombar}>
        <View style={styles.price}>
          <Text style={{ fontSize: 20, marginLeft: 20, fontWeight: "500", color: "white" }}>Toplam Tutar:</Text>
          <Text style={{ fontSize: 20, marginLeft: 20, fontWeight: "900", color: "#FF6F25" }}>₺1500</Text>
        </View>
        {isCheckedAgreement ? (
          <CustomButton title="Ödeme Yap" onPress={() => Alert.alert("Sipariş Alındı")} />
        ) : (
          <CustomButton title="Ödeme Yap" onPress={() => Alert.alert("Ön bilgilendirme formu ve Mesafeli Satış Sözleşmesi'ni onaylayın.")} />
        )}
      </View>
    </View>
  );
}
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#292929",
    },
    adresinfo: {
      width: "95%",
      flexDirection: "column",
      marginTop: 25,
      marginLeft: "auto",
      marginRight: "auto",
    },
    text: {
      color: "#AAAAAA",
      fontSize: 20,
      fontWeight: "bold",
    },
    andresinfotitle: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      padding: 20,
      backgroundColor: "#0D0D0D",
      borderTopLeftRadius: 7,
      borderTopRightRadius: 7,
    },
    andresinfodesc: {
      flexDirection: "column",
      backgroundColor: "#AAAAAA",
      height: 120,
      borderBottomLeftRadius: 7,
      borderBottomRightRadius: 7,
      justifyContent: "center",
      padding: 5,
    },
    paymentinfo: {
        width: "95%",
        flexDirection: "column",
        marginTop: 20,
        marginLeft: "auto",
        marginRight: "auto",
   
    },
    paymentinfodesc: {
        flexDirection: "column",
        justifyContent: "space-between",
        marginBottom: 3,
    },
    paymentcredit: {
        flexDirection: "row",
        backgroundColor: "#AAAAAA",
        height: 80,
        alignItems: "center",
        padding: 5,
    }
    ,
    paymentsporinncredit: {
        flexDirection: "row",
        backgroundColor: "#AAAAAA",
        height: 80,
        borderBottomLeftRadius: 7,
        borderBottomRightRadius: 7,
        alignItems: "center",
        padding: 5,
    },
    paymentsummary: {
        width: "95%",
        flexDirection: "column",
        marginTop: 20,
        marginLeft: "auto",
        marginRight: "auto",
        marginBottom: 20 ,
    },
    cartprice: {
        flexDirection: "column",
        justifyContent: "space-between",
        marginBottom: 3,
       
    },
    bottombar: {
        position: "relative",
        bottom: 0,
        width: "100%",
        height: 100,
        backgroundColor: "#0D0D0D",
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 20,
    },
    price: {
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
    }

  });