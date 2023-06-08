import React from 'react';
import { Text, StyleSheet,SafeAreaView } from 'react-native';
import Header from '../../../components/header';
import BackButton from '../../../components/backbutton';
import MyAdressList from './myadresslist';
import CustomButton from '../../../components/custombutton';
import { useNavigation } from '@react-navigation/native';
export default Adresses = ({ route }) => {
    const { item } = route.params;
    const navigation = useNavigation();
    return(
        <SafeAreaView style={styles.container}>
        <Header title="Adreslerim" />
        <BackButton left={15} top={43} />
        <MyAdressList item={item}/>
        <CustomButton style={{marginTop:20,marginBottom:40,width:"75%",marginLeft:"auto",marginRight:"auto"}}title="Adres Ekle"  onPress={() => navigation.navigate('AddAdressPage')}/>
        </SafeAreaView>

    )

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#292929',
    },
});

