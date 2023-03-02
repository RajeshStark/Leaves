import {View, Text, Image, SafeAreaView, StyleSheet, Alert} from 'react-native';
import React, {useState} from 'react';
import {height, width} from '../utilities/Dimensions';
import CustomInput from '../components/CustomInput';
import CustomButton from '../components/CustomButton';
import {AppThemeColor} from '../utilities/colors';
import { mailformat } from '../utilities/constants';
import axios from 'axios';
import { BASE_URL } from '../services';

export default function Login() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const Login = () => {
    if(!mailformat.test(email)){
      Alert.alert('Please enter correct email')
    } else if(password == "" || password.length < 6){
      Alert.alert('Please enter password atleast 6 digits')
    } else{
      const body = {
        "email": "sangapogurajesh@gmail.com",
        "password": "Beunique@686"
    
    }
      axios.post(BASE_URL + 'api/auth/signin', body)
      .then((res) => {
        if(res.status === 200){
          console.log(res.data);
        } else{
          Alert.alert(res.data)
        }
      })
    }
  }
  return (
    <SafeAreaView style={styles.container}>
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
        />

        <CustomButton title="Login to dashboard" onPress={() => Login()} />
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
