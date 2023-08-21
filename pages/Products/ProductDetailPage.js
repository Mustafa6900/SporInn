import React,{useState,useContext,useEffect} from 'react';
import { View, Text, StyleSheet,Image,SafeAreaView,Alert,TouchableOpacity,Modal,TextInput } from 'react-native';
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
import StarRating from 'react-native-star-rating-fixed-viewproptype';
import { FontAwesome } from "react-native-vector-icons";
import CommentList from '../../components/commentList';


const ProductDetailPage = ({ route }) => {
  const { item } = route.params;
  const { session } = useContext(AuthContext);
  const [quantityDropdown, setQuantityDropdown] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [isCommentModalVisible, setIsCommentModalVisible] = useState(false);
  const [newComment, setNewComment] = useState('');
  const [rating, setRating] = useState(0);


  
  const userName = session.user?.user_metadata?.first_name;
  const lastName = session.user?.user_metadata?.last_name;

  const navigation = useNavigation();

  const navigateToCart = () => {
    navigation.navigate('Cart');
  };

  const categories = [
    { id:0, name: 'İçerik' },
    { id:1, name: 'Yorumlar' },
  ];

  const handleNewCommentSubmit = async (comment) => {
    try {
      const { data, error } = await supabase.from('comments').insert(
        {
          created_id: session.user.id,
          product_id: item.id,
          comment: comment,
          created_at: new Date(),
        });
      if (error) {
        console.error(error);
      } else {
        Alert.alert('Yorumunuz gönderildi');
        setIsCommentModalVisible(false);
      }

    } catch (error) {
      console.error(error);
    }
  };

  const handleNewCommentPress = () => {
    setIsCommentModalVisible(true); // Yorum yap popup'ını açmak için modalı görünür yap
  };

 


  const handleCategorySelect = (selectedCategory) => {
    setSelectedCategory(selectedCategory.name);
  };
  
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
        <FavoriteButton left={"88%"} top={"5%"} item_id={item.id}/>
        <TouchableOpacity onPress={navigateToCart} style={{ left: "75%", top: "5%", position: "absolute" }}>
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
        
        <Categoryslider items={categories} onItemPress={handleCategorySelect} />
        {selectedCategory === "Yorumlar" ? (
        <View style={{marginTop:"10%",width:"90%",marginLeft:"5%",marginRight:"5%"}}>
        <CommentList item={item} />
        </View>
        ) : (
        <OutputText text={item.description} />
        )}
        {selectedCategory !== "Yorumlar" && item.type === "products" && (
        <View style={{ width: '22%', marginLeft: 'auto', marginRight: 'auto', color: '#AAA', marginTop: 15, borderWidth: 1, borderColor: '#AAA', borderRadius: 7 }}>
          <Picker
            style={{ width: '105%', fontWeight: "bold", color: "#AAA" }}
            selectedValue={quantityDropdown}
            onValueChange={(value) => handleQuantityChange(value)}
          >
            {Array.from({ length: 10 }, (_, i) => (
              <Picker.Item key={i} label={`${i + 1}`} value={i + 1} />
            ))}
          </Picker>
        </View>
      )}
      {selectedCategory == "Yorumlar" ? 
      <CustomButton style={{marginTop:15,width:"75%",marginLeft:"auto",marginRight:"auto"}}title="Yorum Yap"  onPress={handleNewCommentPress} /> : 
      <CustomButton style={{marginTop:15,width:"75%",marginLeft:"auto",marginRight:"auto"}}title="Sepete Ekle"  onPress={handleCartsProduct} />
      } 
         
         <Modal visible={isCommentModalVisible} transparent animationType="fade">
        <View style={styles.commentModalContainer}>
          <Text style={styles.commentModalText}>Yorum Yap</Text>
          <Text style={styles.commentNameText}> {userName} {lastName} </Text> 
          <StarRating
            disabled={false}
            maxStars={5}
            rating={rating}

            selectedStar={(rating) => setRating(rating)}
            fullStarColor="#FF6F25"
            starSize={30}
            starStyle={{ marginHorizontal: 5 }}
          />
          <TextInput
            style={styles.commentInput}
            placeholder="Yorumunuzu buraya girin..."
            value={newComment}
            onChangeText={(text) => setNewComment(text)}
            textAlignVertical="top"
            multiline={true}
            fontFamily="Arial"
          />
          <TouchableOpacity onPress={handleNewCommentSubmit} style={styles.submitButton}>
            <Text style={styles.submitButtonText}>Gönder</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setIsCommentModalVisible(false)} style={styles.closeCommentButton}>
            <FontAwesome name={"close"} color={"#AAAAAA"} size={40} />
          </TouchableOpacity>
        </View>
      </Modal>   
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

        commentModalContainer: {
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'rgba(0, 0, 0, 0.7)',
        },
        commentModalText: {
          fontSize: 30,
          fontWeight: 'bold',
          color: '#FF6F25',
          marginBottom: 15,
        },
        commentNameText: {
          fontSize: 18,
          fontWeight: 'bold',
          color: '#FFFFFF',
          marginBottom: 15,
        },
      
        commentInput: {
          backgroundColor: '#FFFFFF',
          width: '80%',
          height: 100,
          padding: 10,
          borderRadius: 7,
          marginBottom: 20,
          marginTop:20,
          textAlignVertical: 'top',
        },
        submitButton: {
          backgroundColor: '#FF6F25',
          paddingHorizontal: 30,
          paddingVertical: 10,
          borderRadius: 7,
        },
        submitButtonText: {
          color: '#FFFFFF',
          fontWeight: 'bold',
        },
        closeCommentButton: {
          position: 'absolute',
          
          top: 10,
          right: 10,
        },
   

});

export default ProductDetailPage;
