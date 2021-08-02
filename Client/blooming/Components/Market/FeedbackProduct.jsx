
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
    FlatList
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Stars from 'react-native-stars';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import NumericInput from 'react-native-numeric-input'

import { Rating } from "react-native-rating-element";
function FeedbackProduct({ route, navigation }) {



    const [Data, setData] = useState(route.params.feedbackList)
    const [Name, setName] = useState(route.params.name)
    useEffect(() => {


    }, []);


    const itemSeparator = () => {
        return (
            <View style={styles.separator} />
        );
    };

    const FeDate = (item) => {
        let uriArray = item.Fe_date.split('T')
        let date = uriArray[0]
        return (<Text style={styles.title}>{date}</Text>)
    };

    return (
        <View style={styles.container}>

            <Text style={styles.titleCart}>{Name} Feedback </Text>
            <FlatList
                horizontal={false}
                data={Data}
                keyExtractor={(item, index) => index.toString()}
                ItemSeparatorComponent={itemSeparator}
                renderItem={({ item, index }) =>
                (
                    <View>
                        {FeDate(item)}
                        <View style={styles.card}>
                   
                            <Rating
                                rated={item.Stars}
                                totalCount={5}
                                ratingColor="#f1c644"
                                ratingBackgroundColor="#d4d4d4"
                                size={24}
                                readonly // by default is false
                                icon="ios-star"
                                direction="row" // anyOf["row" (default), "row-reverse", "column", "column-reverse"]
                            />
                        </View>
                        <View style={styles.cardHeader}>
                            <View>

                                <Text style={styles.price}>Description: {item.Feedback_Description}</Text>

                            </View>
                        </View>
                    </View>
                )
                } />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        //  marginTop: 20,
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
        // flex: 1,
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
    myStarStyle: {
        color: 'yellow',
        backgroundColor: 'transparent',
        textShadowColor: 'black',
        textShadowOffset: { width: 3, height: 3 },
        textShadowRadius: 2,
        fontSize: 25
    },
    myEmptyStarStyle: {
        color: 'white',
    },
    Pressable: {
        flexDirection: 'row',
    }, bgImage: {
        flex: 1,
        //resizeMode,
        position: 'absolute',
        width: '100%',
        height: '100%',
        resizeMode: "cover",
        //  justifyContent: 'center',
      },
})
export default FeedbackProduct






