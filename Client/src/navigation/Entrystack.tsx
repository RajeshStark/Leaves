import React, { useState, useEffect } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Splash from '../screens/Splash';
import Login from '../screens/Login';
import Home from '../screens/Home';
import ApplyLeave from '../screens/ApplyLeave';


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
          <Stack.Screen name="home" component={Home} />
          <Stack.Screen name="applyleave" component={ApplyLeave} />
          <Stack.Screen name="login" component={Login} />
        </>
      }
    </Stack.Navigator>
  );
}

export default EntryStack;