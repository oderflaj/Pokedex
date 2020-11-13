import {StyleSheet} from 'react-native';

export const ChartStyle = new StyleSheet.create({
  containerChart: {
    width: '80%',
    alignItems: 'center',
    justifyContent: 'flex-start',
    flexDirection: 'row',
  },
  blueLine: {
    borderTopLeftRadius: 3,
    borderBottomLeftRadius: 3,
    height: 7,
    backgroundColor: '#0D69B8',
  },

  greyLine: {
    borderTopRightRadius: 3,
    borderBottomRightRadius: 3,
    height: 7,
    backgroundColor: '#DAD7D7',
  },
  containerText: {
    width: 35,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 0.5,
    borderRadius: 3,
    borderColor: '#D5D6D7',
  },
  text: {
    fontSize: 12,
    fontWeight: 'bold',
  },
});
