import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import Header from '../../components/header';
import MapView from 'react-native-maps';

export default function Maps({ route }) {
    const { districtLat, districtLng } = route.params;

    const initialRegion = {
        latitude: parseFloat(districtLat), // Verilerin sayı olarak işlenmesi gerekebilir.
        latitudeDelta: 0.032750334266687275,
        longitude: parseFloat(districtLng), // Verilerin sayı olarak işlenmesi gerekebilir.
        longitudeDelta: 0.02153780311346054,
    };

    return (
        <SafeAreaView style={styles.container}>
            <Header title="Adres Belirle" />
            <MapView
                style={styles.map}
                initialRegion={initialRegion}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    map: {
        flex: 1,
    },
});
