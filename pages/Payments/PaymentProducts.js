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
import { AuthContext } from "../Auth/AuthContext";
import { useNavigation } from "@react-navigation/native";

export default function Payment({ route }) {
  const { item } = route.params;
  const [adresses, setAdresses] = useState([]);
  const [creditCard, setCreditCard] = useState([]);
  const [selectedCreditCard, setSelectedCreditCard] = useState(null);
  const [selectedAdresses, setSelectedAdresses] = useState(null);
  const [isCheckedCreditCard, setIsCheckedCreditCard] = useState(true);
  const [isCheckedSporInn, setIsCheckedSporInn] = useState(false);
  const [isCheckedAgreement, setIsCheckedAgreement] = useState(false);
  const { session } = useContext(AuthContext);
  const navigation = useNavigation();

  const totalPrice = item.reduce((total, item) => total + item.products.price*item.quantity, 0);


  useEffect(() => {

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

    const fetchAdresses = async () => {
      try{
        const { data, error } = await supabase
          .from("addresses")
          .select("*")
          .eq("user_id", session.user.id);
        if (error) {
          console.error(error);
        } else {
          // Diziyi adres objesiyle doldurun
          setAdresses(data);
        }
      }
      catch(error){
        console.error(error);
      }
    };
    fetchAdresses();

  }, []);

  
  const handlePurchase = async () => {
    try {
      if (selectedCreditCard && selectedAdresses) {
        // Siparişi oluştur
        const newOrderData = {
          order_date: new Date(),
          user_id: session.user.id,
          total_amount: totalPrice + 50,
          address_id: selectedAdresses.id,
          credit_cards_id: selectedCreditCard.id,
          created_at: new Date(),
          status: "Sipariş Alındı",
        };
  
        const { error: orderError } = await supabase
          .from("orders")
          .insert([newOrderData]);
  
        if (orderError) {
          console.error("Error orders", orderError);
        } else {  
          // Eklenen siparişleri tarih (created_at) alanına göre sıralayarak en yeni siparişi alırız.
          const { data: latestOrderData, error: getLatestOrderError } = await supabase
            .from("orders")
            .select("id")
            .eq("user_id", session.user.id)
            .order("created_at", { ascending: false })
            .limit(1)
            .single();
  
          if (getLatestOrderError) {
            console.error("Error getLatestOrderError", getLatestOrderError);
          } else if (latestOrderData && latestOrderData.id) {
            const order_id = latestOrderData.id; // Yeni siparişin kimlik numarasını alır
  
            // Her bir ürün için sipariş kalemi oluştur
            for (const productItem of item) {
              const { error: orderItemsError } = await supabase
                .from("order_items")
                .insert([
                  {
                    created_at: new Date(),
                    quantity: productItem.quantity,
                    product_id: productItem.products.id,
                    orders_id: order_id, // Sipariş kaleminin hangi siparişe ait olduğunu belirtir
                  },
                ]);
  
              if (orderItemsError) {
                console.error("Error order_items", orderItemsError);
              } 
            }
            Alert.alert("Sipariş Alındı");
            navigation.navigate("Tabbar");
            const { data: cartData, error: cartError } = await supabase
              .from("users_carts")
              .delete()
              .eq("created_id", session.user.id);
              
              if (cartError) {
              console.error("Error cartError", cartError);
            }

          } else {
            console.error("Hata: Sipariş nesnesi boş veya eksik döndü.");
          }
        }
      } else {
        Alert.alert("Lütfen Kredi Kartı veya Adresi boş bırakmayınız.");
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


  const handleSelectCreditCard = (option) => {
    // Seçilen kredi kartının tüm bilgilerini almak için
    if (creditCard && creditCard.length > 0) {
      const selectedCreditCardData = creditCard.find((card) => card.card_name === option);
      if (selectedCreditCardData) {
        setSelectedCreditCard(selectedCreditCardData);
      }
    }
  };

  const handleSelectAdresses = (option) => {
    // Seçilen kredi kartının tüm bilgilerini almak için
    if (adresses && adresses.length > 0) {
      const selectedAdressesData = adresses.find((adress) => adress.address_name === option);
      if (selectedAdressesData) {
        setSelectedAdresses(selectedAdressesData);
      }
    }
  };


  return (
    <View style={styles.container}>
      <Header title="Ödeme" />
      <BackButton left={15} top={43} />
      <View style={styles.adresinfo}>
        <View style={styles.andresinfotitle}>
          <Text style={styles.text}>Teslimat Adresi</Text>
        </View>
        <View style={styles.andresinfodesc}>
          <SelectDropdown
            data={adresses.map((adress) => adress.address_name)}
            onSelect={handleSelectAdresses}
            defaultButtonText="Teslimat Adresi Seçiniz"
            buttonStyle={{
              backgroundColor: "#0D0D0D",
              padding: 10,
              borderRadius: 7,
              width: "80%",
              height: 50,
              justifyContent: "center",
              alignItems: "center",
            }}
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
              onPress={() => navigation.navigate("AddAdressPage")}
              >
                <AntDesign name="pluscircleo" size={30} color="black" />
              </TouchableOpacity>
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
                onSelect={handleSelectCreditCard}
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
            <Text style={{ fontSize: 15, marginLeft: 10, fontWeight: "700", maxWidth: 250 }}>Sepet Tutarı</Text>
            <Text style={{ fontSize: 15, marginRight: 10, fontWeight: "700", maxWidth: 250 }}>₺{totalPrice}</Text>
          </View>
          <View style={{ flexDirection: "row", justifyContent: "space-between", padding: 10, backgroundColor: "#AAAAAA", marginBottom: 10 }}>
            <Text style={{ fontSize: 15, marginLeft: 10, fontWeight: "700", maxWidth: 250 }}>Kargo Ücreti</Text>
            <Text style={{ fontSize: 15, marginRight: 10, fontWeight: "700", maxWidth: 250 }}>₺50</Text>
          </View>
          <View style={{ flexDirection: "row", justifyContent: "space-between", padding: 10, backgroundColor: "#AAAAAA", marginBottom: 10, borderBottomLeftRadius: 7, borderBottomRightRadius: 7 }}>
            <Text style={{ fontSize: 15, marginLeft: 10, fontWeight: "700", maxWidth: 250,color:"#FF6F25" }}>Toplam Tutar:</Text>
            <Text style={{ fontSize: 15, marginRight: 10, fontWeight: "700", maxWidth: 250,color:"#FF6F25" }}>₺{totalPrice + 50}</Text>
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
          <Text style={{ fontSize: 20, marginLeft: 20, fontWeight: "900", color: "#FF6F25" }}>₺{totalPrice + 50}</Text>
        </View>
        {isCheckedAgreement ? (
          <CustomButton title="Ödeme Yap" onPress={() =>  handlePurchase()} />
        ) : (
          <CustomButton title="Ödeme Yap" onPress={() => Alert.alert("Ön bilgilendirme formu ve Mesafeli Satış Sözleşmesi'ni onaylayın.")}  />
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
      marginTop: 10,
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
      flexDirection: "row",
      justifyContent: "space-between",
      backgroundColor: "#AAAAAA",
      height: 100,
      borderBottomLeftRadius: 7,
      borderBottomRightRadius: 7,
      alignItems: "center",
      justifyContent: "center",
      padding: 5,
    },
    paymentinfo: {
        width: "95%",
        flexDirection: "column",
        marginTop: 15,
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
        marginTop: 15,
        marginLeft: "auto",
        marginRight: "auto",
        marginBottom: 15 ,
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