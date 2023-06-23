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
        const fetchItems = async () => {
            try {
                const { data, error } = await supabase
                .from('users_fitness_packages')
                .select('*,packages_id, fitness_centers_packages(id,fitness_centers_id)')
                .eq('user_id', session.user.id)   
                if (error) {
                    console.error(error);
                } else {
                    setItems(data || []);
                }

                
            } catch (error) {
                console.error(error);
            }
        };
        fetchItems();
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
        renderItem={({ item }) => <MyEventList items={[item]} />}
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


