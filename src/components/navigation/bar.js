'use client'
import { useState, useEffect } from "react";
import { getCartLength } from "@/lib/cart";
import Link from "next/link";

export const NavigationBar = () => {

    const [cartLength, setCartLength] = useState(null);

    useEffect(() => {

        const updateCartLength = () => setCartLength(getCartLength());
        updateCartLength();

        window.addEventListener('cart_update', updateCartLength);

        return () => window.removeEventListener('cart_update', updateCartLength);

    }, []);


    return (


        <div className="md:h-10 h-auto w-full flex md:flex-row flex-col items-center justify-between px-0 py-2 bg-neon-green text-xs z-20 top-4">

            <div className="md:w-1/4 w-full md:block flex justify-center">
                <Link className="/" href="">the<span className="font-semibold">longitude</span>brand</Link>
            </div>

            <div className="md:w-3/4 w-full flex md:items-center items-end h-10">

                <div className="md:w-2/3 w-1/2 flex justify-start space-x-2">
                    <Link className="/shop" href="">shop</Link>
                </div>

                <div className="md:w-1/3 w-1/2 flex justify-end space-x-4 ">
                    <Link href="/account">account</Link>
                    <Link href="/cart">cart ({cartLength})</Link>
                </div>

            </div>

        </div>

    );

};