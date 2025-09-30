import React from 'react';
import {Provider} from 'react-redux';
import AppNavigator from './src/navigation/AppNavigator';
import {store} from './src/redux';
import {SafeAreaProvider} from 'react-native-safe-area-context';

export default function App() {
  return (
    <SafeAreaProvider>
      <Provider store={store}>
        <AppNavigator />
      </Provider>
    </SafeAreaProvider>
  );
}
