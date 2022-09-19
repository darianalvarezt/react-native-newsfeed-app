import React, {createContext, useEffect, useState} from 'react';
import {ColorSchemeName, useColorScheme} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {IProps} from '../interfaces';

type ThemeContextType = {
  theme?: ColorSchemeName | string;
  isDarkMode?: boolean;
  changeTheme?: (theme: ColorSchemeName) => void;
};

const STORE_THEME_KEY = 'settings.theme';

const ThemeContext = createContext<ThemeContextType>({});

const ThemeProvider = ({children}: IProps) => {
  const scheme = useColorScheme();

  const [theme, setTheme] = useState<ColorSchemeName | string | undefined>();

  const isDarkMode = theme === 'dark';

  async function changeStoredTheme(newTheme: ColorSchemeName) {
    try {
      await AsyncStorage.setItem(STORE_THEME_KEY, `${newTheme}`);
      return newTheme;
    } catch (error) {
      return scheme;
    }
  }

  const changeTheme = async (value: ColorSchemeName) => {
    const response = await changeStoredTheme(value);
    setTheme(response);
  };

  useEffect(() => {
    async function getStoredTheme() {
      try {
        const storedTheme = await AsyncStorage.getItem(STORE_THEME_KEY);
        return storedTheme || (await changeStoredTheme(scheme));
      } catch (error) {
        return scheme;
      }
    }

    (async () => {
      const tm = await getStoredTheme();
      setTheme(tm);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <ThemeContext.Provider value={{theme, isDarkMode, changeTheme}}>
      {children}
    </ThemeContext.Provider>
  );
};

export {ThemeContext, ThemeProvider};
