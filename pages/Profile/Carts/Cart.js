import React,{useState,useContext,useEffect} from "react";
import { Text, StyleSheet, TouchableOpacity, View, SafeAreaView } from "react-native";
import Header from "../../../components/header";
import BackButton from "../../../components/backbutton";
import Cartitemlist from "./cartitemlist";
import CustomButton from "../../../components/custombutton";
import { useNavigation } from '@react-navigation/native';
import { supabase } from "../../../supabaseClient";
import { AuthContext } from '../../Auth/AuthContext';
import LoadingSpinner from '../../../components/LoadingSpinner';

export default function Cart(){
    const { session } = useContext(AuthContext);
    const navigation = useNavigation();
    const [item, setItem] = useState([]);
    const [itemSeller, setItemSeller] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const [checkedStates, setCheckedStates] = useState([]);
    const [itemLoaded, setItemLoaded] = useState(false);
 
    const setItemss = (data) => {
        // Verileri kontrol edin
        if (data && data.length > 0) {
          setItem(data);
          setItemLoaded(true); 
        }
        
      };
useEffect(() => {
    const fetchCartProducts = async () => {
        try {
            const { data, error } = await supabase
                .from('users_carts')
                .select('*,product_id,products(id,*)')
                .eq('created_id', session.user.id);
            if (error) {
                console.error(error);
            } else {
                setItem(data || []);
                setItemLoaded(true); 
            }
        } catch (error) {
            console.error(error);
        } finally {
            setItemLoaded(true); 
        }
    };

    fetchCartProducts(); // Fetch cart products first
}, []);

useEffect(() => {
    const fetchCartProductsSellers = async () => {
        try {
            if (item.length > 0) {
                const { data, error } = await supabase
                    .from('product_sellers')
                    .select('name')
                    .eq('created_id', item[0].products.created_id); // Use item after it's set
                if (error) {
                    console.error(error);
                } else {
                    setItemSeller(data || []);
                }
            }
        } catch (error) {
            console.error(error);
        } 
    };

    fetchCartProductsSellers(); // Fetch cart products sellers
}, [item]);

useEffect(() => {
    // Calculate the total price based on the checked items
    const totalPrice = item.reduce((total, cartItem, index) => {
        if (checkedStates[index]) {
            return total + cartItem.quantity*cartItem.products.price;
        }
        return total;
    }, 0);
    setTotalPrice(totalPrice);
}, [item, checkedStates]);

return (
    <SafeAreaView style={styles.container}>
        <Header title="Sepetim" />
        <BackButton left={15} top={43} />
        <Cartitemlist item={item} itemSeller={itemSeller} checkedStates={checkedStates} setCheckedStates={setCheckedStates} setItemss={setItemss} />
        <View style={styles.bottombar}>
            <View style={styles.price} >
                <Text style={{ fontSize: 20, marginLeft: 20, fontWeight: '500', color: "white" }}>Toplam Tutar:</Text>
                <Text style={{ fontSize: 20, marginLeft: 20, fontWeight: '900', color: "#FF6F25" }}>₺ {totalPrice.toFixed(2)} </Text>
            </View>
            <CustomButton title="Sepeti Onayla  " onPress={() => navigation.navigate("PaymentProducts", { item })} />
        </View>
        <LoadingSpinner  visible={!itemLoaded} textContent="Sepet Yükleniyor"/>
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