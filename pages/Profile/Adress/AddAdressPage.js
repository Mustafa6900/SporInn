import React, { useState, useEffect,useContext } from 'react';
import { Text, StyleSheet, TouchableOpacity, View, SafeAreaView } from "react-native";
import Header from "../../../components/header";
import BackButton from "../../../components/backbutton";
import AddressAddInformation from "./adressaddinformation";
import { useNavigation } from "@react-navigation/native";
import { supabase } from "../../../supabaseClient";
import { AuthContext } from '../../Auth/AuthContext';
const AddAdressPage = () => {
    const navigation = useNavigation();
    const { session } = useContext(AuthContext);
    return (
        <SafeAreaView style={styles.container}>
        <Header title="Adres Ekle" />
        <BackButton left={15} top={43} />
        <AddressAddInformation session={session}/> 
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#292929",
    }
});

export default AddAdressPage;