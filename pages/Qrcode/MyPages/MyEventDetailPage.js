import React,{useState,useEffect} from 'react';
import { View, Text, StyleSheet,Image,SafeAreaView } from 'react-native';
import Header from '../../../components/header';
import BackButton from '../../../components/backbutton';
import OutputText from '../../../components/outputText';
import QrButton from '../../../components/qrbutton';
import { supabase } from '../../../supabaseClient';
const MyEventDetailPage = ({ route }) => {
   const { item, category } = route.params;
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    if (category === 'Spor Salonlarım') {
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
  }
  else if (category === 'Randevularım') {
    const fetchItems = async () => {
      try {
        const { data, error } = await supabase
          .from('sports_facilities_config')
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
    }
    fetchItems();
  }
  else if (category === 'Challenge'){
     setItems(item);
      setIsLoading(false);
  }
  }, []);

  if (isLoading) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.loadingText}>Yükleniyor...</Text>
      </SafeAreaView>
    );
  }

  const formatdate = (startDateString, endDateString) => {
    const startDate = new Date(startDateString);
    const endDate = new Date(endDateString);
    const startHours = String(startDate.getHours()).padStart(2, '0');
    const startMinutes = String(startDate.getMinutes()).padStart(2, '0');
    const endHours = String(endDate.getHours()).padStart(2, '0');
    const endMinutes = String(endDate.getMinutes()).padStart(2, '0');
    const monthNames = new Intl.DateTimeFormat('tr', { month: 'long' }).format;
    const startMonth = monthNames(startDate);
    const formattedStartDate = `${startDate.getDate()} ${startMonth} ${startDate.getFullYear()}`;

    return `(${startHours}:${startMinutes} /  ${endHours}:${endMinutes})  - ${formattedStartDate}`;

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

    return `(${startHours}:${startMinutes} / ${formattedStartDate})\n ↓\n (${endHours}:${endMinutes} / ${formattedEndDate})`;

  };

    return (
        <SafeAreaView style={styles.container}>
        {category === 'Spor Salonlarım' && (
         <>
        <Header title={items[0].name} />
        <BackButton left={15} top={43} />
        <View style={styles.topContainer}>
        <Image source={ require('../../../assets/buttonpicture.png') } style={styles.topContainerImage} />
        <Text style={styles.text}>{items[0].name}</Text>
        </View>
        <OutputText text={items[0].name+ "\n\n"+items[0].description+"\n\n"+items[0].small_description+"\n\n"+items[0].day+" Gün"} left={20} top={-30} />
        <QrButton item={item} />
        </>
        )}
        {category === 'Randevularım' && (
          <>
        <Header title={items[0].name} />
        <BackButton left={15} top={43} />
        <View style={styles.topContainer}>
        <Image source={ require('../../../assets/buttonpicture.png') } style={styles.topContainerImage} />
        <Text style={styles.text}>{items[0].name}</Text>
        </View>
        <OutputText text={"Randevu Tarihi:"+"\n\n"+ formatdate(item.purchase_date,item.end_date)} left={20} top={-30} />
        <QrButton item={item} />
        </>
        )}
        {category === 'Challenge' && (
          <>
        <Header title={item.challenges.name} />
        <BackButton left={15} top={43} />
        <View style={styles.topContainer}>
        <Image source={ require('../../../assets/buttonpicture.png') } style={styles.topContainerImage} />
        <Text style={styles.text}>{item.challenges.name}</Text>
        </View>
        <OutputText text={"Challenge Tarihi:"+"\n\n"+ formatdate2(item.start_date,item.end_date)} left={20} top={-30} />
        <QrButton item={item} />
        </>
        )}
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

