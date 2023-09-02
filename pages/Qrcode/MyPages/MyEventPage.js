import React, { useEffect, useState,useContext } from 'react';
import { SafeAreaView,StyleSheet,Text,View,ScrollView,SectionList} from 'react-native';
import Header from '../../../components/header';
import BackButton from '../../../components/backbutton';
import Title from '../../../components/sportptTitle';
import MyEventList from './myEventList';
import { supabase } from '../../../supabaseClient';
import { AuthContext } from '../../Auth/AuthContext';

export default function MyEventPage({ route }) {
  const { category } = route.params;
  const [items, setItems] = useState([]);
  const { session } = useContext(AuthContext);
  const [sections, setSections] = useState([]);



  const fetchItems = async () => {
    try {
      let data, error;

      if (category === 'Spor Salonlarım') {
        ({ data, error } = await supabase
          .from('users_fitness_packages')
          .select('*,packages_id, fitness_centers_packages(id,name,fitness_centers_id))')
          .eq('user_id', session.user.id));
      } else if (category === 'Randevularım') {
        ({ data, error } = await supabase
          .from('users_appointments')
          .select('*,packages_id, sports_facilities_config(id,name,created_id)')
          .eq('user_id', session.user.id));
      } else {
        ({ data, error } = await supabase
          .from('users_challenge')
          .select('*,challenge_id, challenges(id,name,created_id,small_description,description,image_url)')
          .eq('user_id', session.user.id));
      }

      if (error) {
        console.error(error);
        return;
      }

      const itemsWithImage = await Promise.all(data.map(async (item) => {
        const createdId = category === 'Spor Salonlarım'
          ? item.fitness_centers_packages.fitness_centers_id
          : category === 'Randevularım'
          ? item.sports_facilities_config.created_id
          : item.challenges.created_id;

        const { data: newdata, error: newdataError } = await supabase
          .from(category === 'Spor Salonlarım' ? 'fitness_centers' : category === 'Randevularım' ? 'sports_facilities' : 'challenges')
          .select('*')
          .eq('created_id', createdId);

        if (newdataError) {
          console.error(newdataError);
          return null;
        }

        const { data: imageData, error: imageError } = await supabase.storage
          .from(category === 'Spor Salonlarım' ? 'fitnesscenterimage' : category === 'Randevularım' ? 'sportsfacilityimage' : 'challengeimage')
          .getPublicUrl(newdata[0]?.image_url);

        if (imageError) {
          console.error('Resim alınamadı:', imageError.message);
          return null;
        }

        return {
          ...item,
          imageData,
        };
      }));

      setItems(itemsWithImage.filter(item => item !== null));
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchItems();
  }, [category]);

  const title = category;

  useEffect(() => {
    setSections([{ data: items }]);
  }, [items]);


    return (
        <SafeAreaView style={styles.container}>
        <Header title={title} />
        <BackButton left={15} top={43} />
        <View>
        <SectionList
        sections={sections}
        renderItem={({ item }) => <MyEventList items={[item]} category={category} />}
        renderSectionHeader={({ section }) => (
            <>          
            <Title title={title}/>
            </>
        )}
        keyExtractor={(item, index) => index.toString()}
        style={styles.sectionList}
        showsVerticalScrollIndicator={false}
       
        />
        </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#292929',
    },
    sectionList: {
        marginBottom: 100,
      },
   
});


