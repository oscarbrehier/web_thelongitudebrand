'use client'
import { useEffect, useState } from "react";
import Newsletter from "./Newsletter";
import { useTranslation } from "@/app/i18n/client";
import LanguageSelector from "../LanguageSelector";

export default function Footer({ lang }) {

    const [activeMenu, setActiveMenu] = useState(null);

    const { t } = useTranslation(lang, "navigation");

    useEffect(() => {

        if (activeMenu !== null) {

            window.scrollTo({
                top: document.body.scrollHeight,
                behavior: 'smooth'
            });

        };

    }, [activeMenu]);

    const handleMenuToggle = (menuId) => {
        setActiveMenu(activeMenu === menuId ? null : menuId);
    };

    return (

        <div className="h-auto w-full mb-4">


            <section className="h-auto w-full py-2 grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 sm:gap-2 gap-x-0 gap-y-2">

                <Newsletter lang={lang} />
                <LanguageSelector lang={lang} />

            </section>

            <section className="sm:h-10 w-full bg-neon-green flex sm:flex-row flex-col items-center justify-between children:text-xs children:sm:space-x-4 sm:py-0">

                <button onClick={() => handleMenuToggle(1)} className="sm:hidden h-10 flex items-center justify-between w-full">
                    <h2 className="">{t("help_and_assistance")}</h2>
                    <p className="text-base pt-1">{activeMenu === 1 ? '-' : '+'}</p>
                </button>

                <div className={`sm:flex ${activeMenu === 1 ? 'w-full flex flex-col bg-cream-200 space-y-4 py-4' : 'hidden'}`}>

                    <a href="/legal/contact-us"><h2>{t("contact_us")}</h2></a>
                    <a href="/legal/terms-conditions"><h2>terms & condition</h2></a>
                    <a href="/legal/customer-service"><h2>customer service</h2></a>
                    <a href="/legal/privacy-policy"><h2>privacy policy</h2></a>
                    <a href="/legal/cookie-policy"><h2>cookie policy</h2></a>

                </div>

                <button onClick={() => handleMenuToggle(2)} className="sm:hidden h-10 flex items-center justify-between w-full">
                    <h2 className="">{t("follow_us")}</h2>
                    <p className="text-base pt-1">{activeMenu === 2 ? '-' : '+'}</p>
                </button>

                <div className={`sm:flex ${activeMenu === 2 ? 'w-full flex flex-col bg-cream-200 space-y-4 py-4' : 'hidden'}`}>

                    <a href="https://x.com/longitude_store" target="_blank" rel="nofollow noopener">x</a>
                    <a href="https://www.instagram.com/thelongitudebrand/" target="_blank" rel="nofollow noopener">instagram</a>

                </div>

            </section>

        </div>

    );

};