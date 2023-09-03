import * as React from 'react';
import { SafeAreaView, StyleSheet,View,ScrollView  } from 'react-native';
import Header from '../../components/header';
import PictureButton from '../../components/picturebutton';
export default function ProductsHomePage({ navigation }) {

  return (
    <SafeAreaView style={styles.container}>
      <Header title="SporInn" />
      <ScrollView style={{ flex: 1}}>
        <View style={{justifyContent: 'center', alignItems: 'center' }}>
        <PictureButton
          title="Reklam Alanı"
          onPress={() => navigation.navigate('Home')}
          backgroundImage={require('../../assets/advertpic.png')}
          style={{ marginTop: 20, marginBottom: 20 }}
        />
        <PictureButton
          title="Spor Salonları"
          onPress={() => navigation.navigate('AllItemAllPages', { category: 'Spor Salonları' })}
          backgroundImage={require('../../assets/buttonblurpicture.png')}
          style={{ marginBottom: 20 }}
        />
        <PictureButton
          title="Spor Tesisleri"
          onPress={() => navigation.navigate('Sports')}
          backgroundImage={require('../../assets/budypic/allsports.png')}
          style={{ marginBottom: 20 }}
        />
         <PictureButton
            title="Ürünler"
            onPress={() => navigation.navigate('Products')}
            backgroundImage={require('../../assets/advertpic.png')}
            style={{ marginBottom: 90 }}
        />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#292929',
  },
});
