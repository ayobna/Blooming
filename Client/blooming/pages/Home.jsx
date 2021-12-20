import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Constants from 'expo-constants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Cart from '../Components/Market/Cart';
import Profile from '../Components/User/Profile';
import HomeStack from './HomeStack';
import ProfileStack from './ProfileStack';
import { useDispatch, useSelector } from 'react-redux';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Image,
    Alert,
    ScrollView,
    TextInput,
    FlatList,

} from 'react-native';
import * as Notifications from 'expo-notifications';
import { API } from '../utils/Elements';
const Tab = createBottomTabNavigator();




export default function Home({ navigation, route }) {
    const [LastLogin, setLastlogin] = useState('')

    const [user, setUser] = useState([]);


    useEffect(() => {
       
     getData()
        //lastLogin
        // _storeData()
        // registerForPushNotificationsAsync().then(token => UpdateUser(token));
        // console.log(route.params.user.Id_User)

    }, []);


    useEffect(() => {

        if (LastLogin < getCurrentDate()) {
           
            _storeData()
            registerForPushNotificationsAsync().then(token => UpdateUser(token));
         
                }
            
     }, [user,LastLogin]);


    const UpdateUser = (token) => {
         fetch(API+''+'Api/Users/Edit', {
            method: 'Post',
            headers: {
                Accept: 'application/json', 'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "Id_User":user.Id_User,
                "First_Name": user.First_Name,
                "Last_Name":user.Last_Name,
                "Email":user.Email,
                "User_Password":user.User_Password,
                "Phone_Number": user.Phone_Number,
                "User_Address": user.User_Address,
                "User_Image": user.User_Image,
                "Customer_Code":user.Customer_Code,
                "Token": token,
                "User_Password": user.User_Password
            })
        })
            .then((response) => response.json())
            .then((res) => {
                if (res !== null) {
                    console.log("res"+res)
                }
                else { alert("wrong Code Type") }
            })
            .catch((error) => console.log(error))
            .finally(() => console.log('finished everything'))

        
    }

    async function getData() {
        try {
          let lastLogin = await AsyncStorage.getItem('LastLogin');
          if (lastLogin !== null) {
            setLastlogin(JSON.parse(lastLogin));
            console.log("get LastLogin date")
          }
          let u = await AsyncStorage.getItem('User');
          if (u !== null) {
            setUser(JSON.parse(u));
            console.log("get user date")
          }
  
        }
        catch (error) {
          console.log(error)
        }
      }
   
    const _storeData = async () => {
        try {
            await AsyncStorage.setItem('LastLogin', JSON.stringify(getCurrentDate()));
            console.log("Last login date save succsses");
        }
        catch (error) {
            console.log(error);
        }
    }
    const getCurrentDate = () => {

        var date = new Date().getDate();
        var month = new Date().getMonth() + 1;
        var year = new Date().getFullYear();

        //Alert.alert(date + '-' + month + '-' + year);
        // You can turn it in to your desired format
        return date + '-' + month + '-' + year;//format: dd-mm-yyyy;
    }


    async function registerForPushNotificationsAsync() {
        let token;
        if (Constants.isDevice) {
            const { status: existingStatus } = await Notifications.getPermissionsAsync();
            let finalStatus = existingStatus;
            if (existingStatus !== 'granted') {
                const { status } = await Notifications.requestPermissionsAsync();
                finalStatus = status;
            }
            if (finalStatus !== 'granted') {
                alert('Failed to get push token for push notification!');
                return;
            }
            token = (await Notifications.getExpoPushTokenAsync()).data;
            console.log(token);
        } else {
            alert('Must use physical device for Push Notifications');
        }

        if (Platform.OS === 'android') {
            Notifications.setNotificationChannelAsync('default', {
                name: 'default',
                importance: Notifications.AndroidImportance.MAX,
                vibrationPattern: [0, 250, 250, 250],
                lightColor: '#FF231F7C',
            });
        }

        return token;
    }






    const Data = useSelector(state => state.cart.ProudctList)
    return (

        <Tab.Navigator  >
            <Tab.Screen name="HomeStack" component={HomeStack}
                options={{
                    title: 'Home',
                    tabBarIcon: ({ size, focused, color }) => {
                        return (
                            <Image
                                style={{ width: size, height: size }}
                                source={{
                                    uri:
                                        'https://img.icons8.com/material-rounded/24/000000/home.png'
                                }}
                            />
                        );
                    },
                }}


            />
            <Tab.Screen name="Cart" component={Cart}
                options={{
                    title: 'Cart',
                    tabBarIcon: ({ size, focused, color }) => {
                        return (
                            <View style={styles.container} t>
                                <Image
                                    style={{ width: size, height: size }}
                                    source={{
                                        uri:
                                            'https://img.icons8.com/material-rounded/24/000000/fast-cart.png'
                                    }}
                                />
                                <Text>{Data.length}</Text>
                            </View>
                        );
                    },
                }}


            />
            <Tab.Screen name="ProfileStack"
                options={{
                    title: 'My profile',
                    tabBarIcon: ({ size, focused, color }) => {
                        return (

                            <Image
                                style={{ width: size, height: size }}
                                source={{
                                    uri:
                                        'https://img.icons8.com/material-rounded/24/000000/user-female-circle.png'
                                }}
                            />
                        );
                    },
                }}

                component={ProfileStack} />
        </Tab.Navigator>

    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',

    }
})