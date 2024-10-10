'use client'
import { useState, useEffect, useContext } from "react";
import { getCartLength } from "@/lib/cart";
import Link from "next/link";
import { useAuthContext } from "@/lib/context/AuthContext";
import signOut from "@/lib/authentication/signOut";
import { useModalContext } from "@/lib/context/ModalContext";
import { useRouter } from "next/navigation";

export const NavigationBar = () => {

    const [cartLength, setCartLength] = useState(null);
    const [authenticated, setAuthenticated] = useState(false);

    const { user, isAuth, logout } = useAuthContext();
    const { openModal } = useModalContext();

    const router = useRouter();

    useEffect(() => {

        const updateCartLength = () => setCartLength(getCartLength());
        updateCartLength();

        window.addEventListener('cart_update', updateCartLength);

        return () => window.removeEventListener('cart_update', updateCartLength);

    }, []);

    useEffect(() => {

        setAuthenticated(isAuth);

    }, [isAuth]);

    const handleSignOut = async () => {

        const { error } = await signOut(logout);

        if (!error) {

            // setAuthenticated(false);
            router.push('/shop');

        };

    };

    return (


        <div className="md:h-10 h-auto w-full md:grid lg:grid-cols-4 md:grid-cols-3 gap-2 flex flex-col items-center justify-between md:p-0 pt-2 bg-neon-green text-xs z-20 top-4">

            <div className="md:w-1/4 w-full md:block flex justify-center">
                <Link href="/">the<span className="font-semibold">longitude</span>brand</Link>
            </div>

            <div className="h-full w-full md:flex hidden items-center justify-end lg:col-span-2">
                <Link className="text-black" href="/shop">shop</Link>
            </div>

            <div className="w-full flex items-center justify-end h-10 col-span-1">

                <div className="md:hidden w-1/2 flex justify-start space-x-2">
                    <Link className="" href="/shop">shop</Link>
                </div>

                <div className="md:w-full w-1/2 flex justify-end space-x-4 children:lowercase">


                    {authenticated
                        ? (
                            <>
                                <button onClick={handleSignOut} className="">logout</button>
                                <Link className="" href="/customer/wishlist">wishlist</Link>
                                <Link className="" href="/customer/personal-information">account</Link>
                            </>
                        )
                        : <button onClick={() => openModal('signin')}>account</button>
                    }

                    <Link className="" href="/cart">cart ({cartLength})</Link>

                </div>

            </div>

        </div>

    );

};