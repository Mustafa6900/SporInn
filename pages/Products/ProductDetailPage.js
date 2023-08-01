import React,{useState,useContext} from 'react';
import { View, Text, StyleSheet,Image,SafeAreaView,Alert,TouchableOpacity } from 'react-native';
import Header from '../../components/header';
import BackButton from '../../components/backbutton';
import Categoryslider from '../../components/categoryslider';
import OutputText from '../../components/outputText';
import CustomButton from '../../components/custombutton';
import FavoriteButton from '../../components/favoritebutton';
import { Ionicons } from '@expo/vector-icons';
import { supabase } from '../../supabaseClient';
import { AuthContext } from '../Auth/AuthContext';
import { Picker } from '@react-native-picker/picker';
import { useNavigation } from '@react-navigation/native';
const ProductDetailPage = ({ route }) => {
  const { item } = route.params;
  const { session } = useContext(AuthContext);
  const [quantityDropdown, setQuantityDropdown] = useState(1);
  const navigation = useNavigation();

  const navigateToCart = () => {
    navigation.navigate('Cart');
  };

  const categories = [
    // Diğer kategorileri buraya ekleyin
    { name: 'İçerik' },
    { name: 'Yorumlar' },
    // İçerik kategorisini diziye ekledik
  ];

  const handleQuantityChange = (value) => {
    setQuantityDropdown(value);
  };
  const handleCartsProduct = async () => {
    try {
      // Ürünü sepete eklemek için önce sepette aynı ürünün olup olmadığını kontrol edin
      const { data: existingProduct, error: fetchError } = await supabase
        .from('users_carts')
        .select('*')
        .eq('created_id', session.user.id)
        .eq('product_id', item.id);
  
      if (fetchError) {
        console.error(fetchError);
      } else {
        if (existingProduct && existingProduct.length > 0) {
          // Eğer ürün zaten sepette varsa quantity değerini artırın
          const updatedQuantity = existingProduct[0].quantity + quantityDropdown;
          await supabase
            .from('users_carts')
            .update({ quantity: updatedQuantity })
            .eq('created_id', session.user.id)
            .eq('product_id', item.id);
        } else {
          // Eğer ürün sepette yoksa yeni bir ürün olarak ekleyin
          const { data: newProduct, error: insertError } = await supabase
            .from('users_carts')
            .insert([
              {
                created_id: session.user.id,
                product_id: item.id,
                created_at: new Date(),
                quantity: quantityDropdown,
              },
            ]);
  
          if (insertError) {
            console.error(insertError);
          }
        }
  
        Alert.alert('Sepete Eklendi');
      }
    } catch (error) {
      console.error(error);
    }
  };
  
  return (
    <SafeAreaView style={styles.container}>
        <Header title="Ürün Detayı" />
        <BackButton left={15} top={43} />
        <FavoriteButton left={360} top={45} item_id={item.id}/>
        <TouchableOpacity onPress={navigateToCart} style={{ left: 310, top: 45, position: "absolute" }}>
        <Ionicons name="cart-outline" size={40} />        
        </TouchableOpacity>
        <View style={styles.topContainer}>
        <Image source={{uri: item.imageData?.publicUrl} } style={styles.topContainerImage} />
        <View style={styles.info}>
        <Text style={styles.price}>Fiyat: ₺{item.price}</Text>
      <Text style={styles.title}>{item.name}</Text>
      <Text style={styles.detail}>{item.small_description}</Text>
      </View>
        </View>
        <Categoryslider items = {categories} />
        <OutputText text={item.description} />
        {item.type == "products" ?
        <View style={{ width: '22%', marginLeft: 'auto', marginRight: 'auto', color: '#AAA', marginTop: 15, borderWidth:1,borderColor:"#AAA",borderRadius:7 }}>

            <Picker
            style={{ width: '105%', fontWeight: "bold", color: "#AAA" }}
            selectedValue={quantityDropdown}
            onValueChange={(value) => handleQuantityChange(value)}
          >
            {Array.from({ length: 10 }, (_, i) => (
              <Picker.Item key={i} label={`${i + 1}`} value={i + 1} />
            ))}
          </Picker>
      </View>  : null}

        <CustomButton style={{marginTop:15,width:"75%",marginLeft:"auto",marginRight:"auto"}}title="Sepete Ekle"  onPress={handleCartsProduct} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#292929',
  },
    topContainer: {
        alignContent:"center",
        alignItems:"center",
    },
    topContainerImage: {
        width: 200,
        height: 140,
        marginBottom: 5,
        marginTop: 20,
        borderRadius: 7,
        marginLeft:"auto",
        marginRight:"auto"
    },
    info: {
        flexDirection: 'column',
        marginLeft: 10,
        marginBottom: 5,
        },
    title: {
        fontSize: 14,
        color: '#AAA',
        fontFamily: 'Roboto',
        fontWeight: '600',
        letterSpacing: 0.4,
        marginBottom: 2,
        },
    price: {
        fontSize: 20,
        color: '#AAA',
        fontFamily: 'Roboto',
        fontWeight: 'bold',
        letterSpacing: 0.4,
        marginBottom: 10,
        marginTop: 20,
        },
    detail: {
        fontSize: 14,
        color: '#AAA',
        fontFamily: 'Roboto',
        fontWeight: '600',
        letterSpacing: 0.4,
        marginTop:5,
        },
   

});

export default ProductDetailPage;
