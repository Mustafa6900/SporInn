import React,{useEffect,useState} from 'react';
import {ScrollView,View,SafeAreaView,StyleSheet } from 'react-native';
import Header from '../../components/header';
import BackButton from '../../components/backbutton';
import SearchButton from '../../components/searchbutton';
import CategorySlider from '../../components/categoryslider';
import ProductList from './productsItemList';
import { supabase } from '../../supabaseClient';
export default function ProductsItems({ route }) {
    const { category,categoryId } = route.params;
    const [items, setItems] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [searchResults, setSearchResults] = useState([]);

    useEffect(() => {
          const fetchData = async () => {
            try {
              const { data, error } = await supabase
                .from('products')
                .select('*,categoryid,categories(id,name)')
                .eq('main_category_id', categoryId);
              if (error) {
                console.error(error);
              } else {
                const updatedData = await Promise.all(data.map(async (item) => {
                  if (item.image_url) {
                    const { data: imageData, error: imageError } = await supabase.storage
                      .from('productsimage')
                      .getPublicUrl(item.image_url);
      
                    if (imageError) {
                      console.error('Resim alınamadı:', imageError.message);
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

    const handleCategorySelect = (selectedCategory) => {
      setSelectedCategory(selectedCategory);
    };

    const handleSearchResults = async (results) => {
      setSearchResults(results);
  
    };

    return (
        <SafeAreaView style={styles.container}>
        <Header title={category} />
        <BackButton left={15} top={43} />
        <View >
        <SearchButton placeholder={`${category} Ara`} table={"products"} column={"name"} storage={"productsimage"} onSearchResults={handleSearchResults} name={"Ürün"} categoryId={categoryId} selectedCategory={selectedCategory} />
        </View>
        {items.length > 0 ? (
        <>
          <CategorySlider items={items[0]} onItemPress={handleCategorySelect}/>
          <ScrollView showsVerticalScrollIndicator={false}>
            <ProductList items={items} selectedCategory={selectedCategory} searchItem={searchResults}/>
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
