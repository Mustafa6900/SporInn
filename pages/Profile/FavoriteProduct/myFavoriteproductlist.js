import React,{useContext,useEffect,useState} from 'react';
import { Text, StyleSheet, TouchableOpacity, Image, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { supabase } from '../../../supabaseClient';
import { AuthContext } from '../../Auth/AuthContext';

const MyFavoriteproductlist = () => {
    const { session } = useContext(AuthContext);
    const [item, setItem] = useState([]);
    
    useEffect(() => {
        const fetchFavoriteProducts = async () => {
          try {
            const { data, error } = await supabase
              .from('users_favorite_products')
              .select('product_id,products(id,*)')
              .eq('created_id', session.user.id);
            if (error) {
              console.error(error);
            } else {
              setItem(data || []);
            }
          } catch (error) {
            console.error(error);
          }
        };
        fetchFavoriteProducts();
      }, []);




    const navigation = useNavigation();

    const handleItemPress = (product) => {
      navigation.navigate('ProductDetailPage', {item: product });
    };

  return (
    <View style={styles.container}>
      {item.map((favoriteProduct) => (
          <TouchableOpacity
            key={favoriteProduct.product_id}
            style={styles.item}
            onPress={() => handleItemPress(favoriteProduct.products)}
            >
                
            <Image source={ require('../../../assets/productcategoriespic/supplement.png')} style={styles.itemImage} />
            <View style={styles.itemInfo}>
              <Text style={styles.itemName}>{favoriteProduct.products.name}</Text>
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

export default MyFavoriteproductlist;

// Spor listesi (kategoriler) için kullanılan component