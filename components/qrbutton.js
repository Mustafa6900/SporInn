import React from 'react';
import { Text, StyleSheet, TouchableOpacity, Image, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const QrButton = ({ item }) => {
    const navigation = useNavigation();
    console.log(item)
    return (
        <View >
        <TouchableOpacity
            style={{marginTop: 30,marginLeft:"auto",marginRight:"auto"}}
            onPress={() =>  navigation.navigate('QrCodePage', { item })}
        >
             <View style={{
                    
                    borderRadius: 7,
                    backgroundColor:'#FF6F25',
                    height:120,width:120,
                    justifyContent: 'center',alignItems: 'center', 
                    }}>
                <Ionicons name="qr-code" size={115} color='#000000' />
             </View>
        </TouchableOpacity>

        </View>
    );

}

    

export default QrButton;