import React,{useEffect,useState} from 'react';
import {ScrollView,View,SafeAreaView,StyleSheet } from 'react-native';
import Header from '../../components/header';
import BackButton from '../../components/backbutton';
import SearchButton from '../../components/searchbutton';
import CategorySlider from '../../components/categoryslider';
import productsdata from './productsdata.json';
import ProductList from './productsItemList';
import { supabase } from '../../supabaseClient';
export default function ProductsItems({ route }) {
        const { category } = route.params;
        const [items, setItems] = useState([]);
        const [selectedCategory, setSelectedCategory] = useState(null);

    const handleCategorySelect = (selectedCategory) => {
      setSelectedCategory(selectedCategory);
    };

        useEffect(() => {
          const fetchData = async () => {
            try {
              const { data, error } = await supabase
                .from('products')
                .select('*,categoryid,categories(id,name)')
                .eq('main_category', category);
              if (error) {
                console.error(error);
              } else {
                setItems(data || []);
              }
            } catch (error) {
              console.error(error);
            }
          };
          fetchData();
          
        }, []);

    return (
        <SafeAreaView style={styles.container}>
        <Header title={category} />
        <BackButton left={15} top={43} />
        <View >
        <SearchButton placeholder={`${category} Ara`} />
        </View>
        {items.map((item) => (
        <CategorySlider key={item.id} items = {item} onItemPress={handleCategorySelect}/>
      ))}
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
