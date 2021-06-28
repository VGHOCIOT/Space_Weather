import React, { Component } from 'react';
import { StyleSheet, View, Image } from 'react-native';
import { Text, Card, Divider } from 'react-native-elements';
// import NumberFormat from 'react-number-format';
var carImg = require('../../assets/car.jpeg')
var busImg = require('../../assets/bus.png')
var houseImg = require('../../assets/house.jpeg')
var planeImg = require('../../assets/airplane.jpeg')
var buildingImg = require('../../assets/building.jpeg')

export default class EarthWeather extends Component {
    render(){
        const renderImage = (size) => {
            switch(true){
                case size < 10:
                    return(
                        <>
                            <View style={styles.imgContainer}>
                                <Image
                                    style={styles.img}
                                    source={carImg}
                                />
                            </View>
                            <Text>Car-sized</Text>
                        </>
                    )
                case size < 15 && size >= 10:
                    return(
                        <>
                            <View style={styles.imgContainer}>
                                <Image
                                    style={styles.img}
                                    resizeMode='contain'
                                    source={busImg}
                                />
                            </View>
                            <Text>Bus-sized</Text>
                        </>
                    )
                case size < 30  && size >= 15:
                    return(
                        <>
                            <View style={styles.imgContainer}>
                                <Image
                                    style={styles.img}
                                    resizeMode='contain'
                                    source={houseImg}
                                />
                            </View>
                            <Text>House-sized</Text>
                        </>
                    )
                case size < 80 && size >= 30:
                    return(
                        <>
                            <View style={styles.imgContainer}>
                                <Image
                                    style={styles.img}
                                    resizeMode='contain'
                                    source={planeImg}
                                />
                            </View>
                            <Text>Airplane-sized</Text>
                        </>
                    )
                case size >= 80:
                    return(
                        <>
                            <View style={styles.imgContainer}>
                                <Image
                                    style={styles.img}
                                    resizeMode='contain'
                                    source={buildingImg}
                                />
                            </View>
                            <Text>Building-sized</Text>
                        </>
                    )
            }
        }
        return(
            <Card>
                <Divider  orientation="vertical" style={{ backgroundColor: '#7D7773', marginVertical:20}}/>
                <View style={styles.card}>
                    <View style={styles.left}>
                        {renderImage(this.props.details.estimated_diameter.meters.estimated_diameter_min)}
                    </View>
                    <View style={styles.main}>
                        <View style={styles.written}>
                            <Text style={styles.title}>Asteroid Name</Text>
                            <Text style={styles.value}>{this.props.details.name}</Text>
                            <Text style={styles.title}>Largest Diameter</Text>
                            <Text style={styles.value}>{Math.round(this.props.details.estimated_diameter.meters.estimated_diameter_max)} m</Text>
                        </View>
                        <View style={styles.written}>
                            <Text style={styles.title}>Closest Approach to Earth</Text>
                            {/* <NumberFormat
                                value={Math.round(this.props.details.close_approach_data[0].miss_distance.kilometers)}
                                thousandSeparator={true}
                                renderText={formattedValue => <Text>{formattedValue} km</Text>}
                            /> */}
                            <Text style={styles.value}>{Math.round(this.props.details.close_approach_data[0].miss_distance.kilometers)} km</Text>
                            <Text style={styles.title}>Approach Time</Text>
                            <Text style={styles.value}>{this.props.details.close_approach_data[0].close_approach_date_full.substring(this.props.details.close_approach_data[0].close_approach_date_full.indexOf(" "))}</Text>
                        </View>
                    </View>
                </View>
            </Card>
        )
    }
}

const styles = StyleSheet.create({
    card:{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        flexWrap: 'nowrap'
    },
    written:{
        display: 'flex',
        flexDirection: 'column',
        marginHorizontal: 20
    },
    title:{
        fontFamily: 'Archivo Narrow',
        fontSize: 18,
        fontWeight: 'bold',
        color: 'red',
    },
    value:{
        marginVertical: 15,
    },
    main:{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        width:'80%',
        flexWrap: 'nowrap'
    },
    divider:{
        color: 'grey'
    },
    img:{
        maxWidth: '100%',
        height: '100%',
        borderRadius: 150
    },
    left:{
        alignItems:'center',
        justifyContent:'center',
        marginLeft: 20,
        marginBottom: 20
    },
    imgContainer:{
        width: 150,
        height: 150,
        // borderRadius: 50,
        // borderWidth: 1,
        // borderColor:'black'
    }
})