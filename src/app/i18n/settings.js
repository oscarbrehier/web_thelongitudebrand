import { storageKeys } from "@/lib/constants/settings.config";

export const fallbackLng = 'en';
export const languages = [fallbackLng, 'fr'];
export const defaultNS = 'translation';
export const cookieName = storageKeys.LANGUAGE;
export const languageMap = {
    en: "english",
    fr: "français"
};
export const localeRegex = new RegExp(`^/(${languages.join('|')})(/|$)`);

export function getOptions(lng = fallbackLng, ns = defaultNS) {

    return {
        // debug: true,
        supportedLngs: languages,
        // preload: languages,
        fallbackLng,
        lng,
        fallbackNS: defaultNS,
        defaultNS,
        ns,
    };

};