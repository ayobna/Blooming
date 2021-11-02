
import React, { useState, useEffect, useRef } from 'react';
import {
    View, ScrollView, Dimensions, Text,
    StyleSheet, TouchableHighlight, Button, Image, Alert, FlatList,
    TouchableOpacity, TextInput, Modal, Pressable
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { color } from 'react-native-reanimated';
import { API } from '../../utils/Elements';
const windowheight = Dimensions.get('window').height;

export default function QuestionOwner({ navigation, route }) {

    const [modalVisible, setModalVisible] = useState(false);
    const [Description, setDescription] = useState({})
    const [Data, setData] = useState()

    const [user, setUser] = useState({});

    useEffect(() => {

        getData()



    }, []);

    useEffect(() => {
        GetQuestions()
    }, [user]);


    useEffect(() => {
        console.log(Data)
      
    }, [user.Id_User]);


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


    const GetQuestions = () => {
        fetch(API+''+'Api/Question/AdminQuestion/' + user.Id_User, {
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


    const AskAdmin = async () => {

        await fetch(API+''+'Api/Question/insert/AskAdmin', {
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
                    GetQuestions()
                }
            })
            .catch((error) => console.log(error))
            .finally(() => {
                setModalVisible(!modalVisible)
                console.log('finished everything')
            })
    }


    return (
        <View style={styles.container}>
                  <Image style={styles.bgImage} source={{ uri: API+''+'images/home_page/Home06.jpeg' }} />

            <View style={styles.Usercontainer}>
                <View>
                    <Text style={[{ fontSize: 25, textAlign: 'center', color: '#000000',marginTop:30, marginBottom: 10 }]} >Your Questions For The Owner </Text>

                </View>
            </View>
            <FlatList
                horizontal={false}
                data={Data}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item, index }) =>
                (
                    <View>
                        <View style={styles.Question}>
                            <Text style={styles.title}> Q:{item.Question_Description}</Text>
                        </View>
                        <Text style={styles.Answer}> A:{item.Answer_Description}</Text>

                    </View>
                )
                } />
            <TouchableOpacity
                style={styles.button}

                onPress={() => setModalVisible(true)}
            >
                <Text style={styles.btntext}>Ask Now</Text>
            </TouchableOpacity>
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
                        <Text style={styles.modalText}>Question to  store owner </Text>

                        <View style={{ alignItems: 'center' }}>

                        </View>
                        <TextInput style={styles.modalText}
                            placeholder="Type you'r question to  store owner"
                            underlineColorAndroid='transparent'
                            onChangeText={(text) => setDescription(text)}
                        />


                        <View style={styles.Pressable}>

                            <Pressable
                                style={[styles.buttonOpCl, styles.buttonClose]}
                                onPress={() => AskAdmin()}
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
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        // alignItems: 'center'

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
        backgroundColor: '#FFFF00',
        alignItems: 'flex-end',
        alignItems: 'center'
    },  bgImage: {
        flex: 1,
        //resizeMode,
        position: 'absolute',
        width: '100%',
        height: '100%',
        resizeMode: "cover",
        //  justifyContent: 'center',
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
