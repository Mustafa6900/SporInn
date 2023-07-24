import React,{useEffect,useState} from 'react';
import { View, Text, FlatList,StyleSheet } from 'react-native';
import { supabase } from '../supabaseClient';
import * as Animatable from 'react-native-animatable';

const SubCategories = ({ items, onItemPress }) => {
  const [itemss, setItemss] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  console.log(items.created_id);
  useEffect(() => {

    if (items && items[0]?.name === "İçerik") {
      setItemss(items);
    }
    else{
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
          }
        } else {
          const { data: categoryData, error: categoryError } = await supabase
            .from('categories')
            .select('*')
            .eq('created_id', items.created_id);
          if (categoryError) {
            console.error(categoryError);
          } else {
            data = categoryData || [];
            console.log(data);
          }
        }
        setSelectedCategory(data[0]); // İlk kategoriyi seçili hale getir
        onItemPress(data[0]); // İlk kategoriyi seçili hale getir
        setItemss(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchItems();}
  }, [items]);

  const handleItemPress = (item) => {
    if (item.name !== "İçerik") {
      setSelectedCategory(item);
      onItemPress(item);
    }
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
    animation="bounceIn" // İstediğiniz animasyonu buraya ekleyin
    duration={2500} // Animasyon süresini burada ayarlayın
    style={styles.container}
  >
    <FlatList
      style={styles.flatcontainer}
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
    height: 50,
    borderRadius: 3,
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
    marginRight: 25,
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
