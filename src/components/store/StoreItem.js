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

        // <FullHeight>

        //     <a href={`/shop/${data.slug.current}`} className="h-screen flex flex-col px-8 group">

        //         <div className="flex-1 w-full flex items-center xs:p-0 p-4">
        //             <img src={image_url} alt="" />
        //         </div>

        //         <div className="h-32 w-full flex flex-col justify-start xs:items-start items-center xs:p-0 py-2">
        //             <p className="xs:self-start uppercase text-primary-blue font-helvetica text-2xl group-hover:bg-primary-blue group-hover:text-white">item title</p>
        //             {/* <p className="xs:self-start uppercase text-primary-blue font-helvetica text-2xl group-hover:bg-primary-blue group-hover:text-white">{data.title}</p> */}
        //             <p className="xs:self-start uppercase text-primary-blue font-helvetica group-hover:bg-primary-blue group-hover:text-white">{data.price} EUR</p>
        //         </div>

        //     </a>

        // </FullHeight>

        <a href={`/shop/${data.slug.current}`}>

            <div className="w-full h-[30rem] bg-cream-200 p-4 flex flex-col">

                <div className="flex-1 w-full flex items-center">
                    <img src={image_url} alt="" />
                </div>

                <div>
                    <p className="text-xs uppercase">{data.title}</p>
                    <p className="text-xs font-medium">{data.price}€</p>
                </div>

            </div>
            
        </a>

    );

};