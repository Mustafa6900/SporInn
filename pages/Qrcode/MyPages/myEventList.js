import React,{useState,useEffect} from 'react';
import { Text, StyleSheet, TouchableOpacity, Image, View, FlatList,SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { supabase } from '../../../supabaseClient';

const ItemList = ({ items , category}) => {
  const [data, setData] = useState([]);
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(true);
 
  useEffect(() => {

    if(category === 'Spor Salonlarım'){
    const fetchFitnessItems = async () => {
      try {
        const { data, error } = await supabase
          .from('fitness_centers')
          .select('name')
          .eq('created_id', items[0].fitness_centers_packages.fitness_centers_id);
        if (error) {
          console.error(error);
        } else {
          setData(data || []);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchFitnessItems();
  }
  else if(category === 'Randevularım'){
 
    const fetchFacilityItems = async () => {
      try{
      const { data, error } = await supabase
      .from('sports_facilities')
      .select('name')
      .eq('created_id', items[0].sports_facilities_config.created_id);
      if (error) {
        console.error(error);
      }
      else {
        setData(data || []);
      }
    }
    catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };
    fetchFacilityItems();
  }
  else{
    setData(items);
    setIsLoading(false);
  }
  }, []);
  
  if (isLoading) {
    return (
      <SafeAreaView style={styles.container}>
       
      </SafeAreaView>
    );
  }

  const formatDate = (startDateString, endDateString) => {
    const startDate = new Date(startDateString);
    const endDate = new Date(endDateString);
    const startHours = String(startDate.getHours()).padStart(2, '0');
    const startMinutes = String(startDate.getMinutes()).padStart(2, '0');
    const endHours = String(endDate.getHours()).padStart(2, '0');
    const endMinutes = String(endDate.getMinutes()).padStart(2, '0');
    const monthNames = new Intl.DateTimeFormat('tr', { month: 'long' }).format;
    const startMonth = monthNames(startDate);
    const formattedStartDate = `${startDate.getDate()} ${startMonth} ${startDate.getFullYear()}`;

    return `${startHours}:${startMinutes} - ${endHours}:${endMinutes}  /  ${formattedStartDate}`;
  };
  
  const formatdate2 = (startDateString, endDateString) => {
    const startDate = new Date(startDateString);
    const endDate = new Date(endDateString);
    const startHours = String(startDate.getHours()).padStart(2, '0');
    const startMinutes = String(startDate.getMinutes()).padStart(2, '0');
    const endHours = String(endDate.getHours()).padStart(2, '0');
    const endMinutes = String(endDate.getMinutes()).padStart(2, '0');
    const monthNames = new Intl.DateTimeFormat('tr', { month: 'long' }).format;
    const startMonth = monthNames(startDate);
    const endMonth = monthNames(endDate);
    const formattedStartDate = `${startDate.getDate()} ${startMonth} ${startDate.getFullYear()}`;
    const formattedEndDate = `${endDate.getDate()} ${endMonth} ${endDate.getFullYear()}`;

    return `(${startHours}:${startMinutes} / ${formattedStartDate})\n                       ↓\n (${endHours}:${endMinutes} / ${formattedEndDate})`;

  };
  

  const renderItem = ({ item }) => (
    <View style={styles.container}>
    <TouchableOpacity
      style={styles.Item}
      onPress={() =>  navigation.navigate('MyEventDetailPage', { item , category })}
    >

      {category === 'Spor Salonlarım' && (
      <Image source={{ uri: item.imageData?.publicUrl }} style={styles.itemImage} />
      )}
      {category === 'Randevularım' && (
      <Image source={{ uri: item.imageData?.publicUrl }} style={styles.itemImage} />
      
      )}
      {category === 'Challenge' && (
      <Image source={{ uri: item.challenges.imageData?.publicUrl }} style={styles.itemImage} />
      )}
      <View style={styles.itemInfo}>
        {category === 'Spor Salonlarım' && (
         <>
        <Text style={styles.itemName}>{data[0].name}</Text>
        <Text style={styles.iteminfo}>Kalan Gün: {item.remaining_days}</Text>
       
        </>
        )}
        {category === 'Randevularım' && (
          <>
        <Text style={styles.itemName}>{data[0].name} ( {item.sports_facilities_config.name} )</Text>
        <Text style={styles.iteminfo}>Randevu Tarihi: {formatDate(item.purchase_date,item.end_date)}</Text>
       
        </>
        )}
        {category === 'Challenge' && (
          <>
          <Text style={styles.itemName}>{item.challenges.name}</Text>
          <Text style={styles.iteminfo}>{item.challenges.small_description}</Text>

          <View style={styles.itemInfo2}>
            <Text style={styles.iteminfo2}> {formatdate2(item.start_date,item.end_date)}</Text>
            </View>
            </>
        )}
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
        marginLeft: "62%",
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
      fontSize: 10,
      fontWeight: '900',
      color: "#0d0d0d",
    },
   
  });

export default ItemList;

// Seçilen kategoriye göre Tüm Ürünlerin listelendiği component fotoğraf,başlık,puan ve bilgi kısmı bulunmaktadır.
