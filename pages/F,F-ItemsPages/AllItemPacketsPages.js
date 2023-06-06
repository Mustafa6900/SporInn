import React from 'react';
import { SafeAreaView, StyleSheet,View,Image } from 'react-native';
import Header from '../../components/header';
import ItemTitleFavorite from '../../components/titleFavorite';
import CategorySlider from '../../components/categoryslider';
import FitnessPackagelist from '../Home/Fitness/fitnessPackagelist';
import SportsPackageDetailPage from '../Home/Sports/sportsPackageDetail';
import BackButton from '../../components/backbutton';
const ItemDetailPage = ({ route }) => {
    const { item } = route.params;
    return (
        <SafeAreaView style={styles.container}>
        <Header title={item.maincategory} />
        <BackButton left={15} top={-35} />
        <View style={styles.topContainer}>
        <Image source={ require('../../assets/buttonpicture.png') } style={styles.topContainerImage} />
        <ItemTitleFavorite title={item.name} point={item.point} />
        </View>
        <CategorySlider items = {item} />
        
        {item.maincategory === 'Spor Salonu' ? (
        <FitnessPackagelist items={item} />  
        ) : (
        <SportsPackageDetailPage items={item} />
        )}</SafeAreaView>
    );
    }

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#292929',
    },
    topContainer: {
        backgroundColor:"#AAAAAA",
        marginTop:-5,
        borderRadius: 0
    },
    topContainerImage: {
        width: 375,
        height: 180,
        marginBottom: 10,
        marginTop: 20,
        borderRadius: 7,
        marginLeft:"auto",
        marginRight:"auto"
    },
    
    text: {
        fontSize: 16,
        color: '#AAAAAA',
        fontFamily: 'Roboto',
        fontWeight: 'bold',
        letterSpacing: 0.4,
    },
   
    });

export default ItemDetailPage;

// Seçilen ürüne göre, paketlerini gösteren sayfa 