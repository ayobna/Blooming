import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Alert,
  ScrollView,
  Dimensions,
  TextInput,
  FlatList,
} from 'react-native';

export default function Prouduct({ route, navigation }) {

  const [Data, setData] = useState(route.params.data)
  const [NewPrice, setPrice] = useState(0)

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
          <TouchableOpacity
          style={styles.card}
          onPress={() => navigation.navigate('AboutProduct',{data:item})}
          >
              <View style={styles.cardHeader}>
                <View>
                  <Text style={styles.title}>{item.Name_Description}</Text>
                  <Text style={styles.price}>{item.Price}</Text>
                </View>
              </View>

              <Image style={styles.cardImage} source={{ uri: 'http://ruppinmobile.tempdomain.co.il/site26/' + item.Product_Image }} />
            </TouchableOpacity>
        
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
    width: windowWidth*0.455,
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