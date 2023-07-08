import React,{useEffect,useState} from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { supabase } from '../../../supabaseClient';

const ItemList = ({ items }) => {
  const navigation = useNavigation();
  const [packages, setPackages] = useState([]);

  const handleItemPress = (packet, price, shortdetail, bigdetail, image, packetid) => {
    navigation.navigate('PackageDetailPage', { packet, price, shortdetail, bigdetail, image, packetid });
  };
  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const { data, error } = await supabase
          .from('fitness_centers_packages')
          .select('*')
          .eq('fitness_centers_id', items.created_id); // items objesinden fitness_center_id'yi kullanarak filtreleme yapın
        if (error) {
          console.error(error);
        } else {
          setPackages(data || []);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchPackages();
  }, [items.id]);

  console.log(packages)
  const renderItem = ({ item, index }) => (
    <TouchableOpacity
      style={styles.item}
      onPress={() => handleItemPress(item.name, item.price, item.day, item.description, item.image_url, item.id)}
    >
      {console.log(item.name)}
      <View style={styles.info}>
        <Text style={styles.itemName}>{item.name}</Text>
        <Text style={styles.itemDetail}>{item.day}</Text>
        <Text style={styles.itemPrice}>₺{item.price}</Text>
      </View>
      <Image source={ item.image_url } style={styles.itemImage} />
    </TouchableOpacity>
  );
  
  // ...
  
  return (
    <FlatList
      style={styles.container}
      data={packages}
      renderItem={renderItem}
      keyExtractor={(item, index) => index.toString()}
      showsVerticalScrollIndicator={false}
    />
  );
  
};

const styles = StyleSheet.create({
  container: {
    width: '95%',
    marginTop: 25,
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  item: {
    flexDirection: 'row',
    marginBottom: 20,
    backgroundColor: '#AAAAAA',
    height: 95,
    borderRadius: 7,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  info: {
    flexDirection: 'column',
    marginLeft: 10,
  },
  itemName: {
    fontSize: 16,
    color: '#0D0D0D',
    fontFamily: 'Roboto',
    fontWeight: 'bold',
    letterSpacing: 0.4,
  },
  itemImage: {
    width: '30%',
    height: '90%',
    marginRight: 10,
    borderRadius: 7,
  },
  itemDetail: {
    fontSize: 14,
    color: '#000000',
    opacity: 0.7,
    fontFamily: 'Roboto',
    marginTop: 5,
  },
  itemPrice: {
    fontSize: 16,
    color: '#FF6F25',
    fontFamily: 'Roboto',
    fontWeight: '700',
    marginTop: 5,
  },
});

export default ItemList;
