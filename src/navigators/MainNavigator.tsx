import React, {useContext} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {useTranslation} from 'react-i18next';

import NewsNavigator from './NewsNavigator';
import {SettingsScreen} from '../screens';
import {ThemeContext} from '../context';
import {darkTheme, lightTheme} from '../theme/theme.config';

const Tab = createBottomTabNavigator();

export default () => {
  const {isDarkMode} = useContext(ThemeContext);
  const {t} = useTranslation();
  return (
    <NavigationContainer theme={isDarkMode ? darkTheme : lightTheme}>
      <Tab.Navigator
        screenOptions={({route}) => ({
          tabBarIcon: ({focused, color, size}) => {
            let iconName = 'ios-information-circle';

            if (route.name === 'News' && !focused) {
              iconName = 'ios-information-circle-outline';
            } else if (route.name === 'Settings') {
              iconName = focused ? 'list-circle' : 'list';
            }

            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: 'tomato',
          tabBarInactiveTintColor: 'gray',
        })}>
        <Tab.Screen
          name="Main"
          component={NewsNavigator}
          options={{
            headerShown: false,
            title: `${t('screen.news.title')}`,
          }}
        />
        <Tab.Screen
          name="Settings"
          component={SettingsScreen}
          options={{
            title: `${t('screen.settings.title')}`,
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};
