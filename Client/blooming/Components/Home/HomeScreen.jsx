import React, { useRef, useState, useEffect } from 'react';
import Carousel, { ParallaxImage } from 'react-native-snap-carousel';
import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  TouchableOpacity, BackHandler, Alert,
  Platform,
} from 'react-native';

import AppLoading from 'expo-app-loading';
import { useFonts, Allan_400Regular, Allan_700Bold } from '@expo-google-fonts/allan';

const ENTRIES1 = [
  {
    title: 'Beautiful and dramatic Antelope Canyon',
    subtitle: 'Lorem ipsum dolor sit amet et nuncat mergitur',
    illustration: 'imge_home_2.jpg',

  },
  {
    title: 'Earlier this morning, NYC',
    subtitle: 'Lorem ipsum dolor sit amet',
    illustration: 'plants-home-2.jpg',
  },
  {
    title: 'White Pocket Sunset',
    subtitle: 'Lorem ipsum dolor sit amet et nuncat ',
    illustration: 'Home07.jpeg',

  }

];
const { width: screenWidth } = Dimensions.get('window');

export default function HomeScreen({ route, navigation }) {

  let [fontsLoaded] = useFonts({
    Allan_400Regular,
    Allan_700Bold
  });



  const [entries, setEntries] = useState([]);
  const carouselRef = useRef(null);

  const goForward = () => {
    carouselRef.current.snapToNext();
  };

  useEffect(() => {

    BackHandler.addEventListener(
      'hardwareBackPress', () => { return true }
    );
    setEntries(ENTRIES1);
  }, []);

  const renderItem = ({ item, index }, parallaxProps) => {
    return (
      <View style={styles.item}>
        <ParallaxImage
          source={{ uri: 'http://ruppinmobile.tempdomain.co.il/site26/images/home_page/' + item.illustration }}
          containerStyle={styles.imageContainer}
          style={styles.image}
          parallaxFactor={0.4}
          {...parallaxProps}
        />

      </View>

    );
  };

  const GetProdct = async (Code_Type) => {

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

          navigation.navigate('Prouduct', { data: res })
        }
        else { alert("wrong Code Type") }
      })
      .catch((error) => console.log(error))
      .finally(() => console.log('finished everything'))
  }



  if (!fontsLoaded) {
    return <AppLoading />;
  } else {

    return (
      <View style={styles.container}>
        <Text style={{ fontFamily: 'Allan_700Bold', textAlign: 'center', fontSize: 40, marginBottom: 20, textShadowRadius: 8, textShadowColor: '#FF00FF' }}>Blooming</Text>
        <Text style={{ fontFamily: 'Allan_400Regular', textAlign: 'center', fontSize: 30, marginBottom: 50 }}>always colorful</Text>
        <View >
          <TouchableOpacity onPress={goForward}>
          </TouchableOpacity>
          <Carousel
            ref={carouselRef}
            sliderWidth={screenWidth}
            sliderHeight={screenWidth}
            itemWidth={screenWidth - 60}
            data={entries}
            renderItem={renderItem}
            hasParallaxImages={true}
          />
        </View>
        <View style={styles.countContainer}>

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
            onPress={() => GetProdct(3)}>
            <Text style={styles.text}>Bouquets</Text>
          </TouchableOpacity>

        </View>



      </View>
    );
  }

};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 30,
    backgroundColor: "#FFFFFF",

  },
  item: {
    width: screenWidth - 80,
    height: screenWidth - 160,
  },
  imageContainer: {
    flex: 1,
    marginBottom: Platform.select({ ios: 0, android: 1 }), // Prevent a random Android rendering issue
    backgroundColor: 'white',
    borderRadius: 8,
  
  },
  image: {
    ...StyleSheet.absoluteFillObject,
    resizeMode: 'cover',
  },
  button: {
    marginTop: 50,
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    padding: 10,
    borderWidth: 2,
    height: 100,
    width: 100,
    borderTopColor: '#000000',
  },
  countContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: "center",
    padding: 10
  },
  text: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 25,
    fontFamily: 'Allan_400Regular',

  }
});