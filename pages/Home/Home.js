import * as React from 'react';
import { SafeAreaView,StyleSheet,Text,View } from 'react-native';
import Header from '../../components/header';
import PictureButton from '../../components/picturebutton';
//import SliderButton from '../../components/sliderbutton';

export default function Home({ navigation }) {
    return (
        <SafeAreaView style={styles.container}>
        <Header title="SporInn"/>
        <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
        {//<SliderButton 
        //onPress={() => console.log('Slider tıklandı')}
        //style={{bottom: 40}}
        //> 
        }
        <PictureButton 
        title="Reklam Alanı"
        onPress={() => navigation.navigate('Home') }
        backgroundImage={require('../../assets/advertpic.png')}
        style={{marginTop: -50,marginBottom: 40}}
        />
        <PictureButton 
        title="Spor Salonları"
        onPress={() => navigation.navigate('AllItemAllPages', { category: "Spor Salonları" }) }
        backgroundImage={require('../../assets/buttonblurpicture.png')}
        style={{marginBottom: 40}}
        />
        <PictureButton 
        title="Spor Tesisleri"
        onPress={() => navigation.navigate('Sports')}
        backgroundImage={require('../../assets/budypic/allsports.png')}
        style={{marginBottom: 50}}
        />
        </View>
        </SafeAreaView>
        
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#292929',
    },
});