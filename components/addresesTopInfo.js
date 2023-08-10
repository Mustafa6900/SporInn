import React, { useState, useEffect } from 'react';
import { StyleSheet, ImageBackground, View, Modal, Text, TouchableOpacity } from 'react-native';
import CustomButton from './custombutton';
import { useNavigation } from '@react-navigation/native';
import { supabase } from '../supabaseClient';
import { Picker } from '@react-native-picker/picker';

const AddresesTopInfo = ({ city , district }) => {
    const navigationn = useNavigation();
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedCity, setSelectedCity] = useState(null);
    const [selectedDistrict, setSelectedDistrict] = useState(null);
    const [cities, setCities] = useState([]);
    const [districts, setDistricts] = useState([]);

    useEffect(() => {
        const fetchCities = async () => {
            const { data, error } = await supabase
                .from('tr_il_ilce_latlng')
                .select('*')
                .order('id', { ascending: true });
            if (error) console.error(error);
            else {
                setCities(data);
            }
        };
        fetchCities();
    }, []);

    const fetchDistricts = async (cityName) => {
        const { data, error } = await supabase
            .from('tr_il_ilce_latlng')
            .select('*')
            .eq('sehir', cityName)
            .order('id', { ascending: true });

        if (error) console.error(error);
        else {
            setDistricts(data);
        }
    };

    const handleMapConfirm = () => {
        if (selectedCity && selectedDistrict) {
            const selectedDistrictData = districts.find(item => item.semt === selectedDistrict);

            if (selectedDistrictData) {
                navigationn.navigate('Maps', {
                    districtLat: selectedDistrictData.lat,
                    districtLng: selectedDistrictData.lng,
                });
            }
        }
        setModalVisible(false);
    };

    const handleListConfirm = () => {
        if (selectedCity && selectedDistrict) {
            city(selectedCity);
            district(selectedDistrict);
        }
        setModalVisible(false);
    };

            

    return (
        <ImageBackground source={require(".././assets/sliderpic/e.jpg")} style={styles.container}>
            <View style={styles.viewcontainer}>
                <CustomButton
                    title="Adres Belirle veya Seç"
                    onPress={() => setModalVisible(true)}
                    style={styles.button1}
                    titleStyle={{ color: '#AAAAAA' }}
                    icon="radar"
                    iconStyle={{ fontSize: 28, marginLeft: "40%" }}
                />
            </View>
            <Modal
                visible={modalVisible}
                animationType="slide"
                transparent={true}
            >
                <View style={styles.modalContainer}>
                    <TouchableOpacity style={styles.closeButton} onPress={() => setModalVisible(false)}>
                        <Text style={styles.closeButtonText}>Kapat</Text>
                    </TouchableOpacity>
                    <View style={styles.pickerContainer}>
                        <Picker
                            style={styles.picker}
                            selectedValue={selectedCity}
                            onValueChange={(itemValue) => {
                                setSelectedCity(itemValue);
                                setSelectedDistrict(null);
                                fetchDistricts(itemValue);
                            }}
                        >
                            <Picker.Item label="İl seçin..." value={null} />
                            {cities.map(city => (
                                (city.sehir === city.semt) ? (
                                    <Picker.Item key={city.id} label={city.sehir} value={city.sehir} />
                                ) : null
                            ))}
                        </Picker>
                        {selectedCity && (
                            <Picker
                                style={styles.picker}
                                selectedValue={selectedDistrict}
                                onValueChange={(itemValue) => setSelectedDistrict(itemValue)}
                            >
                                <Picker.Item label="İlçe seçin..." value={null} />
                                {districts.map(district => (
                                    <Picker.Item key={district.id} label={district.semt} value={district.semt} />
                                ))}
                            </Picker>
                        )}
                    </View>
                    {selectedCity && selectedDistrict && (
                        <View style={{flexDirection:"row"}}>
                        <CustomButton
                            title="Liste"
                            onPress={() => handleListConfirm()}
                            style={{marginRight:"5%", marginLeft:"5%", marginTop: 20, width: '40%' }}
                        />
                        <CustomButton
                        title="Harita"
                        onPress={() => handleMapConfirm()}
                        style={{marginRight:"5%",marginLeft:"5%", marginTop: 20, width: '40%' }}
                    />
                        </View>
                    )}

                </View>
            </Modal>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        height: 248,
        resizeMode: 'cover',
        top: -25,
    },
    viewcontainer: {
        flex: 1,
        justifyContent: 'center',
        borderRadius: 7,
        width: "90%",
        height: 80,
        position: 'absolute',
        backgroundColor: '#FF6F25',
        top: 195,
        left: "5%",
    },
    button1: {
        backgroundColor: '#0D0D0D',
        width: "90%",
        marginLeft: "auto",
        marginRight: "auto",
        marginBottom: "10%",
        marginTop: "10%",
    },
    button2: {
        width: "90%",
        marginLeft: "auto",
        marginRight: "auto",
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.9)',
    },
    closeButton: {
        position: 'absolute',
        top: 20,
        right: 20,
        padding: 10,
        backgroundColor: '#AAA',
        borderRadius: 5,
    },
    closeButtonText: {
        color: 'white',
    },
    pickerContainer: {
        marginTop:0,
        width: '90%',        
       
    },
    picker: {
        marginTop: 20,
        width: '100%',        
        fontWeight: "bold",
        color: "#0d0d0d",
        backgroundColor: '#AAA',
        borderRadius: 7,
    },
});

export default AddresesTopInfo;
