import React, { useEffect, useState,useContext } from 'react';
import { SafeAreaView,StyleSheet,Text,View,ScrollView,SectionList} from 'react-native';
import Header from '../../../components/header';
import BackButton from '../../../components/backbutton';
import SearchButton from '../../../components/searchbutton';
import Title from '../../../components/sportptTitle';
import MyEventList from './myEventList';
import { supabase } from '../../../supabaseClient';
import { AuthContext } from '../../Auth/AuthContext';
export default function MyEventPage({ route }) {
    const { category } = route.params;
    const [items, setItems] = useState([]);
    const { session } = useContext(AuthContext);
 
    useEffect(() => {
        if (category === 'Spor Salonlarım') {
        const fetchFitnessItems = async () => {
            try {
                const { data, error } = await supabase
                .from('users_fitness_packages')
                .select('*,packages_id, fitness_centers_packages(id,name,fitness_centers_id))')
                .eq('user_id', session.user.id)   
                if (error) {
                    console.error(error);
                } else {
                
                    const fitnessWithImage = await Promise.all(data.map(async (item) => {
                        // 'sports_facilities_config' bilgisini almak için yeni bir istek yapın
                        const { data: newdata, error: newdataError } = await supabase
                          .from('fitness_centers')
                          .select('*')
                          .eq('created_id', item.fitness_centers_packages.fitness_centers_id);
                        if (newdataError) {
                          console.error(newdataError);
                        } else {
                          const { data: imageData, error: imageError } = await supabase.storage
                            .from('fitnesscenterimage')
                            .getPublicUrl(newdata[0]?.image_url);
                      
                          if (imageError) {
                            console.log('Resim alınamadı:', imageError.message);
                          } else {
                            item.imageData = imageData; // imageData verisini tesis verisine ekleyin
                          }
                        }
                        return item;
                      }));
                      
                      setItems(fitnessWithImage || []);
                      
                    
                }

                
            } catch (error) {
                console.error(error);
            }
        };
        fetchFitnessItems();
    }
    else if (category === 'Randevularım') {
        const fetchFacilityItems = async () => {
          try {
            const { data, error } = await supabase
              .from('users_appointments')
              .select('*,packages_id, sports_facilities_config(id,name,created_id)')
              .eq('user_id', session.user.id);
      
            if (error) {
              console.error(error);
            } else {
              const appointmentsWithImage = await Promise.all(data.map(async (item) => {
                // 'sports_facilities_config' bilgisini almak için yeni bir istek yapın
                const { data: newdata, error: newdataError } = await supabase
                  .from('sports_facilities')
                  .select('*')
                  .eq('created_id', item.sports_facilities_config.created_id);
                
                if (newdataError) {
                  console.error(newdataError);
                } else {
                    const { data: imageData, error: imageError } = await supabase.storage
                    .from('sportsfacilityimage')
                    .getPublicUrl(newdata[0]?.image_url);
                    
                  if (imageError) {
                    console.log('Resim alınamadı:', imageError.message);
                  } else {
                    
                      item.imageData = imageData; // imageData verisini tesis verisine ekleyin
                  }
                }
                return item;
              }));
      
              setItems(appointmentsWithImage || []);
            }
          } catch (error) {
            console.error(error);
          }
        };
      
        fetchFacilityItems();
      }
    else{
        const fetchChallengeItems = async () => {
            try{
                const { data, error } = await supabase
                .from('users_challenge')
                .select('*,challenge_id, challenges(id,name,created_id,small_description,description,image_url)')
                .eq('user_id', session.user.id)
                if (error) {
                    console.error(error);
                }
                else {
                    const updatedData = await Promise.all(data.map(async (item) => {
                        if (item.challenges?.image_url) {
                          const { data: imageData, error: imageError } = await supabase.storage
                            .from('challengeimage')
                            .getPublicUrl(item.challenges.image_url);
            
                          if (imageError) {
                            console.log('Resim alınamadı:', imageError.message);
                          } else {
                            if (imageData) {                            
                              item.challenges.imageData = imageData; // Temizlenmiş URL'yi challenges objesine ekleyin
                            }
                          }
                        }
                        return item;
                      }));
            
                      setItems(updatedData || []);
                    }
            } catch (error) {
                console.error(error);
            }
            };
            fetchChallengeItems();
    }

    }, []);


    const title = category;
 
    const sections = [
        {  data: items },
    ];


    

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
            
            <View style={{top:-15}}>
            <SearchButton placeholder={title} />
            </View>
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


