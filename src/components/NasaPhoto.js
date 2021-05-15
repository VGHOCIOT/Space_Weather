import React, { Component,useState, useEffect } from "react";
import { View, Text, Image, StyleSheet, ScrollView } from "react-native";
import {REACT_APP_NASA_KEY} from '@env';
import { LayoutAnimation } from "react-native";
import { Dimensions } from "react-native";
import { SafeAreaView } from "react-native";
import Preview from './Preview';
import FlatSlide from './FlatSlide';

export default class NasaPhoto extends Component {
    constructor(props){
        super(props)

        // var time = new Date().toLocaleDateString()
        // var date = time.getDate()

        this.state={
            photoData:{},
            start_date:'',
            end_date:''
        }
    }

    componentDidMount(){
        this.getDates()
    }

    getDates(){
        var end_date = new Date();
        var start_date = new Date(end_date);
        start_date.setDate(end_date.getDate() - 7);
        end_date = end_date.toLocaleDateString("fr-CA",{year:"numeric",month:"2-digit", day:"2-digit"});
        start_date = start_date.toLocaleDateString("fr-CA",{year:"numeric",month:"2-digit", day:"2-digit"});
        this.setState({
            start_date: start_date,
            end_date: end_date
        },() => {
            this.getPhoto()
        }) 

    }

    getPhoto(){

        let url = `https://api.nasa.gov/planetary/apod?start_date=${this.state.start_date}&end_date=${this.state.end_date}&api_key=${REACT_APP_NASA_KEY}`
        fetch(url)
        .then(response => response.json())
        .then(data =>{
            const newArr = [];
            Object.keys(data).map( (key,index)=>{
                newArr.push(data[key]);
            });
            this.setState({
                photoData: newArr
            })
        })
        console.log(url)
    }

    render(){
        const screenWidth = Math.round(Dimensions.get('window').width)
        if (!this.state.photoData) return <React.Fragment/>;

        return (
            <SafeAreaView style={styles.separator}>
                <ScrollView>
                    <View>
                        <FlatSlide
                            data={this.state.photoData}
                            width={screenWidth}
                            seperator={10}
                            imageKey={'url'}
                            component={<Preview/>}
                            // onPress={item => alert(JSON.stringify(item))}
                            indicatorActiveWidth={40}
                            containerContentStyle={styles.contentStyle}
                        />
                    </View>
                </ScrollView>
            </SafeAreaView>
          );
    }

}


const styles = StyleSheet.create({
    separator: {
    //   alignItems: 'center',
    //   justifyContent: 'center',
    //   display: 'flex'
    },
    contentStyle: {
      paddingHorizontal: 16,
    //   flexGrow: 1
    },
  });

