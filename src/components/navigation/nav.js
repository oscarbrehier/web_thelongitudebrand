'use client'
import { useState, useEffect, useRef, forwardRef } from "react";
import { getCartLength } from "@/lib/cart";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const Nav = () => {

    const [cartLength, setCartLength] = useState(null);

    useEffect(() => {

        const updateCartLength = () => setCartLength(getCartLength());
        updateCartLength();

    }, []);

    return (

        <div className="h-auto w-full fixed bottom-0 flex justify-between xs:px-6 xs:py-4 z-30 xs:bg-transparent bg-white px-6 py-4">
            <a href="/shop" className="flex items-center justify-center pointer-events-auto relative xs:bg-transparent">
                <p className="text-primary-blue hover:bg-primary-blue hover:text-white xs:p-2 px-2 font-helvetica75 font-bold text-5xl">shop</p>
            </a>

            <a href="/cart" className="flex items-center justify-center pointer-events-auto relative xs:bg-transparent">
                <p className="text-primary-blue hover:bg-primary-blue hover:text-white xs:p-2 px-2 font-helvetica75 font-bold text-5xl">cart: {cartLength}</p>
            </a>
        </div>

    );

};