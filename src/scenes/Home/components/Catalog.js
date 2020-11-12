import React, {useEffect, useState} from 'react';
import {View, Text, ActivityIndicator, FlatList} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {CatalogStyle} from '../style';
import {connect} from 'react-redux';
import * as Service from '../../../services/Services';
import Card from './Card';

const Catalog = ({searchItem}) => {
  const [loading, setLoading] = useState(true);
  const [initialCatalog, setInitialCatalog] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('InitialCalatog');
      //console.log(jsonValue);
      if (jsonValue !== null) {
        console.log('Si hay pokemones');

        setInitialCatalog(JSON.parse(jsonValue));

        setLoading(false);
      } else {
        ////////////////////////////////////////////////
        let xxx = await Service.getInitialCatalog();

        console.log('Noooo hay pokemones');
        ////////////////////////////////////////////////
      }
    } catch (e) {
      console.log(e);
    }
  };

  const getItems = () => {
    let search = searchItem.trim();
    return search.length > 0
      ? initialCatalog.filter((pokemon) => {
          return pokemon.name.includes(search);
        })
      : initialCatalog;
  };

  const renderItem = ({item}) => <Card pokemon={item} />;

  return loading ? (
    <View
      style={[
        CatalogStyle.container,
        {justifyContent: 'center', alignItems: 'center'},
      ]}>
      <ActivityIndicator size="large" color="red" />
    </View>
  ) : (
    <View style={CatalogStyle.container}>
      <FlatList
        contentContainerStyle={{}}
        data={getItems()}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};
const mapStateToProps = (state) => ({
  searchItem: state.reducerCatalog.searchItem,
});
export default connect(mapStateToProps)(Catalog);
