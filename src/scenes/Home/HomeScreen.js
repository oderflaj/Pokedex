import React from 'react';
import Search from './components/Search';
import Catalog from './components/Catalog';

export default ({navigation}) => {
  return (
    <>
      <Search />
      <Catalog navigation={navigation} />
    </>
  );
};
