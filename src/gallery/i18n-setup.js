import { createI18n } from 'vue-i18n'
import defaultMessages from '../common/locales/en.json';

const DEFAULT_LOCALE = 'en';

const i18n = createI18n({
  locale: DEFAULT_LOCALE,
  fallbackLocale: DEFAULT_LOCALE,
  legacy: false,
  globalInjection: true,
  silentFallbackWarn: true, // LEGACY API - to remove after confirmation
  messages: {
    en: defaultMessages,
  },
});

function setI18nLanguage(lang) {
  i18n.locale = lang;
  document.querySelector('html').setAttribute('lang', lang);
}

/* eslint-disable consistent-return */
async function loadLanguageAsync(lang) {
  if (i18n.locale === lang) {
    setI18nLanguage(lang);
  }

  try {
    const messages = (await import(`../common/locales/${lang}.json`)).default;
    i18n.setLocaleMessage(lang, messages);
    setI18nLanguage(lang);
  } catch (e) {
    // Since the mentioned locale is
    // not found, retaining en as locale
    return e;
  }
}
export {
  i18n,
  loadLanguageAsync,
};
