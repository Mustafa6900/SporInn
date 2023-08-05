import React,{useState} from 'react';
import { SafeAreaView, StyleSheet, View } from 'react-native';
import Header from '../../../components/header';
import BackButton from '../../../components/backbutton';
import SearchButton from '../../../components/searchbutton';
import SportTitle from '../../../components/sportptTitle';
import SportList from './sportCategoryList';
import { useNavigation } from '@react-navigation/native';

const Sports = ({ navigation }) => {
  const [searchResults, setSearchResults] = useState([]);
  const navigations = useNavigation();

  
  const handleSearchResults = async (results) => {
    setSearchResults(results);

  };
  const handleCategoryPress = (category) => {
    navigations.navigate('AllItemAllPages', { category });
  };


  return (
    <SafeAreaView style={styles.container}>
      <Header title="Spor Tesisleri" />
      <BackButton left={15} top={43} />
      <SearchButton placeholder="Spor Tesisi Ara" table={"sports_category"} column={"name"} storage={"sportscategory"} onSearchResults={handleSearchResults} name={"Spor Kategorisi"}/>
      <SportTitle title="Tüm Spor Tesisleri" />
      <SportList onCategoryPress={handleCategoryPress} searchItem={searchResults}/>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#292929',
  },
});

export default Sports;
