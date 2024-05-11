'use client'
import { useState, useEffect } from "react";
import { getCartLength } from "@/lib/cart";

export const Nav = () => {

    const [cartLength, setCartLength] = useState(null);

    useEffect(() => {

        const updateCartLength = () => setCartLength(getCartLength());
        updateCartLength();

    }, []);

    return (

        <div className="h-auto w-full fixed bottom-0 flex justify-between px-6 py-4 z-30">
            <a href="/shop" className="flex items-center justify-center pointer-events-auto relative">
                <p className="text-primary-blue hover:bg-primary-blue hover:text-white p-2 font-helvetica75 font-bold text-5xl">shop</p>
            </a>

            <a href="/cart" className="flex items-center justify-center pointer-events-auto relative">
                <p className="text-primary-blue hover:bg-primary-blue hover:text-white p-2 font-helvetica75 font-bold text-5xl">cart: {cartLength}</p>
            </a>
        </div>

    );

};