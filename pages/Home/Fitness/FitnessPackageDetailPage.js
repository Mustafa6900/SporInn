import React,{useContext} from 'react';
import { View, Text, StyleSheet,Image,SafeAreaView,Alert } from 'react-native';
import Header from '../../../components/header';
import BackButton from '../../../components/backbutton';
import Categoryslider from '../../../components/categoryslider';
import OutputText from '../../../components/outputText';
import CustomButton from '../../../components/custombutton';
import FavoriteButton from '../../../components/favoritebutton';
import { useNavigation } from '@react-navigation/native';
import { AuthContext } from '../../Auth/AuthContext';
import { supabase } from '../../../supabaseClient';
import QRCode from 'react-native-qrcode-svg';

const FitnessPackageDetailPage = ({ route }) => {
   const navigation = useNavigation();
   const { packet, price, shortdetail,bigdetail,image,packetid } = route.params;
   const { session } = useContext(AuthContext);

   const generateQRCodeData = () => {
    const data = {
      packages_id: packetid,
      user_id: session.user.id,
      purchase_date: new Date(),
    };
    return JSON.stringify(data);  
  };

  const handlePurchase = async () => {
    try {
      const qrCodeData = generateQRCodeData();
      const { data, error } = await supabase
        .from('users_fitness_packages')
        .insert([
          {
            user_id: session.user.id,
            packages_id: packetid,
            qr_code: qrCodeData,
            purchase_date : new Date(),
            created_at: new Date(),
          },
        ]);
      if (error) {
        console.error(error);
      } else {
         Alert.alert('Satın Alındı');
      }
    } catch (error) {
      console.error(error);
    }
  };


  return (
    <SafeAreaView style={styles.container}>
        <Header title="Ürün Detayı" />
        <BackButton left={15} top={43} />
        <FavoriteButton left={345} top={45} />
        <View style={styles.topContainer}>
        <Image source={require('../../../assets/buttonpicture.png') } style={styles.topContainerImage} />
        <View style={styles.info}>
        <Text style={styles.price}>Fiyat: ₺{price}</Text>
      <Text style={styles.title}>{packet}</Text>
      <Text style={styles.detail}>{shortdetail}</Text>
      </View>
        </View>
        <Categoryslider items = {{ subcategories: ['İçerik', 'Yorumlar','Google Yorumları'] }} />
        <OutputText text={bigdetail} />
        <CustomButton 
        style={{marginTop:20,width:"75%",marginLeft:"auto",marginRight:"auto"}}
        title="Satın Al" 
        onPress={handlePurchase}  // onPress={() => navigation.navigate('PaymentFtPtDt', { packet, price, shortdetail,bigdetail})}
        />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#292929',
  },
    topContainer: {
        alignContent:"center",
        alignItems:"center",
    },
    topContainerImage: {
        width: 200,
        height: 140,
        marginBottom: 5,
        marginTop: 20,
        borderRadius: 7,
        marginLeft:"auto",
        marginRight:"auto"
    },
    info: {
        flexDirection: 'column',
        marginLeft: 10,
        marginBottom: 5,
        },
    title: {
        fontSize: 14,
        color: '#AAA',
        fontFamily: 'Roboto',
        fontWeight: '600',
        letterSpacing: 0.4,
        marginBottom: 2,
        },
    price: {
        fontSize: 20,
        color: '#AAA',
        fontFamily: 'Roboto',
        fontWeight: 'bold',
        letterSpacing: 0.4,
        marginBottom: 10,
        marginTop: 20,
        },
    detail: {
        fontSize: 14,
        color: '#AAA',
        fontFamily: 'Roboto',
        fontWeight: '600',
        letterSpacing: 0.4,
        },
   

});

export default FitnessPackageDetailPage;
