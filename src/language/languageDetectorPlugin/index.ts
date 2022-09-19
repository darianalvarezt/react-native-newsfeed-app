import AsyncStorage from '@react-native-async-storage/async-storage';

const STORE_LANGUAGE_KEY = 'settings.lang';

function callFallbackIfFunc(
  fallback: (callback: (language: string) => void) => any,
  callback: (language: string) => void,
) {
  if (typeof fallback === 'function') {
    return fallback(callback);
  }

  return callback(fallback);
}

module.exports = exports = function (fallback: () => void) {
  return {
    type: 'languageDetector',
    async: true,
    init: () => {},
    detect: async function (callback: (lang: string) => void) {
      try {
        await AsyncStorage.getItem(STORE_LANGUAGE_KEY).then(language => {
          if (language) {
            return callback(language);
          }

          return callFallbackIfFunc(fallback, callback);
        });
      } catch (error) {
        callFallbackIfFunc(fallback, callback);
      }
    },
    cacheUserLanguage: async function (language: string) {
      try {
        await AsyncStorage.setItem(STORE_LANGUAGE_KEY, language);
      } catch (error) {
        console.error(error);
      }
    },
  };
};
