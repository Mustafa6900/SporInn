import React,{ useState } from 'react';
import {StyleSheet, View,SafeAreaView,Text, KeyboardAvoidingView,Alert} from 'react-native';
import CustomTextInput from '../../components/customtext.js';
import CheckButton from '../../components/checkbutton.js';
import CustomButton from '../../components/custombutton.js';
import BackButton from '../../components/backbutton.js';
import { useNavigation } from '@react-navigation/native';
import { supabase } from '../../supabaseClient.js';
export default function SignUp({navigation}) { 
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [password, setPassword] = useState('');
    const [isChecked, setChecked] = useState(false);
    const handleButtonPress = () => {
      setChecked(!isChecked);
    };

    const handleSignUp = async () => {
        try {
          const {error } = await supabase.auth.signUp({
            email: email,
            password: password,
            options: {
              data: {
                first_name: name,
                last_name: surname,
                phone: phone,
                image_url: ""
              },
              table: 'profiles'
            }
          });
    
          if (error) {
            // Kayıt hatası varsa alert mesajını göster
            Alert.alert('Hata', "Kayıt bilgilerinizi kontrol ediniz.");
          } else {
            // Kayıt başarılı olduğunda alert mesajını göster ve login sayfasına yönlendir
            Alert.alert('Kayıt Tamamlandı', 'Kaydınız başarıyla tamamlandı!', [{ text: 'Tamam', onPress: () => navigation.navigate('Tabbar') }]);
          }
        } catch (error) {
          console.error('Sign up error:', error.message);
          // Hata durumunda kullanıcıya uygun bir geri bildirim gösterilebilir
        }
      };


    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.viewcontainer}>
        <Text style={{ color: "#E0E0E0", fontWeight: 700, fontSize: 30,textAlign:'center',marginBottom:50}}>Kayıt Ol</Text>
        <BackButton />
        <CustomTextInput
          placeholder="Telefon Numarası"
          value={phone}
          onChangeText={(e) => setPhone(e)}
        />
        <View style={{flexDirection:"row"}}>
        <CustomTextInput
          placeholder="Ad"
          value={name}
          onChangeText={(e) => setName(e)}
          style={{width:180,marginRight:10}}
        />
          <CustomTextInput
          placeholder="Soyad"
          value={surname}
          onChangeText={(e) => setSurname(e)}
          style={{width:180}}

        />
        </View>
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
        <View style={{ flexDirection: 'row', paddingHorizontal: 20,top:5}}>
         <CheckButton
        title="✓"
        onPress={handleButtonPress}
        checked={isChecked}
      />
        <Text style={{ color: "#AAAAAA", fontWeight: 700, fontSize: 13,textAlign:'center',width:300}}>SporInn'in bana özel kampanya, tanıtım ve fırsatlarından haberdar olmak istiyorum.</Text>
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.text}>Kişisel verilerinize dair</Text>
          <Text style={[styles.text, styles.highlightedText]}>Aydınlatma Metni</Text>
          <Text style={styles.text}>için tıklayınız. Üye olmakla, Kullanım Koşulları hükümlerini kabul etmektesiniz.</Text>
        </View>
        <CustomButton
          title="KAYIT OL"
          onPress={handleSignUp}
        />
        </View>
        
      
      </SafeAreaView>
    );
  };

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
    textContainer: {
      flexDirection: 'row',
      top: 45,
      flexWrap: 'wrap',
      textAlign: 'center',
      left: 5,
      marginBottom: 100,  
    },
    textContainer2: {
      flexDirection: 'row',
      justifyContent: 'center',
      left: 5,
      bottom: 100,
      keyboardVerticalOffset: 200,
    },
    text: {
      color: '#AAAAAA',
      fontWeight: '700',
      fontSize: 13,
    },
    
    highlightedText2: {
      color: '#FF6F25',
      marginLeft: 4,
      marginRight: 4,
      
    },
    highlightedText: {
      color: '#FFFFFF',
      marginLeft: 4,
      marginRight: 4,
    },
  });