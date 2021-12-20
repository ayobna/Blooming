import React, { useState, useEffect, useRef } from 'react';
import { View, Alert, StyleSheet, Recipe, Modal, Pressable, SafeAreaView, FlatList, ScrollView, TextInput, TouchableOpacity, Text, Dimensions, Image } from 'react-native'
import NumericInput from 'react-native-numeric-input'


import { useDispatch } from 'react-redux';
import { addProduct, deleteProduct } from '../../store/actions/cart';
import Stars from 'react-native-stars';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Rating } from "react-native-rating-element";
import { API } from '../../utils/Elements';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
//const windowWidth = Dimensions.get('window').width;
const { width: screenWidth } = Dimensions.get('window');
function AboutProduct({ route, navigation }) {

  const [Data, setData] = useState(route.params.data)
  const [Amount, setAmount] = useState(1)
  ///console.log(Data)ListProduct

  const [ListProduct, setListProduct] = useState([])
  const [FeedbackList, serFeedbackList] = useState([])
  const [Description, setDescription] = useState({})
  const dispatch = useDispatch();
  const submitProduct = (ListProduct) => dispatch(addProduct(ListProduct))
  const deleteCurrent = (key) => dispatch(deleteProduct(key))
  const [modalVisible, setModalVisible] = useState(false);
  const [user, setUser] = useState(null);
  useEffect(() => {

    if (route !== undefined && route.params !== undefined && route.params !== undefined) {
      {

        setData(route.params.data)
      }
    }
    getData()

    fetch(API+''+'Api/Feddback/' + route.params.data.Id_Product, {
      method: 'Get',
      headers: {
        Accept: 'application/json', 'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((res) => {
        if (res !== null) {
          serFeedbackList(res)
        }
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
  const askForProduct = async () => {
    await fetch(API+''+'Api/Question/insert/ask', {
      method: 'Post',
      headers: {
        Accept: 'application/json', 'Content-Type': 'application/json',
      },
      body: JSON.stringify({ "Id_Product": Data.Id_Product, "Id_User": user.Id_User, "Question_Description": Description }),

    }).then((response) => response.json())
      .then((res) => {
        if (res !== null) {
          console.log(res)
        }
      })
      .catch((error) => console.log(error))
      .finally(() => {
        setModalVisible(!modalVisible)
        console.log('finished everything')
      })
  }

  
  const AddAmountToData = () => {
    console.log(Data.Id_Product)
    deleteCurrent(Data.Id_Product)
    // console.log(Amount)
    let list = { "Data": Data, "Amount": Amount }
    submitProduct(list)
    navigation.goBack()

  }
  const FeedbackListMap = (item, index) => {

    if (index < 2) {

      let DateArray = item.Fe_date.split('T')
      let newdate = DateArray[0]
      return (

        <View key={index}>

          <View style={styles.cardHeader}>


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

            <Text style={styles.text}>{newdate}</Text>
          </View>
          <View style={styles.cardHeader}>

            <Text style={styles.text}>{item.Feedback_Description}</Text>

          </View>
        </View>

      )
    }
  }

  const Addorders = async () => {

    console.log(user)

    await fetch(API+''+'api/Orders/OrderId', {
      method: 'Post',
    }).then((response) => response.json())
      .then((res) => { console.log(res) })
      .catch((error) => console.log(error))
      .finally(() => console.log('finished everything to add new order id'))

    console.log(Data)
    await fetch(API+''+'api/Orders/AddOrders', {
      method: 'Post',
      headers: {
        Accept: 'application/json', 'Content-Type': 'application/json',
      },
      body: JSON.stringify({ "Id_User": user.Id_User, "Id_Product": Data.Id_Product, "Amount": Amount }),
    })
      .then((response) => response.json())
      .then((res) => {
        if (res !== null) {
          console.log(res)
          navigation.goBack()
        }
      })
      .catch((error) => console.log(error))
      .finally(() => console.log('finished everything'))

      
  await fetch(API+''+'Api/SendCode', {
    method: 'Post',
    headers: {
      Accept: 'application/json', 'Content-Type': 'application/json',
    },
    body: JSON.stringify({
        "total": Amount * Data.Price
    }),
  })
    .then((response) => response.json())
    .then((res) => {
      if (res !== null) {

        
      }
      else { alert("wrong user name or password") }
    })
    .catch((error) => console.log(error))
    .finally(() => console.log('finished everything'))
  }



  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>


        <View style={styles.Imagecontainer}>
          <Image style={styles.ProductImage} source={{ uri:API+''+ Data.Product_Image }} />
        </View>
        <View>
          <Text style={styles.Text} >
            {Data.Name_Description}
          </Text>
          <Text style={styles.Text}>
            {Data.Price}
          </Text>
          <View style={styles.Amount}>
            <NumericInput
              onChange={value => setAmount(value)}
              minValue={1}
              style={styles.Amount}
              value={Amount}
              textColor='#009900'
              rounded
              leftButtonBackgroundColor='rgba(255, 0, 0,0.5)'
              rightButtonBackgroundColor='rgba(0, 255, 0, 0.5)'
              borderColor='#FFFFFF'
            />

          </View>
          <Text style={styles.total}>TotalPrice:{Amount * Data.Price} </Text>
          <View style={styles.card}>

            <Text style={styles.title}>Feedback</Text>

            <View>
              {FeedbackList.map((item, index) => FeedbackListMap(item, index))}
            </View>
            <View style={styles.cardFooter}>
              <View style={styles.socialBarContainer}>
                <View style={styles.socialBarSection}>
                  <TouchableOpacity style={styles.socialBarButton}

                    onPress={() => navigation.navigate('FeedbackProduct', { feedbackList: FeedbackList, name: Data.Name_Description })}
                  >
                    <Text style={styles.text}>View All</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
          <View style={styles.card}>
            <View>
              <Text style={styles.title}>Questions</Text>
            </View>
            <View style={styles.cardHeader}>

            </View>
            <View style={styles.cardFooter}>
              <View style={styles.socialBarContainer}>
                <View style={styles.socialBarSection}>
                  <TouchableOpacity style={styles.socialBarButton}
                    onPress={() => setModalVisible(true)}

                  >
                    <Text>Ask Now</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.socialBarButton}

                    onPress={() => navigation.navigate('Questions', { id: user.Id_User, id_Product: Data.Id_Product })}
                  >
                    <Text>View All</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
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
            <Text style={styles.modalText}>Ask </Text>

            <View style={{ alignItems: 'center' }}>

            </View>
            <TextInput style={styles.modalText}
              placeholder="Type You'r Question"
              underlineColorAndroid='transparent'
              onChangeText={(text) => setDescription(text)}
            />


            <View style={styles.Pressable}>

              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => askForProduct()}
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

      <View style={styles.containe}  >
        <TouchableOpacity
          //Here is the trick
          activeOpacity={0.6}
          style={styles.buttonStyleAdd}
          onPress={() => AddAmountToData()}
        >
          <Text style={styles.buttonTextStyleAdd}>ADD TO CART</Text>
        </TouchableOpacity>
        <TouchableOpacity
          //Here is the trick
          activeOpacity={0.6}
          onPress={() => Addorders()}
          style={styles.buttonStyleBuy}>
          <Text style={styles.buttonTextStyleBuy}>BUY NOW</Text>
        </TouchableOpacity>

      </View>
    </SafeAreaView>
  )
}


const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    //   marginTop: 20,
    backgroundColor: "#FFFFFF"
  },
  scrollView: {
    marginHorizontal: 20,
  },
  Imagecontainer: {
    alignItems: 'center',
    width: screenWidth,
    height: screenWidth * 0.7,
    backgroundColor: "#FFFFFF"
  },
  ProductImage: {
    width: windowWidth*0.55,
    height: windowHeight*0.35
  },
  Text: {
    marginLeft: 20,
    fontSize: 25
  },
  Amount: {
    marginLeft: 20,
    fontSize: 25,
    flexDirection: 'row',
  }, TextInput: {
    fontSize: 25
  },
  socialBarContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    flex: 1
  },
  socialBarSection: {
    justifyContent: 'space-between',
    alignItems: 'center',
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
    backgroundColor: '#FFFFFF',
    fontSize: 30,
    padding: 10
  },
  buttonStyle: {
    height: 40,
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
  }, icon: {
    width: 25,
    height: 25,
  }
  ,
  /******** card components **************/
  card: {
    shadowColor: '#00000090',
    shadowOffset: {
      width: 2
    },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    marginVertical: 8,
    backgroundColor: "#efeff5",
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
    height: 150,
    width: null,
  },
  /******** button components **************/
  buttonStyleBuy: {
    height: 40,
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#FF0000',
  },
  buttonStyleAdd: {
    height: 40,
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#ffccd5',
  },
  buttonTextStyleBuy: {
    color: '#FFFFFF',
    textAlign: 'center',
    fontSize: 16,
  },
  buttonTextStyleAdd: {
    color: '#f00',
    textAlign: 'center',
    fontSize: 16,
  },
  textStyle: {

    textAlign: 'center',
    fontSize: 16,
    paddingVertical: 16,
  },
  containe: {
    flexDirection: 'row'
  }, myStarStyle: {
    color: 'yellow',
    backgroundColor: 'transparent',
    textShadowColor: 'black',
    textShadowOffset: { width: 3, height: 3 },
    textShadowRadius: 2,
    fontSize: 30
  },
  myEmptyStarStyle: {
    color: 'white',
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

  }, title: {
    textAlign: 'center',
    fontSize: 20
  }, Pressable: {
    flexDirection: 'row',
  }

});
export default AboutProduct;