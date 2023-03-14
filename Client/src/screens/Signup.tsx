import {View, Text, Image, SafeAreaView, StyleSheet, Alert, Pressable, ScrollView} from 'react-native';
import React, {useState} from 'react';
import {height, width} from '../utilities/Dimensions';
import CustomInput from '../components/CustomInput';
import CustomButton from '../components/CustomButton';
import {AppThemeColor} from '../utilities/colors';
import { mailformat, passwordregex } from '../utilities/constants';
import axios from 'axios';
import { BASE_URL } from '../services/services';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useAuth} from '../contexts/Auth';
import Loader from '../components/Loader';

export default function Signup({navigation}) {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);


  const onSubmit = () => {
    if(username.length < 4 ){
      Alert.alert("",'Please enter username atleast 4 letters')
    } else if(!mailformat.test(email.trim())){
      Alert.alert("",'Please enter correct email')
    } else if(!passwordregex.test(password)){
      Alert.alert("",'Please enter atleast one special charecter, atleast one uppercase letter, lower case letter and number')
    } else{
      setLoading(true)
      const body = {
        "username": username,
        "email": email.trim().toLowerCase(),
        "password": password
    }
      axios.post(BASE_URL + 'api/auth/signup', body)
      .then((res) => {
        if(res.status === 200){
          Alert.alert("", res.data.message)
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
    <ScrollView>
      <Loader loading={loading}/>
    <SafeAreaView style={styles.container}>
      <Pressable onPress={() => navigation.goBack()} style={{ backgroundColor: AppThemeColor, borderRadius: 5, padding: 5, alignSelf: 'flex-start', margin: 20}}>
      <Image source={require('../assets/left-arrow.png')} style={{width: 30, height: 30}} />
      </Pressable>
      <Image source={require('../assets/leave.jpg')} style={styles.img} />
      <View style={styles.btn}>

      <CustomInput
          label={'Create your username'}
          value={username}
          onChangeText={txt => setUsername(txt)}
        />

        <CustomInput
          label={'Enter your email'}
          value={email}
          onChangeText={txt => setEmail(txt)}
        />
        <CustomInput
          label={'Create your password'}
          value={password}
          onChangeText={txt => setPassword(txt)}
          // secureTextEntry={true}
          // right={<Image source={require('../assets/plus.png')} style={{width: 30, height: 30, backgroundColor: 'black'}}/>}
        />

        <CustomButton title="Create Account" onPress={() => onSubmit()} />
        <Text style={{color: AppThemeColor, fontSize: 18}} onPress={() => navigation.goBack()}>Already have an account? Login</Text>
      </View>
    </SafeAreaView>
    </ScrollView>
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
  },
  btn: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
