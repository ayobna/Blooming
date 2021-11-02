import React, { useState, useEffect, useRef } from 'react';
import { View, ScrollView, Form, Text, StyleSheet, Dimensions, TouchableHighlight, Button, Image, TouchableOpacity, TextInput } from 'react-native';
import { API } from '../../utils/Elements';

export default function ForgotPass({ navigation }) {

  const [Email, setEmail] = useState('');

  const CheackEmail = async () => {
    // console.log(login)
    // console.log(JSON.stringify(login))
    await fetch(API+''+'Api/Users/ForgotPass', {
      method: 'Post',
      headers: {
        Accept: 'application/json', 'Content-Type': 'application/json',
      },
      body: JSON.stringify({ "Email": Email }),
    })
      .then((response) => response.json())
      .then((res) => {
        if (res !== null) {
          console.log(res)
          if (res!==("Check your details"))
            sendCode(res)
          else {
            alert("Check your details")
          }

        }
        else { alert("Check your details") }
      })
      .catch((error) => console.log(error))
      .finally(() => console.log('finished everything'))
  }



  const sendCode = async (UserToken) => {
    // console.log(login)
    // console.log(JSON.stringify(login))
    await fetch(API+''+'api/sendpushnotification', {
      method: 'Post',
      headers: {
        Accept: 'application/json', 'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        "to": UserToken[0].Token,
        "title": "Your Code",
        "body": UserToken[0].code,
        "data":{
          "navigate":"EnterCode"
      }
      }),
    })
      .then((response) => response.json())
      .then((res) => {
        if (res !== null) {
          {
            console.log(res)
            navigation.navigate('EnterCode', { data: UserToken, email: Email })
          }
        }
        else { alert("wrong user name or password") }
      })
      .catch((error) => console.log(error))
      .finally(() => console.log('finished everything'))
  }


  return (
    <View style={styles.container}>
      <View style={styles.containe}>
        <TouchableHighlight
          style={styles.circle}
          underlayColor='#ccc'
        >
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

          style={[styles.circle, styles.circleColor]}
          underlayColor='#ccc'
        // onPress={() => navigation.navigate('Register2')}
        >
          <Text> 3 </Text>
        </TouchableHighlight>

      </View>
      <View style={styles.inputContainer}>
        <Image style={styles.inputIcon} source={{ uri: 'https://png.icons8.com/message/ultraviolet/50/3498db' }} />
        <TextInput style={styles.inputs}
          placeholder="Email"
          keyboardType="email-address"
          underlineColorAndroid='transparent'
          onChangeText={(text) =>
            setEmail(text)
          }
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
          onPress={() => CheackEmail()}
        //  onPress={AddUser}
        >
          <Text style={styles.text}

          >Sent me code</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
  //  marginTop: 50,
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

    //  marginLeft:10
  }, line: {
    marginBottom: 15,
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
    margin: 150,
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



