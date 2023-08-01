import React, { useState, useEffect,useContext } from "react";
import { Text, StyleSheet, TouchableOpacity, View, ScrollView, Image, Alert } from "react-native";
import Header from "../../components/header";
import BackButton from "../../components/backbutton";
import CheckButton from "../../components/checkbutton";
import SelectDropdown from "react-native-select-dropdown";
import CustomButton from "../../components/custombutton";
import { FontAwesome } from "react-native-vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { supabase } from "../../supabaseClient";
import { AuthContext } from '../Auth/AuthContext';
import { useNavigation } from "@react-navigation/native";

export default function Payment({ route }) {
  const {  items, purchaseDateUTC, endDateUTC  } = route.params;
  const navigation = useNavigation();
  const [creditCard, setCreditCard] = useState([]);
  const [selectedCreditCard, setSelectedCreditCard] = useState(null);
  const [isCheckedCreditCard, setIsCheckedCreditCard] = useState(true);
  const [isCheckedSporInn, setIsCheckedSporInn] = useState(false);
  const [isCheckedAgreement, setIsCheckedAgreement] = useState(false);
  const [sportItem, setSportItem] = useState(null);
  const { session } = useContext(AuthContext);
  const purchaseDate = new Date(purchaseDateUTC);
  const endDate = new Date(endDateUTC);

  const formatDateTimeRange = (startDate, endDate) => {
    const startDateStr = `${startDate.getFullYear()}-${(startDate.getMonth() + 1).toString().padStart(2, '0')}-${startDate.getDate().toString().padStart(2, '0')} / ${startDate.getHours().toString().padStart(2, '0')}:${startDate.getMinutes().toString().padStart(2, '0')}`;
    const endDateStr = `${endDate.getHours().toString().padStart(2, '0')}:${endDate.getMinutes().toString().padStart(2, '0')}`;
    return `${startDateStr} - ${endDateStr}`;
  };

  
  useEffect(() => {
    const fetchSportItems = async () => {
      try {
        const { data, error } = await supabase
          .from("sports_facilities")
          .select("*")
          .eq("created_id", items.created_id);
        if (error) {
          console.error(error);
        } else {
          const updatedData = await Promise.all(data.map(async (item) => {
            if (item.image_url) {
              const { data: imageData, error: imageError } = await supabase.storage
                .from('sportsfacilityimage')
                .getPublicUrl(item.image_url);

              if (imageError) {
                console.error('Resim alınamadı:', imageError.message);
              } else {
                if (imageData) {
                  item.imageData = imageData; // imageData verisini tesis verisine ekleyin
                }
              }
            }
            return item;
          }));
          setSportItem(updatedData);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchSportItems();
    
    const fetchCreditCards = async () => {
      try { 
        const  { data, error } = await supabase
          .from("credit_cards")
          .select("*")
          .eq("user_id", session.user.id);
        if (error) {
          console.error(error);
        } else {
          // Diziyi kredi kartı objesiyle doldurun
          setCreditCard(data);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchCreditCards();
  }, []);

  const generateQRCodeData = () => {
    const data = {
      packages_id: items.id,
      user_id: session.user.id,
      purchase_date: new Date(),
    };
    return JSON.stringify(data);  
  };

  const handlePurchase = async () => {
  try {
    const qrCodeData = generateQRCodeData();
    const { data, error } = await supabase
      .from('users_appointments')
      .insert([
        {
          user_id: session.user.id,
          packages_id: items.id,
          qr_code: qrCodeData,
          purchase_date: purchaseDateUTC,
          end_date: endDateUTC,
          created_at: new Date(),
        },
      ]);
    if (error) {
      console.error(error);
    } else {
      if (selectedCreditCard) { // Check if selectedCreditCard is not null
        const { data, error } = await supabase
          .from('orders')
          .insert([
            {
              order_date: purchaseDateUTC,
              user_id: session.user.id,
              total_amount: items.price,
              credit_cards_id: selectedCreditCard.id,
              sports_facilities_config_id: items.id,
              created_at: new Date(),
              status: "Teslim Edildi",
            },
          ]);
        if (error) {
          console.error(error);
        } else {
          Alert.alert('Sipariş Alındı');
          navigation.navigate('Tabbar');
        }
      } else {
         Alert.alert('Lütfen kredi kartı seçiniz');
      }
    }
  } catch (error) {
    console.error(error);
  }
};


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

  const handleSelect = (option) => {
    // Seçilen kredi kartının tüm bilgilerini almak için
    if (creditCard && creditCard.length > 0) {
      const selectedCreditCardData = creditCard.find((card) => card.card_name === option);
      if (selectedCreditCardData) {
        setSelectedCreditCard(selectedCreditCardData);
      }
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
        <View style={{flexDirection:"row"}}>
{ sportItem && <Image source={{ uri: sportItem[0].imageData?.publicUrl }} style={{ width: 85, height: 85, marginLeft: 10, marginTop:0,borderRadius:7 }} />} 
       <View >
            <Text style={{ fontSize: 15, marginLeft: 20, fontWeight: "700", maxWidth: 250,marginBottom:"auto",marginTop:0 }}>{items.name}</Text>
{ sportItem && <Text style={{ fontSize: 12, marginLeft: 20, fontWeight: "400", maxWidth: 350,maxHeight:60,marginBottom:"auto" }} >{sportItem[0].small_description}</Text>}
          </View>
          
          </View> 
                
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
               <Image source={require("../../assets/paymentpic/mastercard.png")} style={{ width: 30, height: 30, marginLeft: 15,marginRight:15 }} />
              
              <SelectDropdown
                data={creditCard.map((card) => card.card_name)} 
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
              <TouchableOpacity 
              style={{ marginLeft: 20 }}
              onPress={() => navigation.navigate("AddCreditCardPage")}
              >
                <AntDesign name="pluscircleo" size={30} color="black" />
              </TouchableOpacity>
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
            <Text style={{ fontSize: 15, marginRight: 10, fontWeight: "700", maxWidth: 250 }}>{formatDateTimeRange(purchaseDate, endDate)}</Text>
          </View>
        
          <View style={{ flexDirection: "row", justifyContent: "space-between", padding: 10, backgroundColor: "#AAAAAA", marginBottom: 10, borderBottomLeftRadius: 7, borderBottomRightRadius: 7 }}>
            <Text style={{ fontSize: 15, marginLeft: 10, fontWeight: "700", maxWidth: 250,color:"#FF6F25" }}>Toplam Tutar:</Text>
            <Text style={{ fontSize: 15, marginRight: 10, fontWeight: "700", maxWidth: 250,color:"#FF6F25" }}>₺{items.price}</Text>
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
          <Text style={{ fontSize: 20, marginLeft: 20, fontWeight: "900", color: "#FF6F25" }}>₺{items.price}</Text>
        </View>
        {isCheckedAgreement ? (
          <CustomButton title="Ödeme Yap" onPress={() => handlePurchase()} />
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