import React from 'react';
import {Router} from './src/navigation/Entrystack';
import {AuthProvider} from './src/contexts/Auth';
import { StatusBar } from 'react-native';

const App = () => {
  return (
    <AuthProvider>
      <StatusBar backgroundColor={'#fff'} barStyle="dark-content"/>
      <Router />
    </AuthProvider>
  );
};

export default App;
