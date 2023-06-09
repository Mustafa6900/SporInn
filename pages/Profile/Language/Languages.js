import React,{useState} from 'react';
import { Text, StyleSheet, TouchableOpacity, View, SafeAreaView, Image } from 'react-native';
import Header from '../../../components/header';
import BackButton from '../../../components/backbutton';
import CheckButton from '../../../components/checkbutton';

export default function Languages(){

    const [checkedTurkish, setCheckedTurkish] = useState(true);
    const [checkedEnglish, setCheckedEnglish] = useState(false);

    const handleTurkishPress = () => {
        if (!checkedTurkish) {
            setCheckedTurkish(true);
            setCheckedEnglish(false);
        }
      };
      
      const handleEnglishPress = () => {
        if (!checkedEnglish) {
            setCheckedEnglish(true);
            setCheckedTurkish(false);
        }
      };

    return(
        <SafeAreaView style={styles.container}>
            <Header title="Dil Değiştir" />
            <BackButton left={15} top={43} />
            <View style={{marginTop:20}}>
             <View style={styles.buttons}>
                <Text style={{ fontSize: 20, marginLeft: 20, fontWeight: '900', marginBottom: 10, marginTop: 15 }}>Türkçe</Text>
                <CheckButton
                    title="✓"
                    styletip={{ backgroundColor: '#AAAAAA', justifyContent: "center", alignItems: "center", marginLeft: "auto", marginRight: 20, marginTop: "auto", marginBottom: "auto" }}
                    onPress={handleTurkishPress}
                    checked={checkedTurkish}
                />
            </View>
            <View style={styles.buttons}>
                <Text style={{ fontSize: 20, marginLeft: 20, fontWeight: '900', marginBottom: 10, marginTop: 15 }}>English</Text>
                <CheckButton
                    title="✓"
                    styletip={{ backgroundColor: '#AAAAAA', justifyContent: "center", alignItems: "center", marginLeft: "auto", marginRight: 20, marginTop: "auto", marginBottom: "auto" }}
                    onPress={handleEnglishPress}
                    checked={checkedEnglish}

                />
            </View>
            </View>
        </SafeAreaView>   
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:"#292929"
    },
    buttons:{
        flexDirection:"row",
        backgroundColor:"#AAAAAA",
        height:60,
        borderRadius:3,
        marginBottom:10,
    },

});

