'use client'
import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import { addToCart } from "@/lib/cart";
import { getProducts } from "@/lib/store/getProducts";
import { useEffect, useMemo, useRef, useState } from "react";
import { client } from "@/lib/sanity/client";
import { useRouter, usePathname } from "next/navigation";
import { checkout } from "@/lib/checkout";
import { v4 as uuidv4 } from 'uuid';
import { PageLayout } from "@/components/PageLayout";
import { useAppContext } from "@/lib/context";
import { PageContainer } from "@/components/container/page";
import { NavigationBar } from "@/components/navigation/bar";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Page({ params }) {

    const { item } = params;

    const router = useRouter();
    const pathname = usePathname();

    const [product, setProduct] = useState({ content: null, size: 4 });
    const [buttons, setButtons] = useState({
        cart: {
            text: 'add to cart',
            clickable: true,
        },
        checkout: {
            clickable: false,
        },
    });

    const { height, setHeight } = useAppContext();

    const [windowSize, setWindowSize] = useState({ height: 0, width: 0 });

    const addItemToCart = () => {

        if (product.size == 4) {

            setButtons(previous => ({ ...previous, cart: { clickable: true, text: 'select size' } }));
            return;

        };

        setButtons(previous => ({ ...previous, cart: { clickable: true, text: 'add to cart' } }))

        addToCart({
            item_id: `${product.content._id}&size=${product.size}`,
            slug: item,
            name: product.content.title,
            quantity: 1,
            unit_price: product.content.price,
            price: product.content.price,
            size: product.size,
            assets: {
                image: product.content.image_url,
            },
        });

    };

    const createCheckout = async () => {

        const size = ['XS', 'S', 'M', 'L'][product.size];

        let stripe_cart = [{
            price_data: {
                currency: 'eur',
                unit_amount: product.content.price * 100,
                product_data: {
                    name: `${product.content.title.toUpperCase()} - ${size}`,
                    images: [product.content.image_url]
                },
            },
            quantity: 1,
        }];

        let sanity_cart = {
            _type: 'order',
            total: 0,
            products: [{
                _key: uuidv4(),
                _type: 'product',
                product: {
                    _type: 'reference',
                    _ref: product.content._id,
                },
                size: size,
                quantity: 1,
                unit_price: product.content.price,
            }]
        };

        let carts = {
            stripe_cart,
            sanity_cart
        };

        let { url } = await checkout(carts, pathname);

        if (url) router.push(url);

    };

    useEffect(() => {

        async function getProduct() {

            // let res = await fetch(`/api/store/getProduct/${item}`);
            // res = await res.json();

            const PRODUCT_QUERY = `*[_type == "product" && slug.current == "${item}"]`;
            const product = await client.fetch(PRODUCT_QUERY);

            let image_url = `https://cdn.sanity.io/images/xgcgiqjg/production/${product[0].images[0].asset._ref.slice(6).replace('-png', '.png')}`
            product[0].image_url = image_url;

            setProduct(previous => ({ ...previous, content: product[0] }));

        };

        getProduct();
        setWindowSize({ height: window.innerHeight, width: window.innerWidth });

    }, []);

    return (

        // <>

        //     {product.content && (
        //         <PageLayout category={false}>

        //             <div className="h-auto w-full">

        //                 <div
        //                     style={{ height: `${windowSize.height !== 0 && windowSize.height - height}px` }}
        //                     className="md:grid hidden grid-cols-3">

        //                     <div className="h-full w-full bg-neutral-200 flex items-center justify-center p-4 col-span-2">
        //                         <img className="2lg:w-[60%] w-[90%]" src={product.content.image_url} alt="" />
        //                     </div>

        //                     <div className="h-full w-full p-4 col-span-1">

        //                         <div>
        //                             <p className="uppercase font-helvetica font-bold text-4xl">{product.content.title}</p>
        //                             <p className="uppercase font-helvetica font text-2xl">{product.content.price} EUR</p>
        //                             <p className="mt-2 font-helvetica text-sm w-2/5">Fugiat commodo exercitation magna consequat adipisicing eu voluptate id do enim. Do ullamco et nostrud labore minim pariatur eu ullamco irure ex eiusmod irure.</p>
        //                         </div>

        //                         <div className="flex space-x-2 mt-4">
        //                             {['XS', 'S', 'M', 'L'].map((size, index) => (
        //                                 <button onClick={(e) => setProduct(previous => ({ ...previous, size: index }))} className={`${product.size == index ? 'bg-neutral-200' : 'bg-neutral-50'} hover:bg-neutral-400 hover:transition-all hover:ease-in-out size-10 flex items-center justify-center text-neutral-900`}>{size}</button>
        //                             ))}
        //                         </div>

        //                         <div className="mt-4 space-x-2">
        //                             <button onClick={addItemToCart} className="h-10 px-4 bg-black text-white font-helvetica font-bold uppercase">
        //                                 {buttons.cart.text}
        //                             </button>
        //                             <button className="h-10 px-4 bg-neutral-400 text-white font-helvetica font-bold uppercase">
        //                                 checkout
        //                             </button>
        //                         </div>

        //                     </div>

        //                 </div>

        //                 <div
        //                     className="md:hidden flex flex-col grid-cols-3 h-auto">

        //                     <div className="sm:h-auto h-[60vh] w-full bg-neutral-200 flex items-center justify-center sm:py-10 sm:px-4 p-4">
        //                         <img src={product.content.image_url} alt="" />
        //                     </div>

        //                     <div className="h-full w-full p-4">

        //                         <div>
        //                             <p className="uppercase font-helvetica font-bold text-4xl">{product.content.title}</p>
        //                             <p className="uppercase font-helvetica font text-2xl">{product.content.price} EUR</p>
        //                             <p className="mt-2 font-helvetica text-sm w-2/3">Fugiat commodo exercitation magna consequat adipisicing eu voluptate id do enim. Do ullamco et nostrud labore minim pariatur eu ullamco irure ex eiusmod irure.</p>
        //                         </div>

        //                         <div className="flex space-x-2 mt-4">
        //                             {['XS', 'S', 'M', 'L'].map((size, index) => (
        //                                 <button onClick={(e) => setProduct(previous => ({ ...previous, size: index }))} className={`${product.size == index ? 'bg-neutral-200' : 'bg-neutral-50'} hover:bg-neutral-400 hover:transition-all hover:ease-in-out size-10 flex items-center justify-center text-neutral-900`}>{size}</button>
        //                             ))}
        //                         </div>

        //                         <div className="mt-4 space-x-2">
        //                             <button onClick={addItemToCart} className="h-10 px-4 bg-black text-white font-helvetica font-bold uppercase">
        //                                 {buttons.cart.text}
        //                             </button>
        //                             <button className="h-10 px-4 bg-neutral-400 text-white font-helvetica font-bold uppercase">
        //                                 checkout
        //                             </button>
        //                         </div>

        //                     </div>

        //                 </div>

        //             </div>

        //         </PageLayout>
        //     )}
        // </>

        <>
            {product.content && (

                <div className="h-auto w-full">

                    <NavigationBar position={'static'} />

                    <section className="h-screen w-full grid grid-cols-2">

                        <div className="h-full w-full flex items-center justify-center">
                            <img className="w-2/3" src={product.content.image_url} alt="" />
                        </div>


                    </section>

                </div>

            )}
        </>

    );

};