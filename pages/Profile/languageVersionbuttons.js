import React from 'react';
import { Text, StyleSheet, TouchableOpacity,View } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; 
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
const languageVersionbuttons = ({  }) => {
    const navigation = useNavigation();
    const handleItemPress = (name) => {
        if(name=="Türkçe"){
            navigation.navigate('Languages');
        }
    };
    category=[
        {
            name:"Türkçe",
            icon:"language-outline",
            chevronright:true
        },
        {
            name:"1.0.0",
            icon:"documents-outline",
            chevronright:false
        },
    ]
    return(
        <View style={styles.container}>
        {category.map((item,index)=>(
            <TouchableOpacity
            style={styles.button}
            key={index}
            onPress={() => handleItemPress(item.name)}
            >
            <View style={styles.buttontext}>
            <Ionicons name={item.icon} size={24} style={{marginLeft:20}}/>
            <Text style={{fontSize:20,marginLeft:20}}>{item.name}</Text>
            {item.chevronright?<MaterialCommunityIcons name="chevron-right" size={24} style={{marginLeft:"auto",marginRight:20}}/>:null}
            </View>
            </TouchableOpacity>
        ))}
        </View>

    )

}

const styles = StyleSheet.create({
    container: {
       
        borderRadius: 3,
       
        paddingBottom: 80,
    },
    button: {
        flexDirection: 'column',
        backgroundColor: "#AAAAAA",
        height: 60,
        borderRadius: 3,
        marginBottom:10,
        marginTop:20,
    },
    buttontext: {
        flexDirection:"row",
        marginBottom:"auto",
        marginTop:"auto",
    },

});

export default languageVersionbuttons;

