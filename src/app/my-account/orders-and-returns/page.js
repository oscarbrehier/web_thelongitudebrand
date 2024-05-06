'use client'
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthContext } from "@/lib/context/AuthContext";
import { PageLayout } from "@/components/PageLayout";
import { useAppContext } from "@/lib/context";
import { getOrders } from "@/lib/sanity/getOrders";
import { getImage } from "@/lib/sanity/getImage";
import { OrderItem } from "@/components/profile/OrderItem";

export default function Page() {

    const { user } = useAuthContext();
    const { height, setHeight } = useAppContext();

    const [windowSize, setWindowSize] = useState({ height: null });
    const [editInfo, setEditInfo] = useState(false);

    const [values, setValues] = useState({
        editMode: false,
        name: null,
        gender: null,
        email: null,
        phoneNumber: null,
        orders: null
    });

    useEffect(() => {

        setWindowSize({ height: window.innerHeight });

    }, []);

    const getUserOrders = async () => {

        const orders = await getOrders(user.uid);
        setValues(previous => ({ ...previous, orders: orders }));

    };

    useEffect(() => {

        if (user) getUserOrders();

    }, [user]);

    return (

        <PageLayout>

            <section
                style={{ height: `${windowSize.height - height}px` }}
                className="w-full"
            >

                <div className="w-full h-full bg-neutral-200 p-10 space-y-8">

                    {values.orders && <section className="w-[40rem] space-y-2 h-full">

                        <div className="w-full flex justify-between">
                            <p className='font-helvetica uppercase text-xs'>orders</p>
                        </div>

                        <div className="w-full h-auto">

                            {values.orders.map((order, index) => ( <OrderItem order={order} row={index} last={index + 1 == values.orders.length} /> ))}

                        </div>

                    </section>}

                </div>

            </section>

        </PageLayout>

    );

};