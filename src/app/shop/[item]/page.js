'use client'
import { addToCart } from "@/lib/cart";
import { useEffect, useState } from "react";
import { client } from "@/lib/sanity/client";
import { PageContainer } from "@/components/container/page";
import { useAuthContext } from "@/lib/context/AuthContext";
import { useModalContext } from "@/lib/context/ModalContext";
import fetchUserWishlist from "@/lib/sanity/wishlist/fetch";
import addToWishlist from "@/lib/sanity/wishlist/add";
import removeFromWishlist from "@/lib/sanity/wishlist/remove";

export default function Page({ params }) {

    const { item } = params;

    const [product, setProduct] = useState({ content: null, size: 4, wishlist: null });
    const [labels, setLabels] = useState({
        size: {
            text: 'sizes',
            error: false,
            errorMessage: 'please select your size first'
        },
    });

    const { user, isAuth } = useAuthContext();
    const { openModal } = useModalContext();

    const addItemToCart = () => {

        if (product.size == 4) {

            setLabels(prevLabels => ({
                ...prevLabels,
                size: {
                    ...prevLabels.size,
                    error: true,
                }
            }));

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

    const handleWishlist = async () => {

        const action = product.wishlist ? removeFromWishlist : addToWishlist;
        const res = await action(user.uid, product.content._id);

        if (!res.ok) console.error(res);

        setProduct(prev => ({
            ...prev,
            wishlist: !prev.wishlist
        }));

    };

    useEffect(() => {

        async function getProduct() {


            const PRODUCT_QUERY = `*[_type == "product" && slug.current == "${item}"]`;
            const product = await client.fetch(PRODUCT_QUERY);

            let image_url = `https://cdn.sanity.io/images/xgcgiqjg/production/${product[0].images[0].asset._ref.slice(6).replace('-png', '.png')}`
            product[0].image_url = image_url;

            setProduct(previous => ({ ...previous, content: product[0] }));

        };

        getProduct();

    }, []);

    useEffect(() => {

        if (product.size !== 4 && labels.size.error == true) {

            setLabels(prevLabels => ({
                ...prevLabels,
                size: {
                    ...prevLabels.size,
                    error: false,
                }
            }));

        };

    }, [product.size]);

    useEffect(() => {

        const isInUserWishlist = async () => {

            const res = await fetchUserWishlist(user.uid, "_id", product.content._id);

            setProduct(prev => ({
                ...prev,
                wishlist: res.length > 0
            }));

        };

        if (isAuth) {

            isInUserWishlist();

        };

    }, [isAuth, product?.content]);

    return (

        <PageContainer>

            {product.content && (

                <section className="lg:h-screen h-auto w-full lg:pb-0 pb-10 lg:grid lg:grid-cols-3 grid-cols-2 flex flex-col-reverse">


                    <div className="h-full w-full flex flex-col items-center lg:pt-14">

                        <div className="w-full flex 3xl:flex-row lg:flex-col flex-row items-start justify-between mt-20 xs:px-8 3xl:space-y-0 lg:space-y-2 space-y-0">

                            <p className="capitalize italic font-playfair xs:text-4xl text-2xl bg-neon-green">{product.content.title}</p>
                            <p className="capitalize italic font-playfair xs:text-4xl text-2xl bg-neon-green">{product.content.price}€</p>

                        </div>

                        <div className="xs:w-[85%] h-auto mt-10 space-y-8">

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

                                <p className={`text-xs capitalize ${labels.size.error && 'text-red-600'}`}>{labels.size.error ? labels.size.errorMessage : labels.size.text}</p>

                                <div className="grid grid-cols-4 gap-2">

                                    {['XS', 'S', 'M', 'L'].map((size, index) => (
                                        <button
                                            key={index}
                                            onClick={(e) => setProduct(previous => ({ ...previous, size: index }))}
                                            className={`${product.size == index && 'bg-neon-green text-black'} flex items-center justify-center uppercase text-sm border-[1px] border-neutral-900`}>
                                            {size}
                                        </button>
                                    ))}


                                </div>

                            </div>

                            <div className="flex flex-col space-y-2">

                                <button onClick={addItemToCart} className={`w-full h-10 text-sm uppercase bg-black text-white`}>
                                    add to cart
                                </button>

                                <button
                                    onClick={handleWishlist}
                                    className="w-full h-9 uppercase text-sm border-[1px] border-black">
                                    {
                                        product.wishlist
                                            ? 'remove from wishlist'
                                            : 'add to wishlist'
                                    }
                                </button>

                            </div>

                            <div className="flex flex-col space-y-2">
                                <p className="text-xs">Sit sunt commodo eiusmod et deserunt sit labore elit aliqua ad. In do laboris esse do velit in irure. Consequat nulla sit laboris in. Laboris deserunt laborum aliqua proident occaecat minim dolor consequat minim velit incididunt.</p>
                            </div>

                        </div>

                    </div>

                    <div className="lg:h-screen w-full lg:col-span-2 lg:py-0 pt-36 pb-10">

                        <div className="h-full w-full lg:flex hidden items-center justify-center pt-12 px-4">
                            <img className="max-h-[80%]" src={product.content.image_url} alt="" />
                        </div>

                        <div className="h-full w-full lg:hidden flex items-center justify-center">
                            <img className="md:w-[80%] sm:w-[90%] w-full" src={product.content.image_url} alt="" />
                        </div>

                        {/* <div className="h-screen w-full lg:hidden lg:static absolute flex items-end justify-center py-4">
                            <div className={`field ${scroll ? 'fade-out' : 'block'}`}>
                                <div className="mouse"></div>
                            </div>
                        </div>   */}


                    </div>

                    {/* <div className="lg:hidden block h-32 w-full"></div> */}

                </section>

            )}

        </PageContainer>

    );

};