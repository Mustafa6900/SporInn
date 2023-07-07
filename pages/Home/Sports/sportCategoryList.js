import React from 'react';
import { Text, StyleSheet, TouchableOpacity, Image, View } from 'react-native';

const SportList = ({ categories, onCategoryPress }) => {
  const handleCategoryPress = (category) => {
    onCategoryPress(category);
  };

    /*  Sports Category List
  const [categories, setCategories] = useState([]);
  const [imageUrls, setImageUrls] = useState({});

  useEffect(() => {
    const fetchCategoriesData = async () => {
      try {
        const { data, error } = await supabase
          .from('sports_category')
          .select('*');

        if (error) {
          console.error(error);
        } else {
          setCategories(data || []);

          for (const category of data) {
            const { data: imageData, error: imageError } = await supabase
              .storage
              .from('your_bucket_name')
              .download(category.image_url);
            if (imageError) {
              console.error(imageError);
            } else {
              setImageUrls((prev) => ({
                ...prev,
                [category.image_url]: imageData,
              }));
            }
          }
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchCategoriesData();
  }, []);
  */

  return (
    <View style={styles.container}>
      {categories.map((category, index) => (
        <TouchableOpacity
          key={index}
          style={styles.category}
          onPress={() => handleCategoryPress(category)}
        >
          <Image source={category.image} style={styles.categoryImage} />
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