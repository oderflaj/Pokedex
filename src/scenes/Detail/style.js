import {StyleSheet} from 'react-native';

export const DetailStyle = new StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
    justifyContent: 'flex-start',
  },
  containerGeneral: {
    width: '90%',
  },

  separatorStats: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    height: 30,
    justifyContent: 'center',
  },
  line: {
    borderWidth: 0.5,
    borderColor: '#B0B4B4',
    flex: 1,
  },

  textColor: {
    color: '#6B6F6F',
  },
});

export const DescriptionStyle = new StyleSheet.create({
  baseInformation: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textColor: {
    color: '#6B6F6F',
  },
});

export const StatisticStyle = new StyleSheet.create({
  chartContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  chartTextContainer: {
    width: 60,
  },
  chartText: {
    color: '#B2ADAD',
    fontSize: 12,
  },
});
