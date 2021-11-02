import React, { useState,useEffect } from "react";
import { StyleSheet, Text, TouchableOpacity, BackHandler,View, Dimensions ,Image} from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API } from "../../utils/Elements";
export default function AdminHome({ navigation }) {


  
  useEffect(() => {

    BackHandler.addEventListener(
      'hardwareBackPress', () => { return true }
    );
  }, []);

  const btnLogout = async () => {
    try {
      let isSelected = false
      await AsyncStorage.setItem('check', JSON.stringify({ isSelected }));
      navigation.navigate('Login')
      console.log(" check succsses");
    }
    catch (error) {
      console.log(error);
    }

  }



  return (

    <View style={styles.container}>
      <Image style={styles.bgImage} source={{ uri:API+''+'images/home_page/Home07.jpeg' }} />

      <View style={styles.countContainer}>
        <Text style={styles.text}>Hello Admin</Text>
      </View>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('SoldProudct')}
      >
        <Text style={styles.text}>Sold Proudct</Text>
      </TouchableOpacity>
      <TouchableOpacity

        style={styles.button}
        onPress={() => navigation.navigate('Questions')}
      >
        <Text style={styles.text}>Questions</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('ChooseProduct')}>
        <Text style={styles.text}>Product</Text>
      </TouchableOpacity>

      <View style={styles.LogoutView}>
        <TouchableOpacity
          style={styles.Logout}
          onPress={() => btnLogout(true)}
        >
          <Text style={styles.Logouttext}>Logout</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  //  paddingHorizontal: 10
  }, 
  bgImage: {
    flex: 1,
    //resizeMode,
    position: 'absolute',
    width: '100%',
    height: '100%',
    resizeMode: "cover",
    //  justifyContent: 'center',
  },
  button: {
    opacity:0.7,
    alignItems: "center",
    backgroundColor: "#DDDDDD",
    padding: 10,
    margin: windowWidth * 0.17,
    height: windowWidth * 0.2,
    marginTop: windowHeight * 0.015
  },
  countContainer: {
    alignItems: "center",
    padding: 10
  },
  text: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: windowHeight * 0.015,
    fontSize: windowWidth * 0.08,

  },
  LogoutView: {
    marginTop: windowHeight * 0.01,
    alignItems: 'center'
  },
  Logout: {
    //borderRadius: 20,
    backgroundColor: 'red',
    width: windowWidth * 0.6,
    padding: 7,
  },
  Logouttext: {
    color: '#FFFFFF',
    textAlign: 'center',
  }
});
