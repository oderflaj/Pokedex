import React from 'react';
import {View, Text} from 'react-native';
import {StatisticStyle} from '../style';
import ChartBar from '../../../components/ChartBar/ChartBar';

export default ({detailName, detailValue}) => {
  return (
    <View style={StatisticStyle.chartContainer}>
      <View style={StatisticStyle.chartTextContainer}>
        <Text style={StatisticStyle.chartText}>{detailName}</Text>
      </View>
      <ChartBar number={detailValue} />
    </View>
  );
};
