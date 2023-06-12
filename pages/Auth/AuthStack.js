import React, { useContext } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AuthContext } from './AuthContext';

import Login from './Login';
import ExampleLogin from './ExampleLogin';
import ExampleSignUp from './ExampleSignUp';
import SignUp from './SignUp';
import phoneCode from './phoneCode';
import Logout from './Logout';

import Tabbar from '../tabbar.js';
import Home from '../Home/Home';
import Profile from '../Profile/profile';
import Orders from '../Profile/Order/Orders';
import Cart from '../Profile/Carts/Cart';
import PaymentProducts from '../Payments/PaymentProducts.js';
import PaymentFtPtDt from '../Payments/PaymentFtPtDt.js';
import PaymentSports from '../Payments/PaymentSports.js';
import PaymentMethods from '../Profile/PaymentMethod/PaymentMethods.js'
import AddCreditCardPage from '../Profile/PaymentMethod/AddCreditCardPage.js';
import AddCardsNextPage from '../Profile/PaymentMethod/AddCardsNextPage.js';
import Adresses from '../Profile/Adress/AdressesPage.js';
import AddAdressPage from '../Profile/Adress/AddAdressPage.js';
import FavoriteProducts from '../Profile/FavoriteProduct/FavoriteProducts.js';
import ContactPreferences from '../Profile/ContactPreference/ContactPreferences.js';
import AccountSettings from '../Profile/AccountSetting/AccountSettings.js';
import Help from '../Profile/Helps/Help.js';
import Languages from '../Profile/Language/Languages.js';
import Products from '../Products/ProductsCategoryPage.js';
import ProductDetailPage from '../Products/ProductDetailPage.js';
import ProductsItems from '../Products/ProductsItemsPage.js';
import QrCode from '../Qrcode/QrcodeHome.js';
import QrCodePage from '../Qrcode/QrCodePage.js'
import Budy from '../Budy/budy.js';
import PtDtitemPages from '../Budy/PtDtChPages/PtDtitemPages.js';
import ChallengeDetailPage from '../Budy/ChallengePage/ChallengeDetailPage.js';
import ChallengePage from '../Budy/ChallengePage/ChallengeePage.js';
import AllItemAllPages from '../F,F-ItemsPages/AllItemAllPages.js';
import ItemPackagePage from '../F,F-ItemsPages/AllItemPacketsPages.js';
import Sports from '../Home/Sports/SportsCategoryPage.js';
import PackageDetailPage from '../Home/Fitness/FitnessPackageDetailPage.js';
import MyEventPage from '../Qrcode/MyPages/MyEventPage.js';
import MyEventDetailPage from '../Qrcode/MyPages/MyEventDetailPage.js';

const Stack = createNativeStackNavigator();

const AuthStack = () => {
  const { session } = useContext(AuthContext);

  return (
    <Stack.Navigator screenOptions={{headerShown: false,navigationBarHidden: true,}}>
       {session === null ? (
          <Stack.Screen
            name="Logout"
            component={Logout}
            options={{ title: "Logout" }}
          />
        ) : (
          <Stack.Screen
            name="Tabbar"
            component={Tabbar}
            options={{ title: "Tabbar" }}
          />
        )}
          <Stack.Screen
          name='Login'
          component={Login}
          options={{ title: "Login" }}
        />
        <Stack.Screen
          name='ExampleLogin'
          component={ExampleLogin}
          options={{ title: "ExampleLogin" }}
        />
        <Stack.Screen
          name='ExampleSignUp'
          component={ExampleSignUp}
          options={{ title: "ExampleSignUp" }}
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
          name='Orders'
          component={Orders}
          options={{ title: "Orders" }}
        />
        <Stack.Screen
          name='Cart'
          component={Cart}
          options={{ title: "Cart" }}
        />
        <Stack.Screen
          name='PaymentProducts'
          component={PaymentProducts}
          options={{ title: "PaymentProducts" }}
        />
        <Stack.Screen
          name='PaymentFtPtDt'
          component={PaymentFtPtDt}
          options={{ title: "PaymentFtPtDt" }}
        />
        <Stack.Screen
          name='PaymentSports'
          component={PaymentSports}
          options={{ title: "PaymentSports" }}
        />
        <Stack.Screen
          name='PaymentMethods'
          component={PaymentMethods}
          options={{ title: "PaymentMethods" }}
        />
        <Stack.Screen
          name='AddCreditCardPage'
          component={AddCreditCardPage}
          options={{ title: "AddCreditCardPage" }}
        />
        <Stack.Screen
          name='AddCardsNextPage'
          component={AddCardsNextPage}
          options={{ title: "AddCardsNextPage" }}
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
          name='ContactPreferences'
          component={ContactPreferences}
          options={{ title: "ContactPreferences" }}
        />
        <Stack.Screen
          name='AccountSettings'
          component={AccountSettings}
          options={{ title: "AccountSettings" }}
        />
        <Stack.Screen
          name='Help'
          component={Help}
          options={{ title: "Help" }}
        />
        <Stack.Screen
          name='Languages'
          component={Languages}
          options={{ title: "Languages" }}
        />
        <Stack.Screen
          name='Products'
          component={Products}
          options={{ title: "Products"}}
        />
        <Stack.Screen
          name='ProductDetailPage'
          component={ProductDetailPage}
          options={{ title: "ProductDetailPage"}}
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
  );
};

export default AuthStack;
