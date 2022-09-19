import {DarkTheme, DefaultTheme, Theme} from '@react-navigation/native';

const baseColorPalette = {
  textDefault: '#010101FF',
  trackColor: '#767577',
  thumbColor: '#f4f3f4',
  thumbColorEnabled: '#FF453AFF',
  switchIosBackgroundColor: '#3e3e3e',
};

interface ExtendedTheme extends Theme {
  colors: Theme['colors'] & {
    textDefault: string;
    trackColor: string;
    thumbColor: string;
    thumbColorEnabled: string;
    switchIosBackgroundColor: string;
  };
}

export const lightTheme: ExtendedTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    ...baseColorPalette,
  },
};

export const darkTheme: ExtendedTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    ...baseColorPalette,
  },
};

declare module '@react-navigation/native' {
  export function useTheme(): ExtendedTheme;
}
