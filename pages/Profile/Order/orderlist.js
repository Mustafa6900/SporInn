import React,{useState,useEffect,useContext} from "react";
import { Text, StyleSheet, View, Image, FlatList } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { AuthContext } from "../../Auth/AuthContext";
import { supabase } from "../../../supabaseClient";

const OrderList = () => {
  const navigation = useNavigation();
  const { session } = useContext(AuthContext);
  const [orders, setOrders] = useState([]);
  const [ordersSportsFacilities , setOrdersSportsFacilities] = useState([]); // ordersSportsFacilities nesnesini oluşturduk
  const [ordersFitness , setOrdersFitness] = useState([]); // ordersFitness nesnesini oluşturduk

  const mergeOrdersWithFitnessData = () => {
    const mergedOrders = orders.map((order) => {
      if (order.fitness_centers_packages_id !== null) {
        // ordersFitness dizisinde uygun veriyi bulma
        const fitnessData = ordersFitness.find(
          (fitnessItem) => fitnessItem.id === order.fitness_centers_packages_id
        );
  
        
        // fitnessData bulunduysa, order nesnesine ekleyin
        if (fitnessData) {
          order.fitnessData = fitnessData;
        }
      }
      return order;
    });
  };
  
  const mergeOrdersWithSportsFacilitiesData = () => {
    // Diziyi tek bir düz diziye indirme
    const updatedDataFlat = ordersSportsFacilities.flat();
    // orders dizisindeki her sipariş nesnesine uygun spor tesisleri verilerini ekleyin
    const mergedOrders = orders.map((order) => {
      if (order.sports_facilities_config_id !== null) {
        // ordersSportsFacilities dizisinde uygun veriyi bulma
        const sportsFacilitiesData = updatedDataFlat.find(
          (sportsFacilitiesItem) => sportsFacilitiesItem.id === order.sports_facilities_config_id 
        );
        console.log(sportsFacilitiesData)
        // sportsFacilitiesData bulunduysa, order nesnesine ekleyin
        if (sportsFacilitiesData) {
          order.sportsData = sportsFacilitiesData;
        }
      }
      return order;
    });
  
  };

  mergeOrdersWithSportsFacilitiesData();
  mergeOrdersWithFitnessData();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const { data: orderData, error: orderError } = await supabase
          .from("orders")
          .select("*")
          .eq("user_id", session.user.id)
          .order("created_at", { ascending: false });
        if (orderError) {
          console.error(orderError);
        } else {
          // orders nesnesine orderItems verilerini ekleyerek güncelliyoruz
          const ordersWithItems = await Promise.all(
            orderData.map(async (order) => {
              if (order.address_id != null) {
                const { data: orderItemsData, error: orderItemsError } = await supabase
                  .from("order_items")
                  .select("*,product_id,products(id,*)")
                  .eq("orders_id", order.id)
                  .order("created_at", { ascending: false });
                if (orderItemsError) {
                  console.error(orderItemsError);
                } else {
                  order.orderItems = orderItemsData;
                  await Promise.all(
                    order.orderItems.map(async (orderItem) => {
                      const product = orderItem.products;
                      if (product.image_url) {
                        try {
                          const { data: imageData, error: imageError } = await supabase.storage
                            .from("productsimage")
                            .getPublicUrl(product.image_url);
                          if (imageError) {
                            console.log("Resim alınamadı:", imageError.message);
                          } else {
                            if (imageData) {
                              product.imageData = imageData; // imageData verisini tesis verisine ekleyin
                            }
                          }
                        } catch (error) {
                          console.error(error);
                        }
                      }
                    })
                  );
                }
              }
              return order;
            })
          );
          setOrders(ordersWithItems);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchOrders();
  }, []);

  useEffect(() => {
    try {
      const fetchOrdersWithFitnessItems = async () => {
        const updatedDataArray = await Promise.all(
          orders
            .filter((order) => order.fitness_centers_packages_id !== null) // Burada fitness_centers_packages_id değeri null olmayan siparişleri filtreliyoruz.
            .map(async (order) => {
              const { data, error } = await supabase
                .from("fitness_centers_packages")
                .select("*")
                .eq("id", order.fitness_centers_packages_id)
                .order("created_at", { ascending: false });
              if (error) {
                console.error(error);
                return [];
              } else {
                const updatedData = await Promise.all(
                  data.map(async (item) => {
                    if (item.image_url) {
                      const { data: imageData, error: imageError } = await supabase.storage
                        .from("fcpackagesimage")
                        .getPublicUrl(item.image_url);
  
                      if (imageError) {
                        console.log("Resim alınamadı:", imageError.message);
                      } else {
                        if (imageData) {
                          item.imageData = imageData; // imageData verisini tesis verisine ekleyin
                        }
                      }
                    }
                    return item;
                  })
                );
  
                return updatedData;
              }
            })
        );
  
        // Flatten the array of arrays into a single array
        const updatedDataFlat = updatedDataArray.flat();
        setOrdersFitness(updatedDataFlat);
      };
  
      fetchOrdersWithFitnessItems();
    } catch (error) {
      console.error(error);
    }
  }, [orders]);

  useEffect(() => {
    try {
      const fetchOrdersWithSportsFacilitiesItems = async () => {
        const updatedDataArray = await Promise.all(
          orders
            .filter((order) => order.sports_facilities_config_id !== null)
            .map(async (order) => {
              const { data, error } = await supabase
                .from("sports_facilities_config")
                .select("created_id")
                .eq("id", order.sports_facilities_config_id)
                .order("created_at", { ascending: false });
              if (error) {
                console.error(error);
              } else {
                const updatedData = await Promise.all(
                  data.map(async (item) => {
                    const { data: sportsData, error: sportsError } = await supabase
                      .from("sports_facilities")
                      .select("*")
                      .eq("created_id", item.created_id)
                      .order("created_at", { ascending: false });
                    if (sportsError) {
                      console.error(sportsError);
                    } else {
                      if (sportsData && sportsData.length > 0) {
                        const sportsItem = sportsData[0]; // İlk öğeyi alıyoruz
                        if (sportsItem.image_url) {
                          const { data: imageData, error: imageError } = await supabase.storage
                            .from("sportsfacilityimage")
                            .getPublicUrl(sportsItem.image_url);
                          if (imageError) {
                            console.error("Resim alınamadı:", imageError.message);
                          } else {
                            if (imageData) {
                              sportsItem.imageData = imageData; // imageData verisini sportsData verisine ekleyin
                            }
                          }
                        }
                      }
                      return { ...item, sportsData: sportsData[0] }; // İlgili sportsData nesnesini döndürüyoruz
                    }
                  })
                );
  
                return updatedData;
              }
            })
        );
  
        // Flatten the array of arrays into a single array
        const updatedDataFlat = updatedDataArray.flat();
        setOrdersSportsFacilities(updatedDataFlat);
      };
  
      fetchOrdersWithSportsFacilitiesItems();
    } catch (error) {
      console.error(error);
    }
  }, [orders]);
  
  

  const renderItem = ({ item }) => {
    return (
      <View>
        <View style={styles.packet}>
          <View style={styles.info}>
            <Text style={styles.date}>{item.order_date}</Text>
            <View style={{ flexDirection: "row" }}>
              <Text style={styles.mintitle}>Toplam: </Text>
              <Text style={styles.price}>₺{item.total_amount}</Text>
            </View>
          </View>
          <View style={styles.detail}>
            <Text style={styles.detailtext}>Detaylar →</Text>
          </View>
        </View>
        <View style={styles.packet2}>
          <View style={styles.info2}>
            <Text style={styles.status}>{item.status}</Text>
            {item.orderItems && (
            <View>
              <View style={{ flexDirection: "row" }}>
              {item.orderItems.map((orderItem) => (
              <Image
                key={orderItem.id}
                source={{ uri: orderItem.products.imageData.publicUrl }} // Burada resim için kullandığımız alanı düzenlemiş oluyoruz.
                style={{ width: 80, height: 80, marginLeft: 10, marginTop: 15,borderRadius: 7 }}
              />
              ))}           
            </View>
            {item.status === "Sipariş Alındı" && ( <Text style={styles.delivery}>{item.orderItems.length} ürün hazırlanıyor. </Text>)}
            {item.status === "Kargoya Verildi" && ( <Text style={styles.delivery}>{item.orderItems.length} ürün kargoya verildi. </Text>)}
            {item.status === "Teslim Edildi" && ( <Text style={styles.delivery}>{item.orderItems.length} ürün teslim edildi. </Text>)}
            {item.status === "İptal Edildi" && ( <Text style={styles.delivery}>{item.orderItems.length} ürün iptal edildi. </Text>)}
            {item.status === "İade Edildi" && ( <Text style={styles.delivery}>{item.orderItems.length} ürün iade edildi. </Text>)}
            </View>
            )}
             {item.fitnessData && item.fitnessData.imageData && (
            <View>
                <View style={{flexDirection:"row"}}>
                  
                <Image
                  source={{ uri: item.fitnessData.imageData.publicUrl }}
                  style={{ width: 80, height: 80, marginLeft: 10, marginTop: 15,borderRadius: 7 }}
                />
                <Text style={styles.description}>{item.fitnessData.description}</Text>
                </View>
                <Text style={styles.delivery}>{item.fitnessData.name}</Text>
            </View>
            )}
            {item.sportsData && item.sportsData.imageData && (
            <View>
              {console.log(item)}
                <View style={{flexDirection:"row"}}>
           
                <Image
                  source={{ uri: item.sportsData.imageData.publicUrl }}
                  style={{ width: 80, height: 80, marginLeft: 10, marginTop: 15,borderRadius: 7 }}
                />
                <Text style={styles.description}>{item.sportsData.description}</Text>
                </View>
                <Text style={styles.delivery}>{item.sportsData.name}</Text>
            </View>
                )}    
          </View>
        </View>
      </View>
    );
  };
  

  return (
    
    <FlatList
      style={styles.container}
      data={[...orders]}
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
    height: 180,
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
    padding: 8,
  },
  status: {
    fontSize: 15,
    fontWeight: 'bold',
    color: 'green',
  },
  date: {
    fontSize: 17,
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
    marginTop: 20,
    color: '#0D0D0D',
  },
  description: {
    fontSize: 15,
    fontWeight: '500',
    marginTop: 10,
    marginLeft: 15,
    color: '#0D0D0D',
    width: 241,
  },

});

export default OrderList;
