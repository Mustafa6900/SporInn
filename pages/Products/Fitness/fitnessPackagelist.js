import React,{useEffect,useState} from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { supabase } from '../../../supabaseClient';

const ItemList = ({ items, selectedCategory }) => {
  const navigation = useNavigation();
  const [packages, setPackages] = useState([]);
  const [allPackages, setAllPackages] = useState([]); // Tüm paketleri tutacak state
  const selectCategory = selectedCategory?.id; // ? işareti ile optional chaining kullanarak selectedCategory'nin null olması durumunda hata almamak için kontrol ediyoruz.
  const handleItemPress = (packet, price, shortdetail, bigdetail, packetid,image) => {
    navigation.navigate('PackageDetailPage', { packet, price, shortdetail, bigdetail, packetid,image });
  };
  useEffect(() => {
    const fetchPackages = async () => {
      try {
        if (!selectedCategory) return; // Eğer seçili kategori yoksa, verileri getirme

        const { data, error } = await supabase
          .from('fitness_centers_packages')
          .select('*')
          .eq('fitness_centers_id', items.created_id) // items objesinden fitness_center_id'yi kullanarak filtreleme yapın
          .eq('categoryid,', selectCategory) // selectCategory değişkenini kullanarak filtreleme yapın')
          if (error) {
            console.error(error);
          } else {
            const updatedData = await Promise.all(data.map(async (item) => {
              if (item.image_url) {
                const { data: imageData, error: imageError } = await supabase.storage
                  .from('fcpackagesimage')
                  .getPublicUrl(item.image_url);
  
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
  
            setPackages(updatedData);
          }
          
        } catch (error) {
          console.error(error);
        }
      };
      fetchPackages();

      const fetchAllPackages = async () => {
        try {
          if (!selectedCategory) return; // Eğer seçili kategori yoksa, verileri getirme

          const { data, error } = await supabase
            .from('fitness_centers_packages')
            .select('*')
            .eq('fitness_centers_id', items.created_id) // items objesinden fitness_center_id'yi kullanarak filtreleme yapın')
          if (error) {
            console.error(error);
          } else {
            const updatedData = await Promise.all(data.map(async (item) => {
              if (item.image_url) {
                const { data: imageData, error: imageError } = await supabase.storage
                  .from('fcpackagesimage')
                  .getPublicUrl(item.image_url);
    
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
    
            setAllPackages(updatedData || []); // updatedData undefined ise boş array olarak setPackages'e gönderin
          }
        } catch (error) {
          console.error(error);
        }
      }
      fetchAllPackages();
    }, [items.created_id, selectCategory ]);

    const renderItem = ({ item, index }) => (
        <TouchableOpacity
          style={styles.item}
          onPress={() => handleItemPress(item.name, item.price, item.day, item.description, item.id, item.imageData?.publicUrl)}
        >
          <View style={styles.info}>
            <Text style={styles.itemName}>{item.name}</Text>
            <Text style={styles.itemDetail}>{item.day} Gün</Text>
            <Text style={styles.itemPrice}>₺{item.price}</Text>
          </View>
          <Image source={{  uri: item.imageData?.publicUrl }} style={styles.itemImage} />
        </TouchableOpacity>
    );
    
  
  // ...
  
  return (
    selectCategory !== 0 ? (
    <FlatList 
      style={styles.container}
      data={packages}
      renderItem={renderItem}
      keyExtractor={(item, index) => index.toString()}
      showsVerticalScrollIndicator={false}
    />
    ) : (
      <FlatList
        style={styles.container}
        data={allPackages}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        showsVerticalScrollIndicator={false}
      />
    )

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
