import React, { useState, useEffect } from 'react';
import { Text, StyleSheet, TouchableOpacity, View, ScrollView,Alert  } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { supabase } from '../../../supabaseClient';

const myAdressList = ({ session }) => {
  const { user } = session;

  const [addresses, setAddresses] = useState([]);
  useEffect(() => {
    fetchAddresses();
  }, []);

  const fetchAddresses = async () => {
    try {
      const { data, error } = await supabase
        .from('addresses')
        .select('id,address_name, full_address')
        .eq('user_id', user.id);

      if (error) {
        console.error('Hata:', error);
      } else {
        setAddresses(data);
      }
    } catch (error) {
      console.error('Hata:', error.message);
    }
  };

  const handleDeleteAddress = async (addressId) => {
    try {
      const { data, error } = await supabase
        .from('addresses')
        .delete()
        .eq('id', addressId);

      if (error) {
        console.error('Hata:', error);
      } else {
        // Veriyi başarıyla sildikten sonra adresleri yeniden getir
        fetchAddresses();
      }
    } catch (error) {
      console.error('Hata:', error.message);
    }
  };

  const confirmDelete = (addressId) => {
    Alert.alert(
      'Adresi Sil',
      'Bu adresi silmek istediğinize emin misiniz?',
      [
        {
          text: 'Vazgeç',
          style: 'cancel',
        },
        {
          text: 'Sil',
          onPress: () => handleDeleteAddress(addressId),
        },
      ],
    );
  };

  return (
    <ScrollView style={styles.container}>
      {addresses.map((address, index) => (
        <View
          style={styles.button}
          key={index}
        >
          <View style={styles.buttontext}>
            <MaterialCommunityIcons name="home-map-marker" size={50} style={{ marginLeft: 20,textAlignVertical: 'center'}} />
            <View style={{ flexDirection: "column" }}>
              <Text style={{ fontSize: 20, marginLeft: 20, fontWeight: '900' }}>{address.address_name}</Text>
              <Text style={{ fontSize: 15, marginLeft: 20 ,width:230}}>{address.full_address}</Text>
            </View>
            <TouchableOpacity
              onPress={() => confirmDelete(address.id)}
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

export default myAdressList;
