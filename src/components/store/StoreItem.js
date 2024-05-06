'use client'
import { useAppContext } from "@/lib/context";
import { useEffect, useState } from "react";

export function StoreItem({ data, size }) {

    const { height, setHeight } = useAppContext();
    const [windowSize, setWindowSize] = useState({ height: 0, width: 0 });

    useEffect(() => {

        setWindowSize({ height: window.innerHeight, width: window.innerWidth });

    }, []);

    let image_url = `https://cdn.sanity.io/images/xgcgiqjg/production/${data.images[0].asset._ref.slice(6).replace('-png', '.png')}`

    return (

        // <a href={`/shop/${data.slug.current}`} classN    ame="w-full h-full flex items-center flex-col bg-neutral p-8">

        //     <div className="flex-1 flex items-center">
        //         <img src={image_url} alt="" />
        //     </div>

        //     <div className="flex justify-between w-full">
        //         {/* <p className="text-neutral-700 uppercase font-helvetica text-sm">bad t-shirt</p> */}
        //         <p className="text-neutral-700 uppercase font-helvetica text-sm">{data.title} - {data.price} EUR</p>
        //     </div>

        // </a>

        <a href={`/shop/${data.slug.current}`} style={{ height: `${windowSize.height - height}px` }} className="w-full flex flex-col bg-green-400">

            <div className="h-[90%] w-full bg-neutral-200 flex items-center justify-center p-8">
                <img className={size !== 'small' && 'h-4/5'} src={image_url} alt="" />
            </div>

            <div className="h-[10%] bg-white w-full p-4">

                <p className="uppercase font-helvetica text-sm">{data.title}</p>
                <p className="font-helvetica text-xs">{data.price} EUR</p>

            </div>

        </a>

    );

};