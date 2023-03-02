import React, { useState, useEffect } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Splash from '../screens/Splash';
import Login from '../screens/Login';


const Stack = createNativeStackNavigator();

function EntryStack() {
  const [splash, setSplash] = useState(true);

 useEffect(() => {
   const splashtimer = setTimeout(() => {
    setSplash(false)
   }, 1500);
 
   return () => {
     clearTimeout(splashtimer)
   }
 }, [])
 
  
  return (
    <Stack.Navigator screenOptions={{headerShown : false}}>
    
      {
        splash ?   <Stack.Screen name="splash" component={Splash} />
        :
        <>
          <Stack.Screen name="login" component={Login} />
        </>
      }
    </Stack.Navigator>
  );
}

export default EntryStack;