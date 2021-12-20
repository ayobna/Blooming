import React, { useState, useEffect } from 'react';
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
    Modal,
    TouchableHighlight,
    Pressable
} from 'react-native';
import { API } from '../../utils/Elements';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Stars from 'react-native-stars';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import NumericInput from 'react-native-numeric-input'


function Orders({ route, navigation }) {

    const [TotalPrice, setTotalPrice] = useState(0)

    const [user, setUser] = useState(null);
    const [Data, setData] = useState([])

    const [Dataitem, setDataItem] = useState({})

    const [Description, setDescription] = useState({})
    //setDescriptionl
    const [stars, setStars] = useState(3.5)
    useEffect(() => {

        console.log("########## " + route.params.id)
        //    console.log("################    " + user)

        fetch(API+''+'Api/Orders/UserOrders/' + route.params.id, {
            method: 'Get',
            headers: {
                Accept: 'application/json', 'Content-Type': 'application/json',
            },
        })
            .then((response) => response.json())
            .then((res) => {
                if (res !== null) {
                    setData(res);
                    console.log(res)
                }
                else { alert("wrong user name or password") }
            })
            .catch((error) => console.log(error))
            .finally(() => console.log('finished everything'))

    }, []);


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

    const AddFeedback = async () => {

        await fetch(API+''+'Api/Feedback/insert', {
            method: 'Post',
            headers: {
                Accept: 'application/json', 'Content-Type': 'application/json',
            },
            body: JSON.stringify({ "Id_Product": Dataitem.Id_Product, "Feedback_Description": Description, "Stars": stars }),

        })
            .then((response) => response.json())
            .then((res) => {
                if (res !== null) {
                    console.log(res)
                }
            })
            .catch((error) => console.log(error))
            .finally(() =>{ 
                setModalVisible(!modalVisible)
                console.log('finished everything')})
    }



    const OrderDate = (item, index) => {

        let uriArray = item.Orders_DateTime.split('T')
        let date = uriArray[0]
        let temiArray = uriArray[uriArray.length - 1].split('.')
        let time = temiArray[0]


        if (index === 0)
            return <Text style={styles.title}>Date: {date} Time: {time}</Text>
        else if (item.Orders_DateTime === Data[index - 1].Orders_DateTime) {
            return <Text style={styles.title}></Text>
        }
        else {
            //setDate(item.Orders_DateTime)
            return <Text style={styles.title}>Date: {date} Time: {time}</Text>
        }
    };


    const itemSeparator = () => {
        return (
            <View style={styles.separator} />
        );
    };
    const [modalVisible, setModalVisible] = useState(false);
    const feedback = (item) => {
        setDataItem(item)
        setModalVisible(true)
    }


    return (
        <View style={styles.container}>
            <Text style={styles.titleCart}>You'r Orders</Text>
            <FlatList
                horizontal={false}
                data={Data}
                keyExtractor={(item, index) => index.toString()}
                ItemSeparatorComponent={itemSeparator}
                renderItem={({ item, index }) =>
                (
                    <View>
                        {OrderDate(item, index)}
                        <View style={styles.card}>
                            <Image style={styles.cardImage} source={{ uri: API+'' + item.Product_Image }} />


                            <View style={styles.cardHeader}>
                                <View>
                                    <Text style={styles.title}>{item.Name_Description}</Text>
                                    <Text style={styles.price}>Price: {item.Color_Description}</Text>
                                    <Text style={styles.price}>Total Price: {item.Amount}</Text>

                                </View>
                            </View>
                            <View style={styles.iconHeader}>
                                <View style={styles.title}>
                                    <TouchableOpacity style={styles.socialBarButton} onPress={() => feedback(item)}>
                                        <Image style={styles.icon} source={{ uri: 'https://img.icons8.com/ios/50/000000/feedback.png' }} />
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
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
                        <Text style={styles.modalText}>Feedback</Text>

                        <Image style={styles.cardImageModel} source={{ uri: API+'' + Dataitem.Product_Image }} />
                        <Text style={styles.price}> {Dataitem.Type_Description}</Text>
                        <Text style={styles.title}>{Dataitem.Name_Description}</Text>
                        <Text style={styles.price}> {Dataitem.Color_Description}</Text>


                        <View style={{ alignItems: 'center' }}>
                            <Stars
                                default={3.5}
                                count={5}
                                update={(val) => { setStars(val) }}
                                half={true}
                                starSize={50}
                                fullStar={<Icon name={'star'} style={[styles.myStarStyle]} />}
                                emptyStar={<Icon name={'star-outline'} style={[styles.myStarStyle, styles.myEmptyStarStyle]} />}
                                halfStar={<Icon name={'star-half'} style={[styles.myStarStyle]} />}
                            />
                            
        
                        </View>
                        <TextInput style={styles.modalText}
                            placeholder="Type You'r Feedback"
                            underlineColorAndroid='transparent'
                            onChangeText={(text) => setDescription(text)}
                        />


                        <View style={styles.Pressable}>

                            <Pressable
                                style={[styles.button, styles.buttonClose]}
                                onPress={() => AddFeedback()}
                            >
                                <Text style={styles.textStyle}>Send</Text>
                            </Pressable>

                            <Pressable
                                style={[styles.button, styles.buttonClose]}
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
        marginTop: 20,
        backgroundColor: '#FFFFFF'
    },
    titleCart: {
        fontSize: 30,
        textAlign: 'center',
        marginTop: 10,

    },
    title: {
        fontSize: 18,
        textAlign: 'center',
        marginTop: 10,

    },
    card: {
        flex: 1,
        shadowColor: '#00000021',
        flexDirection: 'row',
        //  marginRight: 40,
        shadowOffset: {
            width: 2
        },
        shadowOpacity: 0.5,
        shadowRadius: 4,
        // marginVertical: 8,
        backgroundColor: "white",
        flexBasis: '47%',
        // marginHorizontal: 2,
    },
    cardHeader: {
        flex: 3,
        paddingVertical: 17,
        paddingHorizontal: 16,
        borderTopLeftRadius: 1,
        borderTopRightRadius: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    cardContent: {
        paddingVertical: 12.5,
        paddingHorizontal: 16,
    },
    cardFooter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingTop: 12.5,
        paddingBottom: 25,
        paddingHorizontal: 16,
        borderBottomLeftRadius: 1,
        borderBottomRightRadius: 1,
    },
    cardImage: {
        flex: 1,
        resizeMode: 'contain'
    },
    cardImageModel: {
        width: 90,
        height: 90,
    },
    icon: {
        width: 30,
        height: 30,
    }, iconHeader: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    line: {
        borderTopWidth: 2,
        borderTopColor: '#E6E6E6'
    },
    buttonTextStyleBuy: {
        color: '#000000',
        textAlign: 'center',
        fontSize: 16,
    }, buttonStyleBuy: {
        height: 40,
        //flex: 1,
        justifyContent: 'center',
        backgroundColor: '#a6ff4d',
    },
    total: {
        fontSize: 20
        , marginLeft: 20
    },
    centeredView: {
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
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2
    },
    buttonOpen: {
        backgroundColor: "#F194FF",
    },
    buttonClose: {
        backgroundColor: "#2196F3",
        width:100
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
    myStarStyle: {
        color: 'yellow',
        backgroundColor: 'transparent',
        textShadowColor: 'black',
        textShadowOffset: { width: 3, height: 3 },
        textShadowRadius: 2,
        fontSize: 30
    },
    myEmptyStarStyle: {
        color: 'white',
    }, Pressable: {
        flexDirection: 'row',
    }
})
export default Orders