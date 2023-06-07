import React from 'react';
import { SafeAreaView, StyleSheet, SectionList,View } from 'react-native';
import Header from '../../components/header';
import SportsTopInfo from '../../components/sportsptTopinfo';
import InformationText from '../../components/informationtext';
import BackButton from '../../components/backbutton';
import SearchButton from '../../components/searchbutton';
import SportTitle from '../../components/sportptTitle';
import ItemList from './AllItemPageslist';
import sportsdata from './sportsdata.json';

const ItemAllPage = ({ route }) => {
  const { category } = route.params;

  const getItems = () => {
    const categoryData = sportsdata.find((data) => category in data);
    if (categoryData) {
      return categoryData[category];
    } else {
      return [];
    }
  };

  const title = category;
  const items = getItems();

  const sections = [
    { title: `Tüm ${title}`, data: items },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <SectionList
        sections={sections}
        renderItem={({ item }) => <ItemList items={[item]} />}
        renderSectionHeader={({ section }) => (
          <>
         
            <Header title={title} />
            <BackButton left={15} top={-35} />
            <SportsTopInfo />
            <InformationText />
            <SearchButton placeholder={title+" Ara"} />
            <SportTitle title={`Tüm ${title}`} />
            
          </>
        )}
        keyExtractor={(item, index) => index.toString()}
        style={styles.sectionList}
        showsVerticalScrollIndicator={false}

      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#292929',
  },
  sectionList: {
    paddingBottom: 20,
  },
});

export default ItemAllPage;
