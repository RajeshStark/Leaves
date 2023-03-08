// import React, {useState, useEffect} from 'react';
// import {createNativeStackNavigator} from '@react-navigation/native-stack';
// import Splash from '../screens/Splash';
// import Login from '../screens/Login';
// import Home from '../screens/Home';
// import ApplyLeave from '../screens/ApplyLeave';
// import AsyncStorage from '@react-native-async-storage/async-storage';

// const Stack = createNativeStackNavigator();

// function EntryStack() {
//   const [splash, setSplash] = useState(true);
//   const [isLoggedin, setIsLoggedin] = useState(false);

//    useEffect(() => {
//      const splashtimer = setTimeout(() => {
//       setSplash(false)
//      }, 1500);

//      return () => {
//        clearTimeout(splashtimer)
//      }
//    }, [])

//   useEffect(() => {
//     getData();
//   }, []);

//   const getData = async () => {
//     try {
//       const value = await AsyncStorage.getItem('usertoken');
//       if (value !== null) {
//         // value previously stored
//         setIsLoggedin(true);
//       }
//       // setSplash(false);
//     } catch (e) {
//       // error reading value
//     }
//   };

//   return (
//     <Stack.Navigator screenOptions={{headerShown: false}}>
//       {splash ? (
//         <Stack.Screen name="splash" component={Splash} />
//       ) : (
//         <>
//           {isLoggedin ? (
//             <>
//               <Stack.Screen name="home" component={Home} />
//               <Stack.Screen name="applyleave" component={ApplyLeave} />
//               <Stack.Screen name="login" component={Login} />
//             </>
//           ) : (
//             <>
//             <Stack.Screen name="home" component={Home} />
//             <Stack.Screen name="login" component={Login} />
//             <Stack.Screen name="applyleave" component={ApplyLeave} />
//             </>
//           )}
//         </>
//       )}
//     </Stack.Navigator>
//   );
// }

// export default EntryStack;

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
