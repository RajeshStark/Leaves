import {View, Text, Button, StyleSheet, Pressable, Alert} from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {width} from '../utilities/Dimensions';
import { AppThemeColor } from '../utilities/colors';

type props = {
  title: string;
  onPress: () => void;
};

export default function CustomButton({title, onPress}: props) {
  return (
    <Pressable onPress={onPress}>
      <LinearGradient
      colors={[AppThemeColor, '#7367CB', '#7D55B0']}
      style={styles.linearGradient}
      >
      <Text style={styles.buttonText}>{title}</Text>
    </LinearGradient>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  linearGradient: {
    padding: 15,
    margin: 20,
    width: width * 0.5,
    borderRadius: 20,

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
    margin: 10,
    color: '#ffffff',
    backgroundColor: 'transparent',
  },
});
