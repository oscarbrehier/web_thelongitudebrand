'use client'
import i18next from 'i18next';
import { useEffect, useState } from 'react';
import { initReactI18next, useTranslation as useTranslationOrg } from 'react-i18next';
import { useCookies } from 'react-cookie';
import resourcesToBackend from 'i18next-resources-to-backend';
// import LocizeBackend from 'i18next-locize-backend'
import LanguageDetector from 'i18next-browser-languagedetector';
import { getOptions, languages, cookieName } from './settings';
import ICU from 'i18next-icu';

const runsOnServerSide = typeof window === 'undefined';

// on client side the normal singleton is ok
i18next
    .use(ICU)
    .use(initReactI18next)
    .use(LanguageDetector)
    .use(resourcesToBackend((language, namespace) => import(`./locales/${language}/${namespace}.json`)))
    // .use(LocizeBackend) // locize backend could be used on client side, but prefer to keep it in sync with server side
    .init({
        ...getOptions(),
        lng: undefined, // let detect the language on client side
        detection: {
            order: ['path', 'htmlTag', 'cookie', 'localStorage', 'navigator'],
            caches: ["localStorage", "cookie"],
            cookieName,
            lookupCookie: cookieName,
            lookupLocalStorage: 'i18nextLng'
        },
        preload: runsOnServerSide ? languages : [],
        interpolation: {
            escapeValue: false
        }
    });

export function useTranslation(lng, ns, options) {

    const [cookies, setCookie] = useCookies([cookieName]);
    const ret = useTranslationOrg(ns, options);
    const { i18n } = ret;

    if (runsOnServerSide && lng && i18n.resolvedLanguage !== lng) {

        i18n.changeLanguage(lng);

    } else {

        const [activeLng, setActiveLng] = useState(i18n.resolvedLanguage);

        useEffect(() => {

            if (activeLng === i18n.resolvedLanguage) return;
            setActiveLng(i18n.resolvedLanguage);

        }, [activeLng, i18n.resolvedLanguage]);

        useEffect(() => {

            if (!lng || i18n.resolvedLanguage === lng) return;
            i18n.changeLanguage(lng);

        }, [lng, i18n]);

        useEffect(() => {

            if (!lng) return;
            if (cookies.i18next === lng) return;
            setCookie(cookieName, lng, { path: '/' });

        }, [lng, cookies.i18next, cookieName]);

    };

    return ret;
};