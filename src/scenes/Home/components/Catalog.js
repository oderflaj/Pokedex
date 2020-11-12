import React, {useEffect, useState} from 'react';
import {View, ActivityIndicator, FlatList} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {CatalogStyle} from '../style';
import {connect} from 'react-redux';
import * as Service from '../../../services/Services';
import Card from './Card';
import Message from '../../../components/Message/Message';

const Catalog = ({searchItem, navigation}) => {
  const [loading, setLoading] = useState(true);
  const [initialCatalog, setInitialCatalog] = useState([]);
  const [showMessage, setShowMessage] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    //AsyncStorage.clear();
    try {
      if (showMessage) setShowMessage(false);

      const jsonValue = await AsyncStorage.getItem('InitialCalatog');

      if (jsonValue !== null) {
        //POKEMONS
        console.log('Si hay pokemones');

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
      : initialCatalog;
  };

  const renderItem = ({item}) => (
    <Card pokemon={item} navigation={navigation} />
  );

  //maxToRenderPerBatch
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
        onScrollEndDrag={() => console.log(' *********end')}
        onScrollBeginDrag={() => console.log(' *******start')}
        initialNumToRender={8}
        maxToRenderPerBatch={2}
        onEndReachedThreshold={0.5}
      />
    </View>
  );
};
const mapStateToProps = (state) => ({
  searchItem: state.reducerCatalog.searchItem,
});
export default connect(mapStateToProps)(Catalog);
