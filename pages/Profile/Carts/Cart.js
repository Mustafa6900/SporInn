import React from "react";
import { Text, StyleSheet, TouchableOpacity, View, SafeAreaView } from "react-native";
import Header from "../../../components/header";
import BackButton from "../../../components/backbutton";
import Cartitemlist from "./cartitemlist";
import CustomButton from "../../../components/custombutton";
import { useNavigation } from '@react-navigation/native';
export default function Cart({route}){
    const { item } = route.params;
    const navigation = useNavigation();
    return(
        <SafeAreaView style={styles.container}>
        <Header title="Sepetim" />
        <BackButton left={15} top={43} />
        <Cartitemlist item={item}/>
        <View style={styles.bottombar}>
            <View style={styles.price} >
                <Text style={{ fontSize: 20, marginLeft: 20, fontWeight: '500',color:"white" }}>Toplam Tutar:</Text>
                <Text style={{ fontSize: 20, marginLeft: 20, fontWeight: '900',color:"#FF6F25" }}>₺{item.totalPrice}</Text>
                </View>
            <CustomButton title="Sepeti Onayla  " onPress={() => navigation.navigate("Payment",{ item })} />
        </View>
        </SafeAreaView>
    )

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#292929",
    }
    ,
    bottombar: {
        position: "relative",
        bottom: 0,
        width: "100%",
        height: 80,
        backgroundColor: "#0D0D0D",
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 20,
    },
    price: {
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
    }

});