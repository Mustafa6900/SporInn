import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useNavigationState } from '@react-navigation/native';
import Home from './Home/Home'
import Profile from './Profile/profile';
import QrCode from './Qrcode/qrcode';
import Budy from './Budy/budy';
import Products from './Products/ProductsCategoryPage.js';

import { Ionicons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { View } from 'react-native';

const Tab = createBottomTabNavigator();

const Tabbar = ({initialRoute}) =>{
    const routes = useNavigationState(state => state.routes);
    const currentRoute = routes[routes.length - 1].name;
    return (
       
            <Tab.Navigator 
                screenOptions={({ route }) => ({
                    tabBarIcon: ({ focused, color, size }) => {
                        if(route.name === 'Home')
                        {
                            return <Ionicons name="home-outline" size={35} color={color} />;
                        }
                        else if(route.name === 'Products')
                        {
                            return <Ionicons name="cart-outline" size={35} color={color} />;
                        }
                        else if(route.name === 'QrCode')
                        {
                            return(
                            <View style={{
                                bottom:35, 
                                borderRadius: 7,
                                backgroundColor:'#FF6F25',
                                height:75,width:75,
                                justifyContent: 'center',alignItems: 'center', 
                                }}>
                            <Ionicons name="qr-code" size={70} color='#000000' />
                            </View>
                            )
                        }
                        else if(route.name === 'Budy')
                        {
                            return <MaterialIcons name="fitness-center" size={35} color={color} />;
                        }
                        else if(route.name === 'Profile')
                        {
                            return <Ionicons name="person-outline" size={35} color={color} />;
                        }
                    },
                    tabBarActiveTintColor: '#FF6F25',
                    tabBarInactiveTintColor: '#AAAAAA',
                    
                    headerShown: false,
                    tabBarShowLabel: false,
                    tabBarStyle: {
                        backgroundColor: '#0D0D0D',
                        borderTopWidth: 0,
                        height: 70,
                        position: 'absolute',
                    },

                })}
                initialRouteName={initialRoute}
            >
                <Tab.Screen name="Home" component={Home} />  
                <Tab.Screen name="Products" component={Products} />
                <Tab.Screen name="QrCode" component={QrCode} />
                <Tab.Screen name="Budy" component={Budy} />
                <Tab.Screen name="Profile" component={Profile} />
                
            </Tab.Navigator>
       
    ); 
}

export default Tabbar;