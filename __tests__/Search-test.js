import 'react-native';
import React from 'react';
import Search from '../src/scenes/Home/components/Search';
import mockAxios from 'axios';
import renderer from 'react-test-renderer';
import {interpolate} from 'react-native-reanimated';

interpolate('Function lookForPokemon to search the pokemon is typing', () => {
  let SearchData = renderer.create(<Search />).getInstance();

  SearchData.lookForPokemon('hitm');

  expect(SearchData.state.searchText).toEqual('hit');
});
