import React,{useState,useEffect} from 'react';
import { Text, StyleSheet, TouchableOpacity, View, ScrollView,Image,Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { supabase } from '../../../supabaseClient';
const MyPaymentMethods = ({session}) => {
  const [creditCards, setCreditCards] = useState([]);
  const { user } = session;
  useEffect(() => {
    fetchCreditCards();
  }, []);
  const fetchCreditCards = async () => {
    try {
      const { data: creditCardsData, error } = await supabase
        .from('credit_cards')
        .select('id,card_name, card_number')
        .eq('user_id', user.id)
        .eq('delete_at', false)

      if (error) {
        console.error('Error fetching credit cards:', error.message);
        return;
      }

      setCreditCards(creditCardsData);
    } catch (error) {
      console.error('Error fetching credit cards:', error.message);
    }
  };
  const handleDeleteCreditCards = async (cardId) => {
    try {
      const { data, error } = await supabase
        .from('credit_cards')
        .update({ delete_at: true }) // Burada deleted_at sütununu true olarak güncelliyoruz
        .eq('id', cardId);
  
      if (error) {
        console.error('Hata:', error);
      } else {
        fetchCreditCards();
      }
    } catch (error) {
      console.error('Hata:', error.message);
    }
  };

  const confirmDelete = (cardId) => {
    Alert.alert(
      'Kartı Sil',
      'Bu kartı silmek istediğinize emin misiniz?',
      [
        {
          text: 'Vazgeç',
          style: 'cancel',
        },
        {
          text: 'Sil',
          onPress: () => handleDeleteCreditCards(cardId),
        },
      ],
    );
  };


  return (
    <ScrollView style={styles.container}>
      {creditCards.map((creditCard, index) => (
        <View
          style={styles.button}
          key={index}
        >
          <View style={styles.buttontext}>
          <Image source={require("../../../assets/paymentpic/mastercard.png")} style={{ width: 50, height: 50, marginLeft: 20 }} />
            <View style={{ flexDirection: "column" }}>
              <Text style={{ fontSize: 20, marginLeft: 20, fontWeight: '900' }}>{creditCard.card_name}</Text>
              <Text style={{ fontSize: 15, marginLeft: 20 ,width:230}}>{creditCard.card_number}</Text>
            </View>
            <TouchableOpacity
              onPress={() => confirmDelete(creditCard.id)}
              style={{ marginLeft: 'auto', marginRight: 20,  justifyContent: 'center' }}
            >
              <Ionicons name="trash-outline" size={50}  />
            </TouchableOpacity>
          </View>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
 
    marginTop: 20,
  },
  button: {
    flexDirection: 'column',
    backgroundColor: "#AAAAAA",
    height: 100,
    borderRadius: 3,
    marginBottom: 20,
  },
  buttontext: {
    flexDirection: "row",
    marginBottom: "auto",
    marginTop: "auto",

  },
});

export default MyPaymentMethods;
