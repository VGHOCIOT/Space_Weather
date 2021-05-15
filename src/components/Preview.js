import React, {Component} from 'react';
import { View,Text,TouchableOpacity,Image,StyleSheet,Platform } from 'react-native';



export default class Preview extends Component {
    // static defaultProps={
    //     width: 400
    // }

    constructor(props){
        super(props)
    }

    render(){
        let PreviewStyle = PreviewSheet.getSheet(this.props.width)
        return(
            <TouchableOpacity
                style={PreviewStyle.videoContainer}
                // onPress={() => onPress(this.props.item)}
            >
                <View style={[PreviewStyle.imageContainer, PreviewStyle.shadow]}>
                    <Image
                        style={[PreviewStyle.videoPreview, this.props.active ? {} : {height: 120}]}
                        style={{width: 400,height:600}}
                        source={{uri: this.props.item[this.props.imageKey]}}
                    />
                </View>
                <Text>{this.props.item.title}</Text>
                <Text style={PreviewStyle.desc} >{this.props.item.explanation}</Text>
            </TouchableOpacity>
        )
    }
}

class PreviewSheet{
    static getSheet(width){
        return StyleSheet.create({
            videoContainer: {
              width: 400,
              paddingVertical: 28,
              justifyContent: 'center',
              alignItems: 'center',
              marginRight: 20,
            },
            videoPreview: {
              width: 275,
              height: 155,
              borderRadius: 30,
              resizeMode: 'cover',
            },
            desc: {
              fontSize: 14,
              letterSpacing: 0,
              lineHeight: 24,
              marginTop: 18,
            },
            imageContainer: {
              justifyContent: 'center',
              alignItems: 'center',
            },
            shadow: {
              shadowColor: 'black',
              shadowOffset: {width: 0, height: 1},
              shadowOpacity: 0.1,
              shadowRadius: 5,
        
            },
        });
    }
}  
