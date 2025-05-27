'use client'
import { useModalContext } from "@/lib/context/ModalContext";
import { useState } from "react";
import { useTranslation } from "@/app/i18n/client";

export default function Newsletter({ lang }) {

    const [inputValue, setInputValue] = useState('');
    const { openModal, setValue } = useModalContext();

    const { t } = useTranslation(lang, "newsletter");

    return (

        <div className="flex flex-col space-y-2 sm:col-span-2">

            <h2 className="capitalize font-playfair text-4xl italic">{t("newsletter")}</h2>

            <div className="w-full text-xs">{t("subscribe_prompt")}</div>

            <div className="w-full h-10 bg-cream-300 flex">

                <div className="flex-1 h-full">

                    <input
                        className="w-full h-full outline-none bg-transparent md:text-sm text-base placeholder:text-neutral-900 placeholder:capitalize px-2"
                        type="email"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        placeholder="email"
                    />

                </div>

                <div className="w-auto h-full flex items-center justify-end text-sm p-2 children:capitalize">

                    <button onClick={() => {
                        openModal('newsletter');
                        setValue(inputValue);
                    }}
                        className={`${inputValue != '' ? 'block' : 'hidden'}`}>
                        {t("subscribe")}
                    </button>

                </div>

            </div>

        </div>

    );

};