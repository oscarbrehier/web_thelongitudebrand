'use client'
import { getImage } from "@/lib/sanity/getImage";
import { useState } from "react";
import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";

export function OrderItem({ order, row, last }) {

    const [modal, setModal] = useState(false);
    console.log(last);

    return (

        <div>

            <div className={`h-auto w-full bg-neutral-100 flex justify-between px-4 py-2 text-sm font-helvetica ${last ? (modal ? '' : 'rounded-b') : (row === 0 ? 'rounded-t' : '')}`}>
                <p>{new Date(order._createdAt).toLocaleDateString()}</p>
                <div className="flex space-x-4">
                    <p>{order.total} EUR</p>
                    <button onClick={() => setModal(!modal)}>{modal ? <IoIosArrowUp /> : <IoIosArrowDown />}</button>
                </div>
            </div>

            {modal && (
                <div className="h-40 w-full bg-neutral-50 rounded-b overflow-y-scroll space-y-8 py-4">
                    {order.products.map((pd) => (
                        <div className="flex px-4 space-x-8 h-full items-center">
                            <div>
                                <img className="w-28" src={getImage(pd.product.images[0].asset._ref)} alt="" />
                            </div>
                            <div className="h-full flex-1 flex items-center space-x-4 text-sm" >
                                <div>
                                    <p className="uppercase font-helvetica">{pd.product.title} - {pd.size}</p>
                                    <p className="uppercase font-helvetica">{pd.unit_price} EUR</p>
                                </div>
                                <p className="font-helvetica">x {pd.quantity}</p>
                            </div>
                        </div>
                    ))}
                </div>
            )}

        </div>

    );

};