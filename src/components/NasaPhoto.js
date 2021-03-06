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
import "react-datepicker/dist/react-datepicker.css";
import 'bootstrap/dist/css/bootstrap.min.css'
import moment from 'moment'
import { parseISO, format } from 'date-fns'

export default class NasaPhoto extends PureComponent {
    constructor(props){
        super(props)

        this.state={
            photoData:{},
            start_date: '',
            end_date: '',
            start_date_pick: new Date(),
            end_date_pick: new Date(),
            lists: [],
            datesSelected: false
        }
        // this.handleChange = this.handleChange.bind(this)
    }

    componentDidMount(){
        this.getDates()
    }

    getDates(){
        if(!this.state.datesSelected){
            var end_date = new Date();
            var start_date = new Date(end_date);
            start_date.setDate(end_date.getDate() - 6);
            this.setState({
                datesSelected: true
            })
        }
        else {
            var end_date = this.state.end_date_pick;
            var start_date = this.state.start_date_pick;
        }
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
            const screenWidth = Math.round(Dimensions.get('window').width)
            Object.keys(data).map( (key,index)=>{
                newArr.push(data[key]);
            });
            this.setState({
                photoData: newArr,
                lists: [
                    <FlatSlide
                        data={newArr}
                        width={screenWidth}
                        seperatorWidth={10}
                        indicator
                        indicatorActiveWidth={40}
                        indicatorContainerStyle={{position:'absolute', bottom: 20}}
                        // containerContentStyle={styles.contentStyle}
                    />,...this.state.lists 
                ]
            })
        })
    }

    render(){
        // console.log(this.state.lists)
        // console.log(this.state.photoData)
        // console.log(moment())
        // var thisdate = this.state.start_date_pick
        // thisdate = ('0' + (thisdate.getMonth() + 1)).slice(-2) + '/'
        // + ('0' + thisdate.getDate()).slice(-2) + '/'
        // + thisdate.getFullYear();
        // console.log(thisdate)
        // console.log(new Date)
        // var curDate = new Date()
        // var year = curDate.getFullYear()
        // var month = (curDate.getMonth() + 1)
        // var day = curDate.getDay()
        // var currentDate = curDate.toLocaleDateString("en-US");

        // var firstDate = new Date(2015, 0, 1)
        // year = firstDate.getFullYear()
        // month = firstDate.getMonth() + 1
        // day = firstDate.getDay()
        // var minDate = firstDate.toLocaleDateString("en-US");
        // // console.log(minDate)
        // console.log(currentDate)
 
        if (!this.state.photoData) return <React.Fragment/>;

        return (
            <View style={styles.contentStyle}>
                <ScrollView >
                    <View style={styles.searchBar}>
                        <Text> Start Date: </Text>
                        <DatePicker
                            style={styles.datePick}
                            selected={this.state.start_date_pick}
                            minmDate={new Date(2015, 0, 1)}
                            maxDate={new Date()}
                            onChange={ (selected) => {
                                this.setState({ start_date_pick: selected})
                            }}
                        />
                        <Text> End Date: </Text>
                        <DatePicker
                            style={styles.datePick}
                            selected={this.state.end_date_pick}
                            minmDate={new Date(2015, 0, 1)}
                            maxDate={new Date()}
                            onChange={ (selected) => {
                                this.setState({ end_date_pick: selected})
                            }}
                        />
                    </View>
                    <Button
                        style={styles.button}
                        title="Submit"
                        onPress={() => 
                            this.getDates()
                        }
                    />
                    <SafeAreaView style={styles.separator}>
                        <ScrollView>
                            {/* {this.state.lists} */}
                            {/* {renderArr()} */}
                            {this.state.lists.map((item, idx) => {
                                return(
                                    <View key={idx}>
                                        {item}
                                    </View>
                                )
                            })}
                            {/* <View>
                                <FlatSlide
                                    data={this.state.photoData}
                                    width={screenWidth}
                                    seperatorWidth={10}
                                    indicator
                                    indicatorActiveWidth={40}
                                    indicatorContainerStyle={{position:'absolute', bottom: 20}}
                                    // containerContentStyle={styles.contentStyle}
                                />
                            </View> */}
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

