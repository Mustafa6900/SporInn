import React,{useState,useRef} from 'react';
import { SafeAreaView, StyleSheet, Text, View,BackHandler, Image, FlatList, TouchableOpacity, Animated,Alert } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import Header from '../../components/header';
import { supabase } from '../../supabaseClient.js';
import Modal from 'react-native-modal';
import { Entypo } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import * as Animatable from 'react-native-animatable';
export default function Home({ navigation }) {
  const [showOptionsModal, setShowOptionsModal] = useState(false);

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

  const storyData = [
    {
      id: 1,
      userImage: require('../../assets/budypic/allsports.png'),
    },
    {
      id: 2, 
      userImage: require('../../assets/budypic/allsports.png'),
    },
    {
      id: 3,
      userImage: require('../../assets/budypic/allsports.png'),
    },
    {
      id: 4, 
      userImage: require('../../assets/budypic/allsports.png'),
    },
    {
      id: 5,
      userImage: require('../../assets/budypic/allsports.png'),
    },
    {
      id: 6, 
      userImage: require('../../assets/budypic/allsports.png'),
    },
    {
      id: 7,
      userImage: require('../../assets/budypic/allsports.png'),
    },
    {
      id: 8, 
      userImage: require('../../assets/budypic/allsports.png'),
    }
  ];
  const feedData = [
    {
      id: 1,
      username: 'Mustafa',
      userImage: require('../../assets/budypic/allsports.png'),
      text: 'Bu bir gönderi metni.',
      image: require('../../assets/budypic/allsports.png'),
    },
    {
      id: 2,
      username: 'Ahmet',
      userImage: require('../../assets/budypic/allsports.png'), 
      text: 'Başka bir gönderi metni.',
      image: require('../../assets/budypic/allsports.png'),
    },
    {
      id: 3,
      username: 'Mehmet',
      userImage: require('../../assets/budypic/allsports.png'),
      text: 'Yeni bir gönderi metni.',
      image: require('../../assets/budypic/allsports.png'),
    },
    {
      id: 4,
      username: 'Ayşe',
      userImage: require('../../assets/budypic/allsports.png'),
      text: 'Yeni bir gönderi metni.',
      image: require('../../assets/budypic/allsports.png'),
    },
    {
      id: 5,
      username: 'Ahmet',
      userImage: require('../../assets/budypic/allsports.png'), 
      text: 'Başka bir gönderi metni.',
      image: require('../../assets/budypic/allsports.png'),
    },
  ];

  const renderStory = ({ item }) => (
    <View style={styles.storyContainer}>
      <Image source={item.userImage} style={styles.storyImage} />
    </View>
  );
  
  const renderPost = ({ item }) => (
    <View style={styles.postContainer}>
      <View style={{ marginTop: 10, marginLeft: 10 }}>
        <Image source={item.userImage} style={{ width: 40, height: 40, borderRadius: 50 }} />
        <Text style={styles.username}>{item.username}</Text>
      </View>
      <Image source={item.image} style={styles.postImage} />
      <View style={{ marginBottom: 5 }}>
        <TouchableOpacity style={{ paddingLeft: 10, paddingTop: 8 }} onPress={() => console.log('Beğendiniz!')}>
          <Entypo name="heart-outlined" size={24} color="white" />
        </TouchableOpacity>
        <TouchableOpacity style={{ position: 'absolute', left: 40, padding: 8 }} onPress={() => console.log('Yorum Yaptınız!')}>
          <FontAwesome name="comment-o" size={21} color="white" />
        </TouchableOpacity>
      </View>
      <Text style={styles.likeText}>18 beğenme</Text>
      <Text style={styles.postText}>{item.text}</Text>
      <TouchableOpacity style={styles.optionsText} onPress={() => setShowOptionsModal(true)}>
        <Entypo name="dots-three-vertical" size={20} color={'white'} />
      </TouchableOpacity>
    </View>
  );

  const closeModal = () => {
    setShowOptionsModal(false);
  };

  const listFooterComponent = () => (
    <View style={{ height: 80 }} /> // İstenilen boşluk yüksekliğini ayarlayabilirsiniz
  );


 

  return (
    <SafeAreaView style={styles.container}>
      <Header title="SporInn" />
      <FlatList
        data={feedData}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderPost}
        ListFooterComponent={listFooterComponent}
        ListHeaderComponent={() => (
          <FlatList
            data={storyData}
            keyExtractor={(item) => item.id.toString()}
            renderItem={renderStory}
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.storyList}
          />
        )}
      />
      <Modal
        isVisible={showOptionsModal}
        onSwipeComplete={closeModal} // Modal aşağı çekilerek kapatılacak
        swipeDirection={['down']} // Yalnızca aşağı yönlü kaydırma ile kapatılacak
        style={styles.modal}
        onBackdropPress={closeModal}
      >
        <Ionicons name="remove-outline" size={100} color="black" style={{marginLeft:"auto",marginRight:"auto",marginTop:"auto",top:60,zIndex:1}} />
        <View style={styles.modalContainer}>
          <TouchableOpacity style={{flexDirection:"row",marginTop:20,marginBottom:20}}onPress={() => console.log("Takip Et")}>
          <FontAwesome name="user-plus" size={24} color="black" />
            <Text style={{fontSize:24,fontWeight:"bold",marginLeft:20}}>Takip Et</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{flexDirection:"row",marginBottom:20}} onPress={() => console.log("Şikayet Et")}>
          <FontAwesome name="flag" size={22} color="black" />
            <Text style={{fontSize:24,fontWeight:"bold",marginLeft:25}}>Şikayet Et</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#292929',
  },
  postContainer: {
    position: 'relative',
  },
  storyList:{
    marginTop: 10,
    marginBottom: 10,  },
  storyContainer: {
    height: 80,
    width: 80,
    borderRadius: 50,
    backgroundColor: '#EEE',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 8,
    marginTop: 12,
  },
  storyImage: {
    width: 78,
    height: 78,
    borderRadius: 50,
  },

  username: {
    position: 'absolute',
    padding: 8,
    top: 3,
    left: 45,
    fontSize: 14,
    fontWeight: 'bold',
    color: '#fff',
  },
  postImage: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
    marginTop: 8,
  },
  likeText: {
    marginLeft: 8,
    fontSize: 14,
    color: '#fff',
    fontWeight: 'bold',
   
  },
  postText: {
    padding: 8,
    fontSize: 12,
    color: '#fff',
  },
  optionsText: {
    padding: 8,
    position: 'absolute',
    top: 15,
    right:10,
  },
  modal: {
    justifyContent: 'flex-end', // Modal alttan açılacak
    margin: 0,
  },
  modalContainer: {
    backgroundColor: 'white',
    padding: 16,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    
  },
});