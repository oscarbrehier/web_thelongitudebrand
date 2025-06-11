"use client"
import { useState } from "react";
import SanityImage from "../ui/SanityImage";
import Button from "../ui/Button";
import { useCartStore } from "@/lib/stores/useCartStore";
import { useAuthContext } from "@/lib/context/AuthContext";
import SizeSelector from "./SizeSelector";
import { trackEvent } from "@/lib/analytics/analytics";
import { useTranslation } from "@/app/i18n/client";

export function VariantQuickAdd({ content, lang, structuredData, ...props }) {

    const { t } = useTranslation(lang, ["shop"]);
    const [size, setSize] = useState(null);
    const { addToCart } = useCartStore();
    const { user } = useAuthContext();

    const addProductToCart = async () => {

        if (size == null) return;

        await addToCart({
            productId: `${content._id}&size=${size}`,
            name: content.title,
            size: size,
            price: content.price,
            cover: content.cover,
            image_ref: content.image_ref,
        }, user?.uid);

        if (typeof window !== 'undefined') {
            window.scrollTo({
                top: 0,
                behavior: 'smooth',
            });
        };

        trackEvent('add_to_cart', {
            method: "quick_add",
            productId: `${content._id}`,
            name: content.title,
            size: size,
        });

    };

    return (
        <>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: structuredData }} />

            <article className="relative">

                <div className="h-auto w-full bg-cream-200 p-4 space-y-2">

                    <div className="w-full h-[30rem] flex flex-col">

                        <div className="flex-1 w-full flex items-center">
                            <SanityImage
                                source={content.images[0].asset._ref}
                                quality={70}
                                alt={content.title}
                            />
                        </div>

                        <div>
                            <h3 className="text-xs uppercase">{content.title}</h3>
                            <p className="text-xs font-medium">{content.price}€</p>
                        </div>


                    </div>

                    <SizeSelector
                        trans={t}
                        current={size}
                        setSize={setSize}
                        available={content.available_sizes}
                        label={{
                            text: t("size"),
                            error: false,
                            errorMessage: t("select_size")
                        }}
                        style="w-full"
                    />

                    <Button
                        size="w-full"
                        style="py-1"
                        text="uppercase"
                        onClick={addProductToCart}
                        disabled={size == null}
                    >
                        {t("add_to_cart")}
                    </Button>

                </div>

                <a className="h-[30rem] w-full absolute top-0 left-0" href={`/shop/${content.slug.current}`}></a>

            </article>
        </>
    );
};