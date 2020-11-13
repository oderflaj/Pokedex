import React, {useEffect} from 'react';
import {Text, Button} from 'react-native';
import Search from './components/Search';
import Catalog from './components/Catalog';

export default ({navigation}) => {
  useEffect(() => {}, []);
  return (
    <>
      <Search />
      <Catalog navigation={navigation} />
    </>
  );
};
