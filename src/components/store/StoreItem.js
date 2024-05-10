'use client'
import { useAppContext } from "@/lib/context";
import { useEffect, useState } from "react";
import { FullHeight } from "../container/fullheight";

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

        <FullHeight>
            {/* <a href={`/shop/${data.slug.current}`} style={{ height: `${windowSize.height - height}px` }} className="w-full flex flex-col bg-green-400">

                <div className="h-[90%] w-full bg-neutral-200 flex items-center justify-center p-8">
                    <img className={size !== 'small' && 'w-4/5' || 'w-full'} src={image_url} alt="" />
                </div>

                <div className="h-[10%] bg-white w-full p-4">

                    <p className="uppercase font-helvetica text-sm">{data.title}</p>
                    <p className="font-helvetica text-xs">{data.price} EUR</p>

                </div>

            </a> */}

            {/* <a href={`/shop/${data.slug.current}`} className="w-full h-auto md:hidden hidden flex-col bg-green-400">

                <div className="h-96 w-full bg-neutral-200 flex items-center justify-center p-8">
                        <img className={`max-h-full`} src={image_url} alt="" />
                </div>

                <div className="h-20 bg-white w-full p-4 flex justify-center flex-col">

                    <p className="uppercase font-helvetica text-sm">{data.title}</p>
                    <p className="font-helvetica text-xs">{data.price} EUR</p>

                </div>

            </a> */}

            <a href={`/shop/${data.slug.current}`} className="h-screen flex flex-col px-8 group">

                <div className="flex-1 w-full flex items-center">
                    <img src={image_url} alt="" />
                </div>

                <div className="h-32 w-full flex flex-col justify-start">
                    <p className="self-start uppercase text-primary-blue font-helvetica text-2xl group-hover:bg-primary-blue group-hover:text-white">{data.title}</p>
                    <p className="self-start uppercase text-primary-blue font-helvetica group-hover:bg-primary-blue group-hover:text-white">{data.price} EUR</p>
                </div>

            </a>

        </FullHeight>

    );

};