import * as React from 'react';
import { SafeAreaView, StyleSheet, Text, View, BackHandler, Alert } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import Header from '../../components/header';
import PictureButton from '../../components/picturebutton';
import { supabase } from '../../supabaseClient.js';
export default function Home({ navigation }) {
  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        Alert.alert(
          'Çıkış yapmak istiyor musunuz?',
          '',
          [
            { text: 'Hayır', style: 'cancel', onPress: () => {} },
            { text: 'Evet', onPress: () => { 
              // Çıkış işlemleri burada gerçekleştirilebilir
              // Supabase'den çıkış yapma işlemleri eklenebilir
           
               supabase.auth.signOut()
            } },
          ],
          { cancelable: true }
        );
        return true;
      };

      BackHandler.addEventListener('hardwareBackPress', onBackPress);

      return () => {
        BackHandler.removeEventListener('hardwareBackPress', onBackPress);
      };
    }, [])
  );

  return (
    <SafeAreaView style={styles.container}>
      <Header title="SporInn" />
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <PictureButton
          title="Reklam Alanı"
          onPress={() => navigation.navigate('Home')}
          backgroundImage={require('../../assets/advertpic.png')}
          style={{ marginTop: -50, marginBottom: 40 }}
        />
        <PictureButton
          title="Spor Salonları"
          onPress={() => navigation.navigate('AllItemAllPages', { category: 'Spor Salonları' })}
          backgroundImage={require('../../assets/buttonblurpicture.png')}
          style={{ marginBottom: 40 }}
        />
        <PictureButton
          title="Spor Tesisleri"
          onPress={() => navigation.navigate('Sports')}
          backgroundImage={require('../../assets/budypic/allsports.png')}
          style={{ marginBottom: 50 }}
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
