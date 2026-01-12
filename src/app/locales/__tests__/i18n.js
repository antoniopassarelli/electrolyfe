import i18n from '../../i18n';
import Ar from '../../locales/ar.ts';
import Cs from '../../locales/cs.ts';
import Da from '../../locales/da.ts';
import De from '../../locales/de.ts';
import El from '../../locales/el.ts';
import Es from '../../locales/es.ts';
import Fi from '../../locales/fi.ts';
import Fr from '../../locales/fr.ts';
import Hi from '../../locales/hi.ts';
import Hu from '../../locales/hu.ts';
import It from '../../locales/it.ts';
import Ja from '../../locales/ja.ts';
import Nl from '../../locales/nl.ts';
import No from '../../locales/no.ts';
import Pl from '../../locales/pl.ts';
import Pt from '../../locales/pt.ts';
import Ro from '../../locales/ro.ts';
import Ru from '../../locales/ru.ts';
import Sv from '../../locales/sv.ts';
import Tr from '../../locales/tr.ts';
import Uk from '../../locales/uk.ts';
import ZhCn from '../../locales/zh-CN.ts';

const defaultLocale = 'en';

const locales = {
  ar: Ar,
  cs: Cs,
  da: Da,
  de: De,
  el: El,
  es: Es,
  fi: Fi,
  fr: Fr,
  hi: Hi,
  hu: Hu,
  it: It,
  ja: Ja,
  nl: Nl,
  no: No,
  pl: Pl,
  pt: Pt,
  ro: Ro,
  ru: Ru,
  sv: Sv,
  tr: Tr,
  uk: Uk,
  'zh-CN': ZhCn,
};

/**
 * Recursively fetches all keys from a nested object.
 * @param {Object} obj - The object to extract keys from.
 * @param {string} prefix - The prefix to append to keys (for nested paths).
 * @returns {Array<string>} - An array of all keys, including nested keys.
 */
function getAllKeys(obj, prefix = '') {
  return Object.keys(obj).flatMap(key => {
    const path = prefix ? `${prefix}.${key}` : key;
    return typeof obj[key] === 'object' && obj[key] !== null
        ? getAllKeys(obj[key], path)
        : path;
  });
}

describe('i18n translations', () => {
  const defaultLocale = 'en';
  const defaultLocaleKeys = getAllKeys(i18n.translations[defaultLocale]);

  Object.entries(locales).forEach(([locale, localeData]) => {
    if (locale !== defaultLocale) {
      describe(`Locale: ${locale}`, () => {
        const localeKeys = getAllKeys(localeData);

        defaultLocaleKeys.forEach(key => {
          test(`"Does ${key}" exists in ${locale}?`, () => {
            if (!localeKeys.includes(key)) {
              throw new Error(`Key "${key}" is missing in locale "${locale}"`);
            }
          });
        });
      });
    }
  });
});
