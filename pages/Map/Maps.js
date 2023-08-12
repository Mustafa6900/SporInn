import React, { useState, useEffect } from 'react';
import { SafeAreaView, StyleSheet, View, Text, Alert} from 'react-native';
import Header from '../../components/header';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import BackButton from '../../components/backbutton';
import { useDataContext } from '../../components/DataContext';
import { FontAwesome } from '@expo/vector-icons';

export default function Maps({ route }) {
    const { districtLat, districtLng, directions } = route.params || {};
    const { sharedItems } = useDataContext();
    const sportTypes = sharedItems?.[0]?.type === 'fitness_center' ? 'spor salonu' : 'spor tesisi';
    const [showAlert, setShowAlert] = useState(true);


    const customMapStyle = [
        {
            elementType: 'geometry',
            stylers: [
                {
                    color: '#f5f5f5',
                },
            ],
        },
        {
            elementType: 'labels.icon',
            stylers: [
                {
                    visibility: 'on',
                    color: '#646464',
                },
            ],
        },
        {
            elementType: 'labels.text.fill',
            stylers: [
                {
                    color: '#616161',
                },
            ],
        },
        {
            elementType: 'labels.text.stroke',
            stylers: [
                {
                    color: '#f5f5f5',
                },
            ],
        },
        {
            featureType: 'administrative.land_parcel',
            elementType: 'labels.text.fill',
            stylers: [
                {
                    color: '#bdbdbd',
                },
            ],
        },
        {
            featureType: 'poi',
            elementType: 'geometry',
            stylers: [
                {
                    color: '#eeeeee',
                },
            ],
        },
        {
            featureType: 'poi',
            elementType: 'labels.text.fill',
            stylers: [
                {
                    color: '#757575',
                },
            ],
        },
        {
            featureType: 'poi.park',
            elementType: 'geometry',
            stylers: [
                {
                    color: '#e5e5e5',
                },
            ],
        },
        {
            featureType: 'poi.park',
            elementType: 'labels.text.fill',
            stylers: [
                {
                    color: '#9e9e9e',
                },
            ],
        },
        {
            featureType: 'road',
            elementType: 'geometry',
            stylers: [
                {
                    color: '#ffffff',
                },
            ],
        },
        {
            featureType: 'road.arterial',
            elementType: 'labels.text.fill',
            stylers: [
                {
                    color: '#757575',
                },
            ],
        },
        {
            featureType: 'road.highway',
            elementType: 'geometry',
            stylers: [
                {
                    color: '#dadada',
                },
            ],
        },
        {
            featureType: 'road.highway',
            elementType: 'labels.text.fill',
            stylers: [
                {
                    color: '#616161',
                },
            ],
        },
        {
            featureType: 'road.local',
            elementType: 'labels.text.fill',
            stylers: [
                {
                    color: '#9e9e9e',
                },
            ],
        },
        {
            featureType: 'transit.line',
            elementType: 'geometry',
            stylers: [
                {
                    color: '#e5e5e5',
                },
            ],
        },
        {
            featureType: 'transit.station',
            elementType: 'geometry',
            stylers: [
                {
                    color: '#eeeeee',
                },
            ],
        },
        {
            featureType: 'water',
            elementType: 'geometry',
            stylers: [
                {
                    color: '#c9c9c9',
                },
            ],
        },
        {
            featureType: 'water',
            elementType: 'labels.text.fill',
            stylers: [
                {
                    color: '#9e9e9e',
                },
            ],
        },
    ];

    const initialRegion = {
        latitude: parseFloat(districtLat),
        latitudeDelta: !directions ? 0.034 : 0.004,
        longitude: parseFloat(districtLng),
        longitudeDelta: !directions ? 0.034 : 0.004, 
    };

    const MarkerCallout = ({ name }) => (
        <View style={styles.markerCalloutContainer}>
            <Text style={styles.markerCalloutText}>{name}</Text>
            <FontAwesome name="map-marker" size={40} color="#FF6F25" />
        </View>
    );

    const handleMarkerPress = () => {
        if(showAlert){
            Alert.alert(
                "Bilgilendirme",
                "Yol tarifi ve haritalarda açmak için sağ altta bulunan butonları kullanabilirsiniz",
                [{ text: "Tamam" }]
            );
            setShowAlert(false);    
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <Header title="Harita" />
            <BackButton left={15} top={43} />
            {directions ? (
                <View style={styles.salonsCountContainer}>
                    <Text style={styles.salonsCountText}>
                        Adrese gitmek için işaretliyiciye dokunun
                    </Text>
                </View>
            ) : (
            <View style={styles.salonsCountContainer}>
            <Text style={styles.salonsCountText}>
                Seçili adreste {sharedItems.length} {sportTypes} bulunmaktadır
            </Text>
            </View>
            )}
            <MapView
                style={styles.map}
                initialRegion={initialRegion}
                customMapStyle={customMapStyle}
            >
                 {directions ? (
                    <Marker
                        coordinate={{
                            latitude: parseFloat(districtLat),
                            longitude: parseFloat(districtLng),
                        }}
                        onPress={handleMarkerPress}

                    >
                    <FontAwesome name="map-marker" size={40} color="#FF6F25" />
                    </Marker>
                ) : (
                    sharedItems.map((item, index) => (
                        <Marker
                            key={index}
                            coordinate={{
                                latitude: parseFloat(item.location.split(',')[0]),
                                longitude: parseFloat(item.location.split(',')[1]),
                            }}
                            onPress={handleMarkerPress}

                        >
                            <MarkerCallout name={item.name} />
                        </Marker>
                    ))
                )}
            </MapView>
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
    markerIcon: {
        width: 24,
        height: 24,
    },
    markerCalloutContainer: {
        alignItems: 'center',
    },
    markerCalloutText: {
        color: 'white',
        backgroundColor: '#FF6F25',
        borderRadius: 4,
        fontWeight: 'bold',
        fontSize: 12,
        padding: 4,
    },
    salonsCountContainer: {
        backgroundColor: 'rgba(255, 111, 37, 0.7)',
        padding: 4,
        borderRadius: 4,
        alignItems: 'center',
        alignSelf: 'center',
        marginTop: "3%",
        width: "90%",

    },
    salonsCountText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 12,
    },
    
});