import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as Notifications from 'expo-notifications';
import React, { useState, useEffect, useRef } from 'react';
import HomeScreen from '../Components/Home/HomeScreen';
import Prouduct from '../Components/Market/Prouduct';
import AboutProduct from '../Components/Market/AboutProduct';
import FeedbackProduct from '../Components/Market/FeedbackProduct';
import Questions from '../Components/Market/Questions';
import QuestionOwner from '../Components/User/QuestionOwner';


const Stack = createStackNavigator();
export default function HomeStack() {



  return (

    <Stack.Navigator initialRouteName="HomeScreen">
      <Stack.Screen name="HomeScreen" options={{ headerShown: false }} component={HomeScreen} />
      <Stack.Screen name="Prouduct" options={{ headerShown: false }} component={Prouduct} />
      <Stack.Screen name="AboutProduct" options={{
        title: 'About Product ', headerTitleStyle: { alignSelf: 'center', marginRight: 50 }
      }} component={AboutProduct} />
      <Stack.Screen name="FeedbackProduct"
      options={{
        title: ' Feedback Product ', headerTitleStyle: { alignSelf: 'center', marginRight: 50 }
      }}  component={FeedbackProduct} />
      <Stack.Screen name="Questions"
         options={{
          title: ' Questions ', headerTitleStyle: { alignSelf: 'center', marginRight: 50 }
        }} 
      component={Questions} />
      <Stack.Screen name="QuestionOwner"  options={{ headerShown: false }}  component={QuestionOwner} />
    </Stack.Navigator>

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