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
    const { clearCart } = useCartStore((state) => ({ clearCart: state.clearCart }));

    const handleSignOut = async () => {

        clearCart(user);
        localStorage.removeItem(storageKeys.CART);

        const res = await signOut();

        if (!res) console.error("error signing out");
        router.push("/shop");

    };

    return (

        <button onClick={handleSignOut} className={className}>
            {title}
        </button>

    )

}