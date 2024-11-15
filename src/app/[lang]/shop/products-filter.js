'use client'
import { useEffect, useState } from "react";
import { useTranslation } from "@/app/i18n/client";
import { StoreItem } from "@/app/components/store/StoreItem";
import { useSearchParams } from "next/navigation";

export function ProductsFilter({ lang, products, categories }) {

    const query = useSearchParams()?.get('category');

    const [filter, setFilter] = useState('view-all');
    const { t } = useTranslation(lang, "shop");

    const filteredProducts = filter === 'view-all'
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
                    item: `https://www.thelongitudebrand.com/${lang}`,
                },
                {
                    "@type": "ListItem",
                    position: 2,
                    name: "Shop",
                    item: `https://www.thelongitudebrand.com/${lang}/shop`,
                },
            ],
        },
    ]);

    useEffect(() => {

        if (query && categories.includes(query)) setFilter(query);

    }, [query]);

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