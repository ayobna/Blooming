import React, { useState, useEffect, useRef } from 'react';
import {
    View, ScrollView, Dimensions, Text,
    StyleSheet, TouchableHighlight, Button, Image,
    TouchableOpacity, TextInput
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'expo-image-picker';

export default function EditProfile({ route, navigation }) {

    const [user, setUser] = useState({
        "First_Name": '',
        "Last_Name": '',
        "Email": "",
        "User_Password": '',
        "Phone_Number": ''
        , "User_Address": '',
        "User_Image": "",
    });
    const [User, setplaceholder] = useState({});
    const [image, setImage] = useState('https://i.stack.imgur.com/l60Hf.png');

    const ref = useRef();
    const [photo, setphoto] = useState('')
    const [imageFolder, setImageFolder] = useState('');
    const [Base64, SetBase64] = useState('');


    const phoneValidator = /^((\+|00)?972\-?|0)(([23489]|[57]\d)\-?\d{7})$/
    const emailValidator = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;



    useEffect(() => {
        setplaceholder(route.params.user)
        setUser(route.params.user)
        setImage('http://ruppinmobile.tempdomain.co.il/site26/' + route.params.user.User_Image)
    }, []);

    useEffect(() => {

        if (route !== undefined && route.params !== undefined && route.params.photo !== undefined) {
            setphoto(route.params.photo)
            if (!route.params.photo.cancelled) {
                PhotoResult(route.params.photo)

            }
        }
        if (route !== undefined && route.params !== undefined && route.params.Address !== undefined) {

            setUser(prevState => ({
                ...prevState,
                User_Address: route.params.Address
            }))

        }
    }, [route.params]);

    async function getData() {
        try {
            let value = await AsyncStorage.getItem('User');
            if (value !== null) {

                setUser(JSON.parse(value));
                setplaceholder(JSON.parse(value))
                console.log("get User")
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
        }
        catch (error) {
            console.log(error);
        }
    }

    function PhotoResult(result) {

        setImage(result.uri);
        SetBase64(result.base64)
        let B64 = result.base64
        let uriArray = result.uri.split('.')
        let fN = uriArray[uriArray.length - 1]

        let date = Date.now()
        setImageFolder(date + '' + user.First_Name + '' + user.Id_User + '.' + fN)

        setUser(prevState => ({
            ...prevState,
            User_Image: 'images/UsersProfile/' + date + '' + user.First_Name + '' + user.Id_User + '.' + fN
        }))

        setUser(prevState => ({
            ...prevState,
            fileName: uriArray[uriArray.length - 1],
            base64: result.base64
        }))
    }
    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            quality: 1,
            base64: true
        });

        if (!result.cancelled) {
            PhotoResult(result)

        };
    }
    const Save = () => {
        if (emailValidator.test(user.Email) && phoneValidator.test(user.Phone_Number)) {
            if (Base64 !== undefined) {
                UploadImage()
            } else {
                SaveUpdate()
            }
        }
    }

    const SaveUpdate = async (type) => {
        await fetch('http://ruppinmobile.tempdomain.co.il/site26/Api/Users/Edit', {
            method: 'Post',
            headers: {
                Accept: 'application/json', 'Content-Type': 'application/json',
            },
            body: JSON.stringify(user),
        })
            .then((response) => response.json())
            .then((res) => {
                if (res !== null) {


                    _storeData(res)

                    navigation.navigate('Profile', { user: res })
                }
                else { alert("wrong Code Type") }
            })
            .catch((error) => console.log(error))
            .finally(() => console.log('finished everything'))

    }

    const UploadImage = async () => {
        await fetch('http://ruppinmobile.tempdomain.co.il/site26/Api/Image', {
            method: 'Post',
            headers: {
                Accept: 'application/json', 'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "name": imageFolder,
                "folder": "UsersProfile/",
                "base64": Base64,

            }),
        }).then((response) => response.json())
            .then((res) => {
                if (res !== null) {
                    SaveUpdate()
                }
                else { alert("wrong to UploadImage") }
            })
            .catch((error) => console.log(error))
            .finally(() => console.log('finished everything'))
    }

    const emailValidatorTest = () => {
        if (!emailValidator.test(user.Email)) {
            return (
                <Text style={styles.errorMsg}>Email is not valid</Text>
            )
        }
        else
            return
    }




    const validatePhone = () => {
        if (!phoneValidator.test(user.Phone_Number)) {
            return (
                <Text style={styles.errorMsg}>Israel Phone Number</Text>
            )
        }
        else

            return
    }

    return (
        <View style={styles.container}>
            <View style={styles.Usercontainer}>
                <View>
                    <Text style={styles.title} >Your Profile</Text>
                </View>

                <Image source={{ uri: image }} style={styles.imge} />


                <View style={styles.containe}>

                    <TouchableOpacity
                        style={styles.buttonimg}
                        onPress={pickImage}
                    >
                        <Text>Select an image </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.buttonimg}
                        // onPress={() => navigation.navigate('History')}
                        onPress={() => navigation.navigate('TakeAPicture', { Key: 'EditProfile' })}>

                        <Text >Take a picture</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.User}>
                    <TextInput style={styles.text}
                        placeholder={User.First_Name}

                        underlineColorAndroid='transparent'
                        onChangeText={(text) =>
                            setUser(prevState => ({
                                ...prevState,
                                First_Name: text
                            }))
                        }
                    />
                    <TextInput style={styles.text}
                        placeholder={User.Last_Name}
                        onChangeText={(text) =>
                            setUser(prevState => ({
                                ...prevState,
                                Last_Name: text
                            }))
                        }
                        underlineColorAndroid='transparent'
                    />
                    <TextInput style={styles.text}
                        placeholder={User.Email}
                        keyboardType="email-address"
                        underlineColorAndroid='transparent'
                        onChangeText={(text) =>
                            setUser(prevState => ({
                                ...prevState,
                                Email: text
                            }))
                        }
                    />
                    {user.Email !==''&& emailValidatorTest()}

                    <TextInput style={styles.text}
                        placeholder={User.Phone_Number}
                        keyboardType="numeric"

                        underlineColorAndroid='transparent'
                        onChangeText={(text) =>
                            setUser(prevState => ({
                                ...prevState,
                                Phone_Number: text
                            }))
                        }
                    />
                    {user.Phone_Number !== '' && (validatePhone())}

                    <TouchableOpacity
                        style={styles.buttonAddress}
                        onPress={() => navigation.navigate('AddAddress', { Key: 'EditProfile' })}>
                        <Text style={styles.btntext}>Update Address</Text>
                    </TouchableOpacity>

                </View>
            </View>
            <View style={styles.containe}>

                <TouchableOpacity
                    style={styles.button}
                    onPress={() => navigation.goBack()}
                >
                    <Text style={styles.btntext}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => Save()}
                >
                    <Text style={styles.btntext}>Save</Text>
                </TouchableOpacity>

            </View>
        </View>
    )
}

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const styles = StyleSheet.create({
    container: {
        flex: 9,
        marginTop: windowWidth*0.015,
        justifyContent: 'center',
        backgroundColor:'#FFFFFF'
    },
    Usercontainer: {
        //    flex: 8,
        alignItems: 'center',
        justifyContent: 'center',
    },
    imge: {
        width: windowWidth*0.4,
        height:windowWidth*0.4,
        borderRadius: windowHeight,
        marginTop: windowWidth*0.015,
        marginBottom:  windowWidth*0.015,
    },
    imgcontaine: {
        flexDirection: 'row',
        alignItems: 'center',
        textAlign: 'center',
        justifyContent: 'space-evenly'
    },


    containe: {
        flexDirection: 'row',
        alignItems: 'center',
        textAlign: 'center',
        justifyContent: 'space-evenly'
    },
    button: {
        alignItems: 'center',
        backgroundColor: "#DDDDDD",
        padding: 8,
        width:windowWidth*0.3,
        borderRadius: 15,

    },
    btntext: {
        textAlign: 'center',
        //    marginLeft: 20
    },
    User: {
        marginTop: windowWidth*0.01
    },
    text: {
        marginTop:  windowWidth*0.08,
        fontSize: 20
    },
    title: {
        marginTop: windowWidth*0.015,
        fontSize: 20
    },
    buttonimg: {
        alignItems: "center",
        backgroundColor: "gray",
        borderRadius: 30,
        padding: 10,
        margin: windowWidth*0.02,
        width: windowWidth*0.4,
        // height: 90,
        marginTop: windowWidth*0.005
    },
    buttonAddress: {
        height: 30,
        backgroundColor: "#666699",
        width: 200,
        marginTop:  windowWidth*0.03,
        borderRadius: 10,
        borderRadius: 30,
        marginBottom: windowWidth*0.05
    }, errorMsg: {
        marginRight: Dimensions.get('window').width * 0.18,
        marginLeft: Dimensions.get('window').width * 0.18,
        padding: 5,
        margin: 0,
        fontSize: 11,
        color: 'red',
        textAlign: 'center'
    },


})