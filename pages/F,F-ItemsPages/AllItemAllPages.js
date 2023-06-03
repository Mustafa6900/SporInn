import React from 'react';
import { SafeAreaView, StyleSheet, ScrollView } from 'react-native';
import Header from '../../components/header';
import SportsTopInfo from '../../components/sportsptTopinfo';
import InformationText from '../../components/informationtext';
import BackButton from '../../components/backbutton';
import SearchButton from '../../components/searchbutton';
import SportTitle from '../../components/sportptTitle';
import ItemList from './AllItemPageslist';

const ItemAllPage = ({ route }) => {
  const { category } = route.params;
  const getItems = () => {
    // Kategoriye göre ilgili ürünleri döndürün
    switch (category) {
      case 'Havuz Tesisleri':
        return [
          { id: 1, name: 'Havuz Tesisleri 1', info: 'Havuz Tesisleri 1 ayrıntıları', image: require('../../assets/buttonpicture.png'), point: 4.5,maincategory: 'Havuz Tesisi',subcategories: ['Kapalı Havuz', 'Açık Havuz'],appointmentTime:["Boş Saat: 15.30","Boş Saat: 20.30"],appointmentDay:["Boş Gün: 15 Mayıs","Boş Gün: 24 Haziran"] },
          { id: 2, name: 'Havuz Tesisleri 2', info: 'Havuz Tesisleri 2 ayrıntıları', image: require('../../assets/buttonpicture.png'), point: 4.2,maincategory: 'Havuz Tesisi',subcategories: ['Kapalı Havuz', 'Açık Havuz'],appointmentTime:["Boş Saat: 15.30","Boş Saat: 20.30"],appointmentDay:["Boş Gün: 15 Mayıs","Boş Gün: 24 Haziran"] },
          // Fitness kategorisi için örnek ürünler
        ];
      case 'Futbol Sahaları':
        return [
          { id: 1, name: 'Futbol Sahası 1', info: 'Basketbol Sahası 1 ayrıntıları', image: require('../../assets/buttonpicture.png'), point: 4.0,maincategory: 'Futbol Sahası',subcategories: [ 'Kapalı Sahalar', 'Açık Sahalar'],appointmentTime:["Boş Saat: 15.30","Boş Saat: 20.30"],appointmentDay:["Boş Gün: 15 Mayıs","Boş Gün: 24 Haziran"] },
          { id: 2, name: 'Futbol Sahası 2', info: 'Basketbol Sahası 2 ayrıntıları', image: require('../../assets/buttonpicture.png'), point: 4.8,maincategory: 'Futbol Sahası',subcategories: [ 'Kapalı Sahalar', 'Açık Sahalar'],appointmentTime:["Boş Saat: 15.30","Boş Saat: 20.30"],appointmentDay:["Boş Gün: 15 Mayıs","Boş Gün: 24 Haziran"] },
          // Basketball kategorisi için örnek ürünler
        ];
      case 'Basketbol Sahaları':
        return [
          { id: 1, name: 'Basketbol Sahası 1', info: 'Futbol Sahası 1 ayrıntıları', image: require('../../assets/buttonpicture.png'), point: 4.3,maincategory: 'Basketbol Sahası',subcategories: [ 'Kapalı Sahalar', 'Açık Sahalar'],appointmentTime:["Boş Saat: 15.30","Boş Saat: 20.30"],appointmentDay:["Boş Gün: 15 Mayıs","Boş Gün: 24 Haziran"] },
          { id: 2, name: 'Basketbol Sahası 2', info: 'Futbol Sahası 2 ayrıntıları', image: require('../../assets/buttonpicture.png'), point: 4.6,maincategory: 'Basketbol Sahası',subcategories: [ 'Kapalı Sahalar', 'Açık Sahalar'],appointmentTime:["Boş Saat: 15.30","Boş Saat: 20.30"],appointmentDay:["Boş Gün: 15 Mayıs","Boş Gün: 24 Haziran"] },
          // Football kategorisi için örnek ürünler
        ];
        case 'Voleybol Sahaları':
        return [
            { id: 1, name: 'Voleybol Sahası 1', info: 'Voleybol Sahası 1 ayrıntıları', image: require('../../assets/buttonpicture.png'), point: 4.3,maincategory: 'Voleybol Sahası',subcategories: [ 'Kapalı Sahalar', 'Açık Sahalar'],appointmentTime:["Boş Saat: 15.30","Boş Saat: 20.30"],appointmentDay:["Boş Gün: 15 Mayıs","Boş Gün: 24 Haziran"]  },
            { id: 2, name: 'Voleybol Sahası 2', info: 'Voleybol Sahası 2 ayrıntıları', image: require('../../assets/buttonpicture.png'), point: 4.6,maincategory: 'Voleybol Sahası',subcategories: [ 'Kapalı Sahalar', 'Açık Sahalar'],appointmentTime:["Boş Saat: 15.30","Boş Saat: 20.30"],appointmentDay:["Boş Gün: 15 Mayıs","Boş Gün: 24 Haziran"]  },
            // Football kategorisi için örnek ürünler
            ];
        case 'Atlı Binicilik Tesisleri':
        return [
            { id: 1, name: 'Atlı Binicilik Tesisi 1', info: 'Atlı Binicilik Tesisi 1 ayrıntıları', image: require('../../assets/buttonpicture.png'), point: 4.3,maincategory: 'Atlı Binicilik Tesisi',subcategories: [ 'Kapalı Sahalar', 'Açık Sahalar'],appointmentTime:["Boş Saat: 15.30","Boş Saat: 20.30"],appointmentDay:["Boş Gün: 15 Mayıs","Boş Gün: 24 Haziran"]  },
            { id: 2, name: 'Atlı Binicilik Tesisi 2', info: 'Atlı Binicilik Tesisi 2 ayrıntıları', image: require('../../assets/buttonpicture.png'), point: 4.6,maincategory: 'Atlı Binicilik Tesisi',subcategories: [ 'Kapalı Sahalar', 'Açık Sahalar'],appointmentTime:["Boş Saat: 15.30","Boş Saat: 20.30"],appointmentDay:["Boş Gün: 15 Mayıs","Boş Gün: 24 Haziran"]  },
            // Football kategorisi için örnek ürünler
            ];
        case 'Golf Tesisleri':
        return [
            { id: 1, name: 'Golf Tesisi 1', info: 'Golf Tesisi 1 ayrıntıları', image: require('../../assets/buttonpicture.png'), point: 4.3,maincategory: 'Golf Tesisi', subcategories:["golf kategori 1", "golf kategori 2","golf kategori 3", "golf kategori 4"],appointmentTime:["Boş Saat: 15.30","Boş Saat: 20.30"],appointmentDay:["Boş Gün: 15 Mayıs","Boş Gün: 24 Haziran"] },
            { id: 2, name: 'Golf Tesisi 2', info: 'Golf Tesisi 2 ayrıntıları', image: require('../../assets/buttonpicture.png'), point: 4.6,maincategory: 'Golf Tesisi', subcategories:["golf kategori 1", "golf kategori 2"],appointmentTime:["Boş Saat: 15.30","Boş Saat: 20.30"],appointmentDay:["Boş Gün: 15 Mayıs","Boş Gün: 24 Haziran"] },
            // Football kategorisi için örnek ürünler
            ];
        case 'Masa Tenisi Tesisleri':
        return [
            { id: 1, name: 'Masa Tenisi Tesisi 1', info: 'Masa Tenisi Tesisi 1 ayrıntıları', image: require('../../assets/buttonpicture.png'), point: 4.3,maincategory: 'Masa Tenisi Tesisi', subcategories:["Masa Tenisi kategori 1", "golf kategori 2"],appointmentTime:["Boş Saat: 15.30","Boş Saat: 20.30"],appointmentDay:["Boş Gün: 15 Mayıs","Boş Gün: 24 Haziran"] },
            { id: 2, name: 'Masa Tenisi Tesisi 2', info: 'Masa Tenisi Tesisi 2 ayrıntıları', image: require('../../assets/buttonpicture.png'), point: 4.6,maincategory: 'Masa Tenisi Tesisi', subcategories:["Masa Tenisi kategori 1", "golf kategori 2"],appointmentTime:["Boş Saat: 15.30","Boş Saat: 20.30"],appointmentDay:["Boş Gün: 15 Mayıs","Boş Gün: 24 Haziran"] },
            // Football kategorisi için örnek ürünler
            ];
        case 'Okçuluk Tesisleri':
        return [
            { id: 1, name: 'Okçuluk Tesisi 1', info: 'Okçuluk Tesisi 1 ayrıntıları', image: require('../../assets/buttonpicture.png'), point: 4.3,maincategory: 'Okçuluk Tesisi', subcategories:["Okçuluk kategori 1", "golf kategori 2"],appointmentTime:["Boş Saat: 15.30","Boş Saat: 20.30"],appointmentDay:["Boş Gün: 15 Mayıs","Boş Gün: 24 Haziran"] },
            { id: 2, name: 'Okçuluk Tesisi 2', info: 'Okçuluk Tesisi 2 ayrıntıları', image: require('../../assets/buttonpicture.png'), point: 4.6,maincategory: 'Okçuluk Tesisi', subcategories:["Okçuluk kategori 1", "golf kategori 2"],appointmentTime:["Boş Saat: 15.30","Boş Saat: 20.30"],appointmentDay:["Boş Gün: 15 Mayıs","Boş Gün: 24 Haziran"] },
            // Football kategorisi için örnek ürünler
            ];
        case 'Tenis Kortları':
        return [
            { id: 1, name: 'Tenis Kortu 1', info: 'Tenis Kortu 1 ayrıntıları', image: require('../../assets/buttonpicture.png'), point: 4.3,maincategory: 'Tenis Tesisi', subcategories:["Tenis kategori 1", "golf kategori 2"],appointmentTime:["Boş Saat: 15.30","Boş Saat: 20.30"],appointmentDay:["Boş Gün: 15 Mayıs","Boş Gün: 24 Haziran"] },
            { id: 2, name: 'Tenis Kortu 2', info: 'Tenis Kortu 2 ayrıntıları', image: require('../../assets/buttonpicture.png'), point: 4.6,maincategory: 'Tenis Tesisi', subcategories:["Tenis kategori 1", "golf kategori 2"],appointmentTime:["Boş Saat: 15.30","Boş Saat: 20.30"],appointmentDay:["Boş Gün: 15 Mayıs","Boş Gün: 24 Haziran"] },
            // Football kategorisi için örnek ürünler
            ];
        case 'Kayak Tesisleri':
        return [
            { id: 1, name: 'Kayak Tesisi 1', info: 'Masa Tenisi Tesisi 1 ayrıntıları', image: require('../../assets/buttonpicture.png'), point: 4.3,maincategory: 'Kayak Tesisi', subcategories:["Kayak kategori 1", "golf kategori 2"],appointmentTime:["Boş Saat: 15.30","Boş Saat: 20.30"],appointmentDay:["Boş Gün: 15 Mayıs","Boş Gün: 24 Haziran"] },
            { id: 2, name: 'Kayak Tesisi 2', info: 'Masa Tenisi Tesisi 2 ayrıntıları', image: require('../../assets/buttonpicture.png'), point: 4.6,maincategory: 'Kayak Tesisi', subcategories:["Kayak kategori 1", "golf kategori 2"],appointmentTime:["Boş Saat: 15.30","Boş Saat: 20.30"],appointmentDay:["Boş Gün: 15 Mayıs","Boş Gün: 24 Haziran"] },
            // Football kategorisi için örnek ürünler
            ];
        case 'Buz Pistleri':
        return [
            { id: 1, name: 'Buz Pistleri 1', info: 'Okçuluk Tesisi 1 ayrıntıları', image: require('../../assets/buttonpicture.png'), point: 4.3,maincategory: 'Buz Pisti', subcategories:["Buz kategori 1", "golf kategori 2"],appointmentTime:["Boş Saat: 15.30","Boş Saat: 20.30"],appointmentDay:["Boş Gün: 15 Mayıs","Boş Gün: 24 Haziran"] },
            { id: 2, name: 'Buz Pistleri 2', info: 'Okçuluk Tesisi 2 ayrıntıları', image: require('../../assets/buttonpicture.png'), point: 4.6,maincategory: 'Buz Pisti', subcategories:["Buz kategori 1", "golf kategori 2"],appointmentTime:["Boş Saat: 15.30","Boş Saat: 20.30"],appointmentDay:["Boş Gün: 15 Mayıs","Boş Gün: 24 Haziran"] },
            // Football kategorisi için örnek ürünler
            ];
        case 'Bilardo tesisleri':
        return [
            { id: 1, name: 'Bilardo tesisleri 1', info: 'Tenis Kortu 1 ayrıntıları', image: require('../../assets/buttonpicture.png'), point: 4.3,maincategory: 'Bilardo Tesisi', subcategories:["Bilardo kategori 1", "golf kategori 2"],appointmentTime:["Boş Saat: 15.30","Boş Saat: 20.30"],appointmentDay:["Boş Gün: 15 Mayıs","Boş Gün: 24 Haziran"] },
            { id: 2, name: 'Bilardo tesisleri 2', info: 'Tenis Kortu 2 ayrıntıları', image: require('../../assets/buttonpicture.png'), point: 4.6,maincategory: 'Bilardo Tesisi', subcategories:["Bilardo kategori 1", "golf kategori 2"],appointmentTime:["Boş Saat: 15.30","Boş Saat: 20.30"],appointmentDay:["Boş Gün: 15 Mayıs","Boş Gün: 24 Haziran"] },
            // Football kategorisi için örnek ürünler
            ];
        case 'Spor Salonları':
        return [
          { id: 1, name: 'Let’s Fit', info: 'Let’s Fit spora dair herşey burada!', image: require('../../assets/buttonpicture.png'), point: 4.5,maincategory: 'Spor Salonu', subcategories:["Spor Salonu kategori 1", "Spor Salonu kategori 2", "Spor Salonu kategori 3", "Spor Salonu kategori 4", "Spor Salonu kategori 5"],packets:['3 Aylık Üyelik','6 Aylık Üyelik','9 Aylık Üyelik','12 Aylık Üyelik','15 Aylık Üyelik','18 Aylık Üyelik',],packetsDetail:['90 Gün','60 Gün','9 aylık üyelik detay1','detay4','15 aylık üyelik detay1','detay5',],packetsPrice:['₺ 100',' ₺ 200','₺ 300',' ₺ 400','₺ 500',' ₺ 600',],packetsBigDetail:['3 aylık üyelik detayı cok uzun her sey var','6 ayyy detaydetayı cok un her sey vardetayı detaydetayı cok uzun un her sey vardetayı detaydetayı cok uzun uzun her sey vardetayı detaydetayı cok uzun her sey vardetayı cok uzuncok uzundetaydetayı cok uzun her sey vardetayı cok uzundetaydetayı cok uzun her sey vardetayı cok uzun her sey vardetayı cok uzun her sey var','9 aylık üyelik detayı cok uzun her sey var','detaydetayı cok uzun her sey vardetayı cok uzun her sey var','15 aylık üyelik detayı cok uzun her sey vardetayı cok uzun her sey var','detadetayı cok uzun her sey vardetayı cok uzun her sey vardetayı cok uzun her sey var',] },
          { id: 2, name: 'Fitness Center', info: 'Fitness Center ayrıntıları', image: require('../../assets/buttonpicture.png'), point: 4.2,maincategory: 'Spor Salonu', subcategories:["Spor Salonu kategori 1", "Spor Salonu kategori 2"],packets:['3 Aylık Üyelik','6 Aylık Üyelik'],packetsDetail:['3 aylık üyelik detay1','detay2'],packetsPrice:['₺ 100 ','₺ 200 '] },
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
        <BackButton left={15} top={-35} />
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

// Seçilen kategoriye göre tüm ürünlerin listelendiği sayfa
