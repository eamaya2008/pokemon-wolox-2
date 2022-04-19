// English
import * as enTranslations from './common/en';
import englishIcon from '../assets/images/countryFlags/gb.png';

// Spanish
import * as esTranslations from './common/es';
import spanishIcon from '../assets/images/countryFlags/es.png';

export type LanguageType = {
  code: string;
  url: string;
  icon: string;
  namespace: string;
  file: Object;
};

export type Bundle = {
  [code: string]: {
    [namespace: string]: Object;
  };
};

const Languages: LanguageType[] = [
  {
    code: 'en',
    url: 'LanguageMenu.optEnglish',
    icon: englishIcon,
    namespace: 'common',
    file: enTranslations,
  },
  {
    code: 'es',
    url: 'LanguageMenu.optSpanish',
    icon: spanishIcon,
    namespace: 'common',
    file: esTranslations,
  },
];

function extractAvailableLocales(lang: LanguageType[]): string[] {
  return lang.map((e) => e.code);
}

function extractBundles(array: LanguageType[]): Bundle {
  const initialValue = {};
  const bundles = array.reduce(
    (obj, item) => ({
      ...obj,
      [item.code]: {
        [item.namespace]: item.file,
      },
    }),
    initialValue,
  );
  return bundles;
}

export const availableLocales = extractAvailableLocales(Languages);

export const bundles = extractBundles(Languages);

export default Languages;
