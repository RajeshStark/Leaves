import {
  View,
  Text,
  SafeAreaView,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Pressable,
  Platform,
  Alert,
  Button,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {Calendar, CalendarList, Agenda} from 'react-native-calendars';
import {AppThemeColor, grey, greywolf} from '../utilities/colors';
import LinearGradient from 'react-native-linear-gradient';
import {height, width} from '../utilities/Dimensions';
import CustomButton from '../components/CustomButton';
import CustomInput from '../components/CustomInput';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import moment from 'moment';
import axios from 'axios';
import {BASE_URL} from '../services/services';
import AsyncStorage from '@react-native-async-storage/async-storage';

type myprop = {
  selected: boolean;
  date: string | Date;
  time: string | Date;
};
export default function ApplyLeave({navigation}) {
  const [isSick, setIssick] = useState(false);
  const [cause, setCause] = useState('');
  const [mode, setMode] = useState('date');
  const [userData, setUserData] = useState({});

  useEffect(() => {
    getMyData();
  }, []);

  const getMyData = async () => {
    try {
      const value = await AsyncStorage.getItem('@AuthData');
      if (value !== null) {
        const v = JSON.parse(value);
        console.log({v});
        setUserData(v);
      }
    } catch (e) {
      // error reading value
      console.log(e, 'error in getitem in home');
    }
  };

  const [fromDate, setFromDate] = useState<myprop>({
    selected: false,
    date: '',
    time: '',
  });
  const [toDate, setToDate] = useState<myprop>({
    selected: false,
    date: '',
    time: '',
  });

  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const showDatePicker = (index: number) => {
    setDatePickerVisibility(true);
    index === 2
      ? setFromDate({...fromDate, selected: true})
      : setToDate({...toDate, selected: true});
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (mydate: Date) => {
    console.log(mydate);

    if (mode === 'date') {
      const d = moment(mydate).format('YYYY-MM-DD');
      fromDate.selected
        ? setFromDate({...fromDate, selected: false, date: d})
        : setToDate({...toDate, selected: false, date: d});
    }
    hideDatePicker();
  };

  const Arr = [
    {
      id: 1,
      img: require('../assets/boxes.png'),
      label: 'Type',
      txt: 'Casual',
    },
    {
      id: 2,
      img: require('../assets/pencil.png'),
      label: 'Cause',
      txt: 'Trip to Cannes',
    },
    {
      id: 3,
      img: require('../assets/right-arrow.png'),
      label: 'From',
      txt: '',
    },
    {
      id: 4,
      img: require('../assets/left-arrow.png'),
      label: 'To',
      txt: '',
    },
  ];

  const ActionManager = (index: number) => {
    // Alert.alert(index)
    index === 0 ? setIssick(!isSick) : showDatePicker(index);
  };

  const diff = () => {
    const dif = moment(toDate.date).diff(moment(fromDate.date), 'days');

    return `Apply for ${dif + 1} ${dif === 0 ? 'day' : 'days' } leave`;
  };

  // const markedDates = () => {
  //   const f = fromDate.date;
  //   const t = toDate.date

  //    const e = {f: {
  //       startingDay: true,
  //       color: AppThemeColor,
  //       textColor: 'white',
  //     },
  //     t: {
  //       endingDay: true,
  //       color: AppThemeColor,
  //       textColor: 'white',
  //     }}
  //   return e
  // }
  const Apply = () => {
    if (cause == '') {
      Alert.alert('Please enter reason to apply leave');
    } else if (fromDate.date == '' || toDate.date == '') {
      Alert.alert('Please enter date');
    } else {
      const body = {
        from_date: fromDate.date,
        to_date: toDate.date,
        type: isSick ? 'Sick' : 'Casual',
        status: 'Awaiting',
        noofDays: diff(),
        cause: cause,
        username: userData.username,
        email: userData.email,
      };
      axios
        .post(BASE_URL + 'app/leaves/applyleave', body)
        .then(res => {
          console.log('158 ===> ', res);
          if(res.status === 200){
            Alert.alert(res.data.message);
            navigation.goBack()
          } 
          // else{

          // }
          // Alert.alert(res.data.message)
        })
        .catch(err => {
          let message =
            typeof err.response !== 'undefined'
              ? err.response.data.message
              : err.message;
          // console.warn("error", message);
          console.log('error in getting leaves', message);
          Alert.alert(message);
          // if(err.includes('404')){
          //   Alert.alert("No Leaves found")
          // }
        });
    }
  };
  return (
    <SafeAreaView
      style={{backgroundColor: '#fff', width: width, height: height}}>
      <ScrollView>
        <Pressable
          onPress={() => navigation.goBack()}
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: 20,
          }}>
          <Image
            source={require('../assets/leftchevron.png')}
            style={styles.imgstyle}
          />
          <Text style={styles.headertxt}> New Leave </Text>
        </Pressable>

        {Arr.map((i, index) => (
          <Pressable
            onPress={() => ActionManager(index)}
            key={i.id}
            style={{
              marginHorizontal: 10,
              marginVertical: 5,
              borderColor: grey,
              borderWidth: 0.3,
              flexDirection: 'row',
              alignItems: 'center',
              backgroundColor: '#fff',
              borderRadius: 5,
              overflow: 'hidden',
            }}>
            <LinearGradient
              colors={[AppThemeColor, '#7367CB', '#7D55B0']}
              style={styles.linearGradient}>
              <Image source={i.img} style={{width: 35, height: 35}} />
            </LinearGradient>

            <View style={{flexDirection: 'column', margin: 5}}>
              <Text style={{color: 'grey', fontSize: 14, fontWeight: '600'}}>
                {i.label}
              </Text>

              {index === 0 ? (
                <Text
                  style={{color: '#504A4B', fontSize: 18, fontWeight: '900'}}>
                  {isSick ? 'Sick' : 'Casual'}
                </Text>
              ) : index === 1 ? (
                <CustomInput
                  label={'Enter reason to apply leave'}
                  value={cause}
                  onChangeText={txt => setCause(txt)}
                  mywidth={0.7}
                />
              ) : index === 2 ? (
                <Text
                  style={{color: '#504A4B', fontSize: 18, fontWeight: '900'}}>
                  {fromDate.date !== ''
                    ? `${moment(fromDate.date).format('ll')} , ${moment(
                        fromDate.date,
                      ).format('dddd')}`
                    : 'Please Enter From Date'}
                </Text>
              ) : (
                <Text
                  style={{color: '#504A4B', fontSize: 18, fontWeight: '900'}}>
                  {toDate.date !== ''
                    ? `${moment(toDate.date).format('ll')} , ${moment(
                        toDate.date,
                      ).format('dddd')}`
                    : 'Please Enter To Date'}
                </Text>
              )}
            </View>
          </Pressable>
        ))}

        {/* <Calendar
          markingType={'period'}
          markedDates={markedDates()}
        /> */}

        <CustomButton
          title={diff()}
          onPress={() => Apply()}
          fullScreen={true}
        />
      </ScrollView>
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode={mode}
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  linearGradient: {
    margin: 5,
    width: 50,
    height: 50,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,
  },
  imgstyle: {
    width: 30,
    height: 30,
    padding: 10,
    margin: 10,
    backgroundColor: grey,
    borderRadius: 3,
    overflow: 'hidden',
  },
  headertxt: {
    fontSize: 30,
    fontWeight: 'bold',
    color: greywolf,
    margin: 10,
  },
});
