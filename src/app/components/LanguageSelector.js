"use client"
import { languageMap } from "../i18n/settings";
import { usePathname, useSearchParams } from "next/navigation";
import Link from "next/link";
import { useEffect } from "react";

export default function LanguageSelector({
    lang
}) {

    const pathname = usePathname();
    const searchParams = useSearchParams();
    const queryString = searchParams.toString();
    const localeLessPath = pathname.replace(/^\/[a-z]{2}(\/|$)/, "/");

    const captureLanguageChange = () => {
        if (typeof window !== 'undefined') {
            sessionStorage.setItem("flag_langChangeMethod", "button");
        }
    };

    return (

        <div className="lg:col-span-2 md:col-span-1 col-span-2 w-full flex items-end">
            <div className="h-auto w-full flex items-end justify-end space-x-2 sm:text-xs text-sm children:cursor-pointer">
                {Object.entries(languageMap).map(([code, name]) => {

                    const href = `/${code}${localeLessPath}${queryString ? `?${queryString}` : ""}`;

                    return (

                        (
                            <Link
                                key={code}
                                href={href}
                                className={lang == code ? "bg-neon-green" : "hover:bg-cream-400"}
                                onClick={captureLanguageChange}
                            >
                                {name}
                            </Link>
                        )

                    )

                })}
            </div>
        </div>

    );

};