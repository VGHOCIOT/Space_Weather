import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import { BrowserRouter, Route } from "react-router-dom";
import Home from "./components/Home";
import NasaPhoto from "./components/NasaPhoto";
import EarthWeather from "./components/EarthWeather";
import SignUp from "./components/SignUp";
import React, {Component} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Amplify from 'aws-amplify';
import awsconfig from './aws-exports';
// import { withAuthenticator } from 'aws-amplify-react-native';

Amplify.configure(awsconfig)
const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer >
      <Stack.Navigator>
        <Stack.Screen
          name="SignUp"
          component={SignUp}
        />
        <Stack.Screen
          name="Home"
          component={Home}
          options={{title: 'Welcome'}}
        />
        <Stack.Screen
          // style={styles.container}
          name="NasaPhoto"
          component={NasaPhoto}
        />
        <Stack.Screen
          name="EarthWeather"
          component={EarthWeather}
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
