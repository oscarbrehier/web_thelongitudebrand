'use client'
import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import { useEffect, useState } from "react";
import { client } from "@/lib/sanity/client";
import { getImage } from "@/lib/sanity/getImage";

export default function Page({ params }) {

    let { session_id } = params;
    const [data, setData] = useState({ session: null, order: null });

    useEffect(() => {

        const getOrder = async () => {

            let res = await fetch('http://localhost:3000/api/checkout-session', {
                method: 'GET',
                headers: {
                    'session-id': session_id
                }
            })
                .then(res => res.json());

            const ORDER_QUERY = `*[_type == "order" && stripe_checkout_id == "${session_id}"] {
                products[] {
                    size,
                    unit_price,
                    quantity,
                    product -> {
                        title,
                        images
                    }
                },
                total,
            }`;

            let order = await client.fetch(ORDER_QUERY);

            console.log(order[0]);
            setData(prev => ({ ...prev, session: res.result, order: order[0] }));

        };

        getOrder();

    }, []);

    return (

        <main className="h-screen w-full flex flex-col justify-between">

            <Navigation />

            <section className="flex-1 w-full px-4 mt-10">

                <div className="bg-neutral-200 w-full h-full p-4 grid grid-cols-2 gap-4">

                    <div>
                        <p className="text-4xl font-helvetica75 text-black uppercase">purchased!</p>
                        {data.session && (

                            <>
                                <p>{data.session.shipping_details.address.city}</p>
                                <p>{data.session.shipping_details.address.country}</p>
                                <p>{data.session.shipping_details.address.line1}</p>
                                <p>{data.session.shipping_details.address.postal_code}</p>

                                <p>{data.session.customer_details.email}</p>
                                <p>{data.session.customer_details.name}</p>
                            </>

                        )}
                    </div>

                    <div className="h-full w-full relative">

                        <div className="h-full overflow-y-scroll w-full absolute pb-12 z-20">

                            {data.order && data.order.products.map((item, index) => (

                                <div className={`flex py-2 space-x-4 z-10`}>
                                    <img className="h-28 bg-neutral-300 p-2" src={getImage(item.product.images[0].asset._ref)} alt="" />
                                    <div>
                                        <p className="font-helvetica uppercase text-black font-bold text-lg">{item.product.title} - {item.size}</p>
                                        <p>x {item.quantity}</p>
                                        <p>{item.unit_price * item.quantity} EUR</p>
                                    </div>
                                </div>

                            ))}

                        </div>

                        <div className="h-full w-full absolute flex flex-col justify-end">
                            
                            <div className="h-4 w-full bg-neutral-200 z-20"></div>

                            <div className="w-full h-10 bg-neutral-300 flex items-center px-2 z-20 border-neutral-200">
                                <p className="font-helvetica font-bold text-2xl">Total: {data.order && data.order.total.toFixed(2)} EUR</p>
                            </div>

                        </div>

                    </div>

                </div>

            </section>

            <Footer />

        </main>

    );

};