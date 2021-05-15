import React from 'react';
import {TouchableOpacity, Image, StyleSheet} from 'react-native';

const ChildComp = ({
  item,
  style,
  onPress,
  index,
  imageKey,
  height,
}) => {
  return (
    <TouchableOpacity style={styles.container} onPress={() => onPress(index)}>
      <Image
        style={[styles.image, style, {height: height}]}
        source={{uri: item[imageKey]}}
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
    container: {},
    image: {
      height: 230,
      resizeMode: 'stretch',
    },
  });

export default ChildComp;