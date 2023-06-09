import React from "react";
import { Text, StyleSheet, TouchableOpacity, View, Image, ScrollView, FlatList } from "react-native";

const OrderList = ({ item }) => {

  const renderItem = ({ item }) => {
    return (
      <View>
        <View style={styles.packet}>
          <View style={styles.info}>
            <Text style={styles.date}>{item.orderDate}</Text>
            <View style={{ flexDirection: "row" }}>
              <Text style={styles.mintitle}>Toplam:</Text>
              <Text style={styles.price}>₺{item.price}</Text>
            </View>
          </View>
          <View style={styles.detail}>
            <Text style={styles.detailtext}>Detaylar -</Text>
          </View>
        </View>
        <View style={styles.packet2}>
          <View style={styles.info2}>
            <Text style={styles.status}>Teslim Edildi</Text>
            <View style={{ flexDirection: "row" }}>
                <Image  source={require("../../../assets/productcategoriespic/supplementblack.png")} style={{ width: 80, height: 80, marginLeft: 10, marginTop: 30 }} />
                <Image  source={require("../../../assets/productcategoriespic/supplementblack.png")} style={{ width: 80, height: 80, marginLeft: 10, marginTop: 30 }} />
                <Image  source={require("../../../assets/productcategoriespic/supplementblack.png")} style={{ width: 80, height: 80, marginLeft: 10, marginTop: 30 }} />
            </View>
            <Text style={styles.delivery}>3 ürün teslim edildi</Text>
          </View>
        </View>
      </View>
    );
  };

  return (
    
    <FlatList
      style={styles.container}
      data={item.orders}
      keyExtractor={(item, index) => index.toString()}
      renderItem={renderItem}
        showsVerticalScrollIndicator={false}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '95%',
    marginBottom: 10,
  },
  packet: {
    flexDirection: 'column',
    backgroundColor: '#AAAAAA',
    height: 80,
    borderTopLeftRadius: 7,
    borderTopRightRadius: 7,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 5,
    marginBottom: 5,
    marginTop: 30,
    marginLeft: 20,
    width: '95%',
  },
  packet2: {
    flexDirection: 'row',
    backgroundColor: '#AAAAAA',
    height: 200,
    borderBottomLeftRadius: 7,
    borderBottomRightRadius: 7,
    padding: 5,
    marginBottom: 5,
    marginLeft: 20,
    width: '95%',
  },
  info: {
    flexDirection: 'column',
    marginRight: 'auto',
    justifyContent: 'center',
    padding: 5,
  },
  detail: {
    position: 'absolute',
    flexDirection: 'column',
    padding: 5,
    right: 10,
    marginBottom: 'auto',
    marginTop: 'auto',
  },
  detailtext: {
    fontSize: 15,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#0D0D0D',
  },
  info2: {
    flexDirection: 'column',
    marginRight: 'auto',
    justifyContent: 'center',
    padding: 5,
  },
  status: {
    fontSize: 15,
    fontWeight: 'bold',
    marginBottom: 5,
    color: 'green',
  },
  date: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  mintitle: {
    fontSize: 15,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  price: {
    fontSize: 15,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#FF6F25',
  },
  delivery: {
    fontSize: 15,
    fontWeight: 'bold',
    marginTop: 30,
    color: '#0D0D0D',
  },
});

export default OrderList;
