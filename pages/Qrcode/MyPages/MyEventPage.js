import * as React from 'react';
import { SafeAreaView,StyleSheet,Text,View,ScrollView,SectionList} from 'react-native';
import Header from '../../../components/header';
import BackButton from '../../../components/backbutton';
import SearchButton from '../../../components/searchbutton';
import Title from '../../../components/sportptTitle';
import MyEventList from './myEventList';
import mysportsdata from './mysportsdata.json';
export default function MyEventPage({ route }) {
    const { category } = route.params;
    const getItems = () => {
        const categoryData = mysportsdata.find((data) => category in data);
        if (categoryData) {
            return categoryData[category];
        } else {
            return [];
        }
    };
    const title = category;
    const items = getItems();
    const sections = [
        {  data: items },
    ];


    return (
        <SafeAreaView style={styles.container}>
        <SectionList
        sections={sections}
        renderItem={({ item }) => <MyEventList items={[item]} />}
        renderSectionHeader={({ section }) => (
            <>
            <Header title={title} />
            <BackButton left={15} top={-35} />
            <View>
            <SearchButton placeholder={title} />
            </View>
            <View style={{paddingTop:110,paddingBottom:30}}>
            <Title title={title}/>
            </View>
            </>
        )}
        keyExtractor={(item, index) => index.toString()}
        style={styles.sectionList}
        showsVerticalScrollIndicator={false}
       
        />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#292929',
    },
   
});


