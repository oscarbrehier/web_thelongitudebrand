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

export default function NavigationBar({ lang }) {

    const pathname = usePathname();
    const router = useRouter();

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

    return (

        <div className="md:h-10 h-auto w-full md:grid lg:grid-cols-4 md:grid-cols-3 gap-2 flex flex-col items-center justify-between md:p-0 pt-2 bg-neon-green text-xs z-20 top-4">

            <div className="md:w-1/4 w-full md:block flex justify-center">
                <Link href="/">the<span className="font-semibold">longitude</span>brand</Link>
            </div>

            <div className="h-full w-full md:flex hidden items-center justify-end lg:col-span-2">
                <Link className="text-black" href="/shop">{t('shop')}</Link>
            </div>

            <div className="w-full flex items-center justify-end h-10 col-span-1">

                <div className="md:hidden w-auto flex justify-start space-x-2">
                    <Link className="" href="/shop">{t('shop')}</Link>
                </div>

                <div className="md:w-full w-full flex justify-end space-x-4 children:lowercase">


                    {isAuth
                        ? (
                            <>
                                <button onClick={handleSignOut} className="">logout</button>
                                <Link className="" href="/customer/wishlist">{t("wishlist")}</Link>
                                <Link className="" href="/customer/personal-information">{t("account")}</Link>
                            </>
                        )
                        : <button onClick={() => openModal('sign_in')}>{t("account")}</button>
                    }

                    <Link className="" href="/cart">{t("cart")} (
                        {cartLength}
                    )</Link>

                </div>

            </div>

        </div>

    );

};