import React from 'react';
import {
  Keyboard,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import Feathericons from 'react-native-vector-icons/Feather';
import Entypoicons from 'react-native-vector-icons/Entypo';
import {useTheme} from '@react-navigation/native';
import {useTranslation} from 'react-i18next';

const styles = StyleSheet.create({
  container: {
    margin: 15,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    width: '90%',
  },
  searchBarUnClicked: {
    paddingHorizontal: 10,
    width: '95%',
    flexDirection: 'row',
    backgroundColor: 'transparent',
    borderRadius: 30,
    alignItems: 'center',
  },
  searchBarClicked: {
    paddingHorizontal: 10,
    flexDirection: 'row',
    width: '80%',
    backgroundColor: 'transparent',
    borderRadius: 30,
    alignItems: 'center',
  },
  input: {
    fontSize: 20,
    marginLeft: 10,
    width: '80%',
  },
  iconSearch: {
    marginLeft: 10,
  },
  iconClear: {
    marginRight: 10,
  },
});

type Props = {
  clicked: boolean;
  searchPhrase: string;
  setSearchPhrase: (value: string) => void;
  setClicked: (value: boolean) => void;
};

const SearchBar = ({
  clicked,
  searchPhrase,
  setSearchPhrase,
  setClicked,
}: Props) => {
  const {colors} = useTheme();
  const {t} = useTranslation();

  return (
    <View style={styles.container}>
      <View
        style={clicked ? styles.searchBarClicked : styles.searchBarUnClicked}>
        <Feathericons
          name="search"
          size={20}
          color={colors.text}
          style={styles.iconSearch}
        />
        <TextInput
          style={{...styles.input, color: colors.text}}
          placeholder={t('screen.news.searchPlaceholder')}
          placeholderTextColor={colors.text}
          value={searchPhrase}
          onChangeText={setSearchPhrase}
          onFocus={() => {
            setClicked(true);
          }}
        />
        {clicked && (
          <Entypoicons
            name="cross"
            size={20}
            color={colors.text}
            style={styles.iconClear}
            onPress={() => {
              setSearchPhrase('');
            }}
          />
        )}
      </View>
      {clicked && (
        <View>
          <Pressable
            onPress={() => {
              Keyboard.dismiss();
              setClicked(false);
            }}>
            <Text style={{color: colors.text}}>
              {t('screen.news.searchCancel')}
            </Text>
          </Pressable>
        </View>
      )}
    </View>
  );
};
export default SearchBar;
