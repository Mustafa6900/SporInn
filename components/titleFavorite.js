import * as React from 'react';
import { StyleSheet,Text,View } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

const ItemTitleFavorite = ({ title,point }) => {
    return (
        <View style={styles.container}>
        <Text style={styles.title}>{title}</Text>
        <AntDesign name="star" size={24} color="black" style={{left:320,position:"absolute"}} />
        <Text style={{fontSize:20,fontWeight:"800",left:350,fontFamily:'Roboto',position:"absolute"}}>{point}</Text>
        </View>
    );
    }

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#AAA',
        height: 60,
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