import React, {useState, useEffect} from 'react';
import {View, Text, TextInput, Button} from 'react-native';
import {SearchStyle} from '../style';
import Icon from 'react-native-vector-icons/FontAwesome';
import {connect} from 'react-redux';

const Search = ({languageCatalog}) => {
  const [searchText, setSearchText] = useState('');
  const [showClear, setShowClear] = useState(false);

  const lookForPokemon = (pokeName) => {
    setSearchText(pokeName);
    if (pokeName.length > 0) {
      setShowClear(true);
    } else {
      setShowClear(false);
    }
  };

  return (
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
  //language: state.reducerLanguageApp.language,
  languageCatalog: state.reducerLanguageApp.languageCatalog,
});

export default connect(mapStateToProps)(Search);
