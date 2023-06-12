import { useState } from 'react';
import { SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View, Alert} from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import BackButton from '../../components/backbutton';
import CustomTextInput from '../../components/customtext';
import CustomButton from '../../components/custombutton';
import { supabase } from '../../supabaseClient';
export default function Login({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
      });
  
      if (error) {
        // Giriş hatası varsa kullanıcıya bir uyarı göster
        Alert.alert("Giriş Başarışız", "Giriş bilgilerinizi kontrol ediniz.")
      } else {
        Alert.alert('Giriş Başarılı', 'Giriş başarıyla tamamlandı!', [{ text: 'Tamam', onPress: () => navigation.navigate('Tabbar') }]);
        
      }
    } catch (error) {
      console.error(error);
    }
  };
  return(
    <SafeAreaView style={styles.container}>
      
        <View style={styles.viewcontainer}>
        <Text style={{ color: "#E0E0E0", fontWeight: 700, fontSize: 30,textAlign:'center',marginBottom:50}}>Giriş Yap</Text>
        <BackButton />
        <CustomTextInput
          placeholder="E-Posta"
          value={email}
          onChangeText={(e) => setEmail(e)}
        />
         <CustomTextInput
          placeholder="Şifre"
          value={password}
          onChangeText={(e) => setPassword(e)}
        />
        <CustomButton
          title="GİRİŞ YAP"
          onPress={handleLogin}
        />
        <View style={{ flexDirection: 'row', paddingHorizontal: 20,top:5}}>
        <Text style={styles.text}>Kişisel verilerinize dair </Text>
        <Text style={[styles.text, styles.highlightedText]}>Aydınlatma Metni</Text>
        <Text style={styles.text}>için tıklayınız.</Text>
        </View>
        <View style={{ flexDirection: 'row', paddingHorizontal: 20,top:40,justifyContent: 'center',}}>
        <Text style={styles.text}>Hala kayıt olmadınız mı? </Text>
        <Text style={[styles.text, styles.highlightedText2]}
        onPress={() => navigation.navigate('ExampleSignUp')}
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