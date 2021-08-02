import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet,Image, Text, View, TouchableHighlight,TouchableOpacity, Dimensions, Button } from 'react-native';
import { Camera } from 'expo-camera';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
export default function History({ route,navigation }) {
    const cameraRef = useRef();
    const [hasPermission, setHasPermission] = useState(null);
    const [GoBackKey, setGoBackKey] = useState('');
    const [type, setType] = useState(Camera.Constants.Type.back);
    const [picUri, setpicUri] = useState();
    useEffect(() => {

        if(route!==undefined&&route.params!=undefined&&route.params.Key!==undefined)
        {
            setGoBackKey(route.params.Key)
            console.log(route.params.Key)
        }
        (async () => {
            const { status } = await Camera.requestPermissionsAsync();
            setHasPermission(status === 'granted');
        })();
    }, []);

    if (hasPermission === null) {
        return <View />;
    }
    if (hasPermission === false) {
        return <Text>No access to camera</Text>;
    }

    const BtnPic =
        async () => {

            let photo = await cameraRef.current.takePictureAsync({ quality: 0.5, base64: true });
            console.log(photo)
         
            navigation.navigate(GoBackKey,{photo:photo})
        }

    return (
        <View style={styles.container}>
            <Camera
                style={{ width: windowWidth, height: windowHeight }}
                ref={cameraRef}

                type={type}>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => {
                            setType(
                                type === Camera.Constants.Type.back
                                    ? Camera.Constants.Type.front
                                    : Camera.Constants.Type.back
                            );
                        }}>

            <View style={styles.picAndFlip}>              
                            <Image style={styles.icon} source={{ uri: 'https://img.icons8.com/color-glass/64/000000/synchronize.png' }} />
            
                        <TouchableHighlight

                            style={styles.circle}
                            underlayColor='#ccc'
                            onPress={BtnPic}
                        // onPress={() => alert('Yaay!')}
                        >
                            <Text>  </Text>
                        </TouchableHighlight>
                        </View> 
                    </TouchableOpacity>
                </View>
            </Camera>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    circle: {
        borderRadius: Math.round(Dimensions.get('window').width + Dimensions.get('window').height) / 3,
        width: Dimensions.get('window').width * 0.20,
        height: Dimensions.get('window').width * 0.20,
        backgroundColor: 'white',
        justifyContent: 'center',
        opacity:0.8        
    },
    icon: {
        width:windowWidth*0.08,
        height: windowWidth*0.08,
        marginTop:windowWidth*0.04,
       marginRight:windowWidth*0.1
      },
      picAndFlip:{
        marginTop:windowHeight*0.75,
        marginLeft:windowWidth*0.2,
        flexDirection: 'row',
      }
});
