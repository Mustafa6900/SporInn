import React,{useEffect,useState}from 'react';
import { SafeAreaView, StyleSheet, SectionList,View } from 'react-native';
import Header from '../../components/header';
import SportsTopInfo from '../../components/sportsptTopinfo';
import InformationText from '../../components/informationtext';
import BackButton from '../../components/backbutton';
import SearchButton from '../../components/searchbutton';
import SportTitle from '../../components/sportptTitle';
import ItemList from './AllItemPageslist';
import { supabase } from "../../supabaseClient.js";
const ItemAllPage = ({ route }) => {
  const { category } = route.params;
  console.log(category);
  const [items, setItems] = useState([]);
  console.log(items);
  useEffect(() => {

    if( category === "Spor Salonları"){
    const fetchData = async () => {
      try {
        const { data, error } = await supabase
          .from('fitness_centers')
          .select('*');
        if (error) {
          console.error(error);
        } else {
          setItems(data || []);
        }
      } catch (error) {
        console.error(error);
      }
    };
  
    fetchData();
  } 

  if( category === "Havuz Tesisleri"){
    const fetchData = async () => {
      try {
        const { data, error } = await supabase
          .from('sports_facilities_config')
          .select('*');
        if (error) {
          console.error(error);
        } else {
          setItems(data || []);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }
  }, []);
  


  const title = category;

  const sections = [
    { title: `Tüm ${title}`, data: items },
  ];

  return (
    <SafeAreaView style={styles.container}>
       <Header title={title} />
      <BackButton left={15} top={43} />
      <View>
      <SectionList
        sections={sections}
        renderItem={({ item }) => <ItemList items={[item]} />}
        renderSectionHeader={({ section }) => (
          <>
         
           
            <SportsTopInfo />
            <InformationText  text={`Şehrinizdeki ${title}  listelenmektedir. Adresinize yakın ${title} görmek için lütfen adresinizi giriniz.`} />
            <SearchButton placeholder={title+" Ara"} />
            <SportTitle title={`Tüm ${title}`} />
            
          </>
        )}
        keyExtractor={(item, index) => index.toString()}
        style={styles.sectionList}
        showsVerticalScrollIndicator={false}

      />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#292929',
    
  },
  sectionList: {
    marginBottom: 60,
  },
});

export default ItemAllPage;
