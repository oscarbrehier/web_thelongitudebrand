"use client"
import { languageMap } from "../i18n/settings";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { trackEvent } from "@/lib/analytics/analytics";

export default function LanguageSelector({
    lang
}) {

    const pathname = usePathname();
    const captureLanguageChange = () => {
        if (typeof window !== 'undefined') {
            sessionStorage.setItem("flag_langChangeMethod", "button");
        }
    };

    return (

        <div className="lg:col-span-2 md:col-span-1 col-span-2 w-full flex items-end">
            <div className="h-auto w-full flex items-end justify-end space-x-2 sm:text-xs text-sm children:cursor-pointer">
                {Object.entries(languageMap).map(([code, name]) => (
                    <Link
                        key={code}
                        href={`/${code}${pathname.replace(`/${lang}`, "")}`}
                        className={lang == code ? "bg-neon-green" : "hover:bg-cream-400"}
                        onClick={captureLanguageChange}
                    >
                        {name}
                    </Link>
                ))}
            </div>
        </div>

    );

};