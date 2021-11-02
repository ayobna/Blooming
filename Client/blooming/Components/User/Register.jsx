import React, { useState, useEffect, useRef } from 'react';
import {
    View, ScrollView, Dimensions, Text,
    StyleSheet, TouchableHighlight, Button, Image,
    TouchableOpacity, TextInput
} from 'react-native';

import { API } from '../../utils/Elements';
import { Picker } from '@react-native-picker/picker';
import * as ImagePicker from 'expo-image-picker';
export default function Register({ route, navigation }) {



    const [image, setImage] = useState('https://i.stack.imgur.com/l60Hf.png');


    const ref = useRef();
    const [photo, setphoto] = useState('')
    const [selectedValueType, setselectedValueType] = useState(1);
    const [hasPermission, setHasPermission] = useState(null);
    //  const [fileName, SetFileName] = useState('')
    //  const [base64, SetBase64] = useState('')
    const phoneValidator = /^((\+|00)?972\-?|0)(([23489]|[57]\d)\-?\d{7})$/
    const [requiredMsg, setRequiredMsg] = useState('')
    const [User, SetUser] = useState({ First: '', Last: '', Phone: '', fileName: '', base64: '' })
    useEffect(() => {

        if (route !== undefined && route.params !== undefined && route.params.photo !== undefined) {
            setphoto(route.params.photo)
            if (!route.params.photo.cancelled) {
                setImage(route.params.photo.uri);
                console.log(route.params.photo.uri)
                let uriArray = route.params.photo.uri.split('/')

                SetUser(prevState => ({
                    ...prevState,
                    fileName: uriArray[uriArray.length - 1],
                    base64: route.params.photo.base64
                }))
            }

        }
    }, [route.params]);

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            //  aspect: [4, 3],
            quality: 1,
            base64: true
        });

        if (!result.cancelled) {
            setImage(result.uri);
            let B64 = result.base64
            let uriArray = result.uri.split('/')
            let fN = uriArray[uriArray.length - 1]
            //    SetFileName(fN)
            //    SetBase64(result.base64)
            SetUser(prevState => ({
                ...prevState,
                fileName: uriArray[uriArray.length - 1],
                base64: result.base64
            }))
        }


    };

    const AddUser = () => {


        if (User.First !== '' && User.Last !== ''&&phoneValidator.test(User.Phone)) {
            navigation.navigate('Register2', { user: User })
        }
        else
            setRequiredMsg('Filds with * are required')

    }


    const validatePhone = () => {
        if (!phoneValidator.test(User.Phone)) {
            return (
                <Text style={styles.errorMsg}>Israel Phone Number</Text>
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
                  <Image style={styles.bgImage} source={{ uri: API+''+'images/home_page/Home05.jpeg' }} />

            <View style={styles.containe}>
                <TouchableHighlight
                    style={styles.circle}
                    underlayColor='#ccc'
                    onPress={() => navigation.navigate('Register')}
                >
                    <Text>1</Text>
                </TouchableHighlight>
                <Text style={styles.line}>____</Text>
                <TouchableHighlight

                    style={[styles.circle, styles.circleColor]}
                    underlayColor='#ccc'
                    onPress={AddUser}

                >
                    <Text> 2 </Text>
                </TouchableHighlight>
            </View>
            {image && <Image source={{ uri: image }} style={styles.imge} />}

            <View style={styles.containe}>

                <TouchableOpacity
                    style={styles.buttonimg}
                    onPress={pickImage}>
                    <Text style={styles.text}>Select an image </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.buttonimg}
                    onPress={() => navigation.navigate('TakeAPicture', { Key: 'Register' })}>
                    <Text style={styles.text}>take a picture</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.inputContainer}>
                {required(User.First)}
                <TextInput style={styles.inputs}
                    placeholder="First name"
                    underlineColorAndroid='transparent'
                    onChangeText={(text) =>
                        SetUser(prevState => ({
                            ...prevState,
                            First: text
                        }))
                    }
                />
            </View>


            <View style={styles.inputContainer}>
                {required(User.Last)}
                <TextInput style={styles.inputs}
                    placeholder="Last name"
                    onChangeText={(text) =>
                        SetUser(prevState => ({
                            ...prevState,
                            Last: text
                        }))
                    }
                    underlineColorAndroid='transparent'
                />
            </View>
            <View style={styles.inputContainer}>
                {required(User.Phone)}
                <TextInput style={styles.inputs}
                    placeholder="Phone Number"
                    onChangeText={(text) =>
                        SetUser(prevState => ({
                            ...prevState,
                            Phone: text
                        }))
                    }
                    keyboardType="numeric"
                    underlineColorAndroid='transparent'
                />
            </View>
            {User.Phone !== '' && (validatePhone())}

            <Text style={styles.errorMsg} >{requiredMsg}  </Text>
            <View style={styles.containe}>

                <TouchableOpacity
                    style={styles.button}
                    onPress={() => navigation.navigate('Login')}>
                    <Text style={styles.text}>Cancel </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.button}
                    onPress={AddUser}
                    >
                    <Text style={styles.text}>Next</Text>
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
        // backgroundColor: '#fff',
        alignItems: 'center',
       justifyContent: 'center',
     //   marginTop: windowHeight*0.1,
    },
    containe: {
      //  marginTop:  windowHeight*0.05,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',


        //  justifyContent: 'space-between'
    },
    circle: {
        borderRadius: Math.round(Dimensions.get('window').width + Dimensions.get('window').height) / 2,
        width: Dimensions.get('window').width * 0.15,
        height: Dimensions.get('window').width * 0.15,
        backgroundColor: '#0000FF',
        justifyContent: 'center',
        alignItems: 'center',

        //  marginLeft:10
    }, line: {
        marginBottom: windowHeight*0.01,
        fontWeight: "bold"
    },
    circleColor: {
        backgroundColor: '#A0A1F0',
    },
    imge: {

        width: 150,
        height: 150,
        borderRadius: 180,
        marginTop:  windowHeight*0.05,
        //  marginLeft: 130
    },
    inputContainer: {
        borderBottomColor: '#F5FCFF',
        backgroundColor: '#FFFFFF',
        borderRadius: 30,
        borderBottomWidth: 1,
        width: 250,
        height: 45,
        marginBottom: windowHeight*0.02,
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: windowHeight*0.001,
        //   backgroundColor:'gray'
    },
    inputs: {
    //    height: 45,
        // marginLeft: 16,
        borderBottomColor: '#FFFFFF',
        flex: 1,
        textAlign: 'center'
    },
    inputIcon: {
        //   width: 30,
        //  height: 30,
        //  marginLeft: 15,
        justifyContent: 'center'
    },
    button: {
        alignItems: "center",
        backgroundColor: "#DDDDDD",
        padding: 10,
        margin: windowWidth*0.01,
        width: 150,
        //height: 90,
        marginTop: windowWidth*0.01,
        borderRadius: 30,
        //   borderBottomWidth: 1,
    }, buttonimg: {
        alignItems: "center",
        backgroundColor: "gray",
        borderRadius: 30,
        padding: 10,
        margin:windowWidth*0.01,
        marginBottom:windowWidth*0.05,
        width: 150,
        //height: 90,
    }, required: {
        color: 'red',

    }, errorMsg: {
        marginRight: Dimensions.get('window').width * 0.18,
        marginLeft: Dimensions.get('window').width * 0.18,
        padding: 5,
        fontSize: 11,
        color: 'red',
        textAlign: 'center'
    },  bgImage: {
    flex: 1,
    //resizeMode,
     position: 'absolute',
    width: '100%',
    height: '100%',
    resizeMode: "cover",
    //  justifyContent: 'center',
  },
})