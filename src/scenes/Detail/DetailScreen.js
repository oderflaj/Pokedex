import React, {useState, useLayoutEffect, useRef} from 'react';
import {View, Text, Image, ScrollView, Alert} from 'react-native';
import {DetailStyle} from './style';
import {PokeAPI, isNetworkAvailable} from '../../services/Services';
import {connect} from 'react-redux';
import axios from 'axios';
import {PokemonDetails} from '../../../assets/PokeDetail';
import Statistic from './components/Statistic';
import Description from './components/Description';

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
        Alert.alert(languageCatalog.Not_Found_Description);
        throw error;
      }
    }
  };

  const getPokemonDetail = async (id) => {
    try {
      const CancelToken = axios.CancelToken;
      const source = CancelToken.source();
      const url = PokeAPI.GET_DETAIL.replace('{id}', id);

      const detail = await axios
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
        Alert.alert(languageCatalog.Not_Found_Details);
        throw error;
      }
    }
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => <View></View>,
    });
    if (!unmounted.current) {
      isNetworkAvailable()
        .then((isConnected) => {
          if (isConnected) {
            getPokemonDescription(pokemon.id).then((result) => {
              setDescription(result);
            });
            getPokemonDetail(pokemon.id).then((result) => {
              setDetail(result);
            });
          } else {
            const pokeDet = PokemonDetails.find(
              (pokeDet) => pokeDet.id == pokemon.id,
            );
            setDescription(pokeDet.description || '');
            setDetail(pokeDet.detail);
          }
        })
        .catch((error) => {
          Alert.alert(`${languageCatalog.Error_to_get_Pokemons}:\n${error}`);
        });
    }
    return () => {
      unmounted.current = true;
    };
  }, []);

  return (
    <ScrollView>
      <View style={DetailStyle.container}>
        <>
          <Description
            id={pokemon.id}
            name={pokemon.name}
            height={detail.height}
            weight={detail.weight}
            description={description}
          />
          <View style={DetailStyle.containerStats}>
            <View style={DetailStyle.separatorStats}>
              <View style={DetailStyle.line}></View>
              <Text
                style={[
                  DetailStyle.textColor,
                  {fontSize: 9, fontWeight: 'bold', margin: 10},
                ]}>
                {languageCatalog.STATISTICS}
              </Text>
              <View style={DetailStyle.line}></View>
            </View>
            <>
              <Statistic
                detailName={languageCatalog.HP}
                detailValue={detail.hp}
              />
              <Statistic
                detailName={languageCatalog.Attack}
                detailValue={detail.attack}
              />
              <Statistic
                detailName={languageCatalog.Defense}
                detailValue={detail.defense}
              />
              <Statistic
                detailName={languageCatalog.Speed}
                detailValue={detail.speed}
              />
              <Statistic
                detailName={languageCatalog.Sp_Atk}
                detailValue={detail['special-attack']}
              />
              <Statistic
                detailName={languageCatalog.Sp_Def}
                detailValue={detail['special-defense']}
              />
            </>
          </View>
        </>
      </View>
    </ScrollView>
  );
};

const mapStateToProps = (state) => ({
  languageCatalog: state.reducerLanguageApp.languageCatalog,
  language: state.reducerLanguageApp.language,
});

export default connect(mapStateToProps)(DetailScreen);
