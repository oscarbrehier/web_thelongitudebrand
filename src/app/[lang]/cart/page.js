"use client"
import { useState } from "react";
import CartItemBig from "@/app/components/CartItemBig";
import { useRouter } from "next/navigation";
import { checkout } from "@/lib/checkout";
import Button from "@/app/components/ui/Button";
import { useAuthContext } from "@/lib/context/AuthContext";
import { useCartStore } from "@/lib/stores/useCartStore";
import Hyperlink from "@/app/components/ui/Hyperlink";

export default function Page() {

    const router = useRouter();

    const { user } = useAuthContext();

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const cart = useCartStore((state) => state.cart);
    const total = useCartStore((state) => state.total);

    const getCheckout = async () => {

        setLoading(true);
        setError(null);

        try {

            const { url } = await checkout(user.uid, cart, total);
            router.push(url);

        } catch (err) {

            setError("An error occured. Please try again or come back later");

        } finally {

            setLoading(false);

        };

    };

    return (

        <>

            {
                cart && cart.length >= 1 ? (

                    <div className="w-full h-auto grid xl:grid-cols-4 2md:grid-cols-3 grid-cols-1 gap-2">

                        <div className="w-full h-full xl:col-span-3 2md:col-span-2 space-y-2">
                            {cart.map((item, idx) => (
                                <CartItemBig key={idx} index={idx} item={item} />
                            ))}
                        </div>


                        <div className="w-full h-auto space-y-4 2md:static sticky bottom-0 2md:p-0 py-4 bg-cream-100">

                            <div className="text-sm capitalize space-y-1">

                                <div className="w-full flex justify-between">
                                    <p className="text-xs">shipping cost</p>
                                    <p className="text-xs">calculated at checkout</p>
                                </div>

                                <div className="w-full flex justify-between">
                                    <p className="text-sm">total</p>
                                    {/* <p className="text-sm bg-neon-green">{cart.price} €</p> */}
                                    <p className="text-sm bg-neon-green">{total} €</p>
                                </div>

                            </div>

                            <div className="space-y-2">

                                <Button
                                    title="proceed to checkout"
                                    onClick={getCheckout}
                                    size="w-full h-10"
                                    loading={loading}
                                />

                                {error && <p className="text-error-red text-sm">{error}</p>}

                            </div>

                            {/* <div className="flex justify-between sm:children:h-5 grayscale children:select-none space-x-2">
                            <img src="/images/icons/banks/visa.svg" alt="" />
                            <img src="/images/icons/banks/mastercard.svg" alt="" />
                            <img src="/images/icons/banks/amex.svg" alt="" />
                            <img src="/images/icons/banks/diners.svg" alt="" />
                            <img src="/images/icons/banks/unionpay.svg" alt="" />
                            <img src="/images/icons/banks/discover.svg" alt="" />
                            <img src="/images/icons/banks/bancontact.svg" alt="" />
                            <img src="/images/icons/banks/eps.svg" alt="" />
                            <img src="/images/icons/banks/giropay.svg" alt="" />
                            <img src="/images/icons/banks/ideal.svg" alt="" />
                        </div> */}

                            <Menu style='2md:block hidden' />

                        </div>

                        <Menu style='2md:hidden block' />

                    </div>

                ) : (

                    <div className="flex-1 w-full flex flex-col items-center pt-32 space-y-4">

                        <p>Your shopping cart is empty</p>
                        <Hyperlink
                            to="/shop"
                            title="start shopping"
                            size="w-96 h-10"
                        />

                    </div>

                )
            }

        </>


    );

};

function Menu({ style }) {

    const [activeMenu, setActiveMenu] = useState(null);

    const handleMenuToggle = (menuId) => {
        setActiveMenu(activeMenu === menuId ? null : menuId);
    };

    return (

        <div className={`children:text-sm space-y-1 pt-2 ${style}`}>

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