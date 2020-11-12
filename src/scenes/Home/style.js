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
  },
});

const CardStyle = new StyleSheet.create({
  container: {
    borderWidth: 1,
  },
});

export {SearchStyle, CatalogStyle, CardStyle};
