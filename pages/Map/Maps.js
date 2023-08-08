
import React from 'react';
import {SafeAreaView,StyleSheet } from 'react-native';
import Header from '../../components/header';
import MapView from 'react-native-maps';

export default function Maps() {    
    return (
        <SafeAreaView style={styles.container}>
        <Header title="Adres Belirle" />
        <MapView
        style={{flex:1}}
        onRegionChangeComplete={(region)=>console.log(region)}
        initialRegion={{
            latitude: 40.25995110524515, 
            latitudeDelta: 0.032750334266687275, 
            longitude: 40.228366423398256, 
            longitudeDelta: 0.02153780311346054}}
        />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});




