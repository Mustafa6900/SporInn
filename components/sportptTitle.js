import * as React from "react";
import { SafeAreaView, StyleSheet,Text } from "react-native";

const SportTitle = ({ title }) => {
    return (
        <SafeAreaView style={styles.container}>
        <Text style={styles.title}>{title}</Text>
        </SafeAreaView>
    );
    }

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#AAAAAA",
        width: "100%",
        height: 40,
        justifyContent: "center",
        marginTop: 30,
        borderRadius: 3,
        marginBottom: 30,
        
    },
    title: {
        color: "#0D0D0D",
        fontSize: 25,
        fontWeight: "400",
        marginLeft: "5%",  
    },
});

export default SportTitle;

// Sayfa başlığı için kullanılan component beyaz arkaplanlı ve siyah yazılıdır. 
