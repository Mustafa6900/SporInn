import { useState } from 'react';
import {StyleSheet, View,SafeAreaView,Text, KeyboardAvoidingView} from 'react-native';
import CustomTextInput from '../../components/customtext.js';
import CheckButton from '../../components/checkbutton.js';
import CustomButton from '../../components/custombutton.js';
import BackButton from '../../components/backbutton.js';
import { useNavigation } from '@react-navigation/native';

export default function SignUp({navigation}) { 
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [name, setName] = useState('');
    const [isChecked, setChecked] = useState(false);
    const handleButtonPress = () => {
      setChecked(!isChecked);
    };
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.viewcontainer}>
        <BackButton />
        <Text style={{ color: "#E0E0E0", fontWeight: 700, fontSize: 30,textAlign:'center',marginBottom:50}}>Kayıt Ol</Text>
        <CustomTextInput
          placeholder="Telefon Numarası"
          value={phone}
          onChangeText={(e) => setPhone(e)}
        />
        <CustomTextInput
          placeholder="Ad Soyad"
          value={name}
          onChangeText={(e) => setName(e)}
        />
        <CustomTextInput
          placeholder="E-Posta"
          value={email}
          onChangeText={(e) => setEmail(e)}
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
          onPress={() => navigation.navigate('Login')}
        />
        </View>
        
        <KeyboardAvoidingView style={styles.textContainer2} keyboardVerticalOffset={80} behavior="padding">
          <Text style={styles.text}>SporInn'e üyeyseniz</Text>
          <Text style={[styles.text, styles.highlightedText2]}
          onPress={() => navigation.navigate('Login')}
          >Giriş Yap</Text>
        </KeyboardAvoidingView>
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