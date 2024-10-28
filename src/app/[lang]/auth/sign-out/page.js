'use client'
import { deleteAuthCookie } from "@/actions/handleAuthCookie";
import { auth } from "@/lib/firebase/firebase";
import { useCartStore } from "@/lib/stores/useCartStore";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { storageKeys } from "@/lib/constants/settings.config";

export default function Page() {

    const router = useRouter();

    const { clearCart } = useCartStore((state) => ({
        clearCart: state.clearCart
    }));

    useEffect(() => {

        const signOut = async () => {

            clearCart();
            localStorage.removeItem(storageKeys.CART);

            await auth.signOut();
            await deleteAuthCookie();

            router.push("/shop");

        };

        signOut();

    }, [router]);

    return (
        <></>
    );

};