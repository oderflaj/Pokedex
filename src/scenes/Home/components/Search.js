import React, {useState} from 'react';
import {View, TextInput, Button} from 'react-native';
import {SearchStyle} from '../style';
import Icon from 'react-native-vector-icons/FontAwesome';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as SearchActions from '../../../stores/Catalog/actions';

const SearchAux = ({languageCatalog, actions}) => {
  const [searchText, setSearchText] = useState('');
  const [showClear, setShowClear] = useState(false);

  const lookForPokemon = (pokeName) => {
    setSearchText(pokeName.trim());
    if (pokeName.length > 0) {
      actions.setSearchItem(pokeName);
      setShowClear(true);
    } else {
      actions.setSearchItem('');
      setShowClear(false);
    }
  };

  return typeof languageCatalog == 'undefined' ? (
    <></>
  ) : (
    <View style={SearchStyle.container}>
      <View style={SearchStyle.subContainer}>
        <Icon
          style={{textAlign: 'center', marginRight: 3, marginLeft: 3}}
          name="search"
          size={15}
          color="#9F9F9F"
        />
        <View style={{width: '80%'}}>
          <TextInput
            placeholder={languageCatalog.Search}
            value={searchText}
            onChangeText={(text) => lookForPokemon(text)}
            style={{textAlign: 'left'}}
          />
        </View>

        {!showClear ? (
          <View
            style={{
              flex: 1,
              flexDirection: 'row-reverse',
            }}>
            <Icon
              style={{
                textAlign: 'center',
                marginRight: 3,
                marginLeft: 3,
              }}
              name="microphone"
              size={15}
              color="#9F9F9F"
            />
          </View>
        ) : (
          <></>
        )}
      </View>
      {showClear ? (
        <View
          style={{
            marginLeft: 8,
            flexDirection: 'column',
            justifyContent: 'center',
          }}>
          <Button
            title={languageCatalog.Cancel}
            onPress={() => {
              setSearchText('');
              actions.setSearchItem('');
              setShowClear(false);
            }}
          />
        </View>
      ) : (
        <></>
      )}
    </View>
  );
};
const mapStateToProps = (state) => ({
  languageCatalog: state.reducerLanguageApp.languageCatalog,
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(SearchActions, dispatch),
});

const Search = connect(mapStateToProps, mapDispatchToProps)(SearchAux);
export default Search;
