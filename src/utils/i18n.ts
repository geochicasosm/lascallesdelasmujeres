import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import es from '../data/i18n/es.json';
import en from '../data/i18n/en.json';
import ca from '../data/i18n/ca.json';
import it from '../data/i18n/it.json';

const resources = {
  es: { translation: es },
  en: { translation: en },
  ca: { translation: ca },
  it: { translation: it },
};

const browserLang = navigator.language.split('-')[0];
const supportedLangs = ['es', 'en', 'ca', 'it'];
const supportedLang = supportedLangs.includes(browserLang) ? browserLang : 'es';

i18n.use(initReactI18next).init({
  resources,
  lng: supportedLang,
  fallbackLng: 'es',
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
