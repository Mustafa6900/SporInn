import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ImageBackground } from 'react-native';
import { SliderBox } from "react-native-image-slider-box";
const SliderButton = ({ onPress, style}) => {
    const images = [
        require(".././assets/sliderpic/b.jpg"),
        require(".././assets/sliderpic/c.jpg"),
        require(".././assets/sliderpic/d.jpg"),
        require(".././assets/sliderpic/e.jpg"),
    ];

  return (
    <TouchableOpacity style={[styles.button, style]} onPress={onPress}>
         <SliderBox 
            style={styles.imageBackground}
            images={images}
            dotColor="#FF6F25"
            inactiveDotColor="#90A4AE"
            autoplay
            circleLoop
            resizeMethod={'resize'}
            resizeMode={'cover'}
            paginationBoxStyle={{
                position: "absolute",
                bottom: 0,
                padding: 0,
                alignItems: "center",
                alignSelf: "center",
                justifyContent: "center",
                paddingVertical: 12
            }}
            dotStyle={{
                width: 25,
            }}
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
  imageBackground: {
    height: 177,
    width: 372,
    borderRadius: 7,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 20,
  },
});

export default SliderButton;
