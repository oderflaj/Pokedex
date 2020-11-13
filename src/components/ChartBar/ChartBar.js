import React from 'react';
import {View, Text} from 'react-native';
import {ChartStyle} from './style';

export default ({number}) => {
  const blueSize = `${
    number > 90 ? (number > 100 ? 90 : number - 15) : number - 10
  }%`;
  const greySize = `${100 - number - 10}%`;
  return (
    <View style={[ChartStyle.containerChart]}>
      <View style={[ChartStyle.blueLine, {width: blueSize}]}></View>
      <View style={[ChartStyle.containerText]}>
        <Text style={ChartStyle.text}>{number}</Text>
      </View>
      <View style={[ChartStyle.greyLine, {width: greySize}]}></View>
    </View>
  );
};
