
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React, { useState, useEffect, useRef } from 'react';
import Home from './pages/Home';
import Login from './pages/Login';
import AdminHome from './Components/Admin/AdminHome';
import Questions from './Components/Admin/Questions';
import EditProducts from './Components/Admin/EditProducts';
import ChooseProduct from './Components/Admin/ChooseProduct';
import AddProduct from './Components/Admin/AddProduct';
import Register from './Components/User/Register';
import Register2 from './Components/User/Register2';
import TakeAPicture from "./Components/User/TakeAPicture";
import AddAddress from './Components/User/AddAddress';
import ForgotPass from './Components/User/ForgotPass';
import VerificationCode from './Components/User/VerificationCode';
import EnterCode from './Components/User/EnterCode';
import NewPassword from './Components/User/NewPassword';
import configureStore from './store/store'
import { Provider } from 'react-redux';
import SoldProudct from './Components/Admin/SoldProudct';
import ProductsNotInStock from './Components/Admin/ProductsNotInStock';

const Stack = createStackNavigator();


const store = configureStore();

const ReduxTutorial = () =>
  <Provider store={store}>
    <App />
  </Provider>




function App() {








  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Home" options={{ headerShown: false }} component={Home} />
        <Stack.Screen name="Login" options={{ headerShown: false }} component={Login} />
        <Stack.Screen name="Register" options={{ headerShown: false }} component={Register} />
        <Stack.Screen name="Register2" options={{ headerShown: false }} component={Register2} />
        <Stack.Screen name="AdminHome" options={{ headerShown: false }} component={AdminHome} />
        <Stack.Screen name="EditProducts"  options={{
          title: 'Edit Products', headerTitleStyle:{alignSelf:'center',marginRight:50 }
        }} component={EditProducts} />
        <Stack.Screen name="Questions"  options={{title: 'Questions', headerTitleStyle: { alignSelf: 'center',marginRight:50 }
        }} component={Questions} />
        <Stack.Screen name="ChooseProduct"  options={{title: 'Choose Product', headerTitleStyle: { alignSelf: 'center',marginRight:50 }
        }} component={ChooseProduct} />
        <Stack.Screen name="AddProduct"  options={{ title: 'Add Product', headerTitleStyle: { alignSelf: 'center',marginRight:50 }
        }} component={AddProduct} />

<Stack.Screen name="ProductsNotInStock"  options={{ title: 'Products not in stock', headerTitleStyle: { alignSelf: 'center',marginRight:50 }
        }} component={ProductsNotInStock} />
        <Stack.Screen name="AddAddress" component={AddAddress} />
        <Stack.Screen name="TakeAPicture" options={{title: 'Camera', headerTitleStyle: { alignSelf: 'center',marginRight:50 }
        }} component={TakeAPicture}/>
        <Stack.Screen name="ForgotPass" options={{ headerShown: false }} component={ForgotPass} />
        <Stack.Screen name="VerificationCode" options={{ headerShown: false }} component={VerificationCode} />
        <Stack.Screen name="EnterCode" options={{ headerShown: false }} component={EnterCode} />
        <Stack.Screen name="NewPassword" options={{ headerShown: false }} component={NewPassword} />
        <Stack.Screen name="SoldProudct"  options={{
          title: 'Sold Proudct', headerTitleStyle: { alignSelf: 'center',marginRight:50 }
        }}component={SoldProudct} />

      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
export default ReduxTutorial