'use client'
import { useCallback, useEffect, useState } from "react";
import { useAuthContext } from "@/lib/context/AuthContext";
import { useModalContext } from "@/lib/context/ModalContext";
import addToWishlist from "@/lib/firestore/wishlist/add";
import removeFromWishlist from "@/lib/firestore/wishlist/remove";
import { useCartContext } from "@/lib/context/CartContext";
import isProductInWishlist from "@/lib/firestore/wishlist/isProductInWishlist";
import SanityImage from "./ui/SanityImage";
import { useCartStore } from "@/lib/stores/useCartStore";

export default function Product({
    lang,
    content,
    auth,
}) {

    const [size, setSize] = useState(4);
    const [wishlist, setWishlist] = useState(null);
    const [pendingWishlistAction, setPendingWishlistAction] = useState(false);
    const [labels, setLabels] = useState({
        size: {
            text: 'sizes',
            error: false,
            errorMessage: 'please select your size first'
        },
    });

    const { openModal } = useModalContext();
    // const { addToCart } = useCartContext();
    const { user, isAuth } = useAuthContext();

    const { addToCart } = useCartStore();

    const setSizeError = (errorState) => {

        setLabels(prevLabels => ({
            ...prevLabels,
            size: {
                ...prevLabels.size,
                error: errorState,
            }
        }));

    };

    const addItemToCart = async () => {

        if (size == 4) return setSizeError(true);

        addToCart({
            productId: `${content._id}&size=${size}`,
            name: content.title,
            size: size,
            price: content.price,
            cover: content.cover,
        }, user?.uid);

    };

    const handleWishlist = async () => {

        if (!isAuth) {

            setPendingWishlistAction(true);
            return openModal("signin");

        };

        const action = wishlist ? removeFromWishlist : addToWishlist;

        await action(content._id, user.uid);
        setWishlist(!wishlist);

    };

    const executePendingWishlistAction = useCallback(async () => {

        if (isAuth && pendingWishlistAction) {

            await addToWishlist(content._id, user.uid);
            setWishlist(!wishlist);
            setPendingWishlistAction(false);

        };

    }, [isAuth, pendingWishlistAction, content._id, user]);

    useEffect(() => {

        if (size !== 4 && labels.size.error == true) setSizeError(false);

    }, [size]);

    useEffect(() => {

        if (isAuth) {

            const checkWishlist = async () => {
                const exists = await isProductInWishlist(user.uid, content._id);
                setWishlist(exists || false);
            };

            checkWishlist();

        };

    }, [isAuth, user, content._id]);

    useEffect(() => {

        executePendingWishlistAction();

    }, [executePendingWishlistAction]);

    return content && (

        <section className="lg:h-screen h-auto w-full lg:pb-0 pb-10 lg:grid lg:grid-cols-3 grid-cols-2 flex flex-col-reverse">


            <div className="h-full w-full flex flex-col items-center lg:pt-14">

                <div className="w-full flex 3xl:flex-row lg:flex-col flex-row items-start justify-between mt-20 xs:px-8 3xl:space-y-0 lg:space-y-2 space-y-0">

                    <p className="capitalize italic font-playfair xs:text-4xl text-2xl bg-neon-green">{content.title}</p>
                    <p className="capitalize italic font-playfair xs:text-4xl text-2xl bg-neon-green">{content.price}€</p>

                </div>

                <div className="xs:w-[85%] h-auto mt-10 space-y-8">

                    <div className="space-y-2">

                        <p className="text-xs capitalize">
                            color
                            <span className="uppercase mx-10">black</span>
                        </p>

                        <div className="grid grid-cols-5 gap-2">

                            <div className="flex items-center justify-center uppercase text-sm border-[1px] border-neutral-900 px-2 py-4">
                                <SanityImage
                                    source={content.image_ref}
                                    alt=""
                                    quality={0}
                                />
                            </div>


                        </div>

                    </div>

                    <div className="space-y-2">

                        <p className={`text-xs capitalize ${labels.size.error && 'text-red-600'}`}>{labels.size.error ? labels.size.errorMessage : labels.size.text}</p>

                        <div className="grid grid-cols-4 gap-2">

                            {['XS', 'S', 'M', 'L'].map((label, index) => (
                                <button
                                    key={index}
                                    onClick={(e) => setSize(index)}
                                    className={`${size == index && 'bg-neon-green text-black'} flex items-center justify-center uppercase text-sm border-[1px] border-neutral-900`}>
                                    {label}
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
                                wishlist
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

                    <div className="relative h-[80vh] w-full">
                        <SanityImage
                            source={content.image_ref}
                            objectFit={true}
                            quality={90}
                            alt=""
                        />
                    </div>

                </div>

                <div className="h-full w-full lg:hidden flex items-center justify-center">

                    <div className="md:w-[80%] sm:w-[90%] w-full">
                        <SanityImage
                            source={content.image_ref}
                            alt=""
                        />
                    </div>

                </div>

            </div>

        </section>

    );

};