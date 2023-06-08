import * as React from 'react';
import {ScrollView,SafeAreaView,StyleSheet } from 'react-native';
import Header from '../../components/header';
import ProfileTopInfo from '../../components/profileTopinfo';
import profiledata from './profiledata.json';
import ProfileButtons from '../../components/profilebuttons';
import LanguageVersionbuttons from '../../components/languageVersionbuttons';

export default function Profile({ navigation }) {
    const items = profiledata[0];
    return (
        <SafeAreaView style={styles.container}>
        <Header title="Profile" />
        <ScrollView style={{paddingBottom:100}}>
        <ProfileTopInfo item={items}/>
        <ProfileButtons item={items}/>
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




