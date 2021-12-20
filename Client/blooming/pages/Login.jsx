import React, { useState, useEffect, useRef } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  TouchableOpacity,
  Image, CheckBox,
  Alert,
  Dimensions,
  Animated
} from 'react-native';
import * as Notifications from 'expo-notifications';

import {API} from '../utils/Elements'

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});
export default function Login({ props, navigation }) {
  const [expoPushToken, setExpoPushToken] = useState('');
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();
  const [LastLogin, setLastlogin] = useState('')
  const [check, setCheck] = useState(false)
  const [isSelected, setSelection] = useState(false);
  const [Email, setEmail] = useState('')
  const [User_Password, setPassword] = useState('')
  const [User, setUser] = useState('')

  const [ErrorMsg, setErrorMsg] = useState('')


  useEffect(() => {

    console.log(navigation)
    // registerForPushNotificationsAsync().then(token => setExpoPushToken(token));
    getData()
    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      console.log(notification)
      setNotification(notification);
    });

    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      let enterPage = response.notification.request.content.data.navigate
      navigation.navigate(enterPage)
    });

    return () => {
      Notifications.removeNotificationSubscription(notificationListener.current);
      Notifications.removeNotificationSubscription(responseListener.current);
    };

  }, []);






  //stores the data in local storage



  useEffect(() => {
    if (User !== null && check !== null) {
      if (check) {
        let Customer_Code = User.Customer_Code
        if (Customer_Code == 3) {
          navigation.navigate('AdminHome')
        }
        else if (Customer_Code === 1 || Customer_Code === 2) {
          navigation.navigate('Home')
        }
      }
    }
  }, [check, User]);

  async function getData() {
    try {
      let u = await AsyncStorage.getItem('User');
      if (u !== null) {
        setUser(JSON.parse(u));
        console.log("get user date")
      }
      let getCheck = await AsyncStorage.getItem('check');
      console.log(JSON.parse(getCheck).isSelected)
      if (getCheck !== null) {
        setCheck(JSON.parse(getCheck).isSelected);
        console.log("get Check date")
      }
    }
    catch (error) {
      console.log(error)
    }
  }
  const _storeData = async (u) => {
    try {
      await AsyncStorage.setItem('User', JSON.stringify(u));
      console.log("user save succsses");
      await AsyncStorage.setItem('check', JSON.stringify({ isSelected }));
      console.log(" check succsses");
    }
    catch (error) {
      console.log(error);
    }
  }


  const sendLogin = async () => {
    // console.log(login)
    // console.log(JSON.stringify(login))
    await fetch(API+''+'api/Users/login', {
      method: 'Post',
      headers: {
        Accept: 'application/json', 'Content-Type': 'application/json',
      },
      body: JSON.stringify({ "Email": Email, "User_Password": User_Password }),
      //  body: JSON.stringify({ "Email": "ABC", "User_Password": "123" }),
      // body: JSON.stringify({ "Email": "Admin@gmail.com", "User_Password": "Admin123" }),
    })
      .then((response) => response.json())
      .then((res) => {
        if (res !== null) {
          console.log(res)
          let Customer_Code = res.Customer_Code
          if (Customer_Code !== undefined) {
            _storeData(res);
            console.log(Customer_Code)
            if (Customer_Code == 3) { navigation.navigate('AdminHome') }

            else if (Customer_Code === 1 || Customer_Code === 2) {
              navigation.navigate('Home')
            }

          }
          else {
            setErrorMsg('Wrong user name or password')
          }


        }
        else { alert("wrong user name or password") }
      })
      .catch((error) => console.log(error))
      .finally(() => console.log('finished everything'))
  }


  return (
    <View style={styles.container}>

      <Image style={styles.bgImage} source={{ uri: API+''+'images/home_page/Home04.jpeg' }} />


      <Text style={styles.title}>Blooming</Text>


      <View style={styles.inputContainer}>
        <TextInput style={styles.inputs}
          placeholder="Email"
          keyboardType="email-address"
          underlineColorAndroid='transparent'
          onChangeText={(text) => setEmail(text)} />
        <Image style={styles.inputIcon} source={{ uri: 'https://img.icons8.com/nolan/40/000000/email.png' }} />
      </View>

      <View style={styles.inputContainer}>
        <TextInput style={styles.inputs}
          placeholder="Password"
          secureTextEntry={true}
          underlineColorAndroid='transparent'
          onChangeText={(text) => setPassword(text)} />
        <Image style={styles.inputIcon} source={{ uri: 'https://img.icons8.com/nolan/40/000000/key.png' }} />
      </View>

      <TouchableOpacity style={styles.btnForgotPassword} onPress={() => navigation.navigate('ForgotPass')}>
        <Text style={styles.btnText}>Forgot your password?</Text>
      </TouchableOpacity>

      <Text style={styles.errorMsg} >{ErrorMsg}  </Text>
      <TouchableOpacity style={[styles.buttonContainer, styles.loginButton]} onPress={() => sendLogin()}>
        <Text style={styles.loginText}>Login</Text>
      </TouchableOpacity>


      <View style={styles.checkboxContainer}>
        <CheckBox
          value={isSelected}
          onValueChange={setSelection}
          style={styles.checkbox}
        />
        <Text style={styles.label}>Remember me</Text>
      </View>


      <TouchableOpacity style={styles.buttonContainer} onPress={() => navigation.navigate('Register')}>
        <Text style={styles.btnText}>Register</Text>
      </TouchableOpacity>
    </View>

  );

}

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#DCDCDC',
  },
  inputContainer: {
    borderBottomColor: '#F5FCFF',
    backgroundColor: '#FFFFFF',
    borderRadius: 30,
    borderBottomWidth: 1,
    width: 300,
    height: 45,
    marginBottom: 20,
    flexDirection: 'row',
    alignItems: 'center',

    shadowColor: "#808080",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  inputs: {
    height: 45,
    marginLeft: 16,
    borderBottomColor: '#FFFFFF',
    flex: 1,
  },
  inputIcon: {
    width: 30,
    height: 30,
    marginRight: 15,
    justifyContent: 'center'
  },
  buttonContainer: {
    height: 45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    width: 300,
    borderRadius: 30,
    backgroundColor: 'transparent'
  },
  btnForgotPassword: {
    height: 15,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    marginBottom: 10,
    width: 300,
    backgroundColor: 'transparent'
  },
  loginButton: {
    backgroundColor: "#FF0077",

    shadowColor: "#808080",
    shadowOffset: {
      width: 0,
      height: 9,
    },
    shadowOpacity: 0.50,
    shadowRadius: 12.35,

    elevation: 19,
  },
  loginText: {
    color: 'white',
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
  btnText: {
    textShadowColor: '#000000',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
    color: "white",
    fontWeight: 'bold'
  },
  checkboxContainer: {
    flexDirection: "row",
    marginBottom: 20,
  },
  checkbox: {
    alignSelf: "center",
    borderColor: 'red',   // does nothing
    borderStyle: 'dotted',
    // tintColors={ true: '#F15927', false: 'black' }
  },
  label: {
    textShadowColor: '#000000',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
    color: "white",
    fontWeight: 'bold',
    margin: 8,
  }, title: {
    textShadowColor: '#000000',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
    color: "white",
    fontWeight: 'bold',
    fontSize: 35,
    marginBottom: 20
  }, errorMsg: {
    textShadowColor: '#000000',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
    color: "white",
    marginRight: Dimensions.get('window').width * 0.18,
    marginLeft: Dimensions.get('window').width * 0.18,
    padding: 5,
    fontSize: 11,
    color: 'red',
    textAlign: 'center'
  },
});



