import React, {useState, useLayoutEffect, useRef} from 'react';
import {View, Text, Image, ScrollView, Alert} from 'react-native';
import {DetailStyle} from './style';
import {PokeAPI, isNetworkAvailable} from '../../services/Services';
import {connect} from 'react-redux';
import axios from 'axios';
import ChartBar from '../../components/ChartBar/ChartBar';
import {PokemonDetails} from '../../../assets/PokeDetail';
import {LanguageCatalog} from '../../services/Settings';

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
      isNetworkAvailable().then((isConnected) => {
        if (isConnected) {
          getPokemonDescription(pokemon.id).then((result) => {
            setDescription(result);
          });
          getPokemonDetail(pokemon.id).then((result) => {
            setDetail(result);
          });
        } else {
          let pokeDet = PokemonDetails.find(
            (pokeDet) => pokeDet.id == pokemon.id,
          );
          setDescription(pokeDet.description || '');
          setDetail(pokeDet.detail);
        }
      });
    }
    return () => {
      unmounted.current = true;
    };
  }, []);

  return (
    <ScrollView>
      <View style={DetailStyle.container}>
        <View style={DetailStyle.containerGeneral}>
          <View style={DetailStyle.baseInformation}>
            <View style={DetailStyle.containerImage}>
              <Image
                source={{uri: PokeAPI.GET_IMAGE.replace('{id}', pokemon.id)}}
                style={{width: 120, height: 120}}
              />
            </View>
            <View style={DetailStyle.containerText}>
              <Text style={[DetailStyle.textColor, {fontSize: 9}]}>
                {pokemon.id.length < 3
                  ? '#' + `00${pokemon.id}`.substr(-1 + pokemon.id.length)
                  : `#${pokemon.id}`}
              </Text>
              <Text style={{fontSize: 18, fontWeight: 'bold'}}>
                {pokemon.name}
              </Text>
              <Text
                style={[DetailStyle.textColor, {fontSize: 9, marginTop: 3}]}>
                <Text
                  style={{
                    fontWeight: 'bold',
                  }}>{`${languageCatalog.Height}: `}</Text>
                {detail.height}m
              </Text>
              <Text
                style={[DetailStyle.textColor, {fontSize: 9, marginTop: 3}]}>
                <Text
                  style={{
                    fontWeight: 'bold',
                  }}>{`${languageCatalog.Weight}: `}</Text>
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
            <View style={DetailStyle.charContainerGeneral}>
              <View style={DetailStyle.chartContainer}>
                <View style={DetailStyle.chartTextContainer}>
                  <Text style={DetailStyle.chartText}>
                    {languageCatalog.HP}
                  </Text>
                </View>
                <ChartBar number={detail.hp} />
              </View>
              <View style={DetailStyle.chartContainer}>
                <View style={DetailStyle.chartTextContainer}>
                  <Text style={DetailStyle.chartText}>
                    {languageCatalog.Attack}
                  </Text>
                </View>
                <ChartBar number={detail.attack} />
              </View>
              <View style={DetailStyle.chartContainer}>
                <View style={DetailStyle.chartTextContainer}>
                  <Text style={DetailStyle.chartText}>
                    {languageCatalog.Defense}
                  </Text>
                </View>
                <ChartBar number={detail.defense} />
              </View>
              <View style={DetailStyle.chartContainer}>
                <View style={DetailStyle.chartTextContainer}>
                  <Text style={DetailStyle.chartText}>
                    {languageCatalog.Speed}
                  </Text>
                </View>
                <ChartBar number={detail.speed} />
              </View>
              <View style={DetailStyle.chartContainer}>
                <View style={DetailStyle.chartTextContainer}>
                  <Text style={DetailStyle.chartText}>
                    {languageCatalog.Sp_Atk}
                  </Text>
                </View>
                <ChartBar number={detail['special-attack']} />
              </View>
              <View style={DetailStyle.chartContainer}>
                <View style={DetailStyle.chartTextContainer}>
                  <Text style={DetailStyle.chartText}>
                    {languageCatalog.Sp_Def}
                  </Text>
                </View>
                <ChartBar number={detail['special-defense']} />
              </View>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const mapStateToProps = (state) => ({
  languageCatalog: state.reducerLanguageApp.languageCatalog,
  language: state.reducerLanguageApp.language,
});

export default connect(mapStateToProps)(DetailScreen);
