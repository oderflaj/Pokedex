import React from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import {CardStyle} from '../style';
import {PokeAPI} from '../../../services/Services';

export default ({pokemon, navigation}) => {
  const urlImage = PokeAPI.GET_IMAGE.replace('{id}', pokemon.id);

  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate('Detail', {pokemon: pokemon});
      }}>
      <View style={CardStyle.container}>
        <View style={CardStyle.imageContainer}>
          <Image
            source={{
              uri: urlImage,
            }}
            style={{width: 85, height: 70}}
          />
        </View>
        <Text>{pokemon.name}</Text>
      </View>
    </TouchableOpacity>
  );
};
