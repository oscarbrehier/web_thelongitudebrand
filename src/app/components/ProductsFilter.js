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

    return (

        <>

            <div className="w-full flex items-center text-sm space-x-4 cursor-pointer mb-2">

                {
                    categories && categories.map((category, index) => (
                        <a
                            key={index}
                            className={`${filter == category && "bg-neon-green"}`}
                            onClick={() => setFilter(category)}
                        >
                            {t(category.replace(/[ -]/g, "_"))}
                        </a>
                    ))
                }

            </div>

            <div className="h-auto w-full grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-2">

                {filteredProducts.map((item) => (
                    <StoreItem key={item._id} data={item} />
                ))}
                
            </div>

        </>

    );

};