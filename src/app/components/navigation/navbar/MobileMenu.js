"use client"
import Link from "next/link";
import { usePathname } from "next/navigation";
import { languages } from "@/app/i18n/settings";

export default function MobileMenu({ active, lang, auth, openModal }) {

    const fullPathname = usePathname();
    const languageRegex = new RegExp(`^/(${languages.join('|')})`);
    const pathname = fullPathname.replace(languageRegex, "");

    return (

        <div className={`${active ? "flex" : "hidden"} h-auto w-full bg-neon-green flex-col items-center pt-8 pb-10 children:capitalize space-y-2 `}>

            <Link className={`${pathname == "/shop" && "underline"}`} href="/shop">shop</Link>
            {
                auth
                ? (
                    <>
                        <Link className={`${pathname == "/customer/wishlist" && "underline"}`} href="/customer/wishlist">wishlist</Link>
                        <Link className={`${pathname == "/customer/personal-information" && "underline"}`} href="/customer/personal-information">account</Link>
                    </>
                )
                : <button onClick={() => openModal('sign_in')}>log in</button>
            }

        </div>

    );

};