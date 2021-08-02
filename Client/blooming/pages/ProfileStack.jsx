import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as Notifications from 'expo-notifications';
import React, { useState, useEffect, useRef } from 'react';
import Profile from '../Components/User/Profile';
import EditProfile from '../Components/User/EditProfile';
import Orders from '../Components/User/Orders';
const Stack = createStackNavigator();
export default function ProfileStack() {



  return (
 
      <Stack.Navigator    initialRouteName="Profile">
       <Stack.Screen name="Profile"  options={{headerShown:false}} component={Profile} />
        <Stack.Screen name="EditProfile" options={{headerShown:false}} component={EditProfile} />
        <Stack.Screen name="Orders" options={{headerShown:false}} component={Orders} />
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