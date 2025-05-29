"use client"
import { useAuthContext } from "@/lib/context/AuthContext";
import { useCartStore } from "@/lib/stores/useCartStore";
import { useEffect } from "react";

export default function Layout({ children }) {

    const { user } = useAuthContext();
    const { clearCart } = useCartStore((state) => ({ clearCart: state.clearCart }));
    
    useEffect(() => {
        clearCart(user, true);
    }, [user]);

    return (children);

};