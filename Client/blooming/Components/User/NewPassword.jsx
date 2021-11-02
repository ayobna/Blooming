
import React, { useState, useEffect, useRef } from 'react';
import { View, ScrollView, Form, Text, StyleSheet, Dimensions, TouchableHighlight, Button, Image, TouchableOpacity, TextInput } from 'react-native';
import { API } from '../../utils/Elements';

export default function NewPassword({ route, navigation }) {

    const [Email, setEmail] = useState('');
    const [Password, setPassword] = useState('');
    const [PasswordConfirm, setPasswordConfirm] = useState('');


    
    useEffect(() => { 
        if (route !== undefined && route.params !== undefined && 
          route.params.email!==undefined) {      
            setEmail( route.params.email)   
        }
    }, []);



    const AddPassword =async()=>{
        await fetch(API+''+'Api/Users/NewPassword', {
          method: 'Post',
          headers: {
              Accept: 'application/json', 'Content-Type': 'application/json',
          },
          body: JSON.stringify({
                "Email":Email,
                "User_Password":Password           
          }),
      })
          .then((response) => response.json())
          .then((res) => {
              if (res !== null) {
              console.log(res)
              //TIME OUT 
              alert(res)
                navigation.navigate('Login')
              }
              else { alert("Try Again") }
          })
          .catch((error) => console.log(error))
          .finally(() => console.log('finished everything'))
      
       
      }
    return (
        <View style={styles.container}>
            <View style={styles.containe}>
                <TouchableHighlight

                    style={[styles.circle, styles.circleColor]}
                    underlayColor='#ccc' >
                    <Text>1</Text>
                </TouchableHighlight>
                <Text style={styles.line}>____</Text>
                <TouchableHighlight

                    style={[styles.circle, styles.circleColor]}
                    underlayColor='#ccc'
                //   onPress={() => navigation.navigate('Register2')}
                >
                    <Text> 2 </Text>
                </TouchableHighlight>

                <Text style={styles.line}>____</Text>
                <TouchableHighlight
                    style={styles.circle}

                    underlayColor='#ccc'
                // onPress={() => navigation.navigate('Register2')}
                >
                    <Text> 3 </Text>
                </TouchableHighlight>

            </View>


            <View style={styles.inputContainer}>
                <Image style={styles.inputIcon} source={{ uri: 'https://png.icons8.com/key-2/ultraviolet/50/3498db' }} />
                <TextInput style={styles.inputs}
                    placeholder="Password"
                    secureTextEntry={true}
                    underlineColorAndroid='transparent'
                    onChangeText={(text) =>
                        setPassword(text)
                    }
                />
            </View>


            <View style={styles.inputContainer}>
                <Image style={styles.inputIcon} source={{ uri: 'https://png.icons8.com/key-2/ultraviolet/50/3498db' }} />
                <TextInput style={styles.inputs}
                    placeholder="Confirm Password"
                    secureTextEntry={true}
                    underlineColorAndroid='transparent'
                    onChangeText={(text) => setPasswordConfirm(text)}
                />
            </View>



            <View style={styles.containe}>

                <TouchableOpacity
                    style={styles.button}
                    onPress={() =>  navigation.goBack()}
                >
                    <Text style={styles.text}>Cancel </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.button}
                    onPress={()=>AddPassword() }
                >
                    <Text style={styles.text}
                        
                    >Next</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // backgroundColor: '#fff',
        alignItems: 'center',
       justifyContent: 'center',
    },
    containe: {
        marginTop: 20,
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
        marginBottom:100
        //  marginLeft:10
    }, line: {
        marginBottom: 115,
        fontWeight: "bold"
    },
    circleColor: {
        backgroundColor: '#A0A1F0',
    },
    inputContainer: {
        // flex:2,
        borderBottomColor: '#F5FCFF',
        backgroundColor: '#FFFFFF',
        borderRadius: 30,
        borderBottomWidth: 1,
        width: 250,
        height: 45,
        marginBottom: 20,
        flexDirection: 'row',
        marginTop: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputs: {
        height: 45,
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
        margin: 30,
        width: 150,
        //height: 90,
        marginTop: 50,
        borderRadius: 30,
        //   borderBottomWidth: 1,
    }
})