import React from 'react';
import {View, Text, TextInput} from 'react-native';
import {SearchStyle} from '../style';

export default () => {
  return (
    <View style={SearchStyle.container}>
      <View style={SearchStyle.subContainer}>
        <TextInput placeholder="Search" />
      </View>
    </View>
  );
};
