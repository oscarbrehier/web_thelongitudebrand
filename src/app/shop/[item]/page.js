'use client'
import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import { addToCart } from "@/lib/cart";
import { getProducts } from "@/lib/store/getProducts";
import { useEffect, useState } from "react";
import { client } from "@/lib/sanity/client";
import { useRouter, usePathname } from "next/navigation";
import { checkout } from "@/lib/checkout";
import { v4 as uuidv4 } from 'uuid';
import { PageLayout } from "@/components/PageLayout";
import { useAppContext } from "@/lib/context";

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
        //     {product.content && <div className="h-auto w-full flex flex-col">
        //         {/* {item}
        //     <button onClick={addItemToCart}>add to cart</button>
        //     <button onClick={getCart}>get cart</button> */}

        //         <div className="h-screen w-full flex flex-col">

        //             <div className="w-full flex-1 grid grid-cols-3">

        //                 <div className="h-full w-full flex items-center justify-center p-8">
        //                     <img className="" src={product.content.image_url} alt="" />
        //                 </div>

        //                 <div className="col-span-2 h-full">

        //                     <div className="h-full flex flex-col justify-between px-8">

        //                         <div className="mt-20">
        //                             <p className="uppercase font-helvetica75 text-4xl">{product.content.title}</p>
        //                             {/* <p className="uppercase font-helvetica75 text-4xl">{product.attributes.name}</p> */}
        //                             <p className="uppercase font-helvetica text-2xl">{product.content.price} EUR</p>

        //                             <div className="flex space-x-2 mt-4">
        //                                 {['XS', 'S', 'M', 'L'].map((size, index) => (
        //                                     <button onClick={(e) => setProduct(previous => ({ ...previous, size: index }))} className={`${product.size == index ? 'bg-neutral-200' : 'bg-neutral-50'} hover:bg-neutral-400 hover:transition-all hover:ease-in-out size-8 flex items-center justify-center text-neutral-900`}>{size}</button>
        //                                 ))}
        //                                 {/* <button className="bg-neutral-50 hover:bg-neutral-400 hover:transition-all hover:ease-in-out size-8 flex items-center justify-center text-neutral-900">XS</button>
        //                                 <button className="bg-neutral-200 hover:bg-neutral-400 hover:transition-all hover:ease-in-out size-8 flex items-center justify-center text-neutral-900">S</button>
        //                                 <button className="bg-neutral-50 hover:bg-neutral-400 hover:transition-all hover:ease-in-out size-8 flex items-center justify-center text-neutral-900">M</button>
        //                                 <button className="bg-neutral-50 hover:bg-neutral-400 hover:transition-all hover:ease-in-out size-8 flex items-center justify-center text-neutral-900">L</button> */}
        //                             </div>

        //                             <div className="mt-8 space-x-8">
        //                                 <button onClick={addItemToCart} className="text-2xl font-helvetica uppercase">{buttons.cart.text}</button>
        //                                 <button className="text-2xl font-helvetica uppercase">checkout</button>
        //                             </div>

        //                             {/* <div className="w-96 h-10 mt-4 flex space-x-2">
        //                                 <div className="size-10 bg-neutral-900 ring-1 ring-black ring-offset-1"></div>
        //                                 <div className="size-10 bg-neutral-100 ring-1 ring-transparent ring-offset-1"></div>
        //                             </div> */}

        //                         </div>

        //                         {/* <div className="w-full grid grid-cols-2 gap-4">

        //                             <button onClick={addItemToCart} className="bg-black text-white uppercase font-helvetica75 text-2xl px-8 py-4 focus:outline-none focus:ring-4 focus:ring-blue-500 focus:ring-offset-2">
        //                                 {buttons.cart.text}
        //                             </button>

        //                             <button onClick={createCheckout} disabled={product.size == 4} className={`bg-white ${product.size == 4 ? 'text-neutral-700 border-neutral-700 cursor-not-allowed' : ' text-black border-black'} border-4 uppercase font-helvetica75 text-2xl px-8 py-4 focus:outline-none focus:ring-4 focus:ring-blue-500 focus:ring-offset-2`}>
        //                                 checkout
        //                             </button>

        //                         </div> */}

        //                     </div>


        //                 </div>

        //             </div>

        //         </div>

        //     </div>}
        // </>
        <>
            {product.content && (
                <PageLayout category={false}>

                    <div className="h-auto w-full">

                        <div
                            style={{ height: `${windowSize.height !== 0 && windowSize.height - height}px` }}
                            className="grid grid-cols-3">

                            <div className="h-full w-full bg-neutral-200 flex items-center justify-center p-4">
                                <img src={product.content.image_url} alt="" />
                            </div>

                            <div className="h-full w-full p-4">

                                <div>
                                    <p className="uppercase font-helvetica font-bold text-4xl">{product.content.title}</p>
                                    <p className="uppercase font-helvetica font text-2xl">{product.content.price} EUR</p>
                                    <p className="mt-2 font-helvetica text-sm w-2/3">Fugiat commodo exercitation magna consequat adipisicing eu voluptate id do enim. Do ullamco et nostrud labore minim pariatur eu ullamco irure ex eiusmod irure.</p>
                                </div>

                                <div className="flex space-x-2 mt-4">
                                    {['XS', 'S', 'M', 'L'].map((size, index) => (
                                        <button onClick={(e) => setProduct(previous => ({ ...previous, size: index }))} className={`${product.size == index ? 'bg-neutral-200' : 'bg-neutral-50'} hover:bg-neutral-400 hover:transition-all hover:ease-in-out size-10 flex items-center justify-center text-neutral-900`}>{size}</button>
                                    ))}
                                </div>

                                <div className="mt-4 space-x-2">
                                    <button onClick={addItemToCart} className="h-10 px-4 bg-black text-white font-helvetica font-bold uppercase">
                                        {buttons.cart.text}
                                    </button>
                                    <button className="h-10 px-4 bg-neutral-400 text-white font-helvetica font-bold uppercase">
                                        checkout
                                    </button>
                                </div>

                            </div>

                        </div>

                    </div>

                </PageLayout>
            )}
        </>

    );

};