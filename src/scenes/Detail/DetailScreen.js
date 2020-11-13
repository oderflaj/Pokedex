import React, {useState, useLayoutEffect, useRef} from 'react';
import {View, Text, Image} from 'react-native';
import {DetailStyle} from './style';
import {PokeAPI} from '../../services/Services';
import {connect} from 'react-redux';
import axios from 'axios';

const DetailScreen = ({navigation, route, language, languageCatalog}) => {
  const pokemon = route.params.pokemon;
  const [description, setDescription] = useState('');
  const [detail, setDetail] = useState({});
  const unmounted = useRef(false);

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
      if (typeof description.flavor_text == 'undefined') {
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

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => <View></View>,
    });
    if (!unmounted.current) {
      getPokemonDescription(pokemon.id).then((result) => {
        setDescription(result);
      });
      getPokemonDetail(pokemon.id).then((result) => {
        setDetail(result);
      });
    }
    return () => {
      unmounted.current = true;
    };
  }, []);

  return (
    <View style={DetailStyle.container}>
      <View style={DetailStyle.containerGeneral}>
        <View style={DetailStyle.baseInformation}>
          <View>
            <Image
              source={{uri: PokeAPI.GET_IMAGE.replace('{id}', pokemon.id)}}
              style={{width: 140, height: 140}}
            />
          </View>
          <View>
            <Text style={[DetailStyle.textColor, {fontSize: 9}]}>
              {pokemon.id.length < 3
                ? '#' + `00${pokemon.id}`.substr(-1 + pokemon.id.length)
                : `#${pokemon.id}`}
            </Text>
            <Text style={{fontSize: 18, fontWeight: 'bold'}}>
              {pokemon.name}
            </Text>
            <Text style={[DetailStyle.textColor, {fontSize: 9, marginTop: 3}]}>
              <Text style={{fontWeight: 'bold'}}>{`Height: `}</Text>
              {detail.height}m
            </Text>
            <Text style={[DetailStyle.textColor, {fontSize: 9, marginTop: 3}]}>
              <Text style={{fontWeight: 'bold'}}>{`Weight: `}</Text>
              {detail.weight}kg
            </Text>
          </View>
        </View>

        <Text
          style={[
            DetailStyle.textColor,
            {marginTop: 5, marginBottom: 25, textAlign: 'center'},
          ]}>
          {description}
        </Text>
        <View style={DetailStyle.containerStats}>
          <Text
            style={[
              DetailStyle.textColor,
              {fontSize: 9, fontWeight: 'bold', marginBottom: 15},
            ]}>
            S T A T I S T I C S
          </Text>
          <Text>{detail.hp}</Text>
          <Text>{detail.attack}</Text>
          <Text>{detail.defense}</Text>
          <Text>{detail.speed}</Text>
          <Text>{detail['special-attack']}</Text>
          <Text>{detail['special-defense']}</Text>
        </View>
      </View>
    </View>
  );
};

const mapStateToProps = (state) => ({
  languageCatalog: state.reducerLanguageApp.languageCatalog,
  language: state.reducerLanguageApp.language,
});

export default connect(mapStateToProps)(DetailScreen);
