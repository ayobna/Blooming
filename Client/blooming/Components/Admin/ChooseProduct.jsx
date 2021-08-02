import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View ,Image} from "react-native";

export default function ChooseProduct({ route, navigation }) {
    // [CodeType, setCodeType] = useState(0)


    const  GetProdct=async (Code_Type) => {
      
            await fetch('http://ruppinmobile.tempdomain.co.il/site26/api/Products', {
                method: 'Post',
                headers: {
                    Accept: 'application/json', 'Content-Type': 'application/json',
                },
                body: JSON.stringify({ "Code_Type": Code_Type }),
            })
                .then((response) => response.json())
                .then((res) => {
                    if (res !== null) {
                           
                        navigation.navigate('EditProducts', { data: res })
                    }
                    else { alert("wrong Code Type") }
                })
                .catch((error) => console.log(error))
                .finally(() => console.log('finished everything'))
        }
    

    return (

        <View style={styles.container}>
                  <Image style={styles.bgImage} source={{ uri: 'http://ruppinmobile.tempdomain.co.il/site26//images/home_page/Home07.jpeg' }} />

            <View style={styles.countContainer}>

            </View>
            <TouchableOpacity
                style={styles.button}
                onPress={() => GetProdct(1)}
            >
                <Text style={styles.text}>Planting</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.button}
                onPress={() => GetProdct(2)}
            >
                <Text style={styles.text}>Tools</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.button}
                onPress={() => GetProdct(3)}
            >
                <Text style={styles.text}>Bouquets</Text>
            </TouchableOpacity>
        </View>
    )
}



const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
    },
    button: {
        opacity:0.7,
        alignItems: "center",
        backgroundColor: "#DDDDDD",
        padding: 10,
        margin :70,
        height:90,
        marginTop:10
    },
    countContainer: {
        alignItems: "center",
        padding: 10
    },
    text:{
        justifyContent: "center", 
        alignItems: "center",
        marginTop:10,
        fontSize: 30,
       // fontWeight: "bold"
    }, bgImage: {
        flex: 1,
        //resizeMode,
        position: 'absolute',
        width: '100%',
        height: '100%',
        resizeMode: "cover",
        //  justifyContent: 'center',
      }
});
