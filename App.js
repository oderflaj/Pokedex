/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {StatusBar} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

//Store
import {store} from './src/stores/StoreSettings/StoreSttings';
import {Provider} from 'react-redux';

//Components
import Header from './src/components/Header/Header';

//Screens
import HomeScreen from './src/scenes/Home/HomeScreen';
import DetailScreen from './src/scenes/Detail/DetailScreen';

const Stack = createStackNavigator();

const App: () => React$Node = () => {
  return (
    <>
      <StatusBar barStyle="light-content" />

      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerStyle: {
              backgroundColor: '#E93C2C',
            },
            headerTitle: (props) => <Header {...props} />,

            headerTintColor: '#fff',
          }}>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Detail" component={DetailScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
};

//export default App;
export default () => {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
};
