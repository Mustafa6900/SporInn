import React, { useState } from 'react';
import { View, Image, TouchableOpacity, Text, StyleSheet } from 'react-native';
import ItemTitleFavorite from './titleFavorite';
const SportProfileInfo = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleImagePress = () => {
    setIsModalVisible(true);
  };

  const closeModal = () => {
    setIsModalVisible(false);
  };

  return (
    <View>
      <TouchableOpacity onPress={handleImagePress}>
        <Image source={require('../assets/buttonpicture.png')} style={styles.image} />
        <ItemTitleFavorite title="Letsfit" point="4.8" />
      </TouchableOpacity>
      
      {isModalVisible && (
        <View style={styles.modalContainer}>
          <Text style={styles.modalText}>Adres: asdasdasd asdasdasdas asdasdasdasd asdasdasd asdasdasdasd asdasd asdasdasa </Text>
          <Text style={styles.modalText}>Detayları: asdasdkjlaskljdkljasjkldjklasjkldajklsdjklaskljdjlaksljdkjlaslkjdlkjasjkldalksdadasdasdasdasdashkljdkljaskljdkjlaskdjlakjlsjkldajklslkjdajlksdjklsakjlsdkjlaasdasdasdasjkşdlaksjdkljaskjldjklajklsdkjlajklsjkldaşlsdklşaslkşdklşaslkdşaklşslkşdaklşdklşaslşkdalskdlkşaslkşdşklasdasaadskljdkjlasdkjlakjlsdsfadfadadfadfjklalkjsd </Text>
        
          <TouchableOpacity onPress={closeModal} style={styles.closeButton}>
            <Text style={styles.closeButtonText}>Kapat</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  image: {
    width: 375,
    height: 180,
    marginBottom: 10,
    marginTop: 20,
    borderRadius: 7,
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  modalContainer: {
    backgroundColor: '#AAAAAA',
    paddingLeft: 25,
    borderRadius: 7,
    paddingTop:2,
    paddingBottom:10,
    width: 375,
  },
  modalText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#0d0d0d',
    marginBottom: 15,
  
    },
  closeButton: {
    backgroundColor: '#0D0D0D',
    padding: 10,
    borderRadius: 7,
    marginTop: 10,
    alignSelf: 'center',
  },
  closeButtonText: {
    color: '#FFF',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default SportProfileInfo;
