import React, { useState, useEffect, useRef } from 'react';
import { View, ScrollView, Form, Platform, Text, StyleSheet, Dimensions, TouchableHighlight, Button, Image, TouchableOpacity, TextInput } from 'react-native';
import Constants from 'expo-constants';
import * as Notifications from 'expo-notifications';
import { Picker } from '@react-native-picker/picker';




export default function Register2({ route, navigation }) {




    // navigator.geolocation = require('@react-native-community/geolocation');
    // navigator.geolocation = require('react-native-geolocation-service');

    const [passwordConfirm, setPasswordConfirm] = useState('')

    const ref = useRef();
    const [photo, setphoto] = useState('')
    const [selectedValueType, setselectedValueType] = useState(1);
    // const fs = require("fs");
    // Create a base64 string from an image => ztso+Mfuej2mPmLQxgD ...
    //  const base64 = fs.readFileSync("path-to-image.jpg", "base64");
    const [User, SetUser] = useState({
        "Id_User": 0, "First_Name": '', "Last_Name": ''
        , "Email": '', "User_Password": '', "Phone_Number": undefined, "User_Address": '',
        "Customer_Code": selectedValueType, "User_Image": '', "Token": ''
    })

    const cameraRef = useRef();
    const [hasPermission, setHasPermission] = useState(null);
    const [fileName, SetFileName] = useState('')
    const [base64, SetBase64] = useState('')

    const emailValidator = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const passwordValidator = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/;
    const [requiredMsg, setRequiredMsg] = useState('')

    //Confirm

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


    const [ConfirmPassError, setConfirmPassError] = useState('')

    useEffect(() => {
        registerForPushNotificationsAsync().then(token => SetUser(prevState => ({
            ...prevState,
            Token: token
        })));

        if (route !== undefined && route.params !== undefined && route.params.Address !== undefined) {
            SetUser(prevState => ({
                ...prevState,
                User_Address: route.params.Address
            }))

        }
        if (route !== undefined && route.params !== undefined && route.params.user !== undefined) {
            SetFileName(route.params.user.fileName)
            SetBase64(route.params.user.base64)
            console.log(route.params.user.fileName)
            SetUser(prevState => ({
                ...prevState,
                First_Name: route.params.user.First,
                Last_Name: route.params.user.Last,
                Phone_Number: route.params.user.Phone,
                User_Image: 'images/UsersProfile/' + route.params.user.fileName
            }))
        }
    }, [route.params]);


    useEffect(() => {
        SetUser(prevState => ({
            ...prevState,
            Customer_Code: selectedValueType
        }))
    }, [selectedValueType]);

    const AddUser = async () => {

        if (passwordConfirm !== '' && emailValidator.test(User.Email) && passwordValidator.test(User.User_Password)) {

            if (passwordConfirm === User.User_Password) {


                await fetch('http://ruppinmobile.tempdomain.co.il/site26/api/Users/Insert', {
                    method: 'Post',
                    headers: {
                        Accept: 'application/json', 'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(User),
                })
                    .then((response) => response.json())
                    .then((res) => {
                        if (res !== null) {


                            if (base64 === '') {
                                navigation.navigate('Login')
                            }
                            else
                                UploadImage()
                        }
                        else { alert("wrong Code Type") }
                    })
                    .catch((error) => console.log(error))
                    .finally(() => console.log('finished everything'))
            }
            else {
                setConfirmPassError('Password dont match')
            }

        }

        else {
            setRequiredMsg('Filds with * are required')
        }



    }

    const UploadImage = async () => {
        await fetch('http://ruppinmobile.tempdomain.co.il/site26/Api/Image', {
            method: 'Post',
            headers: {
                Accept: 'application/json', 'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "name": fileName,
                "folder": "UsersProfile/",
                "base64": base64,

            }),
        }).then((response) => response.json())
            .then((res) => {
                if (res !== null) {
                    console.log("Image save")
                    navigation.navigate('Login')
                }
                else { alert("wrong to UploadImage") }
            })
            .catch((error) => console.log(error))
            .finally(() => console.log('finished everything'))
    }



    const emailValidatorTest = () => {
        if (!emailValidator.test(User.Email)) {
            return (
                <Text style={styles.errorMsg}>Email is not valid</Text>
            )
        }
        else
            return
    }

    const validatePassword = () => {
        if (!passwordValidator.test(User.User_Password)) {
            return (
                <Text style={styles.errorMsg}>Password must contain at least 8 characters, 1 number, 1 upper and 1 lowercase!</Text>
            )
        }
        else
            return
    }

    const required = (value) => {
        if ('' !== value) {
            return
        }
        else
            return (
                <Text style={styles.required}> *</Text>

            )
    }



    return (
        <View style={styles.container}>
      <Image style={styles.bgImage} source={{ uri: 'http://ruppinmobile.tempdomain.co.il/site26//images/home_page/Home05.jpeg' }} />

            <View style={styles.containe}>
                <TouchableHighlight

                    style={[styles.circle, styles.circleColor]}
                    underlayColor='#ccc'
                    onPress={() => navigation.navigate('Register')}
                >
                    <Text>1</Text>
                </TouchableHighlight>
                <Text style={styles.line}>____</Text>
                <TouchableHighlight
                    style={styles.circle}

                    underlayColor='#ccc'
                    onPress={() => navigation.navigate('Register2')}
                >
                    <Text> 2 </Text>
                </TouchableHighlight>
            </View>

            <View style={styles.inputContainer}>
                {required(User.Email)}
                <TextInput style={styles.inputs}
                    placeholder="Email"
                    keyboardType="email-address"
                    underlineColorAndroid='transparent'
                    onChangeText={(text) =>
                        SetUser(prevState => ({
                            ...prevState,
                            Email: text
                        }))
                    }
                />

            </View>
            {User.Email !== '' && emailValidatorTest()}


            <View style={styles.inputContainer}>
                {required(User.User_Password)}
                <TextInput style={styles.inputs}
                    placeholder="Password"
                    secureTextEntry={true}
                    underlineColorAndroid='transparent'
                    onChangeText={(text) =>
                        SetUser(prevState => ({
                            ...prevState,
                            User_Password: text
                        }))
                    }
                />
            </View>
            {User.User_Password !== '' && validatePassword()}

            <View style={styles.inputContainer}>
                {required(passwordConfirm)}
                <TextInput style={styles.inputs}
                    placeholder="Confirm Password"
                    secureTextEntry={true}
                    underlineColorAndroid='transparent'
                    onChangeText={(text) => setPasswordConfirm(text)}
                />
            </View>
            {ConfirmPassError !== '' && <Text style={styles.errorMsg}>{ConfirmPassError}</Text>}
            <Picker
                selectedValue={selectedValueType}
                //    itemStyle={{ backgroundColor: "red"}}

                style={styles.picker}
                onValueChange={(itemValue, itemIndex) => setselectedValueType(itemValue)}
            >
                <Picker.Item key={1} value={1} label={"Private"} />
                <Picker.Item key={2} value={2} label={"Business"} />
            </Picker>

            <Text style={styles.errorMsg} >{requiredMsg}  </Text>

            <TouchableOpacity style={[styles.buttonContainer, styles.signupButton]}
                onPress={() => navigation.navigate('AddAddress', { Key: 'Register2' })}>
                <Text style={styles.signUpText}>
                    Add Address</Text>
            </TouchableOpacity>

            <View style={styles.containe}>

                <TouchableOpacity
                    style={styles.button}
                    onPress={() => navigation.navigate('Register')}>
                    <Text style={styles.text}>Back </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.button}
                    onPress={AddUser}>
                    <Text style={styles.text}>Sgin up</Text>
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
        justifyContent: 'center',
        alignItems: 'center',

    },
    containe: {
        //   marginTop: 20,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: windowHeight*0.05
    },
    circle: {
        borderRadius: Math.round(Dimensions.get('window').width + Dimensions.get('window').height) / 2,
        width: Dimensions.get('window').width * 0.15,
        height: Dimensions.get('window').width * 0.15,
        backgroundColor: '#0000FF',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: windowHeight*0.01,
        marginTop: windowHeight*0.04
        //  marginLeft:10
    }, line: {
        marginTop: windowHeight*0.04,
        marginBottom:windowHeight*0.02,
        fontWeight: "bold"
    },
    circleColor: {
        backgroundColor: '#A0A1F0',
    },
    CircularProgress: {
        width: 20,
        height: 20,
        borderWidth: 20,
        borderRadius: 100,
        borderColor: 'grey',
        marginBottom:windowHeight*0.02,
    },
    inputContainer: {
        borderBottomColor: '#F5FCFF',
        backgroundColor: '#FFFFFF',
        borderRadius: 30,
        borderBottomWidth: 1,
        width: 250,
        height: 45,
        marginBottom:windowHeight*0.02,
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: windowHeight*0.02,
        color: 'black'
    },
    inputs: {
        height: 45,
        // marginLeft: 16,
        borderBottomColor: '#FFFFFF',
        flex: 1,
        textAlign: 'center',

    },
    inputIcon: {
        // width: 30,
        // height: 30,
        // marginLeft: 15,
        justifyContent: 'center',

    },
    buttonContainer: {
        height: 45,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: windowHeight*0.02,
        width: 250,
        marginTop: windowHeight*0.02,
        borderRadius: 10,
        borderRadius: 30,
    },
    signupButton: {
        backgroundColor: "#666699",
    },
    signUpText: {
        color: 'white',
    },
    button: {
        alignItems: "center",
        backgroundColor: "#DDDDDD",
          padding: 10,
        margin: windowHeight*0.02,
        width: windowWidth*0.4,
        //height: 90,
        //    marginTop: 50,
        borderRadius: 30,
        //   borderBottomWidth: 1,
        marginTop: windowHeight*0.12
    },
    picker: {
        height: 50,
        width: 150,
        //  borderBottomWidth: 20
    },
    errorMsg: {
        marginRight: Dimensions.get('window').width * 0.18,
        marginLeft: Dimensions.get('window').width * 0.18,
        padding: 5,
        margin: 0,
        fontSize: 11,
        color: 'red',
        textAlign: 'center'
    },
    required: {
        color: 'red',

    }  ,bgImage: {
        flex: 1,
        //resizeMode,
        position: 'absolute',
        width: '100%',
        height: '100%',
        resizeMode: "cover",
        //  justifyContent: 'center',
      },
});
