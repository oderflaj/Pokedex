import {StyleSheet} from 'react-native';

const SearchStyle = new StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 6,
    paddingBottom: 6,
    width: '100%',
    justifyContent: 'space-around',
    position: 'relative',
  },
  subContainer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'rgba(220, 218, 218, 0.72)',
    alignItems: 'center',
    paddingLeft: 7,
    paddingRight: 7,
    height: 40,
    borderRadius: 14,
  },
});

const CatalogStyle = new StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(220, 218, 218, 0.72)',
    padding: 10,
    alignItems: 'center',
  },
  flatListContainer: {
    flex: 1,
  },
  contentContainerStyle: {
    alignItems: 'center',
  },
  pokeball: {
    borderWidth: 1,
  },
});

const CardStyle = new StyleSheet.create({
  container: {
    width: 90,
    alignItems: 'center',
    margin: 10,
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 5,
  },
  imageContainer: {
    alignItems: 'center',
  },
});

export {SearchStyle, CatalogStyle, CardStyle};
