'use client'
import { useState } from "react";
import { useTranslation } from "@/app/i18n/client";
import { StoreItem } from "@/app/components/store/StoreItem";

export default function ProductsFilter({ lang, products, categories }) {

    const [filter, setFilter] = useState('view_all');
    const { t } = useTranslation(lang, "shop");

    const filteredProducts = filter === 'view_all'
        ? products
        : products.filter(product => product.category.title === filter);

    const structuredData = JSON.stringify([
        {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
                {
                    "@type": "ListItem",
                    position: 1,
                    name: "Home",
                    item: `https://thelongitudebrand.com/${lang}`,
                },
                {
                    "@type": "ListItem",
                    position: 2,
                    name: "Shop",
                    item: `https://thelongitudebrand.com/${lang}/shop`,
                },
            ],
        },
    ]);

    return (

        <>

            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: structuredData }} />

            <div className="w-full flex items-center text-sm space-x-4 cursor-pointer mb-2">

                {
                    categories && categories.map((category, index) => (
                        <a
                            key={index}
                            className={`${filter == category && "bg-neon-green"}`}
                            onClick={() => setFilter(category)}
                        >
                            <h2>
                                {t(category.replace(/[ -]/g, "_"))}
                            </h2>
                        </a>
                    ))
                }

            </div>

            <div className="h-auto w-full grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-2">

                {filteredProducts.map((item) => (
                    <StoreItem key={item._id} lang={lang} data={item} />
                ))}
                
            </div>

        </>

    );

};