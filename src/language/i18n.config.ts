import 'intl-pluralrules';
import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';
import * as RNLocalize from 'react-native-localize';

import {en, es} from './translations';
const languageDetectorPlugin = require('./languageDetectorPlugin');

const fallbackLanguage = RNLocalize.getLocales()[0].languageTag;

const resources = {
  en: {
    translation: en,
  },
  es: {
    translation: es,
  },
};

i18n
  .use(initReactI18next)
  .use(languageDetectorPlugin(fallbackLanguage))
  .init({
    resources,
    fallbackLng: fallbackLanguage,
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
