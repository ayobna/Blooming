
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
import {API} from "../../utils/Elements"

function SoldProudct({ route, navigation }) {

  const [Data, setData] = useState([])
  const [DataId, setDataId] = useState([])
  useEffect(() => {
    getProductDataID()
  }, []);


  useEffect(() => {
    getProductData()
  }, [DataId]);


  const getProductData = async () => {

    let list = Data
    for (let index = 0; index < DataId.length; index++) {
      await fetch(API+''+'Api/Products/' + DataId[index].Id_Product, {
        method: 'Get',
        headers: {
          Accept: 'application/json', 'Content-Type': 'application/json',
        },
      })
        .then((response) => response.json())
        .then((res) => {
          if (res !== null) {
            //  console.log("Data  ###########", res)

            list = [...list, res]
         //   console.log("############list: " + list)


          }
        })
        .catch((error) => console.log(error))
        .finally(() => {
          setData(list)
          console.log('finished everything')
        })

    }


  }

  const getProductDataID = async()=> {

    await   fetch(API+''+'Api/Products/SoldProduct', {
      method: 'Get',
      headers: {
        Accept: 'application/json', 'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((res) => {
        if (res !== null) {
       //   console.log(res)
          setDataId(res);

        }
      })
      .catch((error) => console.log(error))
      .finally(() => console.log('finished everything'))


    


    }




  return (
    <View style={styles.container}>
      <Text style={styles.titleCart}>Best seller</Text>

      <Text  style={styles.soldtext}>Sold</Text>
      <FlatList
        horizontal={false}
        data={Data}
        keyExtractor={(item, index) => index.toString()}

        renderItem={({ item,index }) =>
        (
          <View>

            <View style={styles.card}>
              <Image style={styles.cardImage} source={{ uri: API+''+ item.Product_Image }} />


              <View style={styles.cardHeader}>
                <View>

                  <Text style={styles.title}> {item.Type_Description}</Text>
                  <Text style={styles.price}> {item.Name_Description}</Text>
                  <Text style={styles.price}> {item.Color_Description}</Text>
                </View>
              </View>
              <View>
              <View style={styles.cardHeader}>
              <Text style={styles.Sold}>{DataId[index].SumAmount}</Text>
              </View>
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
    flex: 1,
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
  },Sold:{
    justifyContent:'center',
    alignItems:'center',
    textAlign: 'center',
    fontSize: 18,
    marginTop: 15,
  },soldtext:{
    textAlign:'right',
    marginRight:20
  }
})
export default SoldProudct