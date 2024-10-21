// 'use client'

import { getProductById } from "@/lib/sanity/getProduct";
import SanityImage from "../ui/SanityImage";
// import { useEffect, useState } from "react";

export function StoreItem({ data: content }) {

    // const content = await getProductById(data);

    // const [content, setContent] = useState(null);

    // useEffect(() => {

    //     const getData = async () => {

    //         const res = await getProductById(data);
    //         setContent(res);

    //     };

    //     if (data.title) {

    //         // data["cover"] = `https://cdn.sanity.io/images/xgcgiqjg/production/${data.images[0].asset._ref.slice(6).replace('-png', '.png')}`;
    //         data["cover"] = data.images[0].asset._ref;

    //         setContent(data);

    //     } else {

    //         getData();

    //     };

    // }, []);

    return (

        <a href={`/shop/${content.slug.current}`}>

            <div className="w-full h-[30rem] bg-cream-200 p-4 flex flex-col">

                <div className="flex-1 w-full flex items-center">
                    <SanityImage 
                        source={content.images[0].asset._ref} 
                        quality={70}
                        alt="" 
                    />
                </div>

                <div>
                    <p className="text-xs uppercase">{content.title}</p>
                    <p className="text-xs font-medium">{content.price}€</p>
                </div>

            </div>

        </a>

    );

};