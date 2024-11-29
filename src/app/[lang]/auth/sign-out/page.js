'use client'
import { useCartStore } from "@/lib/stores/useCartStore";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import signOut from "@/lib/authentication/signOut";
import LoadingPanel from "@/app/components/LoadingPanel";

export default function Page() {

    const router = useRouter();

    const { clearCart } = useCartStore((state) => ({
        clearCart: state.clearCart
    }));

    useEffect(() => {

        const handleSignOut = async () => {

            clearCart();
            await signOut();

            router.push("/shop");

        };

        handleSignOut();

    }, [router]);

    return (

        <div className="h-screen w-full flex">
            <LoadingPanel />
        </div>

    );

};