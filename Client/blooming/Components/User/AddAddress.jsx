import React, { useState, useEffect, useRef } from 'react';
import { Dimensions, StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import MapView, { Callout, Circle, Marker } from "react-native-maps"
import * as Location from 'expo-location';
import Geolocation from 'react-native-geolocation-service';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Geocoder from 'react-native-geocoding';
export default function AddAddress({ navigation, route }) {

    const GOOGLE_PLACES_API_KEY = 'AIzaSyDlhGoQo-ZBVomVxCH80m6brsW4UZJTuqk'; // never save your real api key in a snack!


    const [Address, setAddress] = useState('')
    const [pin, setPin] = React.useState({
        latitude: 31.966,
        longitude: 34.83
    })
    const [region, setRegion] = React.useState({
        latitude: 31.966,
        longitude: 34.83,
        location: null,
        error: null,
        errorMsg: null,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
    })

    const [GoBackKey, setGoBackKey] = useState('');
    useEffect(() => {


    }, []);


    useEffect(() => {

        ref.current?.setAddressText('');

        if (route !== undefined && route.params != undefined && route.params.Key !== undefined) {
            setGoBackKey(route.params.Key)
        }
        const unsubscribe = navigation.addListener('focus', () => {
            // The screen is focused
            // Call any action

            (async () => {
                console.log("TEST")
                let { status } = await Location.requestForegroundPermissionsAsync();
                if (status !== 'granted') {
                    setErrorMsg('Permission to access location was denied');
                    return;
                }
                console.log(status)

                let location = await Location.getCurrentPositionAsync({});

                setPin({
                    latitude: location.coords.latitude,
                    longitude: location.coords.longitude
                })
                setRegion({
                    latitude: location.coords.latitude,
                    longitude: location.coords.longitude,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421
                })
                //  setAddress(data.description)

            })();
        });
        // Return the function to unsubscribe from the event so it gets removed on unmount
        return unsubscribe;
    }, []);

    const Reversegeocoding = async () => {
        // console.log(login)
        // console.log(JSON.stringify(login))
        await fetch('https://maps.googleapis.com/maps/api/geocode/json?address=' + region.latitude + ',' + region.longitude + '&language=iw&region=IL&key=' + GOOGLE_PLACES_API_KEY)
            .then((response) =>
                response.json()
            )

            .then((responseJson) => {
                //    console.log('ADDRESS GEOCODE is BACK!! => ' + JSON.stringify(responseJson.results[0].formatted_address));
                // setAddress(responseJson.results[0].formatted_address)
                let addressArray = responseJson.results[0].formatted_address.split(',')
                console.log(addressArray)
                navigation.navigate(GoBackKey, { Address: addressArray, region: region })

            })
    }



    const ref = useRef();
    return (
        <View style={{ marginTop: 2, flex: 1 }}>
            <GooglePlacesAutocomplete
                ref={ref}
                placeholder='Type your address'
                fetchDetails={true}
                GooglePlacesSearchQuery={{
                    rankby: "distance"
                }}

                autoFocus={false}
                returnKeyType={'default'}
                fetchDetails={true}
                onPress={(data, details = null) => {
                    // 'details' is provided when fetchDetails = true
                    setRegion({
                        latitude: details.geometry.location.lat,
                        longitude: details.geometry.location.lng,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421
                    })
                    // setPin({
                    //     latitude: details.geometry.location.lat,
                    //     longitude: details.geometry.location.lng
                    // })
                    console.log(data.description)
                    setAddress(data.description)

                }}
                query={{
                    key: GOOGLE_PLACES_API_KEY,
                    language: 'en',
                    country: "IL"
                }
                }
                styles={{
                    container: { flex: 0, position: "absolute", width: "100%", zIndex: 1 },
                    listView: { backgroundColor: "white" }
                }}
            />
            <MapView
                style={styles.map}
                showsUserLocation
                region={{
                    latitude: region.latitude,
                    longitude: region.longitude,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421
                }}
                //onRegionChange={region}
                provider="google"
            >
                <Marker coordinate={region} />

                <Marker
                    coordinate={pin}
                    pinColor="black"
                    draggable={true}
                    onDragStart={(e) => {
                        console.log("Drag start", e.nativeEvent.coordinates)
                    }}
                    onDragEnd={(e) => {
                        setPin({
                            latitude: e.nativeEvent.coordinate.latitude,
                            longitude: e.nativeEvent.coordinate.longitude
                        })
                    }}
                >
                    <Callout>
                        <Text>I'm here</Text>
                    </Callout>
                </Marker>
                <Circle center={pin} radius={1000} />
            </MapView>


            <TouchableOpacity

                //  onLongPress={handlerLongClick}
                //onPress={handlerClick}
                //Here is the trick
                onPress={() => Reversegeocoding()}
                //  onPress={() => navigation.navigate('Register2', { Address: Address })}
                activeOpacity={0.6}
                style={[styles.buttonStyle, styles.Space]}>
                <Text style={styles.buttonTextStyle}>ADD New Address</Text>
            </TouchableOpacity>

            <TouchableOpacity
                //  onLongPress={handlerLongClick}
                //onPress={handlerClick}
                //Here is the trick
                activeOpacity={0.6}
                onPress={() => navigation.navigate('Register2', { Address: null })}
                style={styles.buttonStyle}>
                <Text style={styles.buttonTextStyle}
                >Back</Text>
            </TouchableOpacity>

        </View>

    )
}

/**
 *      <GooglePlacesAutocomplete
                //styles={stylestest}
                ref={ref}
                placeholder='Type your address'
                minLength={2}
                autoFocus={false}
                returnKeyType={'default'}
                fetchDetails={true}
                onPress={(data, details = null) => {
                    // 'details' is provided when fetchDetails = true
                    setAddress(data.description)
                }}
                query={{
                    key: GOOGLE_PLACES_API_KEY,
                    language: 'en',
                    // components: 'country:Israel',
                }
                }
                currentLocation={true}
                currentLocationLabel='Current location' />
 *
 *
            <TouchableOpacity
                //  onLongPress={handlerLongClick}
                //onPress={handlerClick}
                //Here is the trick
                onPress={() => navigation.navigate('Register2',{ Address: Address })}
                activeOpacity={0.6}
                style={[styles.buttonStyle,styles.Space]}>
                <Text style={styles.buttonTextStyle}>ADD New Address</Text>
           </TouchableOpacity>

           <TouchableOpacity
                //  onLongPress={handlerLongClick}
                //onPress={handlerClick}
                //Here is the trick
                activeOpacity={0.6}
                onPress={() => navigation.navigate('Register2',{ Address: null })}
                style={styles.buttonStyle}>
                <Text style={styles.buttonTextStyle}
                >Back</Text>
           </TouchableOpacity>
 */

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center"
    },
    map: {
        marginTop: 40,
        width: Dimensions.get("window").width,
        height: Dimensions.get("window").height * 0.732,
        //   marginLeft: Dimensions.get("window").width * 0.1,//מסך צפיה במיקום נהג לברויקט גמר
        alignItems: 'center'
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
    Space: {
        marginBottom: 10
    }
});