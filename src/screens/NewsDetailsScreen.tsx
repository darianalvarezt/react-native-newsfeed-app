import React, {useEffect} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {ScrollView, StyleSheet, useWindowDimensions} from 'react-native';
import type {StackScreenProps} from '@react-navigation/stack';
import RenderHtml from 'react-native-render-html';

import {IArticle} from '../interfaces';
import {NewsStackParamList} from '../navigators/NewsNavigator';

const styles = StyleSheet.create({
  sectionContainer: {
    flex: 1,
  },
  image: {
    width: '100%',
    height: 400,
  },
});

type Props = StackScreenProps<NewsStackParamList, 'NewsDetails'>;

const NewsDetailsScreen = ({navigation, route}: Props) => {
  const {width} = useWindowDimensions();

  const article: IArticle = route.params.item;

  useEffect(() => {
    const title = `${route.params?.item.title.substring(0, 30)}...`;

    navigation.setOptions({
      title,
    });
  }, [navigation, route]);

  return (
    <SafeAreaView style={styles.sectionContainer}>
      <ScrollView>
        <RenderHtml
          contentWidth={width}
          source={{uri: article.url}}
          ignoredDomTags={[
            'button',
            'label',
            'form',
            'source',
            'noscript',
            'progress',
            'audio',
          ]}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default NewsDetailsScreen;
