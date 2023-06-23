import React,{useState,useEffect} from 'react';
import { View, Text, StyleSheet,Image,SafeAreaView } from 'react-native';
import Header from '../../../components/header';
import BackButton from '../../../components/backbutton';
import OutputText from '../../../components/outputText';
import QrButton from '../../../components/qrbutton';
import { supabase } from '../../../supabaseClient';
const MyEventDetailPage = ({ route }) => {
   const { item } = route.params;
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const { data, error } = await supabase
          .from('fitness_centers_packages')
          .select('*')
          .eq('id', item.packages_id);

        if (error) {
          console.error(error);
        } else {
          setItems(data || []);
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

    return (
        <SafeAreaView style={styles.container}>
        <Header title={items[0].name} />
        <BackButton left={15} top={43} />
        <View style={styles.topContainer}>
        <Image source={ require('../../../assets/buttonpicture.png') } style={styles.topContainerImage} />
        <Text style={styles.text}>{items[0].name}</Text>
        </View>
        <OutputText text={items[0].name+ "\n\n"+items[0].description+"\n\n"+items[0].small_description+"\n\n"+items[0].day+" Gün"} left={20} top={-30} />
        <QrButton item={item} />
        </SafeAreaView>
    );

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#292929',
    },
    topContainer: {
        backgroundColor:"#AAAAAA",
        marginTop:-5,
        borderRadius: 0

    },
    topContainerImage: {
        width: 375,
        height: 180,
        marginBottom: 10,
        marginTop: 20,
        borderRadius: 7,
        marginLeft:"auto",
        marginRight:"auto",
    },

    text: {

        fontSize: 30,
        color: '#0D0D0D',
        fontFamily: 'Roboto',
        fontWeight: '600',
        letterSpacing: 0.4,
        marginLeft:"auto",
        marginRight:"auto",
        marginTop: 10,
        marginBottom: 10,
    },

    });

export default MyEventDetailPage;

