import React, {PureComponent} from 'react';
import { View,Text,TouchableOpacity,Image,StyleSheet,Platform } from 'react-native';
// import { Video, AVPlaybackStatus } from 'expo-av';
import YoutubePlayer from 'react-native-youtube-iframe';
// import Vimeo from 'react-native-vimeo-iframe';
var {Vimeo} = require('react-native-vimeo-iframe');
import VideoPlayer from 'expo-video-player';


export default class Preview extends PureComponent {
    // static defaultProps={
    //     width: 400
    // }

    constructor(props){
        super(props)
    }

    render(){
        let PreviewStyle = PreviewSheet.getSheet(this.props.width)
        // let {resource}
        // console.log(this.props.item[this.props.resourceType])
        // console.log(this.props.width)
        const renderResource = () => {
            if(this.props.item[this.props.resourceType] === 'image'){
                // console.log('here')
                return <Image
                style={[PreviewStyle.videoPreview, this.props.active ? {} : {height: 120}]}
                // style={{width: 200, height:600}}
                source={{uri: this.props.item[this.props.imageKey]}}
                />
            } else {
                if(this.props.item[this.props.imageKey].includes('embed')) {
                    console.log(this.props)
                    return <YoutubePlayer
                        height={200}
                        width={200}
                        play={true}
                        videoId={this.props.item[this.props.imageKey].substring(
                            this.props.item[this.props.imageKey].indexOf("embed/") + "embed/".length,
                            this.props.item[this.props.imageKey].indexOf("?")
                        )}
                    />
                } else {
                    console.log(this.props.item[this.props.imageKey].substring(
                        this.props.item[this.props.imageKey].indexOf("video/") + "video/".length,
                        this.props.item[this.props.imageKey].indexOf("?")))
                    return <Vimeo
                        // height={200}
                        // width={200}
                        // play={true}
                        videoId={'\'' + this.props.item[this.props.imageKey].substring(
                            this.props.item[this.props.imageKey].indexOf("video/") + "video/".length,
                            this.props.item[this.props.imageKey].indexOf("?") + '\''
                        )}
                    />
                    // return <VideoPlayer
                    //     // ref={video}
                    //     videoProps={{
                    //         shouldPlay: true,
                    //         // resizeMode: Video.RESIZE_MODE_CONTAIN,
                    //         source:{
                    //             uri: this.props.item[this.props.imageKey]
                    //         },
                    //     }}
                        // height={200}
                        // width={200}
                        // videoId={this.props.item[this.props.imageKey].substring(
                        //     this.props.item[this.props.imageKey].indexOf("video/") + "video/".length,
                        //     this.props.item[this.props.imageKey].indexOf("?")
                        // )}
                    // />
                }
            }   
        }   

        return(
            <TouchableOpacity
                style={PreviewStyle.videoContainer}
                // onPress={() => onPress(this.props.item)}
            >
                <View style={[PreviewStyle.imageContainer, PreviewStyle.shadow]}>
                    {renderResource()}
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
              width: width,
              paddingVertical: 28,
              paddingHorizontal: 10,
              justifyContent: 'center',
              alignItems: 'center',
            //   marginRight: 40,
            },
            videoPreview: {
              width: width,
              height: 155,
              borderRadius: 30,
              resizeMode: 'cover',
              paddingHorizontal: 10
            },
            desc: {
              fontSize: 14,
              letterSpacing: 0,
              lineHeight: 24,
              marginTop: 18,
            },
            imageContainer: {
              width: width,
              justifyContent: 'center',
              alignItems: 'center',
              marginHorizontal: 10
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
