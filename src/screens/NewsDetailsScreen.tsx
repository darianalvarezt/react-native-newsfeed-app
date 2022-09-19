import React, {useEffect} from 'react';
import {formatDistance} from 'date-fns';
import {es, enUS} from 'date-fns/locale';
import {useTranslation} from 'react-i18next';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Image, ScrollView, StyleSheet, Text, View} from 'react-native';
import type {StackScreenProps} from '@react-navigation/stack';

import {IArticle} from '../interfaces';
import useNewsContent from '../hooks/useNewsContent';
import { NewsStackParamList } from "../navigators/NewsNavigator";

const localeMap = {
  en: enUS,
  'en-US': enUS,
  es: es,
};

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
  const {t, i18n} = useTranslation();

  const article: IArticle = route.params.item;

  const {content} = useNewsContent(article);

  useEffect(() => {
    const title = `${route.params?.item.title.substring(0, 30)}...`;

    navigation.setOptions({
      title,
    });
  }, [navigation, route]);

  return (
    <SafeAreaView style={styles.sectionContainer}>
      <ScrollView>
        <Image
          style={styles.image}
          source={{
            uri: article.urlToImage,
          }}
        />
        <View style={{margin: 10}}>
          <Text>{`${t('screen.details.author')}: ${
            article.author
          }, ${formatDistance(new Date(article.publishedAt), new Date(), {
            addSuffix: true,
            locale: localeMap[i18n.language],
          })}`}</Text>
        </View>
        <Text style={{flex: 1, flexWrap: 'wrap'}}>{content}</Text>
      </ScrollView>
    </SafeAreaView>
  );
};

export default NewsDetailsScreen;
