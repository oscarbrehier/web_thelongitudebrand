"use client"
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import checkout from "@/lib/checkout";
import Button from "@/app/components/ui/Button";
import { useAuthContext } from "@/lib/context/AuthContext";
import { useCartStore } from "@/lib/stores/useCartStore";
import Hyperlink from "@/app/components/ui/Hyperlink";
import { useModalContext } from "@/lib/context/ModalContext";
import dynamic from "next/dynamic";
import deleteOrder from "@/lib/firestore/deleteOrder";
import NoContentLayout from "@/app/components/NoContentLayout";

const CartItemSmall = dynamic(() => import("@/app/components/CartItemSmall"));

export default function Page({
    params: {
        lang
    }
}) {

    const router = useRouter();
    const params = useSearchParams();

    const { user } = useAuthContext();
    const { openModal } = useModalContext();

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const cart = useCartStore((state) => state.cart);
    const total = useCartStore((state) => state.total);

    const getCheckout = async () => {

        setLoading(true);
        setError(null);

        try {

            const url = await checkout(user, cart, total);
            console.log(url);
            if (url) {
                router.push(url);
                return;
            };

            throw new Error("Checkout URL not found");

        } catch (err) {

            console.log(err);
            setError("An error occured. Please try again or come back later");

        } finally {

            setLoading(false);

        };

    };

    // useEffect(() => {

    //     if (params.has("checkout") && params.has("order_id")) {

    //         const orderId = params.get("order_id");
    //         if (user) deleteOrder(orderId);
    //         router.push("/cart");

    //     };

    // }, [params]);

    if (!cart || cart.length === 0) {

        return (

            <NoContentLayout
                title="Your cart is empty"
                text="Looks like you haven’t picked anything yet. Let’s change that!"
                linkTitle="start shopping"
                link="/shop"
            />

        );

    };

    return (

        <div className="h-auto w-full lg:grid grid-cols-4 gap-4 pt-24 pb-10">

            <div className="col-start-2 col-span-2 h-full flex flex-col space-y-4">

                <div>

                    <h1 className="text-lg capitalize mx-2">cart ({cart?.length} items)</h1>

                    {
                        user == null && (

                            <p className="mt-1 text-sm">
                                For your cart to be saved, either&nbsp;
                                <span onClick={() => openModal("sign_in")} className="underline cursor-pointer">sign in</span>
                                &nbsp;or&nbsp;
                                <span onClick={() => openModal("sign_up")} className="underline cursor-pointer">create an account</span>
                            </p>

                        )
                    }

                </div>

                <div className="h-full w-full space-y-2">

                    {
                        cart?.map((item, index) => (

                            <CartItemSmall
                                key={index}
                                lang={lang}
                                content={item}
                                clickable={true}
                                backgroundColor={{
                                    card: "cream-300",
                                    image: "cream-200"
                                }}
                            />

                        ))
                    }

                </div>


            </div>

            <div className="h-auto bg-cream-100 sticky col-start-2 col-span-2 left-0 bottom-0 py-4 space-y-4">

                <div className="text-sm capitalize space-y-1">

                    <div className="w-full flex justify-between">
                        <p className="text-xs">shipping cost</p>
                        <p className="text-xs">calculated at checkout</p>
                    </div>

                    <div className="w-full flex justify-between">
                        <p className="text-sm">subtotal</p>
                        <p className="text-sm bg-neon-green">{total} €</p>
                    </div>

                </div>

                <div className="space-y-2">

                    <Button
                        title="proceed to checkout"
                        onClick={getCheckout}
                        size="w-full lg:h-14 h-10"
                        loading={loading}
                        text="uppercase"
                    />

                    {error && <p className="text-error-red text-sm">{error}</p>}

                </div>


            </div>

            <div className="col-start-2 col-span-2">
                <Menu />
            </div>

        </div>

    );

};

function Menu({ style }) {

    const [activeMenu, setActiveMenu] = useState(null);

    const handleMenuToggle = (menuId) => {
        setActiveMenu(activeMenu === menuId ? null : menuId);
    };

    return (

        <div className={`children:text-sm space-y-1 ${style}`}>

            <button onClick={() => handleMenuToggle(1)} className="w-full flex justify-between">
                <p>shipping methods</p>
                <p className="text-base pt-1">{activeMenu === 1 ? '-' : '+'}</p>
            </button>

            <div className={`w-full h-20 ${activeMenu === 1 ? 'flex' : 'hidden'}`}>

            </div>

            <button onClick={() => handleMenuToggle(2)} className="w-full flex justify-between">
                <p>returns</p>
                <p className="text-base pt-1">{activeMenu === 2 ? '-' : '+'}</p>
            </button>

            <div className={`w-full h-20 ${activeMenu === 2 ? 'flex' : 'hidden'}`}>

            </div>

            <button onClick={() => handleMenuToggle(3)} className="w-full flex justify-between">
                <p>secure payment</p>
                <p className="text-base pt-1">{activeMenu === 3 ? '-' : '+'}</p>
            </button>

            <div className={`w-full h-20 ${activeMenu === 3 ? 'flex' : 'hidden'}`}>
                <p className="text-xs">Ut commodo sunt est ut minim amet velit adipisicing nostrud ullamco tempor adipisicing labore. Cupidatat anim qui consectetur eiusmod enim ut.</p>
            </div>

        </div>

    );

};