import React, {useCallback, useEffect, useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  RefreshControl,
} from 'react-native';
import {StackScreenProps} from '@react-navigation/stack';
import {useTranslation} from 'react-i18next';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useTheme} from '@react-navigation/native';

import useFetchNews from '../hooks/useFetchNews';
import {IArticle} from '../interfaces';
import SearchBar from '../components/SearchBar';
import useDebounce from '../hooks/useDebounce';
import {NewsStackParamList} from '../navigators/NewsNavigator';

const styles = StyleSheet.create({
  sectionContainer: {
    flex: 1,
  },
  footer: {
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  image: {
    width: 200,
    height: 100,
  },
  errorImage: {
    width: '100%',
    height: 500,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemContainer: {
    flexDirection: 'row',
    marginHorizontal: 10,
  },
  itemText: {
    flex: 1,
    flexWrap: 'wrap',
    paddingLeft: 10,
  },
  separator: {
    height: 0.5,
    marginVertical: 10,
    width: '100%',
  },
});

const noDataImage = require('../../assets/no_data.png');

interface Map {
  [key: string]: string;
}

const localeMap: Map = {
  en: 'en',
  'en-US': 'en',
  es: 'es',
};

type Props = StackScreenProps<NewsStackParamList, 'News'>;

const NewsScreen = ({navigation}: Props) => {
  const {i18n} = useTranslation();
  const {colors} = useTheme();

  const [searchPhrase, setSearchPhrase] = useState('bitcoin');
  const [query, setQuery] = useState('bitcoin');
  const [clicked, setClicked] = useState(false);

  useDebounce(
    useCallback(() => !!searchPhrase && setQuery(searchPhrase), [searchPhrase]),
    1000,
  );

  const {data, error, fetchNextPage, hasNextPage, refetch, isRefetching} =
    useFetchNews({
      q: query,
      sortBy: 'publishedAt',
      language: localeMap[i18n.language],
    });

  useEffect(() => {
    navigation.setOptions({
      header: () => {
        return (
          <SearchBar
            searchPhrase={searchPhrase}
            setSearchPhrase={setSearchPhrase}
            clicked={clicked}
            setClicked={setClicked}
          />
        );
      },
    });
  }, [navigation, clicked, searchPhrase]);

  const loadMore = () => {
    if (hasNextPage) {
      fetchNextPage();
    }
  };

  const renderFooter = () => {
    return (
      <View style={styles.footer}>
        <TouchableOpacity activeOpacity={0.9}>
          <ActivityIndicator color={colors.text} />
        </TouchableOpacity>
      </View>
    );
  };

  type Item = {
    item: IArticle;
  };

  const handleNavigateToDetails = (item: IArticle) => {
    navigation.navigate('NewsDetails', {item});
  };

  const ItemView = ({item}: Item) => {
    return (
      <TouchableOpacity
        style={styles.itemContainer}
        onPress={() => handleNavigateToDetails(item)}>
        <Image
          style={styles.image}
          defaultSource={noDataImage}
          source={{
            uri: item?.urlToImage,
          }}
        />
        <Text style={{...styles.itemText, color: colors.text}}>
          {item?.title.toUpperCase()}
        </Text>
      </TouchableOpacity>
    );
  };

  const ItemSeparatorView = () => {
    return <View style={{...styles.separator, backgroundColor: colors.text}} />;
  };

  return (
    <SafeAreaView style={styles.sectionContainer}>
      {error ? (
        <View style={styles.errorContainer}>
          <Image style={styles.errorImage} source={noDataImage} />
          <Text>{JSON.stringify(error, null, 2)}</Text>
        </View>
      ) : (
        <FlatList
          data={data?.pages || []}
          keyExtractor={(item, index) => index.toString()}
          ItemSeparatorComponent={ItemSeparatorView}
          renderItem={ItemView}
          ListFooterComponent={error ? null : renderFooter}
          onEndReached={loadMore}
          onEndReachedThreshold={0.3}
          refreshControl={
            <RefreshControl
              refreshing={isRefetching}
              onRefresh={() => refetch()}
            />
          }
        />
      )}
    </SafeAreaView>
  );
};

export default NewsScreen;
