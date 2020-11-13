/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useEffect} from 'react';
import {StatusBar, NativeModules, Platform} from 'react-native';
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

//Settings
import {setLanguage} from './src/stores/Languages/actions';

const Stack = createStackNavigator();

const App: () => React$Node = () => {
  /*
  const deviceLanguage =
    Platform.OS === 'ios'
      ? NativeModules.SettingsManager.settings.AppleLocale ||
        NativeModules.SettingsManager.settings.AppleLanguages[0] // iOS 13
      : NativeModules.I18nManager.localeIdentifier;
      */
  const deviceLanguage = NativeModules.I18nManager.localeIdentifier;

  useEffect(() => {
    store.dispatch(setLanguage(deviceLanguage));
  }, [0]);

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
