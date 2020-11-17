/* global __DEV__ */
import 'react-native';
import React from 'react';
import ChartBar from '../src/components/ChartBar/ChartBar';
import renderer from 'react-test-renderer';

describe('<ChartBar/>', () => {
  it('Test to render correctly with a value between 0 and 85', () => {
    const ChartBarData = renderer.create(<ChartBar number={150} />).toJSON();
    expect(ChartBarData).toMatchSnapshot();
  });

  it('It is getting an equal result of maximum percentage using two different values in 2 components: 101 and 126', () => {
    const ChartBarData1 = renderer.create(<ChartBar number={101} />);
    //console.log(ChartBarData1.toJSON().children[0].props.style[1]);

    const ChartBarData2 = renderer.create(<ChartBar number={126} />);
    //console.log(ChartBarData2);

    expect(ChartBarData1.toJSON().children[0].props.style[1].width).toBe(
      ChartBarData2.toJSON().children[0].props.style[1].width,
    );
  });

  it('It is getting a different result of maximum and normal percentage using two different values in 2 components: 55 and 126', () => {
    const ChartBarData1 = renderer.create(<ChartBar number={55} />);
    expect(ChartBarData1.toJSON().children[0].props.style[1].width).toBe('45%');

    const ChartBarData2 = renderer.create(<ChartBar number={126} />);
    expect(ChartBarData2.toJSON().children[0].props.style[1].width).toBe('90%');
  });

  it('It is geting value less 15 for percentage between 90% and 100%, for 97 the value is 82%', () => {
    const ChartBarData1 = renderer.create(<ChartBar number={97} />);
    expect(ChartBarData1.toJSON().children[0].props.style[1].width).toBe('82%');
  });

  it('It is geting always 90% when the percentage is over 100%, for 107 it is getting 90%', () => {
    const ChartBarData1 = renderer.create(<ChartBar number={107} />);
    expect(ChartBarData1.toJSON().children[0].props.style[1].width).toBe('90%');
  });
});
