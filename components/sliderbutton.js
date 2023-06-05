import React from 'react';
import { TouchableOpacity, ImageBackground, StyleSheet, View } from 'react-native';
import Carousel from 'react-native-snap-carousel';

const SliderButton = ({ onPress, style }) => {
  const images = [
    require(".././assets/sliderpic/b.jpg"),
    require(".././assets/sliderpic/c.jpg"),
    require(".././assets/sliderpic/d.jpg"),
    require(".././assets/sliderpic/e.jpg"),
  ];

  const renderImageItem = ({ item }) => (
    <View style={styles.imageContainer}>
      <ImageBackground source={item} style={styles.imageBackground} resizeMode="cover" />
    </View>
  );

  return (
    <TouchableOpacity style={[styles.button, style]} onPress={onPress}>
      <Carousel
        data={images}
        renderItem={renderImageItem}
        sliderWidth={375}
        itemWidth={372}
        loop
        autoplay
        autoplayDelay={100}
        autoplayInterval={100}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 180,
    width: 375,
    paddingHorizontal: 15,
    borderRadius: 7,
    borderWidth: 1,
    borderColor: '#FF6F25',
  },
  buttonText: {
    color: '#AAAAAA',
    fontSize: 50,
    fontFamily: 'Roboto',
    fontWeight: '700',
    letterSpacing: 0.4,
    width: 300,
    textAlign: 'center',
  },
  imageContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageBackground: {
    height: 177,
    width: 372,
    borderRadius: 7,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default SliderButton;
