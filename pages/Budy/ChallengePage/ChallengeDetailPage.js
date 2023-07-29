import React,{useContext} from 'react';
import { View, Text, StyleSheet,Image,SafeAreaView } from 'react-native';
import Header from '../../../components/header';
import BackButton from '../../../components/backbutton';
import Categoryslider from '../../../components/categoryslider';
import OutputText from '../../../components/outputText';
import CustomButton from '../../../components/custombutton';
import { AuthContext } from '../../Auth/AuthContext';
import { supabase } from '../../../supabaseClient';
const ChallengeDetailPage = ({ route }) => {
  const { eventId,eventName, person, event,adress,bigdetail,eventStartTime,eventEndTime,eventImage } = route.params;
  const { session } = useContext(AuthContext);

const handleConfirmChallenge = async () => {
const generateQRCodeData = () => {
  const data = {
    challenge_id: eventId,
    user_id: session.user.id,
    purchase_date: eventStartTime,
    end_date: eventEndTime,
  };
  return JSON.stringify(data);
};
  try{
    const qrCodeData = generateQRCodeData();
    const { data, error } = await supabase
    .from('users_challenge')
    .insert([{ user_id: session.user.id, created_at: new Date(),challenge_id: eventId, start_date: eventStartTime, end_date: eventEndTime,qr_code: qrCodeData }]);
    if (error) {
      console.error(error);
      return;
    }
  } catch (error) {
    console.error(error);
  }
};

  
  const categories = [
    // Diğer kategorileri buraya ekleyin
    { name: 'İçerik' }, // İçerik kategorisini diziye ekledik
  ];

  const formatDate = (startDateString, endDateString) => {
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

    return `(${startHours}:${startMinutes} / ${formattedStartDate})\n(${endHours}:${endMinutes} / ${formattedEndDate})`;
  };
  return (
    
    <SafeAreaView style={styles.container}>
        <Header title="Ürün Detayı" />
        <BackButton left={15} top={43} />
        <View style={styles.topContainer}>
        <Image source={{uri:eventImage} } style={styles.topContainerImage} />
        <View style={styles.info}>
        <Text style={styles.price}>{eventName}</Text>
      <Text style={styles.title}> {event}</Text>
      </View>
        </View>
        <Categoryslider items = {categories} />
        <OutputText text={  "\n"+ bigdetail + "\n\n" +
          "Kişi sayısı limiti: " + person + "\n\n" +
          "Etkinlik süresi:"+"\n\n" +formatDate(eventStartTime, eventEndTime) + "\n\n" +
          adress + "\n\n"}
        />
        <CustomButton style={{marginTop:20,width:"75%",marginLeft:"auto",marginRight:"auto"}}title="Challenge'a Katıl" onPress={handleConfirmChallenge}/>
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
        },
   

});

export default ChallengeDetailPage;
