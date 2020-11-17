import React, {useEffect, useState} from 'react';
import {View, ActivityIndicator, FlatList, Text} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {CatalogStyle} from '../style';
import {connect} from 'react-redux';
import * as Service from '../../../services/Services';
import Card from './Card';

const Catalog = ({searchItem, navigation, languageCatalog}) => {
  const [loading, setLoading] = useState(true);
  const [initialCatalog, setInitialCatalog] = useState([]);
  const [indexPage, setIndexPage] = useState(Service.PAGINATION);
  const [loadingPage, setLoadingPage] = useState(false);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    //AsyncStorage.clear();
    try {
      const jsonValue = await AsyncStorage.getItem('InitialCalatog');

      if (jsonValue !== null) {
        //POKEMONS
        setInitialCatalog(JSON.parse(jsonValue));
        setLoading(false);
      } else {
        //NO POKEMONS
        try {
          await Service.getInitialCatalog().then((result) => {
            setInitialCatalog(result);
            setLoading(false);
          });
        } catch (error) {
          throw error;
        }
      }
    } catch (e) {
      Alert(`${languageCatalog.Error_to_get_Pokemons}:\n${e}`);
    }
  };

  //FlatList Configuration
  const getItems = () => {
    let search = searchItem.trim().toLowerCase();
    return search.length > 0
      ? initialCatalog.filter((pokemon) => {
          return pokemon.name.toLowerCase().includes(search);
        })
      : initialCatalog.slice(0, indexPage);
  };

  const handleLoadMorePokemons = () => {
    setLoadingPage(true);
    let index = indexPage + Service.PAGINATION;
    if (index > initialCatalog.length) {
      setIndexPage(initialCatalog.length - 1);
    } else {
      setIndexPage(index);
    }
    setLoadingPage(false);
  };

  const renderItem = ({item}) => (
    <Card pokemon={item} navigation={navigation} />
  );

  const renderFooter = () => {
    return searchItem.trim().length == 0 && indexPage ? (
      <View style={{width: 30, height: 30, margin: 30}}>
        <ActivityIndicator size="small" color="red" />
      </View>
    ) : (
      <></>
    );
  };

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
        data={getItems()}
        contentContainerStyle={CatalogStyle.contentContainerStyle}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        numColumns={3}
        style={CatalogStyle.flatListContainer}
        onScrollEndDrag={() => handleLoadMorePokemons()}
        onEndReachedThreshold={1.5}
        ListFooterComponent={() => renderFooter()}
        ListEmptyComponent={() => (
          <>
            <Text>{languageCatalog.Not_Found_Pokemon}</Text>
          </>
        )}
      />
    </View>
  );
};
const mapStateToProps = (state) => ({
  searchItem: state.reducerCatalog.searchItem,
  language: state.reducerLanguageApp.language,
  languageCatalog: state.reducerLanguageApp.languageCatalog,
});
export default connect(mapStateToProps)(Catalog);
