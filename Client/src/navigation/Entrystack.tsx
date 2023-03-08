import React from 'react';
import {NavigationContainer} from '@react-navigation/native';

import {AppStack} from './AppStack';
import {AuthStack} from './AuthStack';
import {useAuth} from '../contexts/Auth';
import Splash from '../screens/Splash';

export const Router = () => {
  const {authData, loading} = useAuth();

  if (loading) {
    return <Splash />;
  }
  return (
    <NavigationContainer>
      {authData ? <AppStack /> : <AuthStack />}
    </NavigationContainer>
  );
};
