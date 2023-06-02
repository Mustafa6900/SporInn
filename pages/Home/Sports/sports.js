import React from 'react';
import { SafeAreaView, StyleSheet, View } from 'react-native';
import Header from '../../../components/header';
import BackButton from '../../../components/backbutton';
import SearchButton from '../../../components/searchbutton';
import SportTitle from '../../../components/sporttitle';
import SportList from '../../../components/sportlist';
import { useNavigation } from '@react-navigation/native';

const Sports = ({ navigation }) => {
  const categories = [
    { id: 1, name: 'Havuz Tesisleri', image: require('../../../assets/categoriespic/pool.png') },
    { id: 2, name: 'Futbol Sahaları', image: require('../../../assets/categoriespic/football.png') },
    { id: 3, name: 'Basketbol Sahaları', image: require('../../../assets/categoriespic/basketball.png') },
    { id: 4, name: 'Voleybol Sahaları', image: require('../../../assets/categoriespic/volleyball.png') },
    { id: 5, name: 'Atlı Binicilik Tesisleri', image: require('../../../assets/categoriespic/horse.png') },
    { id: 6, name: 'Golf Tesisleri', image: require('../../../assets/categoriespic/golf.png') },
    { id: 7, name: 'Masa Tenisi Tesisleri', image: require('../../../assets/categoriespic/tabletennis.png') },
    { id: 8, name: 'Okçuluk Tesisleri', image: require('../../../assets/categoriespic/arrow.png') },
    { id: 9, name: 'Tenis Kortları', image: require('../../../assets/categoriespic/tennis.png') },
    { id: 10, name: 'Kayak Tesisleri', image: require('../../../assets/categoriespic/ski.png') },
    { id: 11, name: 'Buz Pistleri', image: require('../../../assets/categoriespic/skating.png') },
    { id: 12, name: 'Bilardo tesisleri', image: require('../../../assets/categoriespic/billiards.png') },
  ];
  const navigations = useNavigation();
  const handleCategoryPress = (category) => {
    navigations.navigate('Fitness', { category: category.name });
 };


  return (
    <SafeAreaView style={styles.container}>
      <Header title="Spor Tesisleri" />
      <BackButton left={15} top={-35} />
      <View style={styles.searchButtonContainer}>
        <SearchButton placeholder="Spor tesisi ara" />
      </View>
      <View style={{ top:90 }}>
      <SportTitle title="Tüm Spor Tesisleri"/>
      </View>
      <SportList categories={categories} onCategoryPress={handleCategoryPress} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#292929',
  },
  searchButtonContainer: {
    marginBottom: 20,
  },
});

export default Sports;
