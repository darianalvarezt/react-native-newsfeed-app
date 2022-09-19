import React, {useContext, useState} from 'react';
import {StatusBar, StyleSheet} from 'react-native';
import {useTheme} from '@react-navigation/native';
import {ThemeContext} from '../context';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useTranslation} from 'react-i18next';
import SettingItem from '../components/SettingItem';
import LanguagePicker from '../components/LanguagePicker';
import Divider from '../components/Divider';

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
  },
});

const SettingsScreen = () => {
  const {t} = useTranslation();
  const {isDarkMode, changeTheme} = useContext(ThemeContext);
  const {colors} = useTheme();
  const [isEnabled, setIsEnabled] = useState(isDarkMode || false);
  const toggleSwitch = () => {
    changeTheme?.(isDarkMode ? 'light' : 'dark');
    setIsEnabled(previousState => !previousState);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={colors.background}
      />
      <SettingItem
        text={t('screen.settings.theme')}
        enabled={isEnabled}
        onValueChange={toggleSwitch}
      />

      <Divider height={20} />

      <LanguagePicker />
    </SafeAreaView>
  );
};

export default SettingsScreen;
