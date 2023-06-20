import React from 'react';
import { SafeAreaView, StyleSheet,View,Image } from 'react-native';
import Header from '../../components/header';
import ItemTitleFavorite from '../../components/titleFavorite';
import CategorySlider from '../../components/categoryslider';
import FitnessPackagelist from '../Home/Fitness/fitnessPackagelist';
import SportsPackageDetailPage from '../Home/Sports/sportsPackageDetail';
import BackButton from '../../components/backbutton';
import SportProfileInfo from '../../components/sportprofileinfo';
const ItemDetailPage = ({ route }) => {
    const { item } = route.params;
    console.log(item)
    return (
        <SafeAreaView style={styles.container}>
        <Header title={item.maincategory} />
        <BackButton left={15} top={43} />
        <View style={styles.topContainer}>
        <SportProfileInfo onPress={() => console.log('Image pressed')} />
        </View>
        <CategorySlider items = {item} />
        
        {item.maincategory === 'Spor Salonu' || item.maincategory === 'Kişisel Antrenör' || item.maincategory === 'Diyetisyen' ?(
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