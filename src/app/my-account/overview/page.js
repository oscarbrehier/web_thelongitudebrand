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

                <div className="w-full h-full bg-neutral-200 p-10 space-y-8 flex flex-col">

                    {user && <div className="space-y-2 w-[40rem]">

                        <div className="w-full flex justify-between">
                            <p className='font-helvetica uppercase text-xs'>your personal information</p>
                            <button onClick={(e) => setValues(previous => ({ ...previous, editMode: !values.editMode }))} className="font-helvetica uppercase text-xs underline">edit info</button>
                        </div>

                        <div className="h-auto w-full bg-neutral-100 rounded grid grid-cols-3 gap-x-2 gap-y-8 p-4">

                            <div className="space-y-2">
                                <p className="text-sm font-helvetica uppercase">name</p>
                                {/* <p className="text-xs font-helvetica">- -</p> */}
                                <input className={`text-xs w-full font-helvetica py-2 rounded-sm ${values.editMode ? 'bg-neutral-200 px-2' : 'bg-neutral-100'}`} disabled={!values.editMode} type="text" value='- -' />
                            </div>

                            <div className="space-y-2">
                                <p className="text-sm font-helvetica uppercase">gender</p>
                                {/* <p className="text-xs font-helvetica">- -</p> */}
                                <input className={`text-xs w-full font-helvetica py-2 rounded-sm ${values.editMode ? 'bg-neutral-200 px-2' : 'bg-neutral-100'}`} disabled={!values.editMode} type="text" value='- -' />
                            </div>

                            <div className="space-y-2">
                                <p className="text-sm font-helvetica uppercase">email</p>
                                {/* <p className="text-xs font-helvetica">- -</p> */}
                                <input onChange={(e) => setValues(previous => ({ ...previous, email: e.target.value }))} className={`text-xs w-full font-helvetica py-2 rounded-sm ${values.editMode ? 'bg-neutral-200 px-2' : 'bg-neutral-100'}`} disabled={!values.editMode} type="text" value={values.email || user.email} />
                            </div>

                            <div className="space-y-2">
                                <p className="text-sm font-helvetica uppercase">phone</p>
                                {/* <p className="text-xs font-helvetica">- -</p> */}
                                <input className={`text-xs w-full font-helvetica py-2 rounded-sm ${values.editMode ? 'bg-neutral-200 px-2' : 'bg-neutral-100'}`} disabled={!values.editMode} type="text" value='- -' />
                            </div>

                        </div>

                    </div>}

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