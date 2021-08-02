
import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Alert,
  Modal, Pressable,
  ScrollView,
  TextInput,
  FlatList
} from 'react-native';

export default function Questions({ route, navigation }) {


  const [modalVisible, setModalVisible] = useState(false);
  const [Description, setDescription] = useState({})

  const [Data, setData] = useState()
  const [Name, setName] = useState()
  const [IdQuestion, setIdQuestion] = useState()
  const [IdUser, setIdUser] = useState()

  useEffect(() => {

    GetQuestions()


  }, []);







  const GetQuestions = () => {
    fetch('http://ruppinmobile.tempdomain.co.il/site26/Api/Question/AdminQuestion/', {
      method: 'Get',
      headers: {
        Accept: 'application/json', 'Content-Type': 'application/json',
      },

    })
      .then((response) => response.json())
      .then((res) => {
        if (res !== null) {
          console.log("#############" + res)
          setData(res)
        }
      })
      .catch((error) => console.log(error))
      .finally(() => {
        // setModalVisible(!modalVisible)
        console.log('finished everything')
      })
  }


  const Addanswer = async () => {

    await fetch('http://ruppinmobile.tempdomain.co.il/site26/Api/Question/insert/AnswerAdmin', {
      method: 'Post',
      headers: {
        Accept: 'application/json', 'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        "Id_Admin_Question":IdQuestion,
        "Answer_Description": Description
      }),

    })
      .then((response) => response.json())
      .then((res) => {
        if (res !== null) {
          console.log(res)
          GetQuestions()
          GetUserByID()
        }
      })
      .catch((error) => console.log(error))
      .finally(() => {
        setModalVisible(!modalVisible)
        console.log('finished everything')
      })
  }


  const GetUserByID = async () => {

    await fetch('http://ruppinmobile.tempdomain.co.il/site26/Api/Users/'+IdUser, {
      method: 'Get',
      headers: {
        Accept: 'application/json', 'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((res) => {
        if (res !== null) {
          console.log(res)
          sendCodeagin(res.Token)
          
        }
      })
      .catch((error) => console.log(error))
      .finally(() => {
        setModalVisible(!modalVisible)
        console.log('finished everything')
      })
  }



  const sendCodeagin = async (UserToken) => {
    // console.log(login)
    // console.log(JSON.stringify(login))
    await fetch('http://ruppinmobile.tempdomain.co.il/site26/api/sendpushnotification', {
      method: 'Post',
      headers: {
        Accept: 'application/json', 'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        "to": UserToken,
        "title": "Owner Answer",
        "body":Description,
        "data":{
          "navigate":"QuestionOwner"
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










  const itemSeparator = () => {
    return (
      <View style={styles.separator} />
    );
  };

  const OpenModel = (idQ,IdU) => {
    setIdQuestion(idQ)
    setIdUser(IdU)
    setModalVisible(true)
  }
  

  return (
    <View style={styles.container}>
            <Image style={styles.bgImage} source={{ uri: 'http://ruppinmobile.tempdomain.co.il/site26//images/home_page/AdminHome.jpeg' }} />

      <FlatList
        horizontal={false}
        data={Data}
        keyExtractor={(item, index) => index.toString()}
        ItemSeparatorComponent={itemSeparator}
        renderItem={({ item, index }) =>
        (
          <View>
            <View style={styles.Question}>
              <Text style={styles.title}> Q:{item.Question_Description}</Text>

              <TouchableOpacity style={styles.button}
                onPress={() => OpenModel(item.Id_Admin_Question, item.Id_User)}
              >
                <Text style={styles.text}>New Answer</Text>
              </TouchableOpacity>
            </View>
            <Text style={styles.Answer}> A:{item.Answer_Description}</Text>

          </View>
        )
        } />
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Answer </Text>

            <View style={{ alignItems: 'center' }}>

            </View>
            <TextInput style={styles.modalText}
              placeholder="Type You'r Answer"
              underlineColorAndroid='transparent'
              onChangeText={(text) => setDescription(text)}
            />


            <View style={styles.Pressable}>

              <Pressable
                style={[styles.buttonOpCl, styles.buttonClose]}
                onPress={() => Addanswer()}
              >
                <Text style={styles.textStyle}>Send</Text>
              </Pressable>

              <Pressable
                style={[styles.buttonOpCl, styles.buttonClose]}
                onPress={() => setModalVisible(!modalVisible)}
              >
                <Text style={styles.textStyle}>Cancel</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',

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
  title: {
    fontSize: 16,
    textAlign: 'center',
    marginTop: 10,
    fontWeight: "bold"

  },
  button: {
    marginTop: 10,
    padding: 10,
    //  backgroundColor: '#FFFF00',
    alignItems: 'flex-end'
  },
  Answer:
  {
    marginLeft: 10,
    fontSize: 16
  },
  text: {
    padding: 7,
    backgroundColor: '#FFFF00',
    color: '#000000'
  }, centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 20,
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
    elevation: 5
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
    marginTop: 15,
    marginBottom: 15,
    textAlign: "center",

  }, title: {
    textAlign: 'center',
    fontSize: 20
  }, Pressable: {
    flexDirection: 'row',
  }

})



