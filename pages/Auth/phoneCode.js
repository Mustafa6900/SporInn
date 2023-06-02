import { useState } from 'react';
import { SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import BackButton from '../../components/backbutton';
import CustomTextInput from '../../components/customtext';
import CustomButton from '../../components/custombutton';
export default function Login({ navigation }) {
  const [code, setCode] = useState('');
  return(
    <SafeAreaView style={styles.container}>
      
        <View style={styles.viewcontainer}>
        <BackButton />
        <Text style={{ color: "#E0E0E0", fontWeight: 700, fontSize: 30,textAlign:'center',marginBottom:50}}>Giriş Yap</Text>
        <CustomTextInput
          placeholder="Kodu giriniz"
          value={code}
          onChangeText={(e) => setCode(e)}
        />
        <CustomButton
          title="ONAYLAYIN"
          onPress={() => navigation.navigate('Tabbar')}
        />
        <View style={{ flexDirection: 'row', paddingHorizontal: 20,top:5}}>
        <Text style={styles.text}>Kişisel verilerinize dair </Text>
        <Text style={[styles.text, styles.highlightedText]}>Aydınlatma Metni</Text>
        <Text style={styles.text}>için tıklayınız.</Text>
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