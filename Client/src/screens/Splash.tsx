import {View, Text, Image, SafeAreaView, StyleSheet} from 'react-native';
import React from 'react';
import {height, width} from '../utilities/Dimensions';
import { AppThemeColor } from '../utilities/colors';

export default function Splash() {
  return (
    <SafeAreaView style={styles.container}>
      <Image source={require('../assets/leave.jpg')} style={styles.img} />
      <Text style={styles.txt}>Leaves</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    width: width,
    height: height,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  img: {
    width: width * 0.55,
    height: width * 0.6,
  },
  txt:{
    fontSize: 36,
    color: AppThemeColor,
    fontWeight: '900'
  }
});
