import { useState } from 'react';
import { SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import BackButton from '../../components/backbutton';
import CustomTextInput from '../../components/customtext';
import CustomButton from '../../components/custombutton';
export default function Login({ navigation }) {
  const [phone, setPhone] = useState('');
  return(
    <SafeAreaView style={styles.container}>
      
        <View style={styles.viewcontainer}>
        <BackButton />
        <Text style={{ color: "#E0E0E0", fontWeight: 700, fontSize: 30,textAlign:'center',marginBottom:50}}>Giriş Yap</Text>
        <CustomTextInput
          placeholder="Telefon Numarası"
          value={phone}
          onChangeText={(e) => setPhone(e)}
        />
        <CustomButton
          title="TELEFON NUMARASI İLE DEVAM ET"
          onPress={() => navigation.navigate('phoneCode')}
        />
        <View style={{ flexDirection: 'row', paddingHorizontal: 20,top:5}}>
        <Text style={styles.text}>Kişisel verilerinize dair </Text>
        <Text style={[styles.text, styles.highlightedText]}>Aydınlatma Metni</Text>
        <Text style={styles.text}>için tıklayınız.</Text>
        </View>
        <View style={{ flexDirection: 'row', paddingHorizontal: 20,top:40,justifyContent: 'center',}}>
        <Text style={styles.text}>Hala kayıt olmadınız mı? </Text>
        <Text style={[styles.text, styles.highlightedText2]}
        onPress={() => navigation.navigate('SignUp')}
        >Kayıt Ol</Text>
        </View>
        </View>
      </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: '#292929',
  },
  viewcontainer: {
    flex: 1,
    top: 100,
  },
  text: {
    color: '#AAAAAA',
    fontSize: 13,
    fontWeight: '700',
    flexDirection: 'row',
    textAlign: 'center',
    top: 30,
  },
  highlightedText: {
      color: '#FFFFFF',
      marginLeft: 3,
      marginRight: 4,
  },
  highlightedText2: {
    color: '#FF6F25',
    marginLeft: 4,
    marginRight: 4,
},
})