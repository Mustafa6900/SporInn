import React, { useContext,useEffect,useState } from 'react';
import { Text, StyleSheet, TouchableOpacity, View, ScrollView, Image,Alert } from 'react-native';
import CheckButton from '../../../components/checkbutton';
import CustomButton from '../../../components/custombutton';
import { supabase } from '../../../supabaseClient';
import { AuthContext } from '../../Auth/AuthContext';
import {Picker} from '@react-native-picker/picker';
import LoadingSpinner from '../../../components/LoadingSpinner';

const Cartitemlist = ({ item, itemSeller, checkedStates, setCheckedStates, setItemss }) => {
  const { session } = useContext(AuthContext);
  const [quantityDropdown, setQuantityDropdown] = useState({});


  useEffect(() => {
      // Başlangıçta tüm ürünleri işaretli olarak ayarla
      setCheckedStates(Array(item.length).fill(true));
  }, [item]);

  const handleButtonPress = (index) => {
      const updatedCheckedStates = [...checkedStates];
      updatedCheckedStates[index] = !updatedCheckedStates[index];
      setCheckedStates(updatedCheckedStates);
      
  };

  const handleQuantityChange = async (index, value) => {
  
    setQuantityDropdown((prevState) => ({ ...prevState, [index]: value }));

    try {
      const { data, error } = await supabase
      .from('users_carts')
      .update({ quantity: value })
      .eq('product_id', item[index].product_id)
      .eq('created_id', session.user.id);
  
      if (error) {
        console.error(error);
      } else {
        const { data: updatedData, error: fetchError } = await supabase
          .from('users_carts')
          .select('*,product_id,products(id,*)')
          .eq('created_id', session.user.id);
        if (fetchError) {
          console.error(fetchError);
        } else {
          const newupdatedData = await Promise.all(updatedData.map(async (item) => {
            if (item.products.image_url) {
              const { data: imageData, error: imageError } = await supabase.storage
                .from('productsimage')
                .getPublicUrl(item.products.image_url);

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
          setItemss(newupdatedData || []); 
        }
      }
    } catch (error) {
      console.error(error);
    } 
  };
  
  

  const handleDeleteProduct = async (product_id) => {
    try {
      const { error } = await supabase
        .from('users_carts')
        .delete()
        .eq('product_id', product_id)
        .eq('created_id', session.user.id);
      if (error) {
        console.error(error);
      } else {
        const { data: updatedData, error: fetchError } = await supabase
          .from('users_carts')
          .select('*,product_id,products(id,*)')
          .eq('created_id', session.user.id);
        
        if (fetchError) {
          console.error(fetchError);
        } else {
          setItemss(updatedData || []);
        }
      }
    } catch (error) {
      console.error(error);
    } 
  };

  

  return (
    <ScrollView style={styles.container}>
      {item.map((cartItem, index) => (
        <View style={styles.button} key={cartItem.product_id}>
          <View style={styles.allinfo}>
            <View style={styles.dealer}>
              <Text style={{ fontSize: 20, left: 20, fontWeight: '900' }}>{itemSeller[0]?.name}</Text>
              <CustomButton
                title="X"
                onPress={() => Alert.alert('Ürünü silmek istediğinize emin misiniz?', '', 
                [
                  {
                    text: 'İptal',
                    onPress: () => console.error('Cancel Pressed'),
                    style: 'cancel'
                  },
                  { text: 'Evet', onPress: () => handleDeleteProduct(cartItem.product_id) }
                ]
                )}
                  

                style={{ backgroundColor: 'transparent', width: 45, height: 30}}
                textStyle={{ fontSize: 15, fontWeight: '700' }} 
              />

            </View>
            <View style={styles.info}>
              <View>
                <CheckButton
                  title="✓"
                  onPress={() => handleButtonPress(index)}
                  checked={checkedStates[index]}
                  styletip={{ backgroundColor: '#AAAAAA'}}
                />
              </View>
              <Image source={{ uri: cartItem.imageData?.publicUrl }} style={{ width: 80, height: 80, left: 10 }} />
              <View style={styles.infodetail}>
                <Text style={{ fontSize: 20, left: 20, fontWeight: '900' }}>{cartItem.products.name}</Text>
                <Text style={{ fontSize: 15, left: 20, width: 150 }}>{cartItem.products.description}</Text>
              </View>
              <View style={styles.quapri}>
              <View style={{ flexDirection: 'row',alignItems:"center",right:-15,top:10}}>
              <Text style={{ fontSize: 15, left: 5, fontWeight: '800' }}>{cartItem.quantity} Adet</Text>
              <Picker
                style={{ width: 40 }}
                selectedValue={quantityDropdown[index]}
                onValueChange={(value) => handleQuantityChange(index, value)}>
                {Array.from({ length: 10 }, (_, i) => (
  <Picker.Item key={i+1} label={`${i+1}`} value={i + 1} />
))}

              </Picker>
              </View>
              <Text style={styles.price}>₺{cartItem.quantity*cartItem.products.price}</Text>
              </View>
            </View>
          </View>
        </View>
      ))}
    
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
  },
  button: {
    flexDirection: 'column',
    width: '95%',
    marginBottom: 80,
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  allinfo: {
    flexDirection: 'column',
  },
  dealer: {
    height: 50,
    marginBottom: 5,
    flexDirection: 'row',
    backgroundColor: '#AAAAAA',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopLeftRadius: 7,
    borderTopRightRadius: 7,
  },
  info: {
    flexDirection: 'row',
    backgroundColor: '#AAAAAA',
    height: 100,
    borderBottomLeftRadius: 7,
    borderBottomRightRadius: 7,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 5,
    minHeight: 150,
  },
  infodetail: {
    flexDirection: 'column',
    marginBottom: 'auto',
    marginTop: 'auto',
    flexDirection: 'column',
  },
  quapri: {
    left: 10,
    flexDirection: 'column',
    marginTop: 'auto',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },

  price: {
    fontSize: 20,
    left: 8,
    fontWeight: '800',
    marginTop: 'auto',
    color: '#FF6F25',
  },
});

export default Cartitemlist;
