import React, { useState, useEffect } from 'react';
import { SafeAreaView, StyleSheet, View, Image } from 'react-native';
import Header from '../../components/header';
import CategorySlider from '../../components/categoryslider';
import FitnessPackagelist from '../Products/Fitness/fitnessPackagelist';
import SportsPackageDetailPage from '../Products/Sports/sportsPackageDetail';
import BackButton from '../../components/backbutton';
import SportProfileInfo from '../../components/sportprofileinfo';
import LoadingSpinner from '../../components/LoadingSpinner';

const ItemDetailPage = ({ route }) => {
  const { item } = route.params;
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [itemLoaded, setItemLoaded] = useState(false);

  const handleCategorySelect = (selectedCategory) => {
    setSelectedCategory(selectedCategory);
  };

  useEffect(() => {
    // Simulate data fetching delay for demonstration purposes
    const delay = setTimeout(() => {
      setItemLoaded(true);
    }, 100);

    // Clean up the timeout on component unmount
    return () => clearTimeout(delay);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Header title={item.name} />
      <BackButton left={15} top={43} />
      <View style={styles.topContainer}>
        <SportProfileInfo items={item} />
      </View>
      <CategorySlider items={item} onItemPress={handleCategorySelect} style={styles.CategorySlider}/>

      {itemLoaded ? (
        item.type === 'fitness_center' || item.type === 'personal_trainer' || item.type === 'dietitian' ? (
          <FitnessPackagelist items={item} selectedCategory={selectedCategory} />
        ) : (
          <SportsPackageDetailPage item={item} selectedCategory={selectedCategory} />
        )
      ) : (
        <LoadingSpinner visible={!itemLoaded} textContent="" />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#292929',
  },
  topContainer: {
    backgroundColor: '#AAAAAA',
    marginTop: -5,
    borderRadius: 0,
  },

  text: {
    fontSize: 16,
    color: '#AAAAAA',
    fontFamily: 'Roboto',
    fontWeight: 'bold',
    letterSpacing: 0.4,
  },
  CategorySlider: {
    marginTop: 10,
  },
});

export default ItemDetailPage;
