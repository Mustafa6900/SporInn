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
    const [searchResults, setSearchResults] = useState([]);

    const handleSearchResults = async (results) => {
        setSearchResults(results);
        setChallenges(results || []);
    };
    useEffect(() => {
        if (searchResults.length === 0) {
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
                            console.error('Resim alınamadı:', imageError.message);
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
    }}, [searchResults]);
    const title = category;
    const sections = [
        {
            title: 'Tümü',
            data: challenges,
        },
    ];

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
            
           
            <SearchButton name={"Challenge"} placeholder={title +" Ara"} table={"challenges"} column={"name"} storage={"challengeimage"} onSearchResults={handleSearchResults} />
       
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


