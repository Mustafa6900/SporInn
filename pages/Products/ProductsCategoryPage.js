import * as React from 'react';
import {View,SafeAreaView,StyleSheet } from 'react-native';
import Header from '../../components/header';
import SearchButton from '../../components/searchbutton';
import Title from '../../components/sportptTitle';
import ProductCategoryList from './productCategoryList';
import { useNavigation } from '@react-navigation/native';

export default function Products({ navigation }) {
    const categories = [
        { id: 1, name: 'Supplement', image: require('../../assets/productcategoriespic/supplement.png') },
        { id: 2, name: 'Spor Giyim', image: require('../../assets/productcategoriespic/clothes.png') },
        { id: 3, name: 'Spor Ekipmanları', image: require('../../assets/productcategoriespic/sportEquipment.png') },
        { id: 4, name: 'Spor  Beslenme', image: require('../../assets/productcategoriespic/sportNutrition.png') },
        { id: 5, name: 'Elektronik Spor Aletleri', image: require('../../assets/productcategoriespic/electronicSportsEquipment.png') },
        { id: 6, name: 'Spor Çantaları ve Saklama', image: require('../../assets/productcategoriespic/sportsBagsandStorage.png') },  
      ];

      const navigations = useNavigation();
      const handleCategoryPress = (category) => {
        navigations.navigate('ProductsItems', { category: category.name });
     };
    
    return (
        <SafeAreaView style={styles.container}>
            <Header title="Ürünler" />
            <View style={{top:15}}>
            <SearchButton placeholder="Ürün ara" />
            </View>
            <View style={{top:25}}>
            <Title title="Ürün Kategorileri" />
            </View>
         
            <ProductCategoryList categories={categories} onCategoryPress={handleCategoryPress} />
            
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#292929',
    },

});

