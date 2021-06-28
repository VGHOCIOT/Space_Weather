
import React, {PureComponent, createRef} from 'react';
import {
  FlatList,
  View,
  StyleSheet,
  LayoutAnimation,
  Dimensions,
} from 'react-native';
import Indicator from './Indicator';
import Preview from './Preview';

export default class FlatListSlider extends PureComponent {
    slider = createRef();

    static defaultProps = {
        data: [],
        imageKey:'url',
        resourceType:'media_type',
        width: '',
        height: 230,
        seperatorWidth: 0,
        loop: false,
        indicator: true,
        indicatorStyle: {},
        indicatorContainerStyle: {},
        indicatorActiveColor: '#3498db',
        indicatorInactiveColor: '#bdc3c7',
        indicatorActiveWidth: 6,
        animation: true,
        autoScroll: false,
        onPress: {},
        contentContainerStyle: {},
        component: <Preview/>
    }

    constructor(props){
        super(props);
        this.state = {
            index: 0,
            data: this.props.data
        }
    }

    componentDidUpdate(prevProps){
        if(prevProps.data !== this.props.data){
            this.setState({ data: this.props.data })
        }
    }

    onViewableItemsChanged = ({viewableItems, changed}) => {
        if(viewableItems.length > 0){
            let currentIndex = viewableItems[0].index;

            if(currentIndex % this.props.data.length === this.props.data.length - 1 && this.props.loop){
                this.setState({
                    index:currentIndex,
                    data:[...this.state.data, ...this.props.data]
                });
            }
            else {
                this.setState({index:currentIndex})
            }

            if(this.props.currentIndexCallback){
                this.props.currentIndexCallback(currentIndex);
            }
        }
    }

    viewabilityConfig = {
        viewAreaCoveragePercentThreshold: 50,
    };

    changeSliderListIndex = () => {
        if(this.props.animation){
            LayoutAnimation.configureNext(LayoutAnimation.Presets.easeIn);
        }

        this.setState({index: this.state.index + 1});
        this.slider.current.scrollToIndex({
            index: this.state.index,
            animated:true
        })
        // console.log(this.state.index)
    }
    
    render(){
        const itemWidth = this.props.width;
        const separatorWidth = this.props.separatorWidth;
        const totalItemWidth = itemWidth + separatorWidth;
        console.log(this.props.width)
        return(
            <React.Fragment>
                <View style={styles.container}>
                    <FlatList
                        ref={this.slider}
                        horizontal
                        pagingEnabled
                        snapToInterval={this.props.width}
                        decelerationRate="fast"
                        bounces={false}
                        contentContainerStyle={this.props.contentContainerStyle}
                        data={this.state.data}
                        showsHorizontalScrollIndicator={false} //DOUBLE CHECK
                        renderItem={({item, index}) => 
                            React.cloneElement(this.props.component, {
                                width: this.props.width,
                                item: item,
                                imageKey: this.props.imageKey,
                                resourceType: this.props.resourceType,
                                onPress: this.props.onPress,
                                index: this.state.index % this.props.data.length,
                                active: index === this.state.index,
                                height: this.props.height
                            })
                        }
                        ItemSeparatorComponent={() => (
                            <View style={{width: this.props.separatorWidth}}/>
                        )}
                        keyExtractor={(item,index) => JSON.stringify(item) + index}
                        onViewableItemsChanged={this.onViewableItemsChanged}
                        viewabilityConfig={this.viewabilityConfig}
                        getItemLayout={(data, index) => ({
                            length: this.props.width,
                            offset: this.props.width * index,
                            index
                        })}
                        // windowSize={1}
                        // initialNumToRender={1}
                        // maxToRenderPerBatch={1}
                        // removeClippedSubviews={true}
                    />
                    {this.props.indicator && (
                        <Indicator
                            itemCount = {this.props.data.length}
                            currentIndex = {this.state.index % this.props.data.length}
                            indicatorStyle = {this.props.indicatorStyle}
                            indicatorContainerStyle={[
                                styles.indicatorContainerStyle,
                                this.props.indicatorContainerStyle
                            ]}
                            indicatorActiveColor={this.props.indicatorActiveColor}
                            indicatorInactiveColor={this.props.indicatorInactiveColor}
                            indicatorActiveWidth={this.props.indicatorActiveWidth}
                            style={{...styles.indicator, ...this.props.indicatorStyle}}
                        />
                    )}
                </View>
            </React.Fragment>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        // margin: 20,
        // flexGrow: 1,
        // alignItems: 'center'
    },
    image: {
      height: 230,
      resizeMode: 'stretch',
    },
    indicatorContainerStyle: {
      marginTop: 18,
      position: 'absolute',
      bottom: 20
    },
    shadow: {
      shadowColor: 'black',
      shadowOffset: {width: 3, height: 3},
      shadowOpacity: 0.4,
      shadowRadius: 10,
    }
})