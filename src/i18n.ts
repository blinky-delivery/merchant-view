import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import Backend from 'i18next-http-backend'
import LanguageDetector from 'i18next-browser-languagedetector'

i18n
    .use(Backend)
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        fallbackLng: 'en',
        debug: true,
        interpolation: { escapeValue: false },
        // ns: ['common', 'auth', 'dashboard', 'orders', 'products', 'settings'], // List all namespaces
        ns: ['auth', 'settings'], // List all namespaces
        defaultNS: 'common',
        backend: {
            loadPath: '/locales/{{lng}}/{{ns}}.json', // Load translations per feature
        },
    })

export default i18n
