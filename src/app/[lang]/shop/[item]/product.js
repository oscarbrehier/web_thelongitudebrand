'use client'
import { useCallback, useEffect, useRef, useState } from "react";
import { useAuthContext } from "@/lib/context/AuthContext";
import { useModalContext } from "@/lib/context/ModalContext";
import addToWishlist from "@/lib/firestore/wishlist/add";
import removeFromWishlist from "@/lib/firestore/wishlist/remove";
import isProductInWishlist from "@/lib/firestore/wishlist/isProductInWishlist";
import SanityImage from "@/app/components/ui/SanityImage";
import { useCartStore } from "@/lib/stores/useCartStore";
import Button from "@/app/components/ui/Button";
import { useTranslation } from "@/app/i18n/client";
import posthog from "posthog-js";
import SizeSelector from "@/app/components/store/SizeSelector";
import { trackEvent } from "@/lib/analytics/analytics";
import { urlFor } from "@/lib/sanity/client";
import Link from "next/link";

export function Product({
    lang,
    content,
}) {

    const { t } = useTranslation(lang, 'shop');

    const [size, setSize] = useState(null);
    const [wishlist, setWishlist] = useState(false);
    const [pendingWishlistAction, setPendingWishlistAction] = useState(false);
    const [showFixedButton, setShowFixedButton] = useState(true);
    const [labels, setLabels] = useState({
        size: {
            text: "size",
            error: false,
            errorMessage: "select_size"
        },
        availability: {
            error: false,
            errorMessage: ''
        }
    });

    const addToCartRefBtn = useRef(null);
    const { openModal } = useModalContext();
    const { user, isAuth } = useAuthContext();
    const { addToCart } = useCartStore();

    const toggleLabelError = (attr, message) => {
        setLabels(prev => ({
            ...prev,
            [attr]: {
                ...prev[attr],
                error: !prev[attr].error,
                errorMessage: message ?? prev[attr].errorMessage
            }
        }));
    };

    const addItemToCart = async () => {

        if (size == null) return toggleLabelError('size');
        if (content.availability == "out_of_stock") {
            toggleLabelError('availability', t("item_out_of_stock"))
            return;
        }

        trackEvent('add_to_cart', {
            method: "product_page",
            productId: `${content._id}`,
            name: content.title,
            size: size,
        });

        openModal("added_cart");

        await addToCart({
            productId: `${content._id}&size=${size}`,
            name: content.title,
            size: size,
            price: content.price,
            cover: content.cover,
            image_ref: content.image_ref,
        }, user?.uid);

    };

    const handleWishlist = async () => {

        if (!isAuth) {

            setPendingWishlistAction(true);
            return openModal("sign_in");

        };

        const action = wishlist ? removeFromWishlist : addToWishlist;
        await action(content._id, user.uid);

        if (!wishlist) {
            trackEvent("add_to_wishlist", {
                productId: content._id,
                name: content.title
            });
        }
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

        if (size !== 4 && labels.size.error == true) toggleLabelError('size');

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

    useEffect(() => {

        const observer = new IntersectionObserver(
            ([entry]) => {
                setShowFixedButton(!entry.isIntersecting);
            },
            { root: null, threshold: 0.1 }
        );

        if (addToCartRefBtn.current) observer.observe(addToCartRefBtn.current);

        return () => {
            if (addToCartRefBtn.current) observer.unobserve(addToCartRefBtn.current);
        };

    }, []);

    return content && (

        <section className="lg:h-screen h-auto w-full lg:pb-0 pb-10 lg:grid xl:grid-cols-4 lg:grid-cols-3 grid-cols-2 flex flex-col">
            {/* <section className="lg:h-screen h-auto w-full lg:pb-0 pb-10 lg:grid lg:grid-cols-4 grid-cols-2 flex flex-col-reverse"> */}

            {showFixedButton && (

                <div className="lg:hidden fixed left-0 bottom-0 h-auto w-full p-4 bg-cream-100 space-y-2 flex flex-col items-center">

                    <SizeSelector
                        trans={t}
                        available={content.available_sizes}
                        current={size}
                        label={labels.size}
                        setSize={(size) => setSize(size)}
                        style="xs:w-[85%] w-full"
                    />

                    {
                        labels.availability.error && (
                            <div className="xs:w-[85%] w-full">
                                <p className="text-xs capitalize text-red-600">{labels.availability.errorMessage}</p>
                            </div>
                        )
                    }

                    <Button
                        size="xs:w-[85%] w-full h-10"
                        text="uppercase"
                        onClick={addItemToCart}
                        disabled={content.availability == "out_of_stock"}
                    >
                        {t(`label_${content.availability}`)}
                    </Button>

                </div>

            )}

            <div className="h-screen w-full lg:col-span-2 lg:py-0 pt-36 pb-10">

                <div className="h-full w-full lg:flex hidden items-center justify-center pt-12 px-4">

                    <div className="relative h-[80vh] w-full">
                        <SanityImage
                            source={content.image_ref}
                            objectFit={true}
                            quality={90}
                            alt={content.title}
                        />
                    </div>

                </div>

                <div className="h-full w-full lg:hidden flex items-center justify-center">

                    <div className="md:w-[80%] sm:w-[90%] w-full">
                        <SanityImage
                            source={content.image_ref}
                            alt={content.title}
                        />
                    </div>

                </div>

            </div>

            <div className="h-full w-full flex flex-col items-center lg:pt-14">

                <div className="w-full flex 3xl:flex-row lg:flex-col flex-row items-start justify-between mt-20 lg:px-0 xs:px-8 3xl:space-y-0 lg:space-y-2 space-y-0">

                    <h1 className="capitalize italic font-times-roman xs:text-4xl text-2xl bg-neon-green">{content.title}</h1>
                    <p className="capitalize italic font-times-roman xs:text-4xl text-2xl bg-neon-green">{content.price}€</p>

                </div>

                <div className="lg:w-full xs:w-[85%] h-auto mt-10 space-y-8">

                    <div className="space-y-2">

                        <p className="text-xs capitalize">
                            {t("color")}
                            {
                                content.color?.map((color, i) => (
                                    <span key={color.key} className="uppercase mx-10">
                                        {color[lang]}
                                        {i < content.color.length - 1 && <span>/</span>}
                                    </span>
                                ))
                            }
                        </p>

                        <div className="grid grid-cols-5 gap-2">

                            <div className="flex items-center justify-center uppercase text-sm border-[1px] border-neutral-900 px-2 py-4">
                                <SanityImage
                                    source={content.image_ref}
                                    alt={content.title}
                                    quality={0}
                                />
                            </div>

                            {
                                content.variant?.map((v, key) => (
                                    <Link 
                                        key={key} 
                                        href={`/shop/${v.slug.current}`}
                                    >
                                        <div className="flex items-center justify-center uppercase text-sm border-[1px] border-neutral-900 px-2 py-4">
                                            <SanityImage
                                                source={v.images[0].asset._ref}
                                                alt={v.title}
                                                quality={0}
                                            />
                                        </div>
                                    </Link>
                                ))
                            }


                        </div>

                    </div>

                    <SizeSelector
                        trans={t}
                        available={content.available_sizes}
                        current={size}
                        label={labels.size}
                        setSize={(size) => setSize(size)}
                    />

                    <div className="flex flex-col space-y-2">

                        {
                            labels.availability.error && (
                                <p className="text-xs capitalize text-red-600">{labels.availability.errorMessage}</p>
                            )
                        }

                        <div ref={addToCartRefBtn}>
                            <Button
                                size="w-full h-10"
                                text="uppercase"
                                onClick={addItemToCart}
                                disabled={content.availability == "out_of_stock"}
                            >
                                {t(`label_${content.availability}`)}
                            </Button>
                        </div>

                        <Button
                            size="w-full h-10"
                            onClick={handleWishlist}
                            text="uppercase"
                            border
                        >
                            {t(wishlist ? "remove_from_wishlist" : "add_to_wishlist")}
                        </Button>

                    </div>

                    <div className="flex flex-col space-y-2">
                        <p className="text-xs">Sit sunt commodo eiusmod et deserunt sit labore elit aliqua ad. In do laboris esse do velit in irure. Consequat nulla sit laboris in. Laboris deserunt laborum aliqua proident occaecat minim dolor consequat minim velit incididunt.</p>
                    </div>

                </div>

            </div>

        </section>

    );

};