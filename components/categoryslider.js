import React,{useEffect,useState} from 'react';
import { View, Text, FlatList,StyleSheet } from 'react-native';
import { supabase } from '../supabaseClient';
import * as Animatable from 'react-native-animatable';

const SubCategories = ({ items, onItemPress,style }) => {
  const [itemss, setItemss] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    fetchItems();
  }, []);

    const fetchItems = async () => {
      try {
        let data;
        if (items.type === "sports_facility") {
          const { data: sportsData, error: sportsError } = await supabase
            .from('sports_facilities_config')
            .select('*')
            .eq('created_id', items.created_id);
          if (sportsError) {
            console.error(sportsError);
          } else {
            data = sportsData || [];
            setSelectedCategory(data[0]); // İlk kategoriyi seçili hale getir
            onItemPress(data[0]); // İlk kategoriyi seçili hale getir
            setItemss(data);
          }
        } 
        else if (items.type === "fitness_center") {
          const tumuKategori = {
            id: 0, 
            name: "Tümü", 
            created_id: 1 
          };
          const { data: categoryData, error: categoryError } = await supabase
            .from('categories')
            .select('*')
            .eq('created_id', items.created_id);
          if (categoryError) {
            console.error(categoryError);
          } else {
            data = categoryData || [];
            const categoryList = [tumuKategori, ...data];
            setSelectedCategory(tumuKategori);
            onItemPress(tumuKategori); 
            setItemss(categoryList); 
          }
        }
        // Supplementleri aşağıdaki gibi çağırıyorum.
        else if (items.type === "products") {
          const tumuKategori = {
            id: 0, 
            name: "Tümü", 
            created_id: 1 
          };
          const { data: categoryData, error: categoryError } = await supabase
            .from('categories')
            .select('*')
            .eq('created_id',items.main_category_id);
          if (categoryError) {
            console.error(categoryError);
          } else {
            data = categoryData || [];
            const categoryList = [tumuKategori, ...data];
            setSelectedCategory(tumuKategori);
            onItemPress(tumuKategori); 
            setItemss(categoryList); 
          }
        }
        else {
          setItemss(items);
          setSelectedCategory(items[0]); 
        }
      } catch (error) {
        console.error(error);
      }
    };

  const handleItemPress = (item) => {
      setSelectedCategory(item); // Yeni bir kategori seçildiyse seçimi güncelle
      onItemPress(item); // onItemPress fonksiyonunu çağır
    
  };

  const renderItem = ({ item }) => (
    <Text
      style={[
        styles.categoryText,
        selectedCategory === item && styles.selectedCategoryText,
      ]}
      onPress={() => handleItemPress(item)}
    >
     
      {item.name}
    </Text>
  );

  return (
    <Animatable.View
    animation="zoomIn" // İstediğiniz animasyonu buraya ekleyin
    duration={1000} // Animasyon süresini burada ayarlayın
    style={[styles.container ,style]}
  >
    <FlatList
      style={styles.flatcontainer }
      data={itemss}
      horizontal={true}
      renderItem={renderItem}
      keyExtractor={(item, index) => index.toString()}
      showsHorizontalScrollIndicator={false}
     
    />
  </Animatable.View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#AAAAAA",
    overflow: "hidden",
    marginTop: 25,
    height: 55,
    borderRadius: 3,
    borderWidth: 2,
    borderColor: "#292929",
  },
  flatcontainer: {
    paddingLeft: 25,
  },
  categoryText: {
    fontSize: 14,
    color: '#AAAAAA',
    fontFamily: 'Roboto',
    fontWeight: 'bold',
    letterSpacing: 0.4,
    borderWidth: 1,
    borderRadius: 7,
    height: 30,
    width: "auto",
    padding: 5,
    marginRight: 30,
    marginTop: 10,
    backgroundColor: "#1F1F1F",
    paddingLeft: 15,
    paddingRight: 15,
  },
  selectedCategoryText: {
    backgroundColor: '#FF6F25',
    color: '#0D0D0D',
    borderColor: '#FF6F25',
  },
});

export default SubCategories;
