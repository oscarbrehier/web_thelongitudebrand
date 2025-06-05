"use client"
import SanityImage from "@/app/components/ui/SanityImage";

export function ItemsSection({ data }) {

    return (

        <section className="h-auto w-full space-y-2">

            <p className="capitalize text-lg font-medium">items ({data.items.length})</p>

            <div className="h-auto w-full grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-2">

                {
                    data.items.map((item, index) => (

                        <a href={`/shop/${item.name}`} key={index} className=" bg-cream-200 flex flex-col p-2 space-y-2">

                            <div className="w-full">
                                <SanityImage className="py-3 px-2" source={item.image_ref} alt={item.name} quality={60} />
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

    );

};