import React,{useState,useContext} from 'react';
import { View, Text, StyleSheet,Image,SafeAreaView,Alert } from 'react-native';
import Header from '../../components/header';
import BackButton from '../../components/backbutton';
import Categoryslider from '../../components/categoryslider';
import OutputText from '../../components/outputText';
import CustomButton from '../../components/custombutton';
import FavoriteButton from '../../components/favoritebutton';
import { supabase } from '../../supabaseClient';
import { AuthContext } from '../Auth/AuthContext';
const ProductDetailPage = ({ route }) => {
  const { item } = route.params;
  const { session } = useContext(AuthContext);
  const categories = [
    // Diğer kategorileri buraya ekleyin
    { name: 'İçerik' },
    { name: 'Yorumlar' },
    { name: 'Google Yorumları' },   // İçerik kategorisini diziye ekledik
  ];

  const handleCartsProduct = async () => {
    try {
      const { data, error } = await supabase
        .from('users_carts')
        .insert([
          {
            created_id: session.user.id,
            product_id: item.id,
            created_at: new Date(),
            quantity : 1
          },
        ]);
      if (error) {
        console.error(error);
      } else {
        Alert.alert('Sepete Eklendi');
      }
    } catch (error) {
      console.error(error);
    }
  };


  return (
    <SafeAreaView style={styles.container}>
        <Header title="Ürün Detayı" />
        <BackButton left={15} top={43} />
        <FavoriteButton left={345} top={45} item_id={item.id}/>
        <View style={styles.topContainer}>
        <Image source={require('../../assets/buttonpicture.png') } style={styles.topContainerImage} />
        <View style={styles.info}>
        <Text style={styles.price}>Fiyat: {item.price}</Text>
      <Text style={styles.title}>{item.name}</Text>
      <Text style={styles.detail}>{item.small_description}</Text>
      </View>
        </View>
        <Categoryslider items = {categories} />
        <OutputText text={item.description} />
        <CustomButton style={{marginTop:20,width:"75%",marginLeft:"auto",marginRight:"auto"}}title="Sepete Ekle"  onPress={handleCartsProduct} />
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

export default ProductDetailPage;
