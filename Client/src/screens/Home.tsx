import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Pressable,
  Alert,
  ListRenderItem,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {height, width} from '../utilities/Dimensions';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {
  AppThemeColor,
  green,
  grey,
  greywolf,
  red,
  yellow,
} from '../utilities/colors';
import {useAuth} from '../contexts/Auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {BASE_URL} from '../services/services';
import {useFocusEffect} from '@react-navigation/native';
import CustomButton from '../components/CustomButton';
import {Button} from 'react-native-paper';

type usertype = {
  username: string;
  email: string;
  roles: string;
  token: string;
};

type leavetype = {
  from_date: string | Date;
  to_date: string | Date;
  type: string;
  status: string;
  noofDays: string;
  cause: string;
  username: string;
  email: string;
};

export default function Home({navigation}) {
  const [active, setactive] = useState(0);
  const [userData, setUserData] = useState<usertype | any>({});
  const [leavesdata, setLeavesdata] = useState([]);
  const [greetings, setGreetings] = useState('');

  const auth = useAuth();
  const signOut = () => {
    auth.signOut();
  };

  useFocusEffect(
    React.useCallback(() => {
      getMyData();
      getGreetings();
    }, []),
  );

  const getGreetings = () => {
    var today = new Date();
    var curHr = today.getHours();
    if (curHr < 12) {
      setGreetings('good morning');
    } else if (curHr < 18) {
      setGreetings('good afternoon');
    } else {
      setGreetings('good evening');
    }
  };
  const getMyData = async () => {
    try {
      const value = await AsyncStorage.getItem('@AuthData');
      if (value !== null) {
        const v = JSON.parse(value);
        console.log({v});
        setUserData(v);
        getLeaves(v);
      }
    } catch (e) {
      // error reading value
      console.log(e, 'error in getitem in home');
    }
  };

  const ApproveOrReject = (status: string, id:number) => {
    const body = {
      status : status
    }
    axios.post(`${BASE_URL}app/leaves/approveorreject?id=${id}`, body)
      .then((res) => {
        if(res.status === 200){
          console.log(res.data); 
          Alert.alert(res.data.message);
          getMyData()  
        } else{
          console.log("102",res.data);
          Alert.alert("", "Something went wrong")
        }
      }).catch((err) =>{
        let message =
          typeof err.response !== 'undefined'
            ? err.response.data.message
            : err.message;
        Alert.alert(message)
      })
  }

  const getLeaves = (v: usertype) => {
    axios
      .get(`${BASE_URL}api/leaves/getmyleaves?email=${v.email}&role=${v.roles}`)
      .then(res => {
        if (res.status === 200) {
          setLeavesdata(res.data);
        }
      })
      .catch(err => {
        let message =
          typeof err.response !== 'undefined'
            ? err.response.data.message
            : err.message;
        Alert.alert(message);
      });
  };

  const typeArr = ['All', 'Sick', 'Casual'];

  const getData = () => {
    if (leavesdata.length !== 0) {
      if (active === 0) return leavesdata;
      const data = leavesdata.filter(
        (i: leavetype) => i.type === typeArr[active],
      );
      return data;
    }
  };
  const adminRender = (item: any) => {
    return (
      <>
        <TouchableOpacity style={styles.flatlisttouchable}>
          <Text style={{fontSize: 16, margin: 5, color: greywolf}}>
            {item.username} ({item.email}) has been {item.noofDays} .
          </Text>
          <Text
            style={{
              fontSize: 18,
              margin: 5,
              color: greywolf,
              borderRadius: 5,
              borderColor: greywolf,
              borderWidth: 0.5,
              padding: 10,
            }}>
            Reason: {item.cause}
          </Text>

          <View style={styles.viewcontainer}>
            <View>
              <Text style={{fontSize: 20, fontWeight: '700', margin: 3}}>
                {item.from_date == item.to_date
                  ? item.from_date
                  : `${item.from_date} - ${item.to_date}`}
              </Text>
              <Text
                style={{
                  marginVertical: 10,
                  color: greywolf,
                  fontSize: 14,
                  fontWeight: '700',
                }}>
                Applied For :{' '}
                <Text
                  style={{
                    color: item.type === 'Casual' ? yellow : AppThemeColor,
                  }}>
                  {item.type} Leave
                </Text>
              </Text>
            </View>
          </View>
          {/* <Text>{JSON.stringify(item)}</Text> */}

          {
            item.status === "Awaiting" ?
            <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Button
             onPress={() => ApproveOrReject('Approved', item._id)}
              mode="contained"
              buttonColor={green}
              style={{width: width * 0.4}}>
              <Text style={{color: '#fff'}}>Approve</Text>
            </Button>
            <Button
             onPress={() => ApproveOrReject('Rejected', item._id)}
              mode="contained-tonal"
              buttonColor={red}
              style={{width: width * 0.4}}>
              <Text style={{color: '#fff'}}>Reject</Text>
            </Button>
          </View>
          :
          <Text style={{fontSize: 18, fontWeight: '800', alignSelf:'center',color: item.status === 'Approved' ? green : item.status === 'Rejected' ? red : yellow }}> You Have {item.status} Leave</Text>
          }
        </TouchableOpacity>
      </>
    );
  };

  const userRender = (item: any) => {
    return (
      <>
        <TouchableOpacity style={styles.flatlisttouchable}>
          <View style={styles.viewcontainer}>
            <View>
              <Text
                style={{
                  fontSize: 14,
                  fontWeight: '500',
                  color: greywolf,
                  margin: 3,
                }}>
                {item.noofDays}
              </Text>
              <Text style={{fontSize: 20, fontWeight: '700', margin: 3}}>
                {item.from_date == item.to_date
                  ? item.from_date
                  : `${item.from_date} - ${item.to_date}`}
              </Text>
              <Text
                style={{
                  margin: 3,
                  color: item.type === 'Casual' ? yellow : AppThemeColor,
                  fontSize: 14,
                  fontWeight: '700',
                }}>
                {item.type}
              </Text>
            </View>

            <View>
              <Text
                style={{
                  fontSize: 14,
                  padding: 5,
                  margin: 5,
                  overflow: 'hidden',
                  borderRadius: 5,
                  alignSelf: 'center',
                  backgroundColor:
                    item.status === 'Approved'
                      ? green
                      : item.status === 'Awaiting'
                      ? yellow
                      : red,
                  color: '#fff',
                }}>
                {item.status}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      </>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.subcontainer}>
        <Pressable onPress={signOut}>
          <Image source={require('../assets/logout.png')} style={styles.img} />
        </Pressable>
        {/* <Image source={require('../assets/bell.png')} style={styles.img} /> */}
        <TouchableOpacity
          onPress={() => navigation.navigate('applyleave')}
          style={styles.iconContainer}>
          <Image
            source={require('../assets/plus.png')}
            style={styles.imgplus}
          />
        </TouchableOpacity>
      </View>
      <Text style={styles.headertxt}> Leaves </Text>
      {/* <Text>{JSON.stringify(userData.roles)}</Text> */}
      <Text
        style={styles.txt1}>{`Hi! ${userData.username}, ${greetings}`}</Text>

      <View style={styles.touchcontainer}>
        {typeArr.map((i, index) => (
          <TouchableOpacity
            key={index}
            style={
              active === index
                ? styles.activeTouchable
                : styles.inactiveTouchable
            }
            onPress={() => setactive(index)}>
            <Text style={active === index ? styles.txtactive : styles.txt}>
              {i}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <FlatList
        data={getData()}
        renderItem={({item}: ListRenderItem<string>) =>
          userData.roles === 'admin' ? adminRender(item) : userRender(item)
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {backgroundColor: '#fff', height: height, width: width},
  subcontainer: {justifyContent: 'flex-end', flexDirection: 'row', margin: 10},
  img: {width: 30, height: 30, margin: 5},
  imgplus: {width: 20, height: 20},
  iconContainer: {
    height: 30,
    width: 30,
    margin: 5,
    backgroundColor: AppThemeColor,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  headertxt: {
    fontSize: 36,
    fontWeight: 'bold',
    color: greywolf,
    margin: 10,
  },
  txt: {fontSize: 18, color: greywolf},
  txt1: {fontSize: 22, color: greywolf, marginLeft: 20},
  txtactive: {fontSize: 20, fontWeight: '600', color: AppThemeColor},
  activeTouchable: {
    height: 50,
    width: width * 0.3,
    backgroundColor: '#fff',
    borderRadius: 15,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: grey,
    borderWidth: 0.6,

    shadowColor: AppThemeColor,
    shadowOffset: {
      width: 3,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,
  },
  inactiveTouchable: {
    height: 50,
    width: width * 0.3,
    backgroundColor: grey,
    borderRadius: 15,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
  },
  touchcontainer: {
    margin: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: grey,
    borderRadius: 15,
    overflow: 'hidden',
    width: width * 0.9,
    alignSelf: 'center',
  },
  flatlisttouchable: {
    width: width * 0.9,
    borderRadius: 10,
    overflow: 'hidden',
    borderColor: 'grey',
    borderWidth: 0.5,
    padding: 10,
    alignSelf: 'center',
    margin: 10,
  },
  viewcontainer: {flexDirection: 'row', justifyContent: 'space-between'},
});
