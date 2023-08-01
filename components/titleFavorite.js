import * as React from 'react';
import { StyleSheet,Text,View } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { FontAwesome } from "react-native-vector-icons";

const ItemTitleFavorite = ({ title,point,visible }) => {
    return (
        <View style={styles.container}>
        <Text style={styles.title}>{title}</Text>
        {visible ? null : ( <FontAwesome name="angle-double-down" color="#444" size={30} style={{ left: "150%", top: "1%" }} />)}
        <AntDesign name="star" size={24} color="black" style={{left:320,position:"absolute"}} />
        <Text style={{fontSize:20,fontWeight:"800",left:350,fontFamily:'Roboto',position:"absolute"}}>{point}</Text>
        </View>
    );
    }

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#AAA',
        height: 50,
        width: '100%',
        alignItems: 'center',
        flexDirection: 'row',
        borderRadius: 3,
        },
    title: {
        fontSize: 28,
        fontWeight: '900',
        letterSpacing: 0.4,
        marginLeft: 25,
        
        },
    });

export default ItemTitleFavorite;

// Ürünlerin başlığı ve puanı için kullanılan component