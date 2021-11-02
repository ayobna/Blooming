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
    Dimensions
} from 'react-native';
import { API } from '../../utils/Elements';
export default function ProductsNotInStock({ route, navigation }) {

    const [Data, setData] = useState()
    const [NewPrice, setPrice] = useState(0)


    useEffect(() => {

        GetProductsNotInStock()
    
    
      }, []);


   const  GetProductsNotInStock =async()=>{
    await fetch(API+''+'Api/Products/ProductsNotInStock', {
        method: 'Get',
        headers: {
            Accept: 'application/json', 'Content-Type': 'application/json',
        },
    })
        .then((response) => response.json())
        .then((res) => {
            if (res !== null) {

         
                setData(res)
                console.log(res)
            }
            else { alert("wrong To Delete") }
        })
        .catch((error) => console.log(error))
        .finally(() => console.log('finished everything'))
   }
      
    function removeItemFromList(item) {
        Alert.alert(
            'Product inventory',
            'Are you sure the product is back in stock?',
            [
                { text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
                { text: 'OK', onPress: () => removeProductFromDB(item) },
            ],
            { cancelable: false }
        )
    }
    async function removeProductFromDB(item) {

        await fetch(API+''+'/Api/Products/GetBackProduct', {
            method: 'Post',
            headers: {
                Accept: 'application/json', 'Content-Type': 'application/json',
            },
            body: JSON.stringify({ "Id_Product": item.Id_Product }),
        })
            .then((response) => response.json())
            .then((res) => {
                if (res !== null) {

                    const newList = Data.filter((it) => it.Id_Product !== item.Id_Product);
                    setData([...newList])
                    console.log(newList)
                }
                else { alert("wrong To Delete") }
            })
            .catch((error) => console.log(error))
            .finally(() => console.log('finished everything'))
    }


    
    const itemSeparator = () => {
        return (
            <View style={styles.separator} />
        );
    };
    return (
        <View style={styles.container}>
            <FlatList style={styles.list}
                contentContainerStyle={styles.listContainer}
                horizontal={false}
                numColumns={2}
                data={Data}
                keyExtractor={(item => item.Id_Product)}
                ItemSeparatorComponent={itemSeparator}
                renderItem={({ item }) =>
                (

                    <View style={styles.card}>
                        <View style={styles.cardHeader}>
                            <View>
                                <Text style={styles.title}>{item.Name_Description}</Text>
                                <Text style={styles.price}>{item.Price}</Text>
                            </View>
                        </View>

                        <Image style={styles.cardImage} source={{ uri:API+'' + item.Product_Image}} />

                        <View style={styles.cardFooter}>
                            <View style={styles.socialBarContainer}>
                                <View style={styles.socialBarSection}>

                                    <View style={styles.socialBarSection}>
                                        <TouchableOpacity style={styles.socialBarButton} onPress={() => removeItemFromList(item)}>
                                            <Image style={styles.icon} source={{ uri: 'https://img.icons8.com/fluency/48/000000/back.png' }} />
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                        </View>
                    </View>
                )
                } />
        </View>

    );
}
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;



const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 20,
    },
    list: {
        paddingHorizontal: 5,
        backgroundColor: "#E6E6E6",
    },
    listContainer: {
        alignItems: 'center'
    },
    separator: {
        marginTop: 10,
    },
    /******** card **************/
    card: {
        shadowColor: '#00000021',
        shadowOffset: {
            width: 2
        },
        shadowOpacity: 0.5,
        shadowRadius: 4,
        marginVertical: 8,
        backgroundColor: "white",
        flexBasis: '47%',
        marginHorizontal: 5,
    },
    cardHeader: {
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
        height: 200,
        width: windowWidth * 0.455,
    },
    /******** card components **************/
    title: {
        fontSize: 18,
        flex: 1,
    },
    price: {
        fontSize: 16,
        color: "green",
        marginTop: 5
    },
    buyNow: {
        color: "purple",
    },
    icon: {
        width: 25,
        height: 25,
    },
    /******** social bar ******************/
    socialBarContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        flex: 1
    },
    socialBarSection: {
        justifyContent: 'center',
        flexDirection: 'row',
        flex: 1,
    },
    socialBarlabel: {
        marginLeft: 8,
        alignSelf: 'flex-end',
        justifyContent: 'center',
    },
    socialBarButton: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonStyle: {
        height: 40,
        justifyContent: 'center',
        backgroundColor: '#27c2ef',
    },
    buttonTextStyle: {
        color: '#fff',
        textAlign: 'center',
        fontSize: 16,
    },
    textStyle: {
        textAlign: 'center',
        fontSize: 16,
        paddingVertical: 16,
    },
});




