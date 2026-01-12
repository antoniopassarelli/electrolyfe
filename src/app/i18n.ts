import {I18n} from 'i18n-js';

import EN from "./locales/en";
import ES from "./locales/es";
import FR from "./locales/fr";
import DE from "./locales/de";
import IT from "./locales/it";
import PT from "./locales/pt";
import ZH_CN from "./locales/zh-CN";
import AR from "./locales/ar";
import RU from "./locales/ru";
import JA from "./locales/ja";
import UK from "./locales/uk";
import PL from "./locales/pl";
import RO from "./locales/ro";
import DA from "./locales/da";
import NL from "./locales/nl";
import SV from "./locales/sv";
import NO from "./locales/no";
import FI from "./locales/fi";
import CS from "./locales/cs";
import EL from "./locales/el";
import TR from "./locales/tr";
import HU from "./locales/hu";
import HI from "./locales/hi";

const translations = {
    en: EN,
    es: ES,
    fr: FR,
    de: DE,
    it: IT,
    pt: PT,
    'zh-CN': ZH_CN,
    ar: AR,
    ru: RU,
    ja: JA,
    uk: UK,
    pl: PL,
    ro: RO,
    da: DA,
    nl: NL,
    sv: SV,
    no: NO,
    fi: FI,
    cs: CS,
    el: EL,
    tr: TR,
    hu: HU,
    hi: HI
};


const i18n = new I18n(translations);

const browserLocale =
    typeof navigator !== 'undefined'
        ? (navigator.languages?.[0] ?? navigator.language ?? 'en')
        : 'en';

i18n.locale = browserLocale;
i18n.enableFallback = true;

export default i18n;
