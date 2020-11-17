import React from 'react';
import {View, Image} from 'react-native';
import Styles from './style';
import {ImageLogo} from '../../../assets/Images64';

export default () => {
  return (
    <View style={Styles.imageContainer}>
      <Image source={{uri: ImageLogo}} style={Styles.imageStyle} />
    </View>
  );
};
