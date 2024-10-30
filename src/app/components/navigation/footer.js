'use client'
import { useEffect, useState } from "react";
import Newsletter from "../Newsletter";
import { useTranslation } from "@/app/i18n/client";

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

            <Newsletter lang={lang} />

            <section className="sm:h-10 w-full bg-neon-green flex sm:flex-row flex-col items-center justify-between children:text-xs children:sm:space-x-4 sm:py-0 py-2">

                <button onClick={() => handleMenuToggle(1)} className="sm:hidden flex items-center justify-between w-full">
                    <h2>{t("help_and_assistance")}</h2>
                    <p className="text-base pt-1">{activeMenu === 1 ? '-' : '+'}</p>
                </button>

                <div className={`sm:flex ${activeMenu === 1 ? 'w-full flex flex-col px-4 space-y-1' : 'hidden'}`}>
                    <h2>{t("shipping")}</h2>
                    <h2>{t("billing")}</h2>
                    <h2>{t("customer_service")}</h2>
                    <h2>{t("contact_us")}</h2>
                </div>

                <button onClick={() => handleMenuToggle(2)} className="sm:hidden flex items-center justify-between w-full">
                    <h2>{t("follow_us")}</h2>
                    <p className="text-base pt-1">{activeMenu === 2 ? '-' : '+'}</p>
                </button>

                <div className={`sm:flex ${activeMenu === 2 ? 'w-full h flex flex-col px-4 space-y-1' : 'hidden'}`}>
                    <a href="https://x.com/longitude_store" target="_blank" rel="nofollow noopener">x</a>
                    <a href="https://www.instagram.com/thelongitudebrand/" target="_blank" rel="nofollow noopener">instagram</a>
                </div>

            </section>

        </div>

    );

};