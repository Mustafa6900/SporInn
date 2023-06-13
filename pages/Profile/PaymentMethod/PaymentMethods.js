import React,{useContext} from "react";
import { Text, StyleSheet, TouchableOpacity, View,Image,SafeAreaView } from "react-native";
import Header from "../../../components/header";
import BackButton from "../../../components/backbutton";
import MyPaymentMethods from "./mypaymentmethods";
import CustomButton from "../../../components/custombutton";
import { useNavigation } from "@react-navigation/native";
import { AuthContext } from '../../Auth/AuthContext';
import { supabase } from "../../../supabaseClient";

export default function PaymentMethods(){
 
    const navigation = useNavigation();
    const { session } = useContext(AuthContext);
    console.log("session payment ",session);

    return(
        <SafeAreaView style={styles.container}>
        <Header title="Ödeme Yöntemlerim" />
        <BackButton left={15} top={43} />
        <MyPaymentMethods session={session}/>
        <View style={styles.pluscontainer}>
        <CustomButton 
        title="Yeni Kart Ekle"
        left={10}
        top={20}
        titleStyle={{color:"#0D0D0D",fontSize:20}}
        onPress={() => navigation.navigate("AddCreditCardPage")}
        style={{width:"75%",marginLeft:"auto",marginRight:"auto",marginBottom:40,marginTop:20}}
        />
        </View>
        </SafeAreaView>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#292929",
    },
    pluscontainer: {
    },
    plusbutton: {
        flexDirection: "row",
        alignItems: "center",
        width: "100%",
        height: 80,
        backgroundColor: "#AAAAAA",
        borderRadius: 3,
    },
    });
