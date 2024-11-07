"use client"

import { useCartStore } from "@/lib/stores/useCartStore";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";

export default function Layout({ children }) {

    const query = useSearchParams();
    const { clearCart } = useCartStore((state) => ({ clearCart: state.clearCart }));

    useEffect(() => {

        if (query.has("cart")) clearCart();

    }, [query]);

    return children;

};