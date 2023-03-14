import React from 'react';
import {
    StatusBar,
    StyleSheet,
    View,
    Modal,
    Text,
    Image
} from 'react-native';
import { greywolf } from '../utilities/colors';
import { height, width } from '../utilities/Dimensions';

type lodetype = {
    loading: boolean
}

function Loader({loading} : lodetype) {


    return (
        <View>
            <StatusBar hidden={false} backgroundColor={"#fff"} barStyle={'dark-content'} />
            <Modal
                transparent={true}
                animationType={'none'}
                visible={loading}
                onRequestClose={() => { console.log('close modal') }}>
                <View style={styles.modalBackground}>
                <Image source={require('../assets/leave.jpg')} style={styles.img} />
                    <Text style={styles.txt}>Loading, Please wait ...</Text>
                </View>
            </Modal>
        </View>
    )
}

const styles = StyleSheet.create({
    modalBackground: {
        height: height,
        width: '100%',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff'
    },
    txt: {
        fontSize: 24,
        color: '#000',
        padding: 10
    },
    img: {
        width: width * 0.55,
        height: width * 0.6,
        marginTop: height * 0.1,
      },
});

export default Loader;
