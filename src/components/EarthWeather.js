import React, { Component } from 'react';
import * as Location from 'expo-location';
import { View, FlatList, Text } from 'react-native';
import WeatherCard from './WeatherCard';

export default class EarthWeather extends Component {
    constructor(props){
        super(props);

        this.state = {
            long: 0,
            lat: 0,
            conditon:[],
            city:'',
            error:''          
        };
    }

    componentDidMount(){
        this.getLocation();
    }

    getLocation = async() => {
        let { status } = await Location.requestForegroundPermissionsAsync();

        if(status !== 'granted'){
            console.log('here')
            this.setState({
                error: 'Permission denied'
            })
        }
        let location = await Location.getCurrentPositionAsync({});
        this.setState(() => ({
            lat:location.coords.latitude,
            long:location.coords.longitude
        }),() => {this.getWeather();})
    }

    getWeather(){
        let url = 'https://api.openweathermap.org/data/2.5/forecast?lat=' + this.state.lat + '&lon=' + this.state.long + '&units=metric&appid=4304d38d675e19f669762e228634c7ef'
        fetch(url)
        .then(response => response.json())
        .then(data =>{
            this.setState(() => ({
                condition: data.list,
                city: data.city
            }))

        })
    }

    render(){
        return(
            <React.Fragment>
            { this.state.error === '' ?
                <FlatList
                    data={this.state.condition}
                    style={{marginTop:20}}
                    keyExtractor={item => item.dt_txt}
                    renderItem={({item}) =>
                        <WeatherCard 
                            details={item}
                            location={this.state.city.name}
                        />
                    }
                /> :
                <View>
                    <Text>{this.state.error}</Text>
                </View>
            }
            </React.Fragment>
        );
    }
}