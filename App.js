import React,{useState,useEffect} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { supabase } from './supabaseClient';
import { AuthProvider } from './pages/Auth/AuthContext';
import AuthStack from './pages/Auth/AuthStack';

const App = () => {
  
  return (
      
    <NavigationContainer>
    
    <AuthProvider>
      <AuthStack />
    </AuthProvider>

    </NavigationContainer>
  );
};

export default App;