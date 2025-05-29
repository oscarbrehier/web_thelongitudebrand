"use client"
import { useCartStore } from "@/lib/stores/useCartStore";
import { useRouter } from "next/navigation";
import { storageKeys } from "@/lib/constants/settings.config";
import signOut from "@/lib/authentication/signOut";
import { useAuthContext } from "@/lib/context/AuthContext";

export default function SignOutButton({
    title,
    className
}) {

    const router = useRouter();

    const { user } = useAuthContext();
    const { clearCart, setCartSync } = useCartStore((state) => ({ clearCart: state.clearCart, setCartSync: state.setSynced }));

    const handleSignOut = async () => {

        clearCart(user);
        localStorage.removeItem(storageKeys.CART);

        const res = await signOut();

        if (!res) {
            console.error("error signing out");
        } else {
            setCartSync(false);
        }
        router.push("/shop");
    };

    return (

        <button onClick={handleSignOut} className={className}>
            {title}
        </button>

    )

}