'use client';

import { useEffect, useState } from "react";
import { EmptyState } from "../components/EmptyState";
import Hyperlink from "../components/ui/Hyperlink";
import { useTranslation } from "../i18n/client";
import { fallbackLng, cookieName } from "../i18n/settings";
import acceptLanguage from "accept-language";

export default function NotFound() {

    const [lang, setLang] = useState(fallbackLng);

    useEffect(() => {

        let detectedLang = fallbackLng;

        const cookies = document.cookie.split(';');
        const langCookie = cookies.find(cookie =>
            cookie.trim().startsWith(`${cookieName}=`)
        );

        if (langCookie) {
            const cookieValue = langCookie.split('=')[1];
            detectedLang = acceptLanguage.get(cookieValue) || fallbackLng;
        } else {
            detectedLang = acceptLanguage.get(navigator.language) || fallbackLng;
        }

        setLang(detectedLang);

    }, []);

    const { t } = useTranslation(lang, "error");

    return (

        <div className="h-screen w-full flex">

            <EmptyState
                trans={t}
                title="not_found.title"
                description="not_found.message"
            >
                <Hyperlink to="/shop" size="h-10 px-10" text="uppercase">
                    {t("not_found.actions.go_shop")}
                </Hyperlink>
            </EmptyState>

        </div>

    );
}