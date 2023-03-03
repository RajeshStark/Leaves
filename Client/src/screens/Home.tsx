import {View, Text, Image, StyleSheet, TouchableOpacity, FlatList} from 'react-native';
import React, {useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {height, width} from '../utilities/Dimensions';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {AppThemeColor, green, grey, greywolf, red, yellow} from '../utilities/colors';

export default function Home({navigation}) {
  const [active, setactive] = useState(0);

  const Arr = [
    {
      month: "December",
      year: 2022,
      Date: "wed, 16 Dec",
      type: "Casual",
      status: "Awaiting",
      noofDays: "Half Day Application"
    },
    {
      month: "January",
      year: 2023,
      Date: "tue, 1 Jan",
      type: "Sick",
      status: "Approved",
      noofDays: "Half Day Application"
    },
    {
      month: "January",
      year: 2023,
      Date: "thu, 16 Jan",
      type: "Sick",
      status: "Decline",
      noofDays: "Full Day Application"
    },
    {
      month: "February",
      year: 2023,
      Date: "sat, 24 Jan",
      type: "Casual",
      status: "Approved",
      noofDays: "Half Day Application"
    },
  ]
const typeArr = ['All', 'Sick', 'Casual'];

  const getData = () =>{
    if(active === 0) return Arr
    const data = Arr.filter((i) =>
          i.type === typeArr[active]
    )
    return data
  }
  
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.subcontainer}>
        <Image source={require('../assets/bell.png')} style={styles.img} />
        <TouchableOpacity onPress={() => navigation.navigate('applyleave')} style={styles.iconContainer}>
          <Image
            source={require('../assets/plus.png')}
            style={styles.imgplus}
          />
        </TouchableOpacity>
      </View>

      <Text style={styles.headertxt}> Leaves </Text>

      <View style={styles.touchcontainer}>
        {typeArr.map((i, index) => (
          <TouchableOpacity style={ active === index ? styles.activeTouchable : styles.inactiveTouchable} onPress={() => setactive(index)}>
            <Text style={active === index ? styles.txtactive : styles.txt}>{i}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <FlatList 
          data={getData()}
          renderItem={({item}) => 
           <TouchableOpacity style={{
            width: width * 0.9,
            borderRadius: 10,
            overflow: 'hidden',
            borderColor: 'grey',
            borderWidth: 0.5,
            padding: 10,
            alignSelf: 'center',
            margin: 10,
            flexDirection: 'row',
            justifyContent: 'space-between'
           }}>
            <View >
            <Text style={{fontSize: 14, fontWeight: '500', color: greywolf, margin: 3}}>{item.noofDays}</Text>
            <Text style={{fontSize: 22, fontWeight: '700',margin: 3}}>{item.Date}</Text>
            <Text style={{margin: 3,color: item.type === 'Casual' ? yellow: AppThemeColor, fontSize: 14, fontWeight: '700'}}>{item.type}</Text>
            </View>

            <View>
              <Text style={{fontSize: 14, padding: 5, margin: 5, overflow: 'hidden',borderRadius: 5, alignSelf: 'center',
                 backgroundColor: item.status === 'Approved' ? green : item.status === 'Awaiting'? yellow: red, color: '#fff'}}>{item.status}</Text>
            </View>
           </TouchableOpacity>        
          }
        />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {backgroundColor: '#fff' ,height: height, width: width},
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
  txtactive: {fontSize: 20, fontWeight: '600',color: AppThemeColor},
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
    alignSelf: 'center'
  }
});
