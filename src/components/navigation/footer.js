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

        <footer className="h-auto w-full mt-10 mb-4">

            <Newsletter lang={lang} />

            <section className="sm:h-10 w-full bg-neon-green flex sm:flex-row flex-col items-center justify-between children:text-xs children:sm:space-x-4 sm:py-0 py-2">

                <button onClick={() => handleMenuToggle(1)} className="sm:hidden flex items-center justify-between w-full">
                    <p>{t("help_and_assistance")}</p>
                    <p className="text-base pt-1">{activeMenu === 1 ? '-' : '+'}</p>
                </button>

                <div className={`sm:flex ${activeMenu === 1 ? 'w-full flex flex-col px-4 space-y-1' : 'hidden'}`}>
                    <p>{t("shipping")}</p>
                    <p>{t("billing")}</p>
                    <p>{t("customer_service")}</p>
                    <p>{t("contact_us")}</p>
                </div>

                <button onClick={() => handleMenuToggle(2)} className="sm:hidden flex items-center justify-between w-full">
                    <p>{t("follow_us")}</p>
                    <p className="text-base pt-1">{activeMenu === 2 ? '-' : '+'}</p>
                </button>

                <div className={`sm:flex ${activeMenu === 2 ? 'w-full h flex flex-col px-4 space-y-1' : 'hidden'}`}>
                    <p>x</p>
                    <p>instagram</p>
                </div>

            </section>

        </footer>

    );

};