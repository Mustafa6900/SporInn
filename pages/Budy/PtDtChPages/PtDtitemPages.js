import * as React from 'react';
import { SafeAreaView,StyleSheet,Text,View,ScrollView,SectionList} from 'react-native';
import Header from '../../../components/header';
import BackButton from '../../../components/backbutton';
import SearchButton from '../../../components/searchbutton';
import Title from '../../../components/sportptTitle';
import ptdtdata from './ptdtdata';
import PtDtList from './ptdtlist';
export default function  PtDtChitemPages({ route }) {
    const { category } = route.params;
    const getItems = () => {
        const categoryData = ptdtdata.find((data) => category in data);
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
    const filteredItems = items
    .filter(item => item.join)
    .map(item => ({ ...item, info: item.info2 }));
    const shouldShowText = filteredItems.length === 0;


    return (
        <SafeAreaView style={styles.container}>
            <Header title={title} />
            <BackButton left={15} top={43} />
            <View >
        <SectionList
        sections={sections}
        renderItem={({ item }) => <PtDtList items={[item]} />}
        renderSectionHeader={({ section }) => (
            <>
            
         
            <Title title={"Kayıtlı  "+title}/>
            {shouldShowText ? (
        <Text style={styles.text}>Kişisel Antrenör Edinin!</Text>
      ) : (
        <PtDtList items={filteredItems} styletip={{ paddingBottom: 5,marginTop:0,marginBottom:-10 } } imagestyletip={{borderWidth: 2,borderColor: '#FF6F25'}} />
      )}
           
            <Title title={"Tüm "+title+"ler"}/>
            <View style={{marginTop:-30,marginBottom:30}}>
            <SearchButton placeholder={title+"ler"} />
            </View>
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
    text: {
        fontSize: 16,
        color: '#AAAAAA',
        fontFamily: 'Roboto',
        fontWeight: 'bold',
        letterSpacing: 0.4,
        marginLeft:"auto",
        marginRight:"auto",
    },
    sectionList: {
        marginBottom: 100,
      },

});