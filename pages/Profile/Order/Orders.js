import React from "react";
import { Text, StyleSheet, TouchableOpacity, View, SafeAreaView } from "react-native";
import Header from "../../../components/header";
import BackButton from "../../../components/backbutton";
import SearchButton from "../../../components/searchbutton";
import CategorySlider from "../../../components/categoryslider";
import OrderList from "./orderlist";
export default function Cart({route}){
    item = route.params.item;
    return(
        <SafeAreaView style={styles.container}>
        <Header title="Siparişlerim" />
        <BackButton left={15} top={43} />
        <SearchButton placeholder="Ürün ismi veya Marka ara"right={15} top={43} />
        <CategorySlider items = {{ subcategories: ['Tümü',"Devam Edenler","iadeler"] }}/>
        <OrderList item={item}/>
        </SafeAreaView> 
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#292929",
    }});


