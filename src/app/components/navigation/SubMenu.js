"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"

export default function SubMenu({
    baseRoute,
    items,
    children,
    lang
}) {

    const pathname = usePathname();

    return (

        <div className="w-full flex justify-between">

            <div className="w-auto flex xs:flex-row flex-col xs:items-center items-start text-sm xs:space-x-4 xs:space-y-0 space-y-1 cursor-pointer">

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
                                {title.replace(/-/g, ' ')}
                            </Link>
                        )

                    })
                }


            </div>

            {children}

        </div>

    )

}