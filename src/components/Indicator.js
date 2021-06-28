import React from 'react';
import { View, StyleSheet } from 'react-native';

const Indicator = ({
    itemCount,
    currentIndex,
    indicatorStyle,
    indicatorContainerStyle,
    indicatorActiveColor,
    indicatorInactiveColor,
    indicatorActiveWidth
}) => {
    return(
        <View style={[styles.container, indicatorContainerStyle]}>
            {renderIndicator(
                itemCount,
                currentIndex,
                indicatorStyle,
                indicatorActiveColor,
                indicatorInactiveColor,
                indicatorActiveWidth
            )}
        </View>
    )
}

export const renderIndicator = (
    count,
    currentIndex,
    indicatorStyle,
    indicatorActiveColor,
    indicatorInactiveColor,
    indicatorActiveWidth
) => {
    let indicators = [];
    for(let i=0;i<count;i++){
        indicators.push(
            <View 
                style={[
                    styles.indicator,
                    indicatorStyle,
                    i === currentIndex 
                    ? indicatorActiveColor 
                        ? {...styles.active,
                           ...{
                               backgroundColor: indicatorActiveColor,
                               width: indicatorActiveWidth
                            },
                        }
                        : styles.active
                    :{...styles.inactive,
                      ...{backgroundColor: indicatorInactiveColor}
                    },
                ]}
            key={i.toString()}
            />,
        )
    }
    return indicators
}

const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      alignSelf: 'center',
    },
    indicator: {
      width: 6,
      height: 6,
      borderRadius: 3,
      marginRight: 5,
    //   color: '#ffffff'
    },
    active: {},
    inactive: {
        backgroundColor: '#bdc3c7'
    },
  });

  export default Indicator;