import React, { useState, useEffect } from "react";
import { View, Text, Image, StyleSheet, ScrollView } from "react-native";

const NasaPhoto = ({ navigation }) => {
    const [photoData, setPhotoData] = useState(null);
    const apiKey = process.env.REACT_APP_NASA_KEY;


    useEffect(() => {
        fetchPhoto();

        async function fetchPhoto() {
            const res = await fetch (
                `https://api.nasa.gov/planetary/apod?api_key=n9ut3kOYC2EhESV8Q5HIrJyJspB0taZAxrF04nuD`
            );
            const data = await res.json();
            setPhotoData(data);
        }
    }, []);



    if (!photoData) return <View/>;

    return (
        <ScrollView contentContainerStyle={{display:'flex',alignItems:"left"}}>
                <View>
                    <Image
                        style={{width:900,height:900}}
                        source={{uri:photoData.url}}
                        resizeMode='contain'
                    ></Image>
                </View>
                <Text>{photoData.title}</Text>
                <Text className="date">{photoData.date}</Text>
                <Text className="explanation">{photoData.explanation}</Text>
        </ScrollView>
      );
}


const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flex: 1,
        alignItems:"flex-start",
    },
    largePhoto: {
        width: 50,
        height: 50,
    },
    logo: {
        width: 66,
        height: 58,
    },
    text: {
        fontSize:100
    }
});

export default NasaPhoto;