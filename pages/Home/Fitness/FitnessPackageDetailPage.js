  import React,{useContext} from 'react';
  import { View, Text, StyleSheet,Image,SafeAreaView,Alert } from 'react-native';
  import Header from '../../../components/header';
  import BackButton from '../../../components/backbutton';
  import Categoryslider from '../../../components/categoryslider';
  import OutputText from '../../../components/outputText';
  import CustomButton from '../../../components/custombutton';
  import { useNavigation } from '@react-navigation/native';


  const FitnessPackageDetailPage = ({ route }) => {
    const navigation = useNavigation();
    const { packet, price, shortdetail,bigdetail,packetid,image } = route.params;

    const categories = [
      // Diğer kategorileri buraya ekleyin
      { name: 'İçerik' },
      { name: 'Yorumlar' },
      { name: 'Google Yorumları' },
         // İçerik kategorisini diziye ekledik
    ];


    return (
      <SafeAreaView style={styles.container}>
          <Header title="Ürün Detayı" />
          <BackButton left={15} top={43} />
          <View style={styles.topContainer}>
          <Image source={{uri:image}} style={styles.topContainerImage} />
          <View style={styles.info}>
          <Text style={styles.price}>Fiyat: ₺{price}</Text>
        <Text style={styles.title}>{packet}</Text>
        <Text style={styles.detail}>{shortdetail}</Text>
        </View>
          </View>
          <Categoryslider items = {categories} />
          <OutputText text={bigdetail} />
          <CustomButton 
          style={{marginTop:20,width:"75%",marginLeft:"auto",marginRight:"auto"}}
          title="Satın Al" 
          onPress={() => navigation.navigate('PaymentFtPtDt', { packet, price, shortdetail,bigdetail,packetid,image})}
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
