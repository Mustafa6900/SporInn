import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity,SafeAreaView } from "react-native";
import Header from "../../../components/header";
import BackButton from "../../../components/backbutton";

const FavoriteProducts = ({ item }) => {

    return (
        <SafeAreaView style={styles.container}>
        <Header title="Favori Ürünlerim" />
        <BackButton left={15} top={43} />
        <View style={styles.prducts}>
            <Text style={styles.text}>Favori Ürünlerim</Text>
        </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#292929",
    },
    prducts: {
        backgroundColor: "#AAAAAA",
        borderRadius: 3,
        width: 350,
        height: 100,
        marginLeft: "auto",
        marginRight: "auto",
        marginTop: 20,
        marginBottom: 20,
    },
    text: {
        fontSize: 30,
        color: '#0D0D0D',
        fontFamily: 'Roboto',
        fontWeight: '900',
        letterSpacing: 0.4,
        marginTop: 10,
        marginBottom: 10,
        marginLeft: "auto",
        marginRight: "auto",
    },
});

export default FavoriteProducts;    