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
