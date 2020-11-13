import {PokeAPI} from '../../../services/Services';
import axios from 'axios';

export const getPokemonDescription = async (id) => {
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

export const getPokemonDetail = async (id) => {
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
