import React, { PureComponent,useState, useEffect } from "react";
import { Platform, View, Text, Image, StyleSheet, ScrollView, FlatList, Button } from "react-native";
import {REACT_APP_NASA_KEY} from '@env';
import { LayoutAnimation } from "react-native";
import { Dimensions } from "react-native";
import { SafeAreaView } from "react-native";
import Preview from './Preview';
import FlatSlide from './FlatSlide';
import DateTimePicker from '@react-native-community/datetimepicker';
import DatePicker from 'react-datepicker';



import { parseISO, format } from 'date-fns'

export default class NasaPhoto extends PureComponent {
    constructor(props){
        super(props)

        // var time = new Date().toLocaleDateString()
        // var date = time.getDate()

        this.state={
            photoData:{},
            start_date:'',
            end_date:'',
            start_date_pick: new Date(),
            end_date_pick: new Date()
        }
        // this.render = this.render.bind(this)
    }

    componentDidMount(){
        this.getDates()
        // var thisdate = this.state.start_date_pick
        // thisdate = ('0' + (thisdate.getMonth() + 1)).slice(-2) + '/'
        // + ('0' + thisdate.getDate()).slice(-2) + '/'
        // + thisdate.getFullYear();
        // this.setState({
        //     start_date_pick: parseISO(thisdate)
        // })
        // console.log(this.state.start_date_pick)
    }

    getDates(){
        var end_date = new Date();
        var start_date = new Date(end_date);
        start_date.setDate(end_date.getDate() - 6);
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
        // console.log(url)
    }

    updateDates(){

    }
    // handleDateChange = (date) => {
    //     this.setState({ start_date_pick: date }, () => {
    //         console.log(this.state.start_date_pick)
    //     })
    // }

    render(){
        const screenWidth = Math.round(Dimensions.get('window').width)
        console.log(this.state.start_date_pick)
        // var thisdate = this.state.start_date_pick
        // thisdate = ('0' + (thisdate.getMonth() + 1)).slice(-2) + '/'
        // + ('0' + thisdate.getDate()).slice(-2) + '/'
        // + thisdate.getFullYear();
        // console.log(thisdate)
        // console.log(new Date)
        var curDate = new Date()
        var year = curDate.getFullYear()
        var month = (curDate.getMonth() + 1)
        var day = curDate.getDay()
        var currentDate = curDate.toLocaleDateString("en-US");

        var firstDate = new Date(2015, 0, 1)
        year = firstDate.getFullYear()
        month = firstDate.getMonth() + 1
        day = firstDate.getDay()
        var minDate = firstDate.toLocaleDateString("en-US");
        // // console.log(minDate)
        // console.log(currentDate)
        if (!this.state.photoData) return <React.Fragment/>;

        return (
            <View style={styles.contentStyle}>
                <ScrollView >
                    <View style={styles.searchBar}>
                        <Text> Start Date: </Text>
                        <DateTimePicker
                        style={styles.datePick}
                        value={this.state.start_date_pick}
                        minimumDate={firstDate}
                        maximumDate={curDate}
                        mode="date"
                        display="calendar"
                        onChange={ (event, value) => {
                            this.setState({ start_date_pick: value})
                        }}
                        />
                        <Text> End Date: </Text>
                        <DateTimePicker
                            style={styles.datePick}
                            value={this.state.end_date_pick}
                            minimumDate={firstDate}
                            maximumDate={curDate}
                            mode="date"
                            display="calendar"
                            onChange={ (event, value) => {
                                this.setState({ end_date_pick: value})
                            }}
                        />
                    </View>
                    <Button
                        style={styles.button}
                        title="Submit"
                        onPress={this.updateDates()}
                    />
                    <SafeAreaView style={styles.separator}>
                        <ScrollView>
                            <View>
                                <FlatSlide
                                    data={this.state.photoData}
                                    width={screenWidth}
                                    seperatorWidth={10}
                                    indicator
                                    indicatorActiveWidth={40}
                                    indicatorContainerStyle={{position:'absolute', bottom: 20}}
                                    // containerContentStyle={styles.contentStyle}
                                />
                            </View>
                        </ScrollView>
                    </SafeAreaView>
                </ScrollView>
            </View>
          );
    }

}


const styles = StyleSheet.create({
    separator: {
    //   alignItems: 'center',
    //   justifyContent: 'center',
    //   display: 'flex'
        zIndex: -1
    },
    contentStyle: {
    //   paddingHorizontal: 5,
      flex: 1,
    //   justifyContent: 'center'
    },
    searchBar: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        marginVertical: 20,
        zIndex: 1
    },
    datePick: {
        width: 100,
        height: 100,
        zIndex: 1,
    },
    button: {
        zIndex: -1
    }
    // webView: {
    //     height: 300
    // }
  });

