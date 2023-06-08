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
import Cart from './pages/Profile/Carts/Cart';
import Payment from './pages/Profile/Payments/payment.js';
import Adresses from './pages/Profile/Adress/AdressesPage.js';
import AddAdressPage from './pages/Profile/Adress/AddAdressPage.js';
import FavoriteProducts from './pages/Profile/FavoriteProduct/FavoriteProducts.js';
import Products from './pages/Products/ProductsCategoryPage.js';
import ProductsItems from './pages/Products/ProductsItemsPage.js';
import QrCode from './pages/Qrcode/QrcodeHome.js';
import QrCodePage from './pages/Qrcode/QrCodePage.js'
import Budy from './pages/Budy/budy.js';
import PtDtitemPages from './pages/Budy/PtDtChPages/PtDtitemPages.js';
import ChallengeDetailPage from './pages/Budy/ChallengePage/ChallengeDetailPage.js';
import ChallengePage from './pages/Budy/ChallengePage/ChallengeePage.js';
import AllItemAllPages from './pages/F,F-ItemsPages/AllItemAllPages.js';
import ItemPackagePage from './pages/F,F-ItemsPages/AllItemPacketsPages.js';
import Sports from './pages/Home/Sports/SportsCategoryPage.js';
import PackageDetailPage from './pages/F,F-ItemsPages/AllPackageDetailPage.js';
import MyEventPage from './pages/Qrcode/MyPages/MyEventPage.js';
import MyEventDetailPage from './pages/Qrcode/MyPages/MyEventDetailPage.js';

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
          name='AllItemAllPages'
          component={AllItemAllPages}
          options={{ title: "AllItemAllPages" }}
        />
        <Stack.Screen
          name='ItemPackagePage'
          component={ItemPackagePage}
          options={{ title: "ItemPackagePage" }}
        />
        <Stack.Screen
          name='PackageDetailPage'
          component={PackageDetailPage}
          options={{ title: "PackageDetailPage" }}
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
          name='Cart'
          component={Cart}
          options={{ title: "Cart" }}
        />
        <Stack.Screen
          name='Payment'
          component={Payment}
          options={{ title: "Payment" }}
        />
        <Stack.Screen
          name='Adresses'
          component={Adresses}
          options={{ title: "Adresses" }}
        />
        <Stack.Screen
          name='AddAdressPage'
          component={AddAdressPage}
          options={{ title: "AddAdressPage" }}
        />
        <Stack.Screen
          name='FavoriteProducts'
          component={FavoriteProducts}
          options={{ title: "FavoriteProducts" }}
        />
        <Stack.Screen
          name='Products'
          component={Products}
          options={{ title: "Products"}}
        />
        <Stack.Screen
          name='ProductsItems'
          component={ProductsItems}
          options={{ title: "ProductsItems"}}
        />
        <Stack.Screen
          name='QrCode'
          component={QrCode}
          options={{ title: "QrCode" }}
        />
        <Stack.Screen
          name='QrCodePage'
          component={QrCodePage}
          options={{ title: "QrCodePage" }}
        />
        <Stack.Screen
          name='MyEventPage'
          component={MyEventPage}
          options={{ title: "MyEventPage" }}
        />
        <Stack.Screen
          name='MyEventDetailPage'
          component={MyEventDetailPage}
          options={{ title: "MyEventDetailPage" }}
        />
        <Stack.Screen
          name='Budy'
          component={Budy}
          options={{ title: "Budy" }}
        />
        <Stack.Screen
          name='ChallengePage'
          component={ChallengePage}
          options={{ title: "ChallengePage" }}
        />

        <Stack.Screen
          name='ChallengeDetailPage'
          component={ChallengeDetailPage}
          options={{ title: "ChallengeDetailPage" }}
        />

        <Stack.Screen
          name='PtDtitemPages'
          component={PtDtitemPages}
          options={{ title: "PtDtitemPages" }}
        />

      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;