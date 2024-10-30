"use client"
import { useModalContext } from "@/lib/context/ModalContext";
import { useAuthContext } from "@/lib/context/AuthContext";
import { useCartStore } from "@/lib/stores/useCartStore";
import { usePathname, useRouter } from "next/navigation";
import { signOut } from "@/lib/authentication/service";
import { useTranslation } from "@/app/i18n/client";
import { languages } from "@/app/i18n/settings";
import { authRoutes } from "@/lib/constants/settings.config";
import Link from "next/link";
import { storageKeys } from "@/lib/constants/settings.config";
import { useEffect, useRef, useState } from "react";
import MobileMenu from "./MobileMenu";
import { IoMenu, IoClose, IoBagOutline, IoMenuOutline, IoCloseOutline, IoPersonOutline } from "react-icons/io5";

export default function NavigationBar({ lang }) {

    const pathname = usePathname();
    const router = useRouter();

    const [menu, setMenu] = useState(false);
    const menuRef = useRef();

    const { isAuth } = useAuthContext();
    const { openModal } = useModalContext();
    const cartLength = useCartStore((state) => state.cart.length);

    const { t } = useTranslation(lang, "navigation");

    const { clearCart } = useCartStore((state) => ({
        clearCart: state.clearCart
    }));

    const handleSignOut = async () => {

        const languageRegex = new RegExp(`^/(${languages.join('|')})`);
        const isAuthRoute = authRoutes.some((route) => pathname.replace(languageRegex, "").startsWith(route));

        clearCart();
        localStorage.removeItem(storageKeys.CART);

        const res = await signOut();

        if (!res) console.error("error signing out");
        if (isAuthRoute) router.push("/shop");

    };

    const handleOpenModal = (modal) => {

        if (menu) setMenu(false);
        openModal(modal);

    };

    const authLinks = isAuth ? (

        <>
            <button
                onClick={handleSignOut}
                className="logout-button"
                aria-label={t("logout")}
            >
                {t("logout")}
            </button>
            <Link href="/customer/wishlist">{t("wishlist")}</Link>
            <Link href="/customer/personal-information">{t("account")}</Link>
        </>

    ) : (
        <button onClick={() => openModal('sign_in')}>{t("account")}</button>
    );

    useEffect(() => {

        const handleClickOutside = (event) => {

            if (menuRef.current && !menuRef.current.contains(event.target)) setMenu(false);

        };

        if (menu) {
            document.addEventListener("mousedown", handleClickOutside);
        } else {
            document.removeEventListener("mousedown", handleClickOutside);
        };

        return () => document.removeEventListener("mousedown", handleClickOutside);

    }, [menu]);

    return (

        <nav ref={menuRef} className={`${menu ? "h-auto" : "h-auto"} w-full flex flex-col`}>

            <div className={`
                h-10 w-full sm:grid lg:grid-cols-4 sm:grid-cols-3 gap-2
                flex flex-col items-center justify-center bg-neon-green text-xs z-20 top-4`}>

                <div
                    className="sm:w-1/4 w-full sm:block flex sm:pb-0 sm:items-start sm:justify-center
                    items-center justify-between
                    "
                >

                    <Link href="/">the<span className="font-semibold">longitude</span>brand</Link>

                    <div className={`sm:hidden flex items-center space-x-2`}>

                        <div className="size-7 relative">

                            <div className="absolute size-full children:size-full">
                                <IoBagOutline />
                            </div>

                            <div className="absolute size-4 bg-black rounded-full right-0 flex items-center justify-center">
                                <p className={`text-white ${cartLength >= 10 ? "text-xs" : "text-sm"}`}>{cartLength}</p>
                            </div>

                        </div>

                        <button onClick={() => setMenu(!menu)} className="size-7 children:size-full">

                            {menu
                                ? <IoCloseOutline />
                                : <IoMenuOutline />
                            }

                        </button>

                    </div>

                </div>

                <div className="h-full w-full sm:flex hidden items-center justify-end lg:col-span-2">
                    <Link className="text-black" href="/shop">{t('shop')}</Link>
                </div>

                <div className="w-full sm:flex hidden items-center justify-end h-10 col-span-1">

                    <div className="sm:hidden w-auto flex justify-start space-x-2">
                        <Link className="" href="/shop">{t('shop')}</Link>
                    </div>

                    <div className="sm:w-full w-full flex justify-end space-x-4 children:lowercase">

                        {authLinks}

                        <Link href="/cart" aria-label={t("view_cart")}>{t("cart")} ({cartLength})</Link>

                    </div>

                </div>

            </div>

            <MobileMenu active={menu} lang={lang} auth={isAuth} openModal={handleOpenModal} />

        </nav>

    );

};