import React, { useState, useEffect, useRef } from 'react';
import {
  View, ScrollView, Dimensions, Text,
  StyleSheet, TouchableHighlight, Button, Image, Alert,
  TouchableOpacity, TextInput, Modal, Pressable
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { color } from 'react-native-reanimated';


export default function Profile({ navigation, route }) {

  const [modalVisible, setModalVisible] = useState(false);
  const [Description, setDescription] = useState({})


  const [user, setUser] = useState({
    "First_Name": "",
    "Last_Name": "",
    "Email": "",
    "User_Password": "",
    "Phone_Number": ""
    , "User_Address": "",
    "User_Image": "",
  });
  const [image, setImage] = useState('https://i.stack.imgur.com/l60Hf.png');

  useEffect(() => {

    getData()




    //  console.log(user)

    // fetch('http://ruppinmobile.tempdomain.co.il/site26/api/Users/' + route.paramsuser.id , {
    //   method: 'Get',
    //   headers: {
    //     Accept: 'application/json', 'Content-Type': 'application/json',
    //   },
    // })
    //   .then((response) => response.json())
    //   .then((res) => {
    //     if (res !== null) {
    //       console.log("dsssssssssssssssssssssssssss" + JSON.stringify(res))
    //       setUser(res);
    //       _storeData(res)

    //     }
    //     else { alert("wrong user name or password") }
    //   })
    //   .catch((error) => console.log(error))
    //   .finally(() => console.log('finished everything'))

  }, []);


  useEffect(() => {
    if (route !== undefined && route.params !== undefined && route.params.user !== undefined) {
      console.log("######## 12 " + route.params.user)
      setUser(route.params.user)
    }
  }, [route.params]);

  async function getData() {
    try {
      let value = await AsyncStorage.getItem('User');
      if (value !== null) {

        setUser(JSON.parse(value));

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

  const AskAdmin = async () => {

    await fetch('http://ruppinmobile.tempdomain.co.il/site26/Api/Question/insert/AskAdmin', {
      method: 'Post',
      headers: {
        Accept: 'application/json', 'Content-Type': 'application/json',
      },
      body: JSON.stringify({ "Id_User": user.Id_User, "Question_Description": Description }),

    })
      .then((response) => response.json())
      .then((res) => {
        if (res !== null) {
          console.log(res)
        }
      })
      .catch((error) => console.log(error))
      .finally(() => {
        setModalVisible(!modalVisible)
        console.log('finished everything')
      })
  }

  const btnLogout = async () => {
    try {
      await AsyncStorage.setItem('check', JSON.stringify({ isSelected :false }));
      navigation.navigate('Login')
      console.log(" check succsses");
    }
    catch (error) {
      console.log(error);
    }

  }

  return (
    <View style={styles.container}>
      <View style={styles.Usercontainer}>
        <View>
          <Text style={[{fontSize: 35,color:'#000000',marginBottom:10}]} >Your Profile</Text>
        </View>
        < Image source={{ uri: 'http://ruppinmobile.tempdomain.co.il/site26/' + user.User_Image }} style={styles.imge} />
        <View style={styles.User}>
          <Text style={styles.text}>Name:{user.First_Name} {user.Last_Name}</Text>
          <Text style={styles.text}>Email:{user.Email}</Text>
          <Text style={styles.text}>Phone: {user.Phone_Number}</Text>
          <Text style={styles.text}>Address: {user.User_Address} </Text>
        </View>
      </View>
      <View style={styles.containe}>

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('EditProfile', { user: user })}

        >
          <Text style={styles.btntext}>Edit </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Orders', { id: user.Id_User })}
        >
          <Text style={styles.btntext}>Orders</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('QuestionOwner')}
        >
          <Text style={styles.btntext}>Questions</Text>
        </TouchableOpacity>
      </View>
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

//const windowheight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop:windowHeight*0.01,
    justifyContent: 'center',
    backgroundColor:'#FFFFFF'

  },
  Usercontainer: {
    alignItems: 'center',
  },
  imge: {
    width: 150,
    height: 150,
    borderRadius: 180,
    marginTop:windowHeight*0.01,
  },
  containe: {
    //    flex: 1,
    marginTop:windowHeight*0.01,
    flexDirection: 'row',
    alignItems: 'center',
    textAlign: 'center',
    justifyContent: 'space-evenly',
    marginBottom: windowHeight*0.01
  },
  button: {
    alignItems: 'center',
    backgroundColor: "#DDDDDD",
    padding: 8,
    width: 90,
    borderRadius: 15,
  },
  btntext: {

  },
  User: {
    marginLeft: 20,
    marginTop:windowHeight*0.01,
  },
  text: {
    marginTop:windowHeight*0.03,
    fontSize: 20
  },
  title: {
    fontSize: 30
  },
  modalView: {
    margin: 20,
    marginTop:  windowHeight* 0.3,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 50,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    //  marginTop:

  },
  buttonOpCl: {
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
    width: 100
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginTop: 15,
    marginBottom: 15,
    textAlign: "center",

  },
  modalText: {
    marginTop:  windowHeight* 0.02,
    marginBottom: 15,
    textAlign: "center",

  },
  title: {
    textAlign: 'center',
    fontSize: 20
  }, Pressable: {
    flexDirection: 'row',
  },
  LogoutView: {
    marginTop: 10,
    alignItems: 'center'
  },
  Logout: {
    borderRadius: 20,
    backgroundColor: 'red',
    width: 300,
    padding: 7,
  },
  Logouttext: {
    color: '#FFFFFF',
    textAlign: 'center',
  }

})