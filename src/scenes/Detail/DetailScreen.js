import React, {useLayoutEffect} from 'react';
import {View, Text, Button} from 'react-native';

export default ({navigation}) => {
  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => <View></View>,
    });
  });

  return (
    <View>
      <Text>Detalle</Text>
    </View>
  );
};
