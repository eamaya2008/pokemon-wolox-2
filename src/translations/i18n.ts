import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { availableLocales, bundles } from './languageList';

const langDetectorOptions = {
  order: ['localStorage'],
  lookupCookie: 'locale',
  lookupLocalStorage: 'locale',
  caches: ['localStorage'],
  checkWhitelist: true,
};

const i18n = i18next.use(LanguageDetector).use(initReactI18next);

i18n.init({
  resources: bundles,
  fallbackLng: 'en',
  keySeparator: '.',
  ns: ['common'],
  defaultNS: 'common',
  fallbackNS: [],
  interpolation: {
    escapeValue: false,
  },
  supportedLngs: availableLocales,
  detection: langDetectorOptions,
  debug: false,
});

export default i18n;
