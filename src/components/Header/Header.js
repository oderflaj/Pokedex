import React from 'react';
import {View, Text, Image} from 'react-native';
import Styles from './style';

export default () => {
  return (
    <View style={Styles.imageContainer}>
      <Image
        source={require('../../../assets/Pokemon_Logo.png')}
        style={Styles.imageStyle}
      />
    </View>
  );
};
