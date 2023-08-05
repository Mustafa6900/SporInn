import React, { useState, useEffect,useContext } from 'react';
import {ScrollView,SafeAreaView,StyleSheet } from 'react-native';
import Header from '../../components/header';
import ProfileTopInfo from '../../components/profileTopinfo';
import ProfileButtons from './profilebuttons';
import LanguageVersionbuttons from './languageVersionbuttons';
import { AuthContext } from '../Auth/AuthContext';

export default function Profile({ navigation }) {
    const { session } = useContext(AuthContext);
    
    return (
        <SafeAreaView style={styles.container}>
        <Header title="Profil" />
        <ScrollView style={{paddingBottom:100}}>
        <ProfileTopInfo session = {session}/>
        <ProfileButtons />
        <LanguageVersionbuttons/>
        </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#292929',
    },
});




