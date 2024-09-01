import { I18n } from "i18n-js";
import ar from "./locales/ar.json";
import en from './locales/en.json';
import {getLocales} from 'expo-localization';

const i18n = new I18n({
 en: en,
 ar: ar,
});

i18n.enableFallback = true;
i18n.locale =  getLocales()[0].languageCode?.toString() || 'ar';
//i18n.locale =  'ar';

export default i18n;