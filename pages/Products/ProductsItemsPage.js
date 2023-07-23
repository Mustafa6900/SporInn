import * as React from 'react';
import {ScrollView,View,SafeAreaView,StyleSheet } from 'react-native';
import Header from '../../components/header';
import BackButton from '../../components/backbutton';
import SearchButton from '../../components/searchbutton';
import CategorySlider from '../../components/categoryslider';
import productsdata from './productsdata.json';
import ProductList from './productsItemList';
import { useNavigation } from '@react-navigation/native';

export default function ProductsItems({ route }) {
        const { category } = route.params;
      
        const getItems = () => {
          const categoryData = productsdata.find((data) => category in data);
          if (categoryData) {
            return categoryData[category];
          } else {
            return [];
          }
        };
        const items = getItems();

        const categories = [
          // Diğer kategorileri buraya ekleyin
          { name: 'İçerik' },
          { name: 'İçerik 1' },
          { name: 'İçerik 2' },
             // İçerik kategorisini diziye ekledik
        ];
    return (
        <SafeAreaView style={styles.container}>
        <Header title={category} />
        <BackButton left={15} top={43} />
        <View style={{ top:-15 }}>
        <SearchButton placeholder={`${category} Ara`} />
        </View>
        <CategorySlider items = {categories}/>

        { /*<CategorySlider items = {{ subcategories: ['kategori 1', 'kategori 2', 'kategori 3'] }}/>*/}
      
 
        <ScrollView showsVerticalScrollIndicator={false}>
        <ProductList items={items} />
        </ScrollView>
      
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#292929',
    },
});
