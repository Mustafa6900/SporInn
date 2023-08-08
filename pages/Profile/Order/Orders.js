import React, { useState } from "react";
import {StyleSheet, SafeAreaView } from "react-native";
import Header from "../../../components/header";
import BackButton from "../../../components/backbutton";
import SearchButton from "../../../components/searchbutton";
import CategorySlider from "../../../components/categoryslider";
import OrderList from "./orderlist";

export default function Cart() {

  const [selectedCategory, setSelectedCategory] = useState(null);
  const categories = [
    { id:0,name: 'Tüm Siparişler' },
    { id:1,name: 'Devam Edenler' },
    { id:2,name: 'Tamamlananlar' },
    { id:3,name: 'İadeler' },
    { id:4,name: 'İptaller' }
  ];

  const handleCategoryPress = (item) => {
    setSelectedCategory (item.name);
  };


  return (
    <SafeAreaView style={styles.container}>
      <Header title="Siparişlerim" />
      <BackButton left={"5%"} top={43} />
      <CategorySlider items={categories} onItemPress={handleCategoryPress} />
      <OrderList selectedCategory={selectedCategory}/> 
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#292929",
  }
});
