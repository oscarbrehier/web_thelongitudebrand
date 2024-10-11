'use client'
import { getCartItems, getCartPrice, stripeCartFormat, sanityCartFormat } from "@/lib/cart";
import { useEffect, useState } from "react";
import CartItem from "@/components/cart/cartItem";
import { useRouter, usePathname } from "next/navigation";
import { checkout } from "@/lib/checkout";
import { PageContainer } from "@/components/container/page";
import Button from "@/components/ui/Button";
import { useAuthContext } from "@/lib/context/AuthContext";
import getCartFromDb from "@/lib/firestore/getCartFromDb";
import { useCartContext } from "@/lib/context/CartContext";

export default function Page() {

    // const [cart, setCart] = useState({ content: [], price: 0 });

    const router = useRouter();
    const pathname = usePathname();

    const { user } = useAuthContext();
    const { cart, total } = useCartContext();

    // const getCartContent = async (trigger) => {

    //     // setCart(previous => ({ ...previous, content: getCartItems() }));

    //     const { items, total } = await getCartFromDb(user.uid);
    //     setCart(previous => ({ ...previous, content: items, price: total }));
    // };

    const getCheckout = async () => {

        let carts = {
            stripe_cart: stripeCartFormat(),
            // sanity_cart: sanityCartFormat(),
        };

        await checkout(carts, pathname, user);
        // console.log(url);
        // if (url) router.push(url);

    };

    return (

        <PageContainer>

            <section className="w-full min-h-screen pt-12 flex flex-col">

                <div className="h-40 w-full md:grid grid-cols-4 gap-4 flex flex-col justify-center md:items-end items-center space-y-3 my-10">

                    <div className="h-full flex justify-start items-center col-start-2">
                        <div className="bg-neon-green">
                            <p className="capitalize font-playfair italic font-medium text-6xl">cart</p>
                        </div>
                    </div>

                </div>

                {
                    cart !== null ? (

                        <div className="w-full h-auto grid xl:grid-cols-4 2md:grid-cols-3 grid-cols-1 gap-2">

                            <div className="w-full h-full xl:col-span-3 2md:col-span-2 space-y-2">
                                {cart.map((item, idx) => (
                                    <CartItem key={idx} index={idx} item={item} updateCart={() => getCartContent('cart_item')} />
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

                                <button onClick={getCheckout} className={`w-full h-10 bg-black hover:bg-neon-green text-white hover:text-black uppercase text-sm`}>
                                    proceed to checkout
                                </button>

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
                            <Button
                                title="start shopping"
                                size="w-96 h-10"
                            />

                        </div>

                    )
                }

            </section>

        </PageContainer>


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