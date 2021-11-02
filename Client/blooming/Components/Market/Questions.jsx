
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
import { API } from '../../utils/Elements';
export default function Questions({ route, navigation }) {


    const [modalVisible, setModalVisible] = useState(false);
    const [Description, setDescription] = useState({})

    const [Data, setData] = useState()
    const [Name, setName] = useState()
    const [IdQuestion, setIdQuestion] = useState()
    useEffect(() => {

        GetQuestions()


    }, []);







    const GetQuestions = () => {
        fetch(API+''+'Api/Question/QuestionByIdProduct/' + route.params.id_Product, {
            method: 'Get',
            headers: {
                Accept: 'application/json', 'Content-Type': 'application/json',
            },

        })
            .then((response) => response.json())
            .then((res) => {
                if (res !== null) {
                    console.log(res)
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

        await fetch(API+''+'Api/Question/insert/answer', {
            method: 'Post',
            headers: {
                Accept: 'application/json', 'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "Id_Question": IdQuestion,
                "Answer_Description": Description
            }),

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



    const itemSeparator = () => {
        return (
            <View style={styles.separator} />
        );
    };

    const OpenModel = (id) => {
        setIdQuestion(id)
        setModalVisible(true)
    }
    const AboutQuestion = (item, index) => {


        if (index === 0) {
            return (
                <View style={styles.Question} >
                    <Text style={styles.title}> Q:{item.Question_Description} </Text>

                    <TouchableOpacity style={styles.button}
                        onPress={() => OpenModel(item.Id_Question)}
                    >
                        <Text style={styles.text} >New Answer</Text>
                    </TouchableOpacity>
                </View>
            )
        }
        else if (item.Id_Question === Data[index - 1].Id_Question) {
            return
        }
        else {
            return (
                <View style={styles.Question}>
                    <Text style={styles.title}> Q:{item.Question_Description}</Text>

                    <TouchableOpacity style={styles.button}
                        onPress={() => OpenModel(item.Id_Question)}
                    >
                        <Text style={styles.text}>New Answer</Text>
                    </TouchableOpacity>
                </View>
            )

        }

    }


    const AboutAnswer = (item, index) => {


        if (item.Answer_Description !== null) {
            return (
                <Text style={styles.Answer}> A:{item.Answer_Description}</Text>
            )
        }
    }

    return (
        <View style={styles.container}>
            <Image style={styles.bgImage} source={{ uri:API+''+'images/home_page/Home06.jpeg' }} />
                <Text   style={styles.titleText}>Product Questions </Text>
            <FlatList
                horizontal={false}
                data={Data}
                keyExtractor={(item, index) => index.toString()}
                ItemSeparatorComponent={itemSeparator}
                renderItem={({ item, index }) =>
                (
                    <View>
                        <View>
                            {AboutQuestion(item, index)}
                        </View>
                        {AboutAnswer(item, index)}

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

    },titleText:{
        textAlign:'center',
        fontSize:30,
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



