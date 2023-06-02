import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Tabbar from './pages/tabbar.js';
import Login from './pages/Auth/Login'
import SignUp from './pages/Auth/SignUp';
import Logout from './pages/Auth/Logout';
import phoneCode from './pages/Auth/phoneCode';
import Home from './pages/Home/Home';
import Profile from './pages/Profile/profile';
import Products from './pages/Products/products.js';
import QrCode from './pages/Qrcode/qrcode.js';
import Budy from './pages/Budy/budy.js';
import ItemAllPage from './components/ItemAllPage.js';
import Sports from './pages/Home/Sports/sports.js';
const App = () => {
  const Stack = createNativeStackNavigator();
  return (
      
    <NavigationContainer>
      <Stack.Navigator screenOptions={{
        headerShown: false,
        navigationBarHidden: true,
        headerTitleStyle: {
          fontSize: 18,
        }
      }}>
        <Stack.Screen
          name='Logout'
          component={Logout}
          options={{ title: "Logout" }}
        />
        <Stack.Screen
          name='Login'
          component={Login}
          options={{ title: "Login" }}
        />
        <Stack.Screen
          name='SignUp'
          component={SignUp}
          options={{ title: "Sign Up" }}
        />
        <Stack.Screen
          name='phoneCode'
          component={phoneCode}
          options={{ title: "phoneCode" }}
        />
         <Stack.Screen
          name='Tabbar'
          component={Tabbar}  
        />
        <Stack.Screen
          name='Home'
          component={Home}
          options={{ title: "Home" }}
        />
        <Stack.Screen
          name='ItemAllPage'
          component={ItemAllPage}
          options={{ title: "ItemAllPage" }}
        />
        <Stack.Screen
          name='Sports'
          component={Sports}
          options={{ title: "Sports"}}
        />
        <Stack.Screen
          name='Profile'
          component={Profile}
          options={{ title: "Profile" }}
        />
        <Stack.Screen
          name='Products'
          component={Products}
          options={{ title: "Products"}}
        />
        <Stack.Screen
          name='QrCode'
          component={QrCode}
          options={{ title: "QrCode" }}
        />
        <Stack.Screen
          name='Budy'
          component={Budy}
          options={{ title: "Budy" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;