import React from 'react';
import { SafeAreaView, StyleSheet, ScrollView } from 'react-native';
import Header from './header';
import SportsTopInfo from './sportstopinfo';
import InformationText from './informationtext';
import BackButton from './backbutton';
import SearchButton from './searchbutton';
import SportTitle from './sporttitle';
import ItemList from './itemlist';

const ItemAllPage = ({ route }) => {
  const { category } = route.params;
  const getItems = () => {
    // Kategoriye göre ilgili ürünleri döndürün
    switch (category) {
      case 'Havuz Tesisleri':
        return [
          { id: 1, name: 'Havuz Tesisleri 1', info: 'Havuz Tesisleri 1 ayrıntıları', image: require('../assets/buttonpicture.png'), point: 4.5 },
          { id: 2, name: 'Havuz Tesisleri 2', info: 'Havuz Tesisleri 2 ayrıntıları', image: require('../assets/buttonpicture.png'), point: 4.2 },
          // Fitness kategorisi için örnek ürünler
        ];
      case 'Futbol Sahaları':
        return [
          { id: 1, name: 'Futbol Sahası 1', info: 'Basketbol Sahası 1 ayrıntıları', image: require('../assets/buttonpicture.png'), point: 4.0 },
          { id: 2, name: 'Futbol Sahası 2', info: 'Basketbol Sahası 2 ayrıntıları', image: require('../assets/buttonpicture.png'), point: 4.8 },
          // Basketball kategorisi için örnek ürünler
        ];
      case 'Basketbol Sahaları':
        return [
          { id: 1, name: 'Basketbol Sahası 1', info: 'Futbol Sahası 1 ayrıntıları', image: require('../assets/buttonpicture.png'), point: 4.3 },
          { id: 2, name: 'Basketbol Sahası 2', info: 'Futbol Sahası 2 ayrıntıları', image: require('../assets/buttonpicture.png'), point: 4.6 },
          // Football kategorisi için örnek ürünler
        ];
        case 'Voleybol Sahaları':
        return [
            { id: 1, name: 'Voleybol Sahası 1', info: 'Voleybol Sahası 1 ayrıntıları', image: require('../assets/buttonpicture.png'), point: 4.3 },
            { id: 2, name: 'Voleybol Sahası 2', info: 'Voleybol Sahası 2 ayrıntıları', image: require('../assets/buttonpicture.png'), point: 4.6 },
            // Football kategorisi için örnek ürünler
            ];
        case 'Atlı Binicilik Tesisleri':
        return [
            { id: 1, name: 'Atlı Binicilik Tesisi 1', info: 'Atlı Binicilik Tesisi 1 ayrıntıları', image: require('../assets/buttonpicture.png'), point: 4.3 },
            { id: 2, name: 'Atlı Binicilik Tesisi 2', info: 'Atlı Binicilik Tesisi 2 ayrıntıları', image: require('../assets/buttonpicture.png'), point: 4.6 },
            // Football kategorisi için örnek ürünler
            ];
        case 'Golf Tesisleri':
        return [
            { id: 1, name: 'Golf Tesisi 1', info: 'Golf Tesisi 1 ayrıntıları', image: require('../assets/buttonpicture.png'), point: 4.3 },
            { id: 2, name: 'Golf Tesisi 2', info: 'Golf Tesisi 2 ayrıntıları', image: require('../assets/buttonpicture.png'), point: 4.6 },
            // Football kategorisi için örnek ürünler
            ];
        case 'Masa Tenisi Tesisleri':
        return [
            { id: 1, name: 'Masa Tenisi Tesisi 1', info: 'Masa Tenisi Tesisi 1 ayrıntıları', image: require('../assets/buttonpicture.png'), point: 4.3 },
            { id: 2, name: 'Masa Tenisi Tesisi 2', info: 'Masa Tenisi Tesisi 2 ayrıntıları', image: require('../assets/buttonpicture.png'), point: 4.6 },
            // Football kategorisi için örnek ürünler
            ];
        case 'Okçuluk Tesisleri':
        return [
            { id: 1, name: 'Okçuluk Tesisi 1', info: 'Okçuluk Tesisi 1 ayrıntıları', image: require('../assets/buttonpicture.png'), point: 4.3 },
            { id: 2, name: 'Okçuluk Tesisi 2', info: 'Okçuluk Tesisi 2 ayrıntıları', image: require('../assets/buttonpicture.png'), point: 4.6 },
            // Football kategorisi için örnek ürünler
            ];
        case 'Tenis Kortları':
        return [
            { id: 1, name: 'Tenis Kortu 1', info: 'Tenis Kortu 1 ayrıntıları', image: require('../assets/buttonpicture.png'), point: 4.3 },
            { id: 2, name: 'Tenis Kortu 2', info: 'Tenis Kortu 2 ayrıntıları', image: require('../assets/buttonpicture.png'), point: 4.6 },
            // Football kategorisi için örnek ürünler
            ];
        case 'Kayak Tesisleri':
        return [
            { id: 1, name: 'Kayak Tesisi 1', info: 'Masa Tenisi Tesisi 1 ayrıntıları', image: require('../assets/buttonpicture.png'), point: 4.3 },
            { id: 2, name: 'Kayak Tesisi 2', info: 'Masa Tenisi Tesisi 2 ayrıntıları', image: require('../assets/buttonpicture.png'), point: 4.6 },
            // Football kategorisi için örnek ürünler
            ];
        case 'Buz Pistleri':
        return [
            { id: 1, name: 'Buz Pistleri 1', info: 'Okçuluk Tesisi 1 ayrıntıları', image: require('../assets/buttonpicture.png'), point: 4.3 },
            { id: 2, name: 'Buz Pistleri 2', info: 'Okçuluk Tesisi 2 ayrıntıları', image: require('../assets/buttonpicture.png'), point: 4.6 },
            // Football kategorisi için örnek ürünler
            ];
        case 'Bilardo tesisleri':
        return [
            { id: 1, name: 'Bilardo tesisleri 1', info: 'Tenis Kortu 1 ayrıntıları', image: require('../assets/buttonpicture.png'), point: 4.3 },
            { id: 2, name: 'Bilardo tesisleri 2', info: 'Tenis Kortu 2 ayrıntıları', image: require('../assets/buttonpicture.png'), point: 4.6 },
            // Football kategorisi için örnek ürünler
            ];
        case 'Spor Salonları':
        return [
          { id: 1, name: 'Let’s Fit', info: 'Let’s Fit spora dair herşey burada!', image: require('../assets/buttonpicture.png'), point: 4.5 },
          { id: 2, name: 'Fitness Center', info: 'Fitness Center ayrıntıları', image: require('../assets/buttonpicture.png'), point: 4.2 },
          // Fitness kategorisi için örnek ürünler
        ];
      // Diğer kategorilere göre ilgili ürünleri döndürün
      default:
        return [];
    }
  };
  const title = category;
  const items = getItems();

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <Header title={title} />
        <BackButton left={-170} top={-35} />
        <SportsTopInfo/>
        <InformationText/>
        <SearchButton placeholder={`${title} Ara`} />
        <SportTitle title={`Tüm ${title}`} />
        <ItemList items={items} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#292929',
    
  },
  scrollViewContent: {
    paddingBottom: 20,
  },
});

export default ItemAllPage;
