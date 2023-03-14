import * as React from 'react';
import { TextInput } from 'react-native-paper';
import { StyleSheet } from 'react-native';
import { width } from '../utilities/Dimensions';
import { Image } from 'react-native';

type props = {
    label: string;
    value: string;
    onChangeText : (txt: string) => void;
    right? : JSX.Element;
    left? : JSX.Element;
    mywidth? : number;
    secureTextEntry? : boolean;
}

const CustomInput = ({label, value, onChangeText, right, left, mywidth, secureTextEntry} : props) => {

  return (
    <TextInput
      placeholder={label}
      value={value}
      onChangeText={onChangeText}
      style={[styles.txtinput, 
        {width : typeof(mywidth) !== 'undefined' ? width * mywidth : width * 0.9,}
      ]}
      secureTextEntry={secureTextEntry}
      mode={'flat'}
      textColor={'grey'}
      cursorColor={'grey'}
      right={right}
      left={left}
      underlineColor="#FAF9F6"
      underlineStyle={{shadowColor: '#FAF9F6', backgroundColor: '#FAF9F6'}}
    />
  );
};

export default CustomInput;

const styles = StyleSheet.create({
    txtinput: {
        color: '#FAF9F6',
        margin: 10, 
    },
})