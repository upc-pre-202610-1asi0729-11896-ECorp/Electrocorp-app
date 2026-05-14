import { createI18n } from 'vue-i18n';

import es from './es.json';
import en from './en.json';
import pt from './pt.json';

export const i18n = createI18n({
    legacy: false,
    locale: localStorage.getItem('ec.language') ?? 'es',
    fallbackLocale: 'en',
    messages: {
        es,
        en,
        pt,
    },
});