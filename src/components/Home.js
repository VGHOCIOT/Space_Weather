import React,{Component} from "react";
import {StyleSheet, View, Button} from 'react-native';
import { Link } from "react-router-dom";
// import { createStackNavigator, createAppContainer } from '@react-navigation/stack';


export default class Home extends Component {
    render(){
        return (
            <View style={styles.container}>
                <View  style={styles.button}>
                    <Button
                        title="See into the stars!"
                        onPress={() => this.props.navigation.navigate('NasaPhoto')}
                    />
                </View>
                <View  style={styles.button}>
                    <Button
                        title="Back on the ground"
                        onPress={() => this.props.navigation.navigate('EarthWeather')}
                    />
                </View>
                <View  style={styles.button}>
                    <Button
                        title="Watch for space weather"
                        onPress={() => this.props.navigation.navigate('EventWatch')}
                    />
                </View>
            </View>
        )
    }

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

