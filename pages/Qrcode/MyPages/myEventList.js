import React,{useState,useEffect} from 'react';
import { Text, StyleSheet, TouchableOpacity, Image, View, FlatList,SafeAreaView } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { supabase } from '../../../supabaseClient';

const ItemList = ({ items}) => {
  const [fitness, setFitness] = useState([]);
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(true);



  useEffect(() => {
    const fetchItems = async () => {
      try {
        const { data, error } = await supabase
          .from('fitness_centers')
          .select('name')
          .eq('created_id', items[0].fitness_centers_packages.fitness_centers_id);
        if (error) {
          console.error(error);
        } else {
          setFitness(data || []);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
      
    };
    fetchItems();
  }, []);
  
  if (isLoading) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.loadingText}>Yükleniyor...</Text>
      </SafeAreaView>
    );
  }


  const renderItem = ({ item }) => (
    <View style={styles.container}>
    <TouchableOpacity
      style={styles.Item}
      onPress={() =>  navigation.navigate('MyEventDetailPage', { item })}
    >
      <Image source={require('../../../assets/buttonpicture.png')} style={styles.itemImage} />
      <View style={styles.itemInfo}>
        <Text style={styles.itemName}>{fitness[0].name}</Text>
        <Text style={styles.iteminfo}>Kalan Gün: {item.remaining_days}</Text>
        <View style={styles.itemInfo2}> 
          <Text style={styles.iteminfo2}>{item.info2}</Text>
        </View>
      </View>
    </TouchableOpacity>
    </View>

  );

  return (
    <View style={styles.container}>
      <FlatList
        data={items}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        showsVerticalScrollIndicator={false}
       
      />
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
        width: "95%",
        marginLeft: "auto",
        marginRight: "auto",
        paddingTop: 10,
        paddingBottom: 10, 
    },
  
    Item: {
      flexDirection: 'column',
      backgroundColor: "#AAAAAA",
      height: 240,
      borderRadius: 7,
    },
    itemImage: {
      width: "100%",
      height: "70%",
      marginRight: 10,
      borderRadius: 7,
    },
    itemInfo: {
        padding: 13,
        flexDirection: 'column',
         
    },
    itemInfo2: {
        justifyContent: "center",
        alignItems: "center",
        position: "absolute",
        flexDirection: 'row',
        marginLeft: "70%",
        marginTop: "6%", 
    },
    itemName: {
      fontSize: 16,
      fontWeight: '900',
      color: "#0D0D0D",
      marginBottom: 10,
    },
    iteminfo: {
      fontSize: 11,
      fontWeight: '800',
      color: "#292929",
      
    },
    iteminfo2: {
      fontSize: 20,
      fontWeight: '900',
      color: "#292929",
    },
   
  });

export default ItemList;

// Seçilen kategoriye göre Tüm Ürünlerin listelendiği component fotoğraf,başlık,puan ve bilgi kısmı bulunmaktadır.
