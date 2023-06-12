import React from "react";
import { Text, View,StyleSheet } from "react-native";

const InformationText = ({ navigation,text }) => {
    return (
        <View style={styles.text}>
        <Text style={styles.textinfo}>{text}</Text>
        </View>
    );
    }

const styles = StyleSheet.create({
    text: {
        marginTop: 20,
        left: 20,
        height: 85,
        width: "90%",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor:"#1F1F1F",
        borderRadius: 10,
    },
    textinfo: {
        color: "#AAAAAA",
        fontSize: 13,
        fontFamily: "Roboto",
        fontWeight: "bold",
        letterSpacing: 0.4,
        padding: 15,
    }
    });
export default InformationText;

// Bilgilendirme metni için kullanılan component