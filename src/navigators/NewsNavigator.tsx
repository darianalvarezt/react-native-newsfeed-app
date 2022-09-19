import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {NewsDetailsScreen, NewsScreen} from '../screens';
import {IArticle} from '../interfaces';

export type NewsStackParamList = {
  News: undefined;
  NewsDetails: {item: IArticle};
};

const Stack = createStackNavigator<NewsStackParamList>();

function NewsNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="News" component={NewsScreen} />
      <Stack.Screen name="NewsDetails" component={NewsDetailsScreen} />
    </Stack.Navigator>
  );
}

export default NewsNavigator;
