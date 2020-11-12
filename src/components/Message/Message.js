import React from 'react';
import {View, Text} from 'react-native';
import {connect} from 'react-redux';
import {MessageStyle} from './style';

const Message = ({languageCatalog, type, message}) => {
  switch (type) {
    case 'information':
      return (
        <View style={MessageStyle}>
          <Text>{languageCatalog.Information}</Text>
          <Text>{message}</Text>
        </View>
      );
    case 'error':
      return (
        <View style={MessageStyle.errorMessageContainer}>
          <Text>{languageCatalog.Error}</Text>
          <Text>{message}</Text>
        </View>
      );
  }
};

const mapStateToProps = (state) => ({
  languageCatalog: state.reducerLanguageApp.languageCatalog,
});

export default connect(mapStateToProps)(Message);
