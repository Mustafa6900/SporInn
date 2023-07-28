import React,{useEffect,useState} from 'react';
import {View,SafeAreaView,StyleSheet } from 'react-native';
import Header from '../../components/header';
import SearchButton from '../../components/searchbutton';
import Title from '../../components/sportptTitle';
import ProductCategoryList from './productCategoryList';
import { useNavigation } from '@react-navigation/native';
import { supabase } from '../../supabaseClient';

export default function Products({ navigation }) {

    const [categories, setCategories] = useState([]);

      useEffect(() => {
        const fetchCategories = async () => {
            try {
                const { data, error } = await supabase
                    .from('products_category')
                    .select('*');
                if (error) {
                    console.error(error);
                } else {
                    const updatedData = await Promise.all(data.map(async (item) => {
                        if (item.image_url) {
                          const { data: imageData, error: imageError } = await supabase.storage
                            .from('productscategoryimage')
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
            
                    setCategories(updatedData);
                }
            } catch (error) {
                console.error(error);
            }
        };
        fetchCategories();
    }, []);


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

