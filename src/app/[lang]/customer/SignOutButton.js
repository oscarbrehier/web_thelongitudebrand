"use client"
import { useCartStore } from "@/lib/stores/useCartStore";
import { useRouter } from "next/navigation";
import { storageKeys } from "@/lib/constants/settings.config";
import { signOut } from "@/lib/authentication/service";

export default function SignOutButton({
    title,
    className
}) {

    const router = useRouter();
    const { clearCart } = useCartStore((state) => ({ clearCart: state.clearCart }));

    const handleSignOut = async () => {

        clearCart();
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