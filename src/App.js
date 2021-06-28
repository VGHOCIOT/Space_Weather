import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import { BrowserRouter, Route } from "react-router-dom";
import Home from "./components/Home";
import NasaPhoto from "./components/NasaPhoto";
import NasaPhotoIOS from "./components/NasaPhoto.native"
import EarthWeather from "./components/EarthWeather";
import SignUp from "./components/SignUp";
import LogIn from "./components/LogIn";
import EventWatch from "./components/EventWatch";
import React, {Component} from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Amplify from 'aws-amplify';
import awsconfig from './aws-exports';
// import { withAuthenticator } from 'aws-amplify-react-native';

Amplify.configure(awsconfig)
const Stack = createStackNavigator();

const renderNasa = () =>{
  if (Platform.OS === 'ios'){
    <Stack.Screen
    // style={styles.container}
    name="NasaPhoto"
    component={NasaPhotoIOS}
    />
  }
  else {
    
  }
}

const App = () => {
  return (
    <NavigationContainer >
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={Home}
          options={{
            title: 'Welcome', 
            headerLeft: null
          }}
        />
        <Stack.Screen
          name="LogIn"
          component={LogIn}
          options={{gestureEnabled: false}}
        />
        <Stack.Screen
          name="SignUp"
          component={SignUp}
          options={{gestureEnabled: false}}
        />     
        <Stack.Screen
          name="NasaPhoto"
          component={NasaPhoto}
        />
        <Stack.Screen
          name="EarthWeather"
          component={EarthWeather}
        />
        <Stack.Screen
          name="EventWatch"
          component={EventWatch}
        />
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

export default App;
