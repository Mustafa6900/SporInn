import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { AuthProvider } from './pages/Auth/AuthContext';
import AuthStack from './pages/Auth/AuthStack';
import { DataProvider } from './components/DataContext';

const App = () => {
  
  return (
      
    <NavigationContainer>
    
    <AuthProvider>
    <DataProvider>
      <AuthStack />
      </DataProvider>
    </AuthProvider>

    </NavigationContainer>
  );
};

export default App;