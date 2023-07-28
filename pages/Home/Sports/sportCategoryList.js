import React,{useState,useEffect} from 'react';
import { Text, StyleSheet, TouchableOpacity, Image, View } from 'react-native';
import { supabase } from '../../../supabaseClient';
const SportList = ({onCategoryPress }) => {
  const handleCategoryPress = (category) => {
    onCategoryPress(category);
  };

  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategoriesData = async () => {
      try {
        const { data, error } = await supabase
          .from('sports_category')
          .select('*');

        if (error) {
          console.error(error);
        } else {
          const updatedData = await Promise.all(data.map(async (item) => {
            if (item.image_url) {
              const { data: imageData, error: imageError } = await supabase.storage
                .from('sportscategory')
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
          setCategories(updatedData || []);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchCategoriesData();
  }, []);
  

  return (
    <View style={styles.container}>
      {categories.map((category, index) => (
        <TouchableOpacity
          key={index}
          style={styles.category}
          onPress={() => handleCategoryPress(category)}
        >
          <Image source={{uri: category.imageData?.publicUrl}} style={styles.categoryImage} />
          <View style={styles.categoryInfo}>
            <Text style={styles.categoryName}>{category.name}</Text>
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignSelf: 'center',
    width: '90%',
    marginTop: 30,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  category: {
    flexDirection: 'column',
    marginBottom: 70,
    height: 120,
    width: 80,
    borderRadius: 7,
  },
  categoryImage: {
    width: '100%',
    height: '70%',
    marginRight: 10,
    borderRadius: 7,
    borderColor: '#FF6F25',
    borderWidth: 2,
  },
  categoryInfo: {
    marginTop: 10,
    alignItems: 'center',
  },
  categoryName: {
    fontSize: 15,
    fontWeight: '700',
    color: '#AAAAAA',
    textAlign: 'center',
  },
});

export default SportList;

// Spor listesi (kategoriler) için kullanılan component