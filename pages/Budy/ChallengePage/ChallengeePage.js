import React,{useEffect,useState} from 'react';
import { SafeAreaView,StyleSheet,Text,View,ScrollView,SectionList} from 'react-native';
import Header from '../../../components/header';
import BackButton from '../../../components/backbutton';
import SearchButton from '../../../components/searchbutton';
import Title from '../../../components/sportptTitle';
import ChallengeList from './challengeList';
import { supabase } from '../../../supabaseClient';

export default function ChallengePage({ route }) {
    const [challenges, setChallenges] = useState([]);

    const { category } = route.params;
    useEffect(() => {
        const fetchChallengeData = async () => {
            try {
                const { data, error } = await supabase
                    .from('challenges')
                    .select('*');
                if (error) {
                    console.error(error);
                } else {
                    const updatedData = await Promise.all(data.map(async (item) => {
                        if (item.image_url) {
                          const { data: imageData, error: imageError } = await supabase.storage
                            .from('challengeimage')
                            .getPublicUrl(item.image_url);
            
                          if (imageError) {
                            console.log('Resim alınamadı:', imageError.message);
                          } else {
                            if (imageData) {
                              item.imageData = imageData; // imageData verisini tesis verisine ekleyin
                            }
                          }
                        }
                        return item;
                      }));
                    setChallenges(updatedData);
                }
            } catch (error) {
                console.error(error);
            }
        };
        fetchChallengeData();
    }, []);
    const title = category;
    const sections = [
        {
            title: 'Tümü',
            data: challenges,
        },
    ];

    console.log(challenges)
    return (
        <SafeAreaView style={styles.container}>
            <Header title={title} />
            <BackButton left={15} top={43} />
            <SafeAreaView>
        <SectionList
        sections={sections}
        renderItem={({ item }) => <ChallengeList items={[item]} />}
        renderSectionHeader={({ section }) => (
            <>
            
           
            <SearchButton placeholder={title} />
       
            <Title title={title}/>
            
            </>
        )}
        keyExtractor={(item, index) => index.toString()}
        style={styles.sectionList}
        showsVerticalScrollIndicator={false}
       
        />
        </SafeAreaView>
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


