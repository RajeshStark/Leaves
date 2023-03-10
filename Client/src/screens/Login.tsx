import {View, Text, Image, SafeAreaView, StyleSheet, Alert} from 'react-native';
import React, {useState} from 'react';
import {height, width} from '../utilities/Dimensions';
import CustomInput from '../components/CustomInput';
import CustomButton from '../components/CustomButton';
import {AppThemeColor} from '../utilities/colors';
import { mailformat } from '../utilities/constants';
import axios from 'axios';
import { BASE_URL } from '../services/services';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useAuth} from '../contexts/Auth';
import Loader from '../components/Loader';

export default function Login({navigation}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const auth = useAuth();
  const [loading, setLoading] = useState(false);

  const Login = () => {
    if(!mailformat.test(email.trim())){
      Alert.alert("",'Please enter correct email')
    } else if(password == "" || password.length < 6){
      Alert.alert("",'Please enter password atleast 6 digits')
    } else{
      setLoading(true)
      const body = {
        "email": email.trim().toLowerCase(),
        "password": password
    
    }
      axios.post(BASE_URL + 'api/auth/signin', body)
      .then((res) => {
        if(res.status === 200){
          auth.signIn(res.data)
          setLoading(false)
        } else{
          console.log("32",res.data);
          Alert.alert("", "Something went wrong")
          setLoading(false)
        }
      }).catch((err) =>{
        setLoading(false)
        let message =
          typeof err.response !== 'undefined'
            ? err.response.data.message
            : err.message;
        Alert.alert(message)
      })
    }
  }
  
  return (
    <SafeAreaView style={styles.container}>
          <Loader loading={loading}/>
      <Image source={require('../assets/leave.jpg')} style={styles.img} />

      <View style={styles.btn}>
        <CustomInput
          label={'Enter your email'}
          value={email}
          onChangeText={txt => setEmail(txt)}
        />
        <CustomInput
          label={'Enter your password'}
          value={password}
          onChangeText={txt => setPassword(txt)}
          // secureTextEntry={true}
        />

        <CustomButton title="Login to dashboard" onPress={() => Login()} />
        <Text style={{color: AppThemeColor, fontSize: 18}} onPress={() => navigation.navigate('signup')}>To create an account signup</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    width: width,
    height: height,
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  img: {
    width: width * 0.55,
    height: width * 0.6,
    marginTop: height * 0.1,
  },
  btn: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
