import React from 'react';
import { Text, StyleSheet, TouchableOpacity,View,Alert } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
const ProfileButtons = () => {
    const navigation = useNavigation();
    const handleItemPress = (name) => {
        if(name=="Adreslerim"){
            navigation.navigate('Adresses');
        }
        else if(name=="Favori Ürünlerim"){
            navigation.navigate('FavoriteProducts');
        }
        else if(name=="Sepetim"){
            navigation.navigate('Cart' ); 
        }
        else if(name=="Siparişlerim"){
            //navigation.navigate('Orders');
            Alert.alert(
                'Siparişlerim',
                'Bu özellik şu anda tasarım aşamasında.',
                [
                    {
                        text: 'Tamam',
                        style: 'cancel',
                    },
                ],
            );
            
        }
        else if(name=="Ödeme Yöntemlerim"){
            navigation.navigate('PaymentMethods');
        }
        else if(name=="İletişim Tercihlerim"){
            navigation.navigate('ContactPreferences');
        }
        else if(name=="Hesap Ayarları"){
            navigation.navigate('AccountSettings');
        }
        else if(name=="Yardım"){
            navigation.navigate('Help');
        }
        else if(name=="Çıkış Yap"){
            Alert.alert(
                'Çıkış Yap',
                'Çıkış yapmak istediğinize emin misiniz?',
                [
                    {
                        text: 'Hayır',
                        style: 'cancel',
                    },
                    {
                        text: 'Evet',
                        onPress: () => navigation.navigate('Login'),
                    },
                ],
            );
            
        }
    };


    category=[
        {
            name:"Adreslerim",
            icon:"home-map-marker",
        },
        {
            name:"Favori Ürünlerim",
            icon:"heart-outline",
        },
        {
            name:"Sepetim",
            icon:"cart-outline",
        },
        {
            name:"Siparişlerim",
            icon:"clipboard-list-outline",
        },
        {
            name:"Ödeme Yöntemlerim",
            icon:"credit-card-outline",
        },
        {
            name:"İletişim Tercihlerim",
            icon:"bell-outline",
        },
        {
            name:"Hesap Ayarları",
            icon:"account-settings-outline",
        },
        {
            name:"Yardım",
            icon:"help-circle-outline",
        },
        {
            name:"Çıkış Yap",
            icon:"logout",
        },
    ]
    return (
        <View style={styles.container}>
        {category.map((item,index)=>(
            <TouchableOpacity
            style={styles.button}
            key={index}
            onPress={() => handleItemPress(item.name)}
            >
            <View style={styles.buttontext}>
            <MaterialCommunityIcons name={item.icon} size={24} style={{marginLeft:20}}/>
            <Text style={{fontSize:20,marginLeft:20}}>{item.name}</Text>
            <MaterialCommunityIcons name="chevron-right" size={24} style={{marginLeft:"auto",marginRight:20}}/>
            </View>
            </TouchableOpacity>
        ))}

        </View>
    );

}

const styles = StyleSheet.create({
    container: { 
        paddingTop: 10,
       
    },
    button: {
        flexDirection: 'column',
        backgroundColor: "#AAAAAA",
        height: 60,
        borderRadius: 3,
        marginBottom:10,
    },
    buttontext: {
        flexDirection:"row",
        marginBottom:"auto",
        marginTop:"auto",
    },
});

export default ProfileButtons;
