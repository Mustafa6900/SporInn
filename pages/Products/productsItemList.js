import React,{useEffect,useState} from 'react';
import { Text, StyleSheet, TouchableOpacity, Image, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { supabase } from '../../supabaseClient';
const ProductList = ({ items, selectedCategory }) => {
    const navigation = useNavigation();
    const selectCategory = selectedCategory?.id; // ? işareti ile optional chaining kullanarak selectedCategory'nin null olması durumunda hata almamak için kontrol ediyoruz.
    const [products, setProducts] = useState([]);
    const handleItemPress = (item) => {
      navigation.navigate('ProductDetailPage', { item});
    };

    useEffect(() => {
      const fetchProducts = async () => {
        try {
          if (!selectedCategory) return; // Eğer seçili kategori yoksa, verileri getirme

          const { data, error } = await supabase
            .from('products')
            .select('*')
            .eq('categoryid', selectCategory) // selectCategory değişkenini kullanarak filtreleme yapın')
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
              setProducts(updatedData || []);
            }
          } catch (error) {
            console.error(error);
          }
        };
        fetchProducts();
      }, [selectCategory]);

      return (
        <View style={styles.container}>
          {selectCategory === 0 ? (
            items.map((item, index) => (
              <TouchableOpacity
                key={index}
                style={styles.item}
                onPress={() => handleItemPress(item)}
              >
                <Image source={{uri: item.imageData?.publicUrl}} style={styles.itemImage} />
                <View style={styles.itemInfo}>
                  <Text style={styles.itemName}>{item.name}</Text>
                </View>
              </TouchableOpacity>
            ))
          ) : (
             products.map((item, index) => (
            <TouchableOpacity 
            key={index}
            style={styles.item}
            onPress={() => handleItemPress(item)}
            >
               <Image source={{uri: item.imageData?.publicUrl}} style={styles.itemImage} />
                <View style={styles.itemInfo}>
                  <Text style={styles.itemName}>{item.name}</Text>
                </View>
              </TouchableOpacity>
              ))
          )}
        </View>
    );
    
};

const styles = StyleSheet.create({
  container: {
    alignSelf: 'center',
    width: '90%',
    marginTop: '10%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  item: {
    flexDirection: 'column',
    marginBottom: 55,
    height: 150,
    width: 100,
    borderRadius: 7,
  },
  itemImage: {
    width: '100%',
    height: '70%',
    marginRight: 10,
    borderRadius: 7,
    borderColor: '#FF6F25',
    borderWidth: 0.5,
  },
  itemInfo: {
    marginTop: 10,
    alignItems: 'center',
  },
  itemName: {
    fontSize: 15,
    fontWeight: '700',
    color: '#AAAAAA',
    textAlign: 'center',
  },
});

export default ProductList;

// Spor listesi (kategoriler) için kullanılan component