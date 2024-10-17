'use client'
import Hyperlink from "@/components/ui/Hyperlink";
import OrderTableRow from "@/components/OrderTableRow";
import { useEffect, useState } from "react";
import getOrders from "@/lib/firestore/getOrders";
import { useAuthContext } from "@/lib/context/AuthContext";

export default function Page() {

    const [data, setData] = useState([]);

    const { user } = useAuthContext();

    useEffect(() => {

        const getData = async () => {

            try {

                const res = await getOrders(user.uid);
                setData(res);

            } catch (err) {

                console.error(err);

            };
            

        };

        if (user) {

            getData();

        };

    }, [user]);

    return (

        <div className={`w-full ${data.length !== 0 ? 'h-auto' : 'flex-1'}`}>

            {
                data.length === 0 ? (

                    <div className="w-full h-full flex flex-col items-center justify-center space-y-4 pb-20">

                        <p>You don’t have any orders or returns. Discover our products or contact us if you need assistance.</p>
                        <Hyperlink
                            title='start shopping'
                            size='w-96 h-10'
                            to='/shop'
                        />

                    </div>

                ) : (

                    <section className="mt-16 space-y-4">

                        <p className="capitalize mx-2 my-1">your orders</p>

                        <div className="flex flex-col space-y-2">

                            <div className="md:grid hidden grid-cols-4 gap-2 children:text-xs children:px-2">

                                <p>order ID</p>
                                <p>order date</p>
                                <p>total amout</p>
                                <p>status</p>

                            </div>

                            {
                                data.map((order, index) => (
                                    <OrderTableRow key={index} id={order.id} order={order.data()} />
                                ))
                            }

                        </div>

                    </section>

                )
            }

        </div>

    );

};