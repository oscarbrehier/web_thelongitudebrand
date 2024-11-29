"use client"
import { useTranslation } from "@/app/i18n/client";
import Link from "next/link"
import { usePathname } from "next/navigation"

export default function SubMenu({
    baseRoute,
    items,
    children,
    lang
}) {

    const pathname = usePathname();
    const { t } = useTranslation(lang, "navigation");

    return (

        <div className="w-full flex items-start justify-between">

            <div className="w-auto flex md:flex-row flex-col md:items-center items-start text-sm md:space-x-4 md:space-y-0 space-y-1 cursor-pointer">

                {
                    items && items.map((tab, index) => {

                        const isObject = typeof tab === "object";
                        const route = isObject ? tab.route : tab;
                        const title = isObject ? tab.title : tab;

                        return (
                            <Link
                                href={`${baseRoute}/${route}`}
                                key={index}
                                className={`${pathname.toString().includes(`${baseRoute}/${route}`) ? 'bg-neon-green' : 'hover:bg-cream-400'}`}
                            >
                                {/* {title.replace(/-/g, ' ')} */}
                                {t(title)}
                            </Link>
                        )

                    })
                }


            </div>

            {children}

        </div>

    )

}