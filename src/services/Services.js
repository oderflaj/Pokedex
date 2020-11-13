import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';
import {store} from '../stores/StoreSettings/StoreSttings';

import * as ActionsCatalog from '../stores/Catalog/actions';

export const PokeAPI = {
  GET_LIST: 'https://pokeapi.co/api/v2/pokemon?offset={before}&limit={next}',
  GET_DETAIL: 'https://pokeapi.co/api/v2/pokemon/{id}/',
  GET_DESCRIPTION: 'https://pokeapi.co/api/v2/pokemon-species/{id}/',
  GET_IMAGE:
    'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/{id}.png',
};

export const PAGINATION = 50;

export const getCountPokemon = async () => {
  try {
    let url = PokeAPI.GET_LIST;
    url = url.replace('{before}', '0');
    url = url.replace('{next}', '1');

    let quantity = await axios.get(url).then((result) => {
      return result.data.count;
    });

    store.dispatch(ActionsCatalog.setCount(quantity));
    return quantity;
  } catch (error) {
    throw error;
  }
};

export const getInitialCatalog = async () => {
  try {
    let quantity = await getCountPokemon();

    let url = PokeAPI.GET_LIST;
    url = url.replace('{before}', '0');
    url = url.replace('{next}', quantity);

    let pokemonsInitial = await axios
      .get(url)
      .then((result) => {
        return result.data.results;
      })
      .then((pokemons) => {
        return pokemons.map((pokemon) => {
          let auxId = pokemon.url.split('/');
          pokemon['id'] = auxId[auxId.length - 2];
          pokemon.name =
            pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);
          return pokemon;
        });
      });
    store.dispatch(ActionsCatalog.setInitialCatalog(pokemonsInitial));
    const jsonValue = JSON.stringify(pokemonsInitial);
    await AsyncStorage.setItem('InitialCalatog', jsonValue);
    AsyncStorage.setItem;

    //console.log(pokemonsInitial);
    return pokemonsInitial;
  } catch (error) {
    throw error;
  }
};

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

export const getDataDetails = (initialCatalog) => {
  try {
    let pokemonDetails = [];
    initialCatalog.forEach((pokemon) => {
      let pokemonAux = {};

      pokemonAux['id'] = pokemon.id;
      /*
      getPokemonDescription(pokemon.id)
        .then((pokeDesc) => (pokemonAux['description'] = pokeDesc))
        .then(() => {
          getPokemonDetail(pokemon.id).then(
            (pokeDetail) => (pokemonAux['detail'] = pokeDetail),
          );
        })
        .then(() => pokemonDetails.push(pokemonAux));
        */
    });
    //pokemonDetails.push(pokemonAux);

    //console.log(pokemonDetails[0]);
  } catch (error) {}
};
