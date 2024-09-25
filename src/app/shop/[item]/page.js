'use client'
import { addToCart } from "@/lib/cart";
import { useEffect, useState } from "react";
import { client } from "@/lib/sanity/client";
import { PageContainer } from "@/components/container/page";

export default function Page({ params }) {

    const { item } = params;

    const [product, setProduct] = useState({ content: null, size: 4 });

    const addItemToCart = () => {

        if (product.size == 4) {

            setButtons(previous => ({ ...previous, cart: { clickable: true, text: 'select size' } }));
            return;

        };

        // setButtons(previous => ({ ...previous, cart: { clickable: true, text: 'add to cart' } }))

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

        const updateCartEvent = new Event('cart_update');
        window.dispatchEvent(updateCartEvent);

    };

    useEffect(() => {

        async function getProduct() {


            const PRODUCT_QUERY = `*[_type == "product" && slug.current == "${item}"]`;
            const product = await client.fetch(PRODUCT_QUERY);

            let image_url = `https://cdn.sanity.io/images/xgcgiqjg/production/${product[0].images[0].asset._ref.slice(6).replace('-png', '.png')}`
            product[0].image_url = image_url;

            setProduct(previous => ({ ...previous, content: product[0] }));

            console.log(product[0])

        };

        getProduct();

    }, []);

    return (

        <PageContainer>

            {product.content && (

                <section className="md:h-screen h-auto w-full pt-14 md:grid grid-cols-3 flex flex-col-reverse">


                    <div className="h-full w-full flex flex-col items-center">

                        <div className="w-full flex justify-between mt-20 px-8">

                            <p className="capitalize italic font-playfair text-4xl bg-neon-green">{product.content.title}</p>
                            <p className="capitalize italic font-playfair text-4xl bg-neon-green">{product.content.price}€</p>

                        </div>

                        <div className="w-[28rem] h-auto mt-10 space-y-8">

                            <div className="space-y-2">

                                <p className="text-xs capitalize">
                                    color
                                    <span className="uppercase mx-10">black</span>
                                </p>

                                <div className="grid grid-cols-5 gap-2">

                                    <div className="flex items-center justify-center uppercase text-sm border-[1px] border-neutral-900 px-2 py-4">
                                        <img className="w-full" src={product.content.image_url} alt="" />
                                    </div>


                                </div>

                            </div>

                            <div className="space-y-2">

                                <p className="text-xs capitalize">size clothing</p>

                                <div className="grid grid-cols-4 gap-2">

                                    {['XS', 'S', 'M', 'L'].map((size, index) => (
                                        <button 
                                            onClick={(e) => setProduct(previous => ({ ...previous, size: index }))} 
                                            className={`${product.size == index && 'bg-neon-green text-black'} flex items-center justify-center uppercase text-sm border-[1px] border-neutral-900`}>
                                                {size}
                                        </button>
                                    ))}


                                </div>

                            </div>

                            <div className="flex flex-col space-y-2">

                                <button onClick={addItemToCart} className={`w-full py-1 bg-black uppercase text-sm ${product.size == 4 ? "text-neutral-300" : "text-white "}`}>
                                    {product.size == 4 ? 'select size' : 'add to cart'}
                                </button>

                                <button className="w-full py-1 border-[1px] border-black uppercase text-sm">
                                    add to wishlist
                                </button>

                            </div>

                            <div className="flex flex-col space-y-2">
                                <p className="text-xs">Sit sunt commodo eiusmod et deserunt sit labore elit aliqua ad. In do laboris esse do velit in irure. Consequat nulla sit laboris in. Laboris deserunt laborum aliqua proident occaecat minim dolor consequat minim velit incididunt.</p>
                            </div>

                        </div>

                    </div>

                    <div className="h-full w-full flex items-center justify-center col-span-2">
                        <img className="w-[80%]" src={product.content.image_url} alt="" />
                    </div>

                    <div className="md:hidden block h-40 w-full"></div>

                </section>

            )}

        </PageContainer>

    );

};