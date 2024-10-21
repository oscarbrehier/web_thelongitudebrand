'use client'
import Button from "@/app/components/ui/Button";
import { IoCalendarSharp } from "react-icons/io5";

export default function OrderView({ order, checkout }) {

    // console.log(order);

    return (

        <div className="h-auto w-full mt-16 sm:space-y-8 space-y-12">

            <div className="w-full h-auto grid md:grid-cols-2 md:space-y-0 space-y-4">

                <div className="w-full h-auto xs:space-y-0 space-y-2">

                    <div>
                        <p className="text-xs text-neutral-700 capitalize">order ID</p>
                        <p className="md:text-xl text-2xl">#{order.orderId}</p>
                    </div>

                    <p>
                        <span className="text-neutral-700">Ordered on</span>
                        &nbsp;
                        <span>{order.date}</span>
                    </p>

                </div>

                <div className="w-full h-full flex items-center md:justify-end space-y-2">

                    <Button
                        title="download receipt"
                        size="h-10 px-4"
                        border={true}
                    />

                </div>

            </div>

            <section className="h-auto w-full grid lg:grid-cols-4 md:grid-cols-2 gap-2">

                <div className="w-full h-56 bg-cream-200 p-4 flex flex-col justify-between">

                    <p className="text-lg capitalize font-medium">order total</p>

                    <div className="w-full flex justify-between children:text-sm">

                        <div className="children:capitalize">
                            <p>subtotal</p>
                            <p>tax</p>
                            <p>shipping</p>
                            <p>discount</p>
                        </div>

                        <div className="text-end">
                            <p>{checkout.amount_subtotal / 100}€</p>
                            <p>{checkout.total_details.amount_shipping}€</p>
                            <p>{checkout.total_details.amount_tax}€</p>
                            <p>- {checkout.total_details.amount_discount}€</p>
                        </div>

                    </div>

                    <div className="w-full flex justify-between children:font-medium children:capitalize">
                        <p>total</p>
                        <p>{checkout.amount_total / 100}€</p>
                    </div>

                </div>

                <div className="w-full h-56 bg-cream-200 p-4 flex flex-col space-y-8">

                    <p className="text-lg capitalize font-medium">shipping</p>

                    <div className="w-full flex justify-between children:text-sm">

                        <div className="children:capitalize">
                            <p>address:</p>
                        </div>

                        <div className="text-end">
                            <p className="capitalize">andré merlaux</p>
                            <p>54 rue de l'Eglise</p>
                            <p>75015, Paris, FR</p>
                        </div>

                    </div>

                </div>

            </section>

            <section className="h-auto w-full space-y-2">

                <p className="capitalize text-lg font-medium">order status</p>

                <div className="h-auto w-full grid lg:grid-cols-3 md:grid-cols-2 gap-2">

                    <div className="w-full h-auto space-y-4 bg-cream-200 p-4 lg:col-span-1 sm:col-span-2">

                        <p className="capitalize font-medium">tracking progress</p>

                        <div className="flex flex-col space-y-4">

                            <div className="grid xs:grid-cols-4 gap-x-2 children:sm:text-sm children:text-xs">

                                <div className="xs:col-span-1 children:font-medium xs:block xs:space-x-0 flex space-x-2">
                                    <p>16 october</p>
                                    <p>15:04</p>
                                </div>

                                <div className="xs:col-span-3 h-full">
                                    <p className="font-medium">Your package has been packed by the courier</p>
                                    <p className="text-neutral-600">Paris, France</p>
                                </div>

                            </div>

                            <div className="grid xs:grid-cols-4 gap-x-2 children:sm:text-sm children:text-xs">

                                <div className="xs:col-span-1 children:text-neutral-400 xs:block xs:space-x-0 flex space-x-2">
                                    <p>16 october</p>
                                    <p>6:50</p>
                                </div>

                                <div className="col-span-3 h-full children:text-neutral-400">
                                    <p>Shipment has been created</p>
                                    <p>Paris, France</p>
                                </div>

                            </div>

                            <div className="grid xs:grid-cols-4 gap-x-2 children:sm:text-sm children:text-xs">

                                <div className="xs:col-span-1 children:text-neutral-400 xs:block xs:space-x-0 flex space-x-2">
                                    <p>15 october</p>
                                    <p>12:27</p>
                                </div>

                                <div className="col-span-3 h-full children:text-neutral-400">
                                    <p>Order placed</p>
                                </div>

                            </div>

                        </div>
                    </div>

                    <div className="w-full lg:h-auto h-56 space-y-4 bg-cream-200 p-4 flex flex-col">

                        <p className="capitalize font-medium">carrier information</p>

                        <div className="flex-1 flex flex-col items-start justify-between">

                            <div>
                                <p className="text-sm">
                                    <span className="capitalize">carrier</span>: DHL Express
                                </p>


                                <p className="text-sm">
                                    <span className="capitalize">tracking number</span>: #1234567890
                                </p>
                            </div>

                            <Button
                                title="track your order"
                                size="h-10 px-4"
                                border={true}
                            />

                        </div>

                    </div>

                    <div className="w-full lg:h-auto h-56 bg-cream-200 p-4 flex flex-col justify-between">

                        <IoCalendarSharp className="fill-neutral-800 text-xl" />

                        <div className="children:capitalize">
                            <p className="text-sm text-neutral-600">estimated delivery date</p>
                            <p className="font-medium">18 october 2024 (in 3 days)</p>
                        </div>

                    </div>

                </div>

            </section>

            <section className="h-auto w-full space-y-2">

                <p className="capitalize text-lg font-medium">items (4)</p>

                <div className="h-auto w-full grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-2">

                    {
                        order.items.map((item, index) => (

                            <a href={`/shop/${item.name}`} key={index} className=" bg-cream-200 flex flex-col p-2 space-y-2">

                                <div className="w-full">
                                    <img className="py-3 px-2" src={item.cover} alt="" />
                                </div>

                                <div className="h-full children:text-xs py-1 space-y-2 flex flex-col justify-between">

                                    <p className="uppercase text-xs">{item.name}</p>

                                    <div className="children:capitalize">
                                        <p>size: {item.size}</p>
                                        <p>quantity: {item.quantity}</p>
                                        <p>unit price: {item.price}€</p>
                                        <p className="font-medium mt-2">total: {item.price * item.quantity}€</p>
                                    </div>

                                </div>

                            </a>

                        ))
                    }

                </div>

            </section>

        </div>

    );

};