import React, {useState, useLayoutEffect} from 'react';
import {View, Text, Button} from 'react-native';
import {DetailStyle} from './style';
import {PokeAPI} from '../../services/Services';
import {connect} from 'react-redux';
///////////////
import axios from 'axios';

const DetailScreen = ({navigation, route, language, languageCatalog}) => {
  const pokemon = route.params.pokemon;
  const [description, setDescription] = useState('');
  const [detail, setDetail] = useState({});

  const getPokemonDescription = async (id) => {
    try {
      const CancelToken = axios.CancelToken;
      const source = CancelToken.source();
      const url = PokeAPI.GET_DESCRIPTION.replace('{id}', id);

      let description = await axios
        .get(url, {cancelToken: source.token})
        .then((pokemonDescription) => {
          return pokemonDescription.data.flavor_text_entries.find(
            (poke) => poke.language.name == language.substring(0, 2),
          );
        });
      //Get Information by default English
      if (typeof description.flavor_text_ == 'undefined') {
        description = await axios
          .get(url, {cancelToken: source.token})
          .then((pokemonDescription) => {
            return pokemonDescription.data.flavor_text_entries.find(
              (poke) => poke.language.name == 'en',
            );
          });
      }

      return description.flavor_text;
    } catch (error) {
      if (axios.isCancel(error)) {
        console.log('cancelled');
      } else {
        throw error;
      }
    }
  };

  const getPokemonDetail = async (id) => {
    try {
      const CancelToken = axios.CancelToken;
      const source = CancelToken.source();
      const url = PokeAPI.GET_DETAIL.replace('{id}', id);

      let detail = await axios
        .get(url, {cancelToken: source.token})
        .then((pokemonDetail) => {
          let newPokemonDetail = {
            height: pokemonDetail.data.height / 10,
            weight: pokemonDetail.data.weight / 10,
          };

          pokemonDetail.data.stats.forEach(
            (stat) => (newPokemonDetail[stat.stat.name] = stat.base_stat),
          );

          return newPokemonDetail;
        });

      return detail;
    } catch (error) {
      if (axios.isCancel(error)) {
        console.log('cancelled');
      } else {
        throw error;
      }
    }
  };

  getPokemonDescription(pokemon.id).then((result) => setDescription(result));
  getPokemonDetail(pokemon.id).then((result) => setDetail(result));

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => <View></View>,
    });
  });

  return (
    <View style={DetailStyle.container}>
      <Text>Detalle</Text>
      <Text>{description}</Text>
    </View>
  );
};

const mapStateToProps = (state) => ({
  languageCatalog: state.reducerLanguageApp.languageCatalog,
  language: state.reducerLanguageApp.language,
});

export default connect(mapStateToProps)(DetailScreen);
