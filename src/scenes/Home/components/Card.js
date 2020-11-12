import React from 'react';
import {View, Text, Image} from 'react-native';
import {CardStyle} from '../style';

export default ({pokemon}) => {
  return (
    <View style={CardStyle.container}>
      <Text>{pokemon.id}</Text>
      <Text>{pokemon.name}</Text>
      <Text>{pokemon.url}</Text>
    </View>
  );
};
