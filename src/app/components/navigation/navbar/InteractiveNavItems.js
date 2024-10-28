"use client"
import { useTranslation } from "@/app/i18n/client";
import { signOut } from "@/lib/authentication/service";
import { useModalContext } from "@/lib/context/ModalContext";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useCartContext } from "@/lib/context/CartContext";
import { useCartStore } from "@/lib/stores/useCartStore";
import { storageKeys } from "@/lib/constants/settings.config";

export default function InteractiveNavItems({ authenticated, lang }) {

    const { t } = useTranslation(lang, "navigation");
    const { cartLength } = useCartContext();
    const { openModal } = useModalContext();
    const router = useRouter();

    const { clearCart } = useCartStore((state) => ({
        clearCart: state.clearCart
    }));

    const handleSignOut = async () => {

        clearCart();
        localStorage.removeItem(storageKeys.CART);

        const res = await signOut();
        if (!res) console.error("error signing out");

    };

    return (

        <div className="w-full flex items-center justify-end h-10 col-span-1">

            <div className="md:hidden w-auto flex justify-start space-x-2">
                <Link className="" href="/shop">{t('shop')}</Link>
            </div>

            <div className="md:w-full w-full flex justify-end space-x-4 children:lowercase">


                {authenticated
                    ? (
                        <>
                            <button onClick={handleSignOut} className="">logout</button>
                            <Link className="" href="/customer/wishlist">{t("wishlist")}</Link>
                            <Link className="" href="/customer/personal-information">{t("account")}</Link>
                        </>
                    )
                    : <button onClick={() => openModal('sign_in')}>{t("account")}</button>
                }

                <Link className="" href="/cart">{t("cart")} ({cartLength})</Link>

            </div>

        </div>

    );

};