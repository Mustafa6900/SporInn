import React from 'react';
import { SafeAreaView, StyleSheet, View } from 'react-native';
import Header from '../../../components/header';
import BackButton from '../../../components/backbutton';
import SearchButton from '../../../components/searchbutton';
import SportTitle from '../../../components/sportptTitle';
import SportList from './sportCategoryList';
import { useNavigation } from '@react-navigation/native';

const Sports = ({ navigation }) => {
  const categories = [
    { id: 1, name: 'Havuz Tesisleri', image: require('../../../assets/sportcategoriespic/pool.png') },
    { id: 2, name: 'Futbol Sahaları', image: require('../../../assets/sportcategoriespic/football.png') },
    { id: 3, name: 'Basketbol Sahaları', image: require('../../../assets/sportcategoriespic/basketball.png') },
    { id: 4, name: 'Voleybol Sahaları', image: require('../../../assets/sportcategoriespic/volleyball.png') },
    { id: 5, name: 'Atlı Binicilik Tesisleri', image: require('../../../assets/sportcategoriespic/horse.png') },
    { id: 6, name: 'Golf Tesisleri', image: require('../../../assets/sportcategoriespic/golf.png') },
    { id: 7, name: 'Masa Tenisi Tesisleri', image: require('../../../assets/sportcategoriespic/tabletennis.png') },
    { id: 8, name: 'Okçuluk Tesisleri', image: require('../../../assets/sportcategoriespic/arrow.png') },
    { id: 9, name: 'Tenis Kortları', image: require('../../../assets/sportcategoriespic/tennis.png') },
    { id: 10, name: 'Kayak Tesisleri', image: require('../../../assets/sportcategoriespic/ski.png') },
    { id: 11, name: 'Buz Pistleri', image: require('../../../assets/sportcategoriespic/skating.png') },
    { id: 12, name: 'Bilardo Tesisleri', image: require('../../../assets/sportcategoriespic/billiards.png') },
  ];
  const navigations = useNavigation();
  const handleCategoryPress = (category) => {
    navigations.navigate('AllItemAllPages', { category: category.name });
 };


  return (
    <SafeAreaView style={styles.container}>
      <Header title="Spor Tesisleri" />
      <BackButton left={15} top={-35} />
      <SearchButton placeholder="Spor Tesisi Ara" /> 
      <SportTitle title="Tüm Spor Tesisleri"/>  
      <SportList categories={categories} onCategoryPress={handleCategoryPress} />
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

// Tesislerin listelendiği sayfa
