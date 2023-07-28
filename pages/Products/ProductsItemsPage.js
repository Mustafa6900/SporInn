import React,{useEffect,useState} from 'react';
import {ScrollView,View,SafeAreaView,StyleSheet } from 'react-native';
import Header from '../../components/header';
import BackButton from '../../components/backbutton';
import SearchButton from '../../components/searchbutton';
import CategorySlider from '../../components/categoryslider';
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
                const updatedData = await Promise.all(data.map(async (item) => {
                  if (item.image_url) {
                    const { data: imageData, error: imageError } = await supabase.storage
                      .from('productsimage')
                      .getPublicUrl(item.image_url);
      
                    if (imageError) {
                      console.log('Resim alınamadı:', imageError.message);
                    } else {
                      if (imageData) {
                        item.imageData = imageData; // imageData verisini tesis verisine ekleyin
                      }
                    }
                  }
                  return item;
                }));
                setItems(updatedData);

                
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
        {items.length > 0 ? (
        <>
          <CategorySlider items={items[0]} onItemPress={handleCategorySelect} />
          <ScrollView showsVerticalScrollIndicator={false}>
            <ProductList items={items} selectedCategory={selectedCategory}/>
          </ScrollView>
        </>
      ) : (
        null
      )}
      
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#292929',
    },
});
