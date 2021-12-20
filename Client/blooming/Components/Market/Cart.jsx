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

} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API } from '../../utils/Elements';
import NumericInput from 'react-native-numeric-input'
import { useDispatch, useSelector } from 'react-redux';
import { deleteProduct, addProduct } from '../../store/actions/cart';

function Cart({ route, navigation }) {

  const dispatch = useDispatch();




  const [ListProduct, setListProduct] = useState([])
  const submitProduct = (ListProduct) => dispatch(addProduct(ListProduct))
  console.log()

  const deleteCurrent = (key) => dispatch(deleteProduct(key))

  const Data = useSelector(state => state.cart.ProudctList)
  //const [NewAmount, setAmount] = useState(0)
  const [TotalPrice, setTotalPrice] = useState(0)


  const [user, setUser] = useState({
  "Customer_Code":1
  });

  const itemSeparator = () => {
    return (
      <View style={styles.separator} />
    );
  };

  useEffect(() => {
    let total = 0
    Data.forEach((data) =>

      total = total + data.Data.Price * data.Amount
    )
    setTotalPrice(total.toFixed(2))
  }, [submitProduct]);



  useEffect(() => {
    let total = 0
    Data.forEach((data) =>

      total = total + data.Data.Price * data.Amount
    )
    getData()
    setTotalPrice(total.toFixed(2))
    setListProduct(Data)
  }, []);



  function NewAmount(Amount, item) {
    let tempItem = item;
    tempItem.Amount = Amount
    submitProduct(tempItem)
  }


  const Addorders = async () => {

    console.log(user)

    await fetch(API+''+'api/Orders/OrderId', {
      method: 'Post',
    }).then((response) => response.json())
      .then((res) => {})
      .catch((error) => console.log(error))
      .finally(() => console.log('finished everything to add new order id'))



    for (let index = 0; index < Data.length; index++) {

   

    await fetch(API+''+'api/Orders/AddOrders', {
      method: 'Post',
      headers: {
        Accept: 'application/json', 'Content-Type': 'application/json',
      },
      body: JSON.stringify({ "Id_User": user.Id_User, "Id_Product": Data[index].Data.Id_Product, "Amount": Data[index].Amount }),
    })
      .then((response) => response.json())
      .then((res) => {
        if (res !== null) {

          deleteCurrent(Data[index].Data.Id_Product)
        }
        else { alert("wrong user name or password") }
      })
      .catch((error) => console.log(error))
      .finally(() => console.log('finished everything'))

  }





  await fetch(API+''+'Api/SendCode', {
    method: 'Post',
    headers: {
      Accept: 'application/json', 'Content-Type': 'application/json',
    },
    body: JSON.stringify({
        "total": (TotalPrice * 0.9).toFixed(2)
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
return (
  <View style={styles.container}>
    <Text style={styles.titleCart}>You'r Cart</Text>
    <FlatList
      //  contentContainerStyle={styles.listContainer}
      horizontal={false}
      data={Data}
      keyExtractor={(item => item.Data.Id_Product.toString())}
      ItemSeparatorComponent={itemSeparator}
      renderItem={({ item }) =>
      (
        <View style={styles.card}>

          <Image style={styles.cardImage} source={{ uri: API+'' + item.Data.Product_Image }} />
          <View style={styles.cardHeader}>

            <View>
              <Text style={styles.title}>{item.Data.Name_Description}</Text>
              <Text style={styles.price}>Price: {item.Data.Price}</Text>
              <Text style={styles.price}>Total Price: {item.Data.Price * item.Amount}</Text>
              <NumericInput
                minValue={1}
                onChange={(value) => NewAmount(value, item)}
                value={item.Amount}
                textColor='#009900'
                rounded
                totalWidth={90}
                totalHeight={40}
                leftButtonBackgroundColor='rgba(255, 0, 0,0.5)'
                rightButtonBackgroundColor='rgba(0, 255, 0, 0.5)'
                borderColor='#FFFFFF'
              />
            </View>
          </View>
          <View style={styles.iconHeader}>
            <View style={styles.title}>
              <TouchableOpacity style={styles.socialBarButton} onPress={() => deleteCurrent(item.Data.Id_Product)}>
                <Image style={styles.icon} source={{ uri: 'https://img.icons8.com/fluent/48/000000/delete-forever.png' }} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )

      } />


    <View style={styles.line}>
      <Text style={styles.total}>TotalPrice: {TotalPrice}</Text>
      <Text style={styles.total}>Discount:{user.Customer_Code===2?'10%':'0%'}</Text>
      <Text style={styles.total}>Final price: {user.Customer_Code===2?( (TotalPrice * 0.9).toFixed(2)):TotalPrice}</Text>
    </View>
    <TouchableOpacity
      //Here is the trick
      onPress={() => Addorders()}
      activeOpacity={0.6}
      style={styles.buttonStyleBuy}>
      <Text style={styles.buttonTextStyleBuy}>BUY NOW</Text>
    </TouchableOpacity>
  </View>

);
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
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
  icon: {
    width: 40,
    height: 40,
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
  }
})
export default Cart