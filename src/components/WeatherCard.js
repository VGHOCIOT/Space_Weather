import React, { Component } from 'react';
import { StyleSheet, View, Image } from 'react-native';
import { Text, Card, Divider } from 'react-native-elements';
import { LinearGradient } from 'expo-linear-gradient';
export default class WeatherCard extends Component {
    render(){
        var date = new Date(this.props.details.dt*1000);
        var hours = date.getHours();
        var minutes = "0" + date.getMinutes();
        let time = hours + ':' + minutes.substr(-2);

        return(
            <Card containerStyle={styles.card}>
                <LinearGradient colors={['#0061c9','#03a5fc']} start={[0,0.5]} end={[1,0.5]} style={styles.background}>
                    <Text style={styles.notes}>{this.props.location}</Text>
                    <Text style={styles.notes}>{time}</Text>

                    <View style={{flexDirection:'row', justifyContent:'space-between', alignItems:'center'}}>
                        <View style={styles.iconBack}>
                            <Image style={{width:70, height:70}} source={{uri:"https://openweathermap.org/img/wn/" + this.props.details.weather[0].icon + ".png"}} />
                        </View>
                        <Text style={styles.temp}>{Math.round( this.props.details.main.temp * 10) / 10 }&#8451;</Text>
                    </View>

                    <Divider style={{ backgroundColor: '#dfe6e9', marginVertical:20}} />
                    
                    <View style={{flexDirection:'row', justifyContent:'space-between'}}>
                        <Text style={styles.notes}>{this.props.details.weather[0].description}</Text>
                        <Text style={styles.pop}>{'pop: '.toUpperCase()}{Number((this.props.details.pop*100).toFixed(1))}&#37;</Text>
                    </View>
                </LinearGradient>
            </Card>
        );
    }
}

const styles = StyleSheet.create({
	card:{
        padding:0,
        borderWidth:0,
        borderRadius:20,
	},
	time:{
		fontSize:38,
		color:'#fff'
    },
    temp:{
        fontSize:38,
		color:'#fff'
    },
	notes: {
		fontSize: 18,
		color:'#fff',
		textTransform:'capitalize'
    },
    pop: {
		fontSize: 18,
		color:'#fff',
    },
    background:{
        left:0,
        top:0,
        right:0,
        bottom:0,
        borderWidth:0,
        borderRadius:20,
        padding:15
    },
    iconBack:{
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:'#03a5fc',
        borderColor:'#fff',
        borderWidth:2,
        borderRadius:50,
        width:100,
        height:100,
        marginTop:5,
    }
});