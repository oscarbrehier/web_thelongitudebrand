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

export default function Page() {

    const [cart, setCart] = useState({ content: [], price: getCartPrice() });

    const router = useRouter();
    const pathname = usePathname();

    const { height, setHeight } = useAppContext();
    const [windowSize, setWindowSize] = useState({ height: 0, width: 0 });

    useEffect(() => {

        getCartContent();
        setWindowSize({ height: window.innerHeight, width: window.innerWidth });

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

        //         <div className="h-auto w-full relative">

        //             <div className={`bg-white h-auto pb-28 w-full absolute z-30`}>

        //                 <Navigation />

        //                 {/* {Object.values(cart).map((item) => (
        // <div>{item}</div>
        // ))} */}

        //                 <div className="px-4 mt-10 grid grid-cols-3 gap-4">

        //                     <section className="space-y-4 col-span-1 bg-red-500">
        //                         {cart.content && cart.content.map((item) => (
        //                             <CartItem item={item} updateCart={() => getCartContent('cart_item')} />
        //                         ))}
        //                     </section>

        //                     <section className="cols-">

        //                     </section>

        //                     {/* <section className="col-span-1 h-60 p-4 flex flex-col justify-between">

        //                         <p className="font-helvetica text-black font-bold text-lg capitalize">order summary</p>

        //                         <div>
        //                             <p className="font-helvetica text-base flex justify-between"><span className="capitalize">sub total :</span> 000 EUR</p>
        //                             <p className="font-helvetica text-base flex justify-between"><span className="capitalize">shipping :</span> 000 EUR</p>
        //                             <p className="font-helvetica"><span className="capitalize text-xl font-bold">shipping :</span> calculated at checkout</p>

        //                             <button className="w-full py-6 flex items-center justify-center bg-black text-white text-2xl font-helvetica75 uppercase mt-4">
        //                                 proceed to checkout
        //                             </button>
        //                         </div>

        //                     </section> */}

        //                 </div>

        //             </div>

        //             {/* <div className="h-screen w-full absolute flex items-end">

        //                 <div className="h-auto py-4 px-4 w-full bg-neutral-200 fixed flex z-30 border-t-[1rem] border-x-[1rem] border-white">

        //                     <div className="w-1/2 h-full flex items-center space-x-2">
        //                         <div className="">
        //                             <p className="text-2xl font-helvetica75 uppercase">subtotal: </p>
        //                             <p className="text-xl font-helvetica">{cart.price.toFixed(2)} EUR</p>
        //                         </div>
        //                     </div>
        //                     <div className="w-1/2 h-full flex items-center justify-end">
        //                         <button onClick={getCheckout} className="bg-black text-white uppercase font-helvetica75 text-2xl px-8 py-4">
        //                             proceed to checkout
        //                         </button>
        //                     </div>

        //                 </div>

        //             </div> */}

        //             <Footer />

        //         </div>

        //         <div className={`bg-white h-auto w-full`}>

        //             <div className="h-screen w-full flex flex-col">

        //                 <Navigation />

        //                 {/* {Object.values(cart).map((item) => (
        // <div>{item}</div>
        // ))} */}

        //                 <div className="flex-1 w-full overflow-hidden px-4 mt-20 grid grid-cols-3 pb-4">

        //                     <section className="h-full w-full overflow-y-scroll space-y-4 col-span-2 ">
        //                         {cart.content && cart.content.map((item) => (
        //                             <CartItem item={item} updateCart={() => getCartContent('cart_item')} />
        //                         ))}
        //                         {(!cart.content || cart.content.length == 0) && (
        //                             <div className="h-full w-full flex items-center justify-center">
        //                                 <p className="mb-20 font-helvetica font-bold text-xl uppercase">your cart is empty</p>
        //                             </div>
        //                         )}
        //                     </section>

        //                     <section className="col-span-1 flex flex-col justify-start">
        //                         {/* <button onClick={getCheckout} className="bg-black text-white uppercase font-helvetica75 text-2xl w-full py-4 focus:outline-none focus:ring-4 focus:ring-blue-500 focus:ring-offset-2">
        //                             proceed to checkout
        //                         </button> */}

        //                         <div>
        //                             <button onClick={getCheckout} className="text-black uppercase font-helvetica75 text-4xl w-auto">
        //                                 proceed to checkout
        //                             </button>
        //                         </div>

        //                         <div className="flex flex-col ml-[2px]">
        //                             <p className="text-2xl font-helvetica75 uppercase">subtotal: </p>
        //                             <p className="text-xl font-helvetica">{cart.price.toFixed(2)} EUR</p>
        //                         </div>


        //                     </section>

        //                 </div>

        //             </div>

        //             <Footer />

        //         </div>

        <PageLayout>

            <section style={{ height: `${windowSize.height - height}px` }} className="w-full grid grid-cols-3">

                <div className="h-full overflow-y-scroll">
                    {cart.content && cart.content.map((item) => (
                        <CartItem item={item} updateCart={() => getCartContent('cart_item')} />
                    ))}
                </div>

            </section>

        </PageLayout>


    );

};
