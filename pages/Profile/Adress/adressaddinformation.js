import React, { useState } from "react";
import { Text, StyleSheet, TouchableOpacity, View, SafeAreaView, TextInput } from "react-native";
import CustomButton from "../../../components/custombutton";
import { supabase } from "../../../supabaseClient";
import { useNavigation } from "@react-navigation/native";
const AddressAddInformation = ({ session }) => {
  const navigation = useNavigation();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [district, setDistrict] = useState("");
  const [buildingNo, setBuildingNo] = useState("");
  const [apartmentNo, setApartmentNo] = useState("");
  const [addressName, setAddressName] = useState("");
  const { user } = session;

  
  const sendSupabase = async () => {
    const { data, error } = await supabase
    .from('addresses')
    .insert([
      {
        created_at: new Date(),
        user_id: user.id,
        first_name: firstName,
        last_name: lastName,
        phone: phone,
        address_name: addressName,
        city: city,
        district: district,
        building_no: buildingNo,
        door_no: apartmentNo,
        full_address: address,
      },
    ])
    
  if (error) {
    console.error(error);
  } else {
    navigation.replace('Adresses');
  }
};

  
  
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Kişisel Bilgileriniz</Text>
      <Text style={styles.title2}>Teslim alacak kişinin bilgileri</Text>
      <View style={{ flexDirection: "row" }}>
        <TextInput
          placeholder="Ad"
          placeholderTextColor="#AAAAAA"
          color="#FFFFFF"
          style={styles.textinputmin}
          value={firstName}
          onChangeText={setFirstName}
        />
        <TextInput
          placeholder="Soyad"
          placeholderTextColor="#AAAAAA"
          color="#FFFFFF"
          style={styles.textinputmin}
          value={lastName}
          onChangeText={setLastName}
        />
      </View>
      <Text style={styles.title2}>Telefon</Text>
      <TextInput
        placeholder="Telefon"
        placeholderTextColor="#AAAAAA"
        color="#FFFFFF"
        style={styles.textinputmax}
        value={phone}
        onChangeText={setPhone}
      />
      <Text style={styles.title2}>Adres Bilgileri</Text>
      <TextInput
        placeholder="Adres"
        placeholderTextColor="#AAAAAA"
        color="#FFFFFF"
        style={styles.textinputmax}
        value={address}
        onChangeText={setAddress}
      />
      <View style={{ flexDirection: "row" }}>
        <TextInput
          placeholder="İl"
          placeholderTextColor="#AAAAAA"
          color="#FFFFFF"
          style={styles.textinputmin}
          value={city}
          onChangeText={setCity}
        />
        <TextInput
          placeholder="İlçe"
          placeholderTextColor="#AAAAAA"
          color="#FFFFFF"
          style={styles.textinputmin}
          value={district}
          onChangeText={setDistrict}
        />
      </View>
      <View style={{ flexDirection: "row" }}>
        <TextInput
          placeholder="Bina No"
          placeholderTextColor="#AAAAAA"
          color="#FFFFFF"
          style={styles.textinputmin}
          value={buildingNo}
          onChangeText={setBuildingNo}
        />
        <TextInput
          placeholder="Daire No"
          placeholderTextColor="#AAAAAA"
          color="#FFFFFF"
          style={styles.textinputmin}
          value={apartmentNo}
          onChangeText={setApartmentNo}
        />
      </View>
      <Text style={styles.title2}>Adres Adı</Text>
      <TextInput
        placeholder="Örnek: Evim, İşim vb."
        placeholderTextColor="#AAAAAA"
        color="#FFFFFF"
        style={styles.textinputmax}
        value={addressName}
        onChangeText={setAddressName}
      />

        <CustomButton
            style={{ marginTop: 20, width: "75%", marginLeft: "auto", marginRight: "auto" }}
            title="Adres Ekle"
            onPress={sendSupabase}
        />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderRadius: 3,
    backgroundColor: "#AAAAAA",
    marginBottom: 20,
    marginTop: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "900",
    marginLeft: 12,
    marginTop: 20,
    marginBottom: 20,
  },
  title2: {
    fontSize: 20,
    fontWeight: "600",
    marginLeft: 12,
    marginTop: 20,
  },
  textinputmin: {
    height: 50,
    width: 180,
    backgroundColor: "#0D0D0D",
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: 20,
    borderRadius: 7,
    paddingLeft: 20,
  },
  textinputmax: {
    height: 50,
    width: 385,
    backgroundColor: "#0D0D0D",
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: 20,
    borderRadius: 7,
    paddingLeft: 20,
  },
  addButton: {
    backgroundColor: "#1F1F1F",
    alignSelf: "center",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 7,
    marginTop: 20,
  },
  addButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
});

export default AddressAddInformation;
