import React from 'react';
import {View, Text, Image} from 'react-native';
import {connect} from 'react-redux';
import {DescriptionStyle} from '../style';
import {PokeAPI} from '../../../services/Services';

const Description = ({
  id,
  name,
  height,
  weight,
  description,
  languageCatalog,
}) => {
  return (
    <>
      <View style={DescriptionStyle.baseInformation}>
        <View style={DescriptionStyle.containerImage}>
          <Image
            source={{uri: PokeAPI.GET_IMAGE.replace('{id}', id)}}
            style={{width: 120, height: 120}}
          />
        </View>
        <View style={DescriptionStyle.containerText}>
          <Text style={[DescriptionStyle.textColor, {fontSize: 9}]}>
            {id.length < 3 ? '#' + `00${id}`.substr(-1 + id.length) : `#${id}`}
          </Text>
          <Text style={{fontSize: 18, fontWeight: 'bold'}}>{name}</Text>
          <Text
            style={[DescriptionStyle.textColor, {fontSize: 9, marginTop: 3}]}>
            <Text
              style={{
                fontWeight: 'bold',
              }}>{`${languageCatalog.Height}: `}</Text>
            {height}m
          </Text>
          <Text
            style={[DescriptionStyle.textColor, {fontSize: 9, marginTop: 3}]}>
            <Text
              style={{
                fontWeight: 'bold',
              }}>{`${languageCatalog.Weight}: `}</Text>
            {weight}kg
          </Text>
        </View>
      </View>
      <Text
        style={[
          DescriptionStyle.textColor,
          {marginTop: 5, marginBottom: 25, textAlign: 'center'},
        ]}>
        {description}
      </Text>
    </>
  );
};

const mapStateToProps = (state) => ({
  languageCatalog: state.reducerLanguageApp.languageCatalog,
});

export default connect(mapStateToProps)(Description);
