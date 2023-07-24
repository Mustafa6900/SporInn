import React,{useState} from 'react';
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
    const [selectedCategory, setSelectedCategory] = useState(null);

    const handleCategorySelect = (selectedCategory) => {
      setSelectedCategory(selectedCategory);
    };
  
    console.log("asdasd",item);
    return (
        <SafeAreaView style={styles.container}>
        
        <Header title={item.name} />
        <BackButton left={15} top={43} />
        <View style={styles.topContainer}>
        <SportProfileInfo items={item} />
        </View>
        <CategorySlider items = {item} onItemPress={handleCategorySelect}/>
        
        {item.type === 'fitness_center' || item.type === 'personal_trainer' || item.type === 'dietitian' ?(
        <FitnessPackagelist items={item} selectedCategory={selectedCategory} />  
        ) : (
        <SportsPackageDetailPage item={item} selectedCategory={selectedCategory}/>
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