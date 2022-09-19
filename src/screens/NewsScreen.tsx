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
import {useTranslation} from 'react-i18next';
import useFetchNews from '../hooks/useFetchNews';
import {SafeAreaView} from 'react-native-safe-area-context';
import {IArticle} from '../interfaces';
import {useTheme} from '@react-navigation/native';
import SearchBar from '../components/SearchBar';
import useDebounce from '../hooks/useDebounce';

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
});

const NewsScreen = ({navigation}) => {
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
      language: i18n.language === 'en-US' ? 'en' : i18n.language,
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
        style={{flexDirection: 'row', marginHorizontal: 10}}
        onPress={() => handleNavigateToDetails(item)}>
        <Image
          style={styles.image}
          source={{
            uri: item.urlToImage,
          }}
        />
        <Text
          style={{
            flex: 1,
            flexWrap: 'wrap',
            paddingLeft: 10,
            color: colors.text,
          }}>
          {item.title.toUpperCase()}
        </Text>
      </TouchableOpacity>
    );
  };

  const ItemSeparatorView = () => {
    return (
      <View
        style={{
          height: 0.5,
          marginVertical: 10,
          width: '100%',
          backgroundColor: '#C8C8C8',
        }}
      />
    );
  };

  return (
    <SafeAreaView style={styles.sectionContainer}>
      <FlatList
        data={data}
        keyExtractor={(item, index) => index.toString()}
        ItemSeparatorComponent={ItemSeparatorView}
        renderItem={ItemView}
        ListFooterComponent={renderFooter}
        onEndReached={loadMore}
        onEndReachedThreshold={0.3}
        refreshControl={
          <RefreshControl
            refreshing={isRefetching}
            onRefresh={() => refetch()}
          />
        }
      />
    </SafeAreaView>
  );
};

export default NewsScreen;
