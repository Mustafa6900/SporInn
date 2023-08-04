import * as React from "react";
import {StyleSheet, Text, View } from "react-native";
const OutputText = ({ text, style }) => {
    return (
      <View style={styles.container}>
       
          <Text style={[styles.text, style]}>{text}</Text>
   
      </View>
    );
  };
  

const styles = StyleSheet.create({
    container: { 
        backgroundColor: "#AAA",
        borderRadius: 7,
        width:"90%",
        height: "30%",
        marginLeft:"auto",
        marginRight:"auto",
        marginTop: 35,
        borderWidth: 1,
        borderColor: "#FF6F25",
        alignContent:"center",
        alignItems:"center",
        justifyContent:"center"

    },

    text: {
        fontSize: 16,
        color: "#0D0D0D",
        fontFamily: "Roboto",
        fontWeight: "bold",
        letterSpacing: 0.4,
        textAlign:"center",
        padding: 10,
    },
});

export default OutputText;
