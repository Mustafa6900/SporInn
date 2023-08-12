import React, { useState,useEffect } from "react";
import { Text, StyleSheet, View, SafeAreaView, TextInput,Alert,ScrollView } from "react-native";
import CustomButton from "../../../components/custombutton";
import { supabase } from "../../../supabaseClient";
import { useNavigation } from "@react-navigation/native";
import { Picker } from "@react-native-picker/picker";
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
  const [fetchCityDistrict, setFetchCityDistrict] = useState([]);
  const { user } = session;

  const cities = Array.from(new Set(fetchCityDistrict.map((item) => item.sehir)));
  const districts = fetchCityDistrict.filter((item) => item.sehir === city);

  
  useEffect(() => {
    const fetchCityDistrict = async () => {
      try {
        const { data, error } = await supabase
          .from("tr_il_ilce_latlng")
          .select("sehir, semt")

        if (error) {
          console.error("Hata:", error);
        } else {
          setFetchCityDistrict(data);
        }
      } catch (error) {
        console.error("Hata:", error.message);
      }
    };
    fetchCityDistrict();
  }, []);

  const sendSupabase = async () => {

    if (
      firstName === "" ||
      lastName === "" ||
      phone === "" ||
      address === "" ||
      city === "" ||
      district === "" ||
      buildingNo === "" ||
      apartmentNo === "" ||
      addressName === ""
    ) {
      // Boş alanlar var, hata mesajı göster
      Alert.alert(
        "Hata",
        "Lütfen tüm alanları doldurunuz.",
        [{ text: "Tamam"}],
        { cancelable: false }
      );

      return; // İşlemi durdur
    }
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
    <ScrollView style={styles.container}>
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
        keyboardType="numeric"
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
      <View style={styles.pickerContainer}>
       <Picker
          selectedValue={city}
          style={styles.dropdowns}
          dropdownIconColor={"#AAAAAA"}
          onValueChange={(itemValue) => setCity(itemValue)}
        >
          <Picker.Item label="Şehir Seçiniz" value="" />
          {cities.map((item,index) => (
            <Picker.Item key={index} label={item} value={item} />
          ))}
        </Picker>
      </View>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={district}
          style={styles.dropdowns}
          dropdownIconColor={"#AAAAAA"}
          onValueChange={(itemValue) => setDistrict(itemValue)}
        >
          <Picker.Item label="İlçe Seçiniz" value="" />
          {districts.map((item,index) => (
            <Picker.Item key={index} label={item.semt} value={item.semt} />
          ))}
        </Picker>
        </View>
      </View>
      <View style={{ flexDirection: "row" }}>
        <TextInput
          placeholder="Bina No"
          placeholderTextColor="#AAAAAA"
          color="#FFFFFF"
          keyboardType="numeric"
          style={styles.textinputmin}
          value={buildingNo}
          onChangeText={setBuildingNo}
        />
        <TextInput
          placeholder="Daire No"
          placeholderTextColor="#AAAAAA"
          color="#FFFFFF"
          keyboardType="numeric"
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
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#AAAAAA",
    marginTop: "3%",
    marginBottom: "3%"
  },
  title: {
    fontSize: 20,
    fontWeight: "900",
    marginLeft: "3%",
    marginTop: "5%",
   
  },
  title2: {
    fontSize: 20,
    fontWeight: "600",
    marginLeft: "4%",
    marginTop: "8%",
  },
  textinputmin: {
    height: "100%",
    width: "45%",
    backgroundColor: "#0D0D0D",
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: "5%",
    borderRadius: 7,
    paddingLeft: 20,
    color: "#FFFFFF",
  },
  textinputmax: {
    height: 50,
    width: "95%",
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
  dropdowns: {
    height: 50,
    width: 180,
    backgroundColor: "#0D0D0D",
    marginLeft: "auto",
    marginRight: "auto",
    color: "#AAAAAA",
  },

  pickerContainer: {
    marginTop: 20,
    width: "45%",
    borderRadius: 7, // Gerekli yuvarlak köşe yarıçapı
    marginLeft: "auto",
    marginRight: "auto",
    overflow: "hidden", // İçeriklerin dışarı taşmasını engelle
  },
});

export default AddressAddInformation;
