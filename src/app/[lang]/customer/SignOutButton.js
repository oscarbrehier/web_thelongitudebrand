"use client"
import { useCartStore } from "@/lib/stores/useCartStore";
import { useRouter } from "next/navigation";
import { storageKeys } from "@/lib/constants/settings.config";
import signOut from "@/lib/authentication/signOut";
import { useAuthContext } from "@/lib/context/AuthContext";
import { captureException } from "@sentry/nextjs";
import debugLog from "@/lib/utils/debugLog";
import posthog from "posthog-js";

export default function SignOutButton({
    title,
    className
}) {

    const router = useRouter();

    const { user } = useAuthContext();
    const { clearCart, setCartSync } = useCartStore((state) => ({ clearCart: state.clearCart, setCartSync: state.setSynced }));

    const handleSignOut = async () => {

        try {

            const currentUser = user;
            const res = await signOut();

            if (!res) {
                const error = new Error("API sign-out failed");
                captureException(error);
            } else {

                setCartSync(false);
                clearCart(currentUser);
                posthog.reset();
                localStorage.removeItem(storageKeys.CART);
                router.push("/shop");

            }

        } catch (err) {
            debugLog(err);
            captureException(err);
        }

    };

    return (

        <button onClick={handleSignOut} className={className}>
            {title}
        </button>

    )

}