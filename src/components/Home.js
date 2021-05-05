import React from "react";
import {StyleSheet, View, Button} from 'react-native';
import { Link } from "react-router-dom";

const Home = ({ navigation }) => {

  return (
    <View style={styles.container}>
        <View  style={styles.button}>
            <Button
                title="See into the stars!"
                onPress={() => navigation.navigate('NasaPhoto')}
            />
        </View>
        <View  style={styles.button}>
            <Button
                title="Back on the ground"
                onPress={() => navigation.navigate('EarthWeather')}
            />
        </View>

    </View>
  );
}

const styles = StyleSheet.create({
    container:{
        alignItems:'center'
    },
    button:{
        margin:10,
        width:500
    }
});

export default Home;
