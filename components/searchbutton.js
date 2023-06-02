import React from 'react';
import { View,StyleSheet,TextInput } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons'; 

const SearchButton = ({ onPress, placeholder}) => {
     return (

        <View style={styles.textinputcontainer}>
                    <MaterialCommunityIcons name="magnify" size={24} color="#FF6F25" style={{marginLeft:20}}/>
                    <TextInput
                        style={{ height: 50, width: "80%", color: 'white', fontSize: 20, marginLeft: 15 }}
                        placeholder={placeholder}
                        placeholderTextColor="#AAAAAA"
                        keyboardType="default"
                        autoCapitalize="none"
                        autoCorrect={false}
                        secureTextEntry={false}
                       
                    />
                    <MaterialCommunityIcons name="microphone-outline" size={24} color="#AAAAAA" style={{right:20}}/>
                </View>  
    );
};

const styles = StyleSheet.create({
    textinputcontainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#0D0D0D',
        height: 50,
        width: "90%",
        position: "absolute",
        top: "41%",
        left: 20,
        borderRadius: 7,
        marginTop: "6%",

    },
});

export default SearchButton;

