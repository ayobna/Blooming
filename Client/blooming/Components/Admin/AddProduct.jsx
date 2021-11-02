import React, { useState, useEffect, useRef } from "react";
import { Text, View, StyleSheet, Button, TouchableOpacity, TextInput, Image, Dimensions, Platform } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import * as ImagePicker from 'expo-image-picker';
import { Camera } from 'expo-camera';
import { API } from "../../utils/Elements";
export default function AddProduct({ route, navigation }) {


    // Codes  from DB 
    const [selectedValueType, setselectedValueType] = useState(1);
    const [selectedValueNames, setselectedValueNames] = useState(1);
    const [selectedValueColor, setselectedValueColor] = useState(2);

    // Choices from DB 
    const [Type, setTypes] = useState(route.params.dataType)
    const [Names, setNames] = useState(route.params.dataNames)
    const [Color, setColor] = useState(route.params.dataColor)

    // new price
    const [Price, setPrice] = useState();
    // new name
    const [Name, setName] = useState()
    // new img
    const [image, setImage] = useState('https://ecommerce.laraship.com/assets/corals/images/default_product_image.png');

    //img pic and taic
    const [hasPermission, setHasPermission] = useState(null);
    const [fileName, SetFileName] = useState('')
    const [base64, SetBase64] = useState('')
    useEffect(() => {

    }, [Name]);
    useEffect(() => {

        if (route !== undefined && route.params !== undefined && route.params.photo !== undefined) {
            setImage(route.params.photo.uri)
            SetBase64(route.params.photo.base64)
            let B64 = route.params.photo.base64
            let uriArray = route.params.photo.uri.split('/')
            let fN = uriArray[uriArray.length - 1]
            SetFileName(uriArray[uriArray.length - 1])
            UploadImage(fN, B64)
        }
    }, [route.params]);



    useEffect(() => {
        (async () => {
            if (Platform.OS !== 'web') {
                const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
                if (status !== 'granted') {
                    alert('Sorry, we need camera roll permissions to make this work!');
                }
            }
            const { status } = await Camera.requestPermissionsAsync();
            setHasPermission(status === 'granted');
        })();
    }, []);


    let TypeItems = Type.map((s, i) => {
        return <Picker.Item key={i} value={s.Code_Type} label={s.Type_Description} />

    });
    let NamesItems = Names.map((s, i) => {
        return <Picker.Item key={i} value={s.Code_Name} label={s.Name_Description} />
    });
    let ColorItems = Color.map((s, i) => {

        return <Picker.Item key={i} value={s.Code_Color} label={s.Color_Description} />
    });
    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            quality: 0.5,
            base64: true
        });

        if (!result.cancelled) {
            setImage(result.uri);
            SetBase64(result.base64)
            let B64 = result.base64
            let uriArray = result.uri.split('/')
            let fN = uriArray[uriArray.length - 1]
            SetFileName(uriArray[uriArray.length - 1])
            UploadImage(fN, B64)
        }


    };

    if (hasPermission === null) {
        return <View />;
    }
    if (hasPermission === false) {
        return <Text>No access to camera</Text>;
    }



    const AddProduct = async () => {
        console.log(Names[selectedValueNames])
        await fetch(API+''+'api/Products/Insert', {
            method: 'Post',
            headers: {
                Accept: 'application/json', 'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "Id_Product": 0,
                "Code_Type": selectedValueType,
                "Code_Name": selectedValueNames,
                "Code_Color": selectedValueColor,
                "Price": Price,
                "Product_Image": "images/AdminNewProduct" + "/" + fileName
            }),
        })
            .then((response) => response.json())
            .then((res) => {
                if (res !== null) {
                    console.log("res" + res)
                    //     alert("Product successfully added")
                    navigation.goBack()
                }
                else { alert("wrong Code Type") }
            })
            .catch((error) => console.log(error))
            .finally(() => console.log('finished everything'))



    }


    const UploadImage = async (fN, B64) => {
        await fetch(API+''+'Api/Image', {
            method: 'Post',
            headers: {
                Accept: 'application/json', 'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "name": fN,
                "folder": "AdminNewProduct/",
                "base64": B64,

            }),
        }).then((response) => response.json())
            .then((res) => {
                if (res !== null) {
                    console.log("res " + res)
                    console.log(fileName)
                }
                else { alert("wrong to UploadImage") }
            })
            .catch((error) => console.log(error))
            .finally(() => console.log('finished everything'))



    }


    const AddName = async () => {
        await fetch(API+''+'Api/Products/AddName', {
            method: 'Post',
            headers: {
                Accept: 'application/json', 'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "Name_Description": Name

            }),
        }).then((response) => response.json())
            .then((res) => {
                if (res !== null) {
                    alert(res);
                    UpdateNames();
                }
                else { alert("wrong to Add name") }
            })
            .catch((error) => console.log(error))
            .finally(() => console.log('finished everything'))
    }
    const UpdateNames = async () => {
        await fetch(API+''+'api/ShowProductDetails', {
            method: 'Post',
            headers: {
                Accept: 'application/json', 'Content-Type': 'application/json',
            },
            body: JSON.stringify({ "code": 2 }),
        })
            .then((response) => response.json())
            .then((res) => {
                if (res !== null) {
                    setNames(res)
                }
                else { alert("wrong Code Type") }
            })
            .catch((error) => console.log(error))
            .finally(() => console.log('finished everything'))
    }

    return (
        <View style={styles.container}>


            <View style={styles.img}>

                {image && <Image source={{ uri: image }} style={{ width: 150, height: 150 }} />}
            </View>

            <View style={styles.containe} >

                <TouchableOpacity
                    style={styles.button}
                    onPress={() =>
                        navigation.navigate('TakeAPicture',
                            { Key: 'AddProduct' })}>

                    <Text style={styles.text}>Take a picture</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.button}
                    onPress={pickImage}>
                    <Text style={styles.text}>Pick a picture </Text>
                </TouchableOpacity>

            </View>
            <View style={styles.containerC}>
                <View style={styles.containe} >
                    <Text style={styles.title}>Type: </Text>
                    <Picker
                        selectedValue={selectedValueType}
                        style={styles.picker}
                        onValueChange={(itemValue, itemIndex) => setselectedValueType(itemValue)}

                    >
                        {TypeItems}
                    </Picker>
                </View>
                <View style={styles.containe}>
                    <Text style={styles.title}>Name: </Text>
                    <Picker
                        selectedValue={selectedValueNames}
                        style={styles.picker}
                        onValueChange={(itemValue, itemIndex) => setselectedValueNames(itemValue)}

                    >
                        {NamesItems}
                    </Picker>
                </View>
                <View style={styles.containe}>
                    <Text style={styles.title}>New name: </Text>
                    <TextInput
                        onChangeText={text => setName(text)}
                        placeholder="not on the list   "
                    />
                    <TouchableOpacity style={styles.socialBarButton} onPress={() => AddName()}>
                        <Image style={styles.icon} source={{ uri: 'https://img.icons8.com/material-sharp/24/26e07f/edit--v1.png' }} />
                        <Text style={styles.textName} >Save</Text>
                    </TouchableOpacity>

                </View>
                <View style={styles.containe} >
                    <Text style={styles.title}>Color: </Text>
                    <Picker
                        selectedValue={selectedValueColor}
                        style={styles.picker}
                        onValueChange={(itemValue, itemIndex) => setselectedValueColor(itemValue)}
                    >
                        {ColorItems}
                    </Picker>
                </View>
                <View style={styles.containe} >
                    <Text>Price: </Text>
                    <TextInput
                        onChangeText={text => setPrice(text)}
                        placeholder="Price"
                        keyboardType="numeric"
                    />
                </View>
            </View>
            <TouchableOpacity
                style={styles.btnAdd}
                onPress={()=> navigation.navigate('ProductsNotInStock')}
            >
                <Text style={styles.text}>Products not in stock</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.btnAdd}
                onPress={AddProduct}
            >
                <Text style={styles.text}>Add Product</Text>
            </TouchableOpacity>

        </View>
    );
}
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor:'#FFFFFF'
    },
    containe: {
        marginTop: windowWidth * 0.03,
        flexDirection: 'row',
        alignItems: 'center',
    },
    icon: {
        width: 20,
        height: 20,
    },
    button: {
        alignItems: "center",
        backgroundColor: "gray",
        borderRadius: 30,
        padding: 10,
        margin: windowWidth * 0.03,
        width: windowWidth * 0.35,
        //height: 90,
        marginTop: windowWidth * 0.007
    },
    picker: {
        height: windowWidth*0.15,
        width: 130,
        //  borderBottomWidth: 20
    },
    textName: {
        color: '#00FF00'
    },
    text: {
        color: '#000000'
    },
    btnAdd: {
        marginTop: windowHeight * 0.03,
        backgroundColor: '#8B008B',
        width: windowWidth * 0.5,
        alignItems: 'center',
        padding: 10
    }
})
