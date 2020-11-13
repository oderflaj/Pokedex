import React, {useEffect, useState, useRef} from 'react';
import {View, ActivityIndicator, FlatList, Text} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {CatalogStyle} from '../style';
import {connect} from 'react-redux';
import * as Service from '../../../services/Services';
import Card from './Card';
import Message from '../../../components/Message/Message';

const Catalog = ({searchItem, navigation, languageCatalog}) => {
  const [loading, setLoading] = useState(true);
  const [initialCatalog, setInitialCatalog] = useState([]);
  const [showMessage, setShowMessage] = useState(false);
  const [message, setMessage] = useState('');
  const [indexPage, setIndexPage] = useState(Service.PAGINATION);
  const [loadingPage, setLoadingPage] = useState(false);

  const unmounted = useRef(false);

  useEffect(() => {
    getData();
    return () => {
      unmounted.current = true;
    };
  }, []);

  const getData = async () => {
    //AsyncStorage.clear();
    try {
      if (showMessage) setShowMessage(false);

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
      setMessage(e);
      setShowMessage(true);
    }
  };

  const getMessage = () => {
    return <Message type={'error'} message={message} />;
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
    return loadingPage ? (
      <View style={{width: 30, height: 30, margin: 30}}>
        <ActivityIndicator size="small" color="red" />
      </View>
    ) : (
      <></>
    );
  };

  return showMessage ? (
    getMessage()
  ) : loading ? (
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
        onScrollBeginDrag={() => console.log(' *******start')}
        onEndReachedThreshold={0.5}
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
