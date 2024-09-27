'use client'
import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import { getCartItems, getCartPrice, stripeCartFormat, sanityCartFormat } from "@/lib/cart";
import { useEffect, useState } from "react";
import CartItem from "@/components/cart/cartItem";
import { useRouter, usePathname } from "next/navigation";
import { checkout } from "@/lib/checkout";
import { PageLayout } from "@/components/PageLayout";
import { useAppContext } from "@/lib/context";
import { PageContainer } from "@/components/container/page";

export default function Page() {

    const [cart, setCart] = useState({ content: [], price: 0 });

    const router = useRouter();
    const pathname = usePathname();

    const { height, setHeight } = useAppContext();
    const [windowSize, setWindowSize] = useState({ height: 0, width: 0 });

    useEffect(() => {

        getCartContent();
        setWindowSize({ height: window.innerHeight, width: window.innerWidth });
        setCart(prev => ({ ...prev, price: getCartPrice() }));

    }, []);

    const getCartContent = (trigger) => {

        if (trigger == 'cart_item') {

            setCart(previous => ({ ...previous, price: getCartPrice() }));

        };

        setCart(previous => ({ ...previous, content: getCartItems() }));

    };

    const getCheckout = async () => {

        let carts = {
            stripe_cart: stripeCartFormat(),
            sanity_cart: sanityCartFormat(),
        };

        let { url } = await checkout(carts, pathname);
        if (url) router.push(url);

    };

    return (

        <PageContainer>

            <section className="w-full min-h-screen pt-14">

                <div className="h-40 w-full flex flex-col justify-center md:items-start items-center space-y-3 my-10">

                    <div className="bg-neon-green md:mx-32">
                        <p className="capitalize font-playfair italic font-medium text-6xl">cart</p>
                    </div>

                </div>

                <div className="w-full h-auto grid xl:grid-cols-4 2md:grid-cols-3 grid-cols-1 gap-2">

                    <div className="w-full h-full xl:col-span-3 2md:col-span-2 space-y-2">
                        {cart.content && cart.content.map((item, idx) => (
                            <CartItem index={idx} item={item} updateCart={() => getCartContent('cart_item')} />
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
                                <p className="text-sm bg-neon-green">{cart.price} €</p>
                            </div>

                        </div>

                        <button className={`w-full py-1 bg-black text-white uppercase text-sm`}>
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

                        <div className="children:text-sm space-y-1 pt-2 2md:block hidden">
                            <div className="w-full flex justify-between">
                                <p>shipping methods</p>
                                <p>+</p>
                            </div>
                            <div className="w-full flex justify-between">
                                <p>returns</p>
                                <p>+</p>
                            </div>
                            <div className="w-full flex justify-between">
                                <p>secure payment</p>
                                <p>+</p>
                            </div>
                        </div>

                    </div>

                </div>

            </section>

            {/* <section style={{ height: `${windowSize.height - height}px` }} className="w-full grid grid-cols-3">

                <div className="h-full overflow-y-scroll">
                    {cart.content && cart.content.map((item) => (
                        <CartItem item={item} updateCart={() => getCartContent('cart_item')} />
                    ))}
                </div>

            </section> */}

        </PageContainer>


    );

};
