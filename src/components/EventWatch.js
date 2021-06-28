import React, { PureComponent,useState, useEffect } from "react";
import { Platform, View, Text, Image, StyleSheet, ScrollView, FlatList, Button } from "react-native";
import {REACT_APP_NASA_KEY} from '@env';
import EventCard from './EventCard';
// import { createMaterialTopTabNavigatior } from '@react-navigation/material-top-tabs';
// import { Tab } from "bootstrap";
import SignUp from './SignUp';

export default class EventWatch extends PureComponent {
    constructor(props){
        super(props)

        this.state={
            fullDate: new Date(),
            prevDate: new Date(),
            prevDateGst: new Date(),
            lengthCoronal: 0,
            currentDate: '',
            currentHour: '',
            currentMinute: '',
            dates: [],
            data:[],
            proxAsteroids: [],
            actualData: [],
            cme: [],
            gst: [],
            flr: []
        }
    }

    componentDidMount(){
        var hours = this.state.fullDate.getHours();
        var minutes = this.state.fullDate.getMinutes();
        var start_date = new Date();
        var start_date_gst = new Date();
        start_date.setDate(this.state.prevDate.getDate() - 6);
        start_date_gst.setDate(this.state.prevDateGst.getDate() - 60);

        this.setState({
            currentDate: this.state.fullDate.toLocaleDateString("fr-CA",{year:"numeric",month:"2-digit", day:"2-digit"}),
            currentHour: hours,
            currentMinute: minutes,
            prevDate: start_date.toLocaleDateString("fr-CA",{year:"numeric",month:"2-digit", day:"2-digit"}),
            prevDateGst: start_date_gst.toLocaleDateString("fr-CA",{year:"numeric",month:"2-digit", day:"2-digit"})
        },() =>{
            this.getAsteroids();
            this.getCoronal();
            this.getGeo();
            this.getFlare();
        })

    }

    getAsteroids() {

        new Promise(() =>{
            var new_change = new Date();
            var date_change = this.state.currentDate;
            var urls = 15;
            let fetches = [];
            // while(this.state.proxAsteroids.length < 4){
            for(let i = 0; i < urls; i++){
                let url = `https://api.nasa.gov/neo/rest/v1/feed?start_date=${date_change}&end_date=${date_change}&api_key=${REACT_APP_NASA_KEY}`
                fetches.push(fetch(url)
                .then(response => response.json())
                .then((data) => {
                    let join = this.state.data;
                    join.push(data.near_earth_objects);

                    this.setState({
                        data: join
                    })
                }))
                new_change.setDate(new_change.getDate() + 1);
                date_change = new_change.toLocaleDateString("fr-CA",{year:"numeric",month:"2-digit", day:"2-digit"});
            }
            // }
            Promise.all(fetches).then(() =>{
                var new_change = new Date();
                var date_change = this.state.currentDate;
                var urls = 15;
                for(let i = 0; i < urls; i++){
                    let add_date = this.state.dates.concat(date_change)
                    this.setState({
                        dates: add_date
                    })
                    new_change.setDate(new_change.getDate() + 1);
                    date_change = new_change.toLocaleDateString("fr-CA",{year:"numeric",month:"2-digit", day:"2-digit"});
                }
                this.state.dates.map((date) =>{
                    this.state.data.map((item,idx) =>{
                        if(item[date]){
                            let new_item = this.state.actualData.concat(item)
                            this.setState({actualData: new_item})
                        }
                    })
                })
                this.state.actualData.map((item,idx) =>{
                    let dates = this.state.dates
                    let total_length = item[dates[idx]].length;
                    for(let j = 0; j < total_length; j++){
                        let timeVal = item[dates[idx]][j].close_approach_data[0].close_approach_date_full;
                        let distVal = item[dates[idx]][j].close_approach_data[0].miss_distance.kilometers;
                        let expectHours = timeVal.substring(timeVal.indexOf(" "), timeVal.indexOf(":"));
                        let expectMin = timeVal.substring(timeVal.indexOf(":") + 1);
                        if (this.state.proxAsteroids.length === 10) {
                            break;
                        }
                        if (dates[idx] === this.state.dates[0]) {
                            if (distVal <= 7500000 && (this.state.currentHour < expectHours || (this.state.currentHour === expectHours && this.state.currentMinute <= expectMin))){
                                let join = this.state.proxAsteroids.concat(item[dates[idx]][j])
                                this.setState(() => ({
                                    proxAsteroids: join
                                }))
                            }
                        } else {
                            if (distVal <= 7500000){
                                let join = this.state.proxAsteroids.concat(item[dates[idx]][j])
                                this.setState(() => ({
                                    proxAsteroids: join
                                }))
                            }
                        }
                    }
                })
            })
        })
    }

    getCoronal(){
        // new Promise(() =>{
            // let fetches = [];
            // var calls = ['CME', 'GST', 'FLR'];
            // calls.map(item => {
                let url = `https://api.nasa.gov/DONKI/CME?startDate=${this.state.prevDate}&api_key=${REACT_APP_NASA_KEY}`;
                // console.log(item.substring(0,3))
            // let url = `https://api.nasa.gov/DONKI/CME?startDate=${this.state.prevDate}&api_key=${REACT_APP_NASA_KEY}`
                // console.log(url)
            fetch(url)
            .then(response => response.json())
            .then(data => {
                this.setState({
                    // lengthCoronal: data.length,
                    cme: data
                })
            })
            // })
            // Promise.all(fetches)
        // })
    }

    getGeo(){
        let url = `https://api.nasa.gov/DONKI/GST?startDate=${this.state.prevDateGst}&api_key=${REACT_APP_NASA_KEY}`;
        fetch(url)
        .then(response => response.json())
        .then(data => {
            this.setState({
                gst: data
            })
        })
    }

    getFlare(){
        let url = `https://api.nasa.gov/DONKI/FLR?startDate=${this.state.prevDate}&api_key=${REACT_APP_NASA_KEY}`;
        fetch(url)
        .then(response => response.json())
        .then(data => {
            this.setState({
                flr: data
            })
        })
    }

    render(){
        // console.log('cme')
        // console.log(this.state.gst)
        // console.log('flr')
        // console.log(this.state.FLR)
        return(
            <React.Fragment>
            <FlatList
                data={this.state.proxAsteroids}
                style={{marginTop:0}}
                keyExtractor={item => item.name}
                renderItem={({item}) =>
                    <EventCard 
                        details={item}
                    />
                }
            />
            </React.Fragment>
        )
        // return(
        //     <Tab.Navigator>
        //         <Tab.Screen 
        //             name = "Asteroid Watch"
        //             component={
        //                     SignUp
        //                     // <React.Fragment>
        //                     //     <FlatList
        //                     //         data={this.state.proxAsteroids}
        //                     //         style={{marginTop:0}}
        //                     //         keyExtractor={item => item.name}
        //                     //         renderItem={({item}) =>
        //                     //             <EventCard 
        //                     //                 details={item}
        //                     //             />
        //                     //         }
        //                     //     />
        //                     // </React.Fragment>
        //                 }
        //         />
        //         {/* <Tab.Screen
        //             name= "CME Watch"
        //             component={
        //                 <View></View>
        //             }
        //         /> */}
        //     </Tab.Navigator>
        // )
    }
}