import React from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';

import './src/language/i18n.config';
import {ThemeProvider, ApiProvider} from './src/context';
import {MainNavigator} from './src/navigators';

const App = () => {
  return <MainNavigator />;
};

export default () => {
  return (
    <ThemeProvider>
      <SafeAreaProvider>
        <ApiProvider>
          <App />
        </ApiProvider>
      </SafeAreaProvider>
    </ThemeProvider>
  );
};
