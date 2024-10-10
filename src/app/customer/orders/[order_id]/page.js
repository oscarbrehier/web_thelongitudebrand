import Button from "@/components/ui/Button";

export default function Page({ params }) {

    const { order_id } = params;

    return (

        <div className="w-full h-auto mt-16">

            <div className="h-auto w-full flex items-center justify-between">

                <div className="flex flex-col">
                    <p className="text-2xl">Order ID: #{order_id}</p>
                    <p className="text-sm">05 Oct, 2024, at 21:28</p>
                </div>

            </div>

            <div className="h-auto w-full grid lg:grid-cols-4 2md:grid-cols-2 gap-y-8 gap-x-2 mt-16">

                <div className="lg:col-span-2">

                    <div className="lg:w-1/2 space-y-4 ">
                        <p className="capitalize font-medium">shipping information</p>

                        <div className="xss:space-y-2 space-y-4">

                            <div className="w-full grid xxs:grid-cols-2 grid-cols-1 children:capitalize children:text-sm xxs:space-y-0 space-y-1">
                                <p className="xxs:font-normal font-medium ">address:</p>
                                <p>9 Rue d'Argenteuil, 75001, Paris, France</p>
                            </div>

                            <div className="w-full grid xxs:grid-cols-2 grid-cols-1 children:capitalize children:text-sm xxs:space-y-0 space-y-1">
                                <p className="xxs:font-normal font-medium ">shipping method:</p>
                                <p>express shipping</p>
                            </div>

                        </div>
                    </div>

                </div>

                <div className="lg:col-span-2">

                    <div className="lg:w-1/2 space-y-4">

                        <p className="capitalize font-medium">payment</p>

                        <div className="xss:space-y-2 space-y-4">

                            <div className="w-full grid xxs:grid-cols-2 grid-cols-1 children:capitalize children:text-sm xxs:space-y-0 space-y-1">
                                <p className="xxs:font-normal font-medium ">billing address:</p>
                                <p>9 Rue d'Argenteuil, 75001, Paris, France</p>
                            </div>

                            <div className="w-full grid xxs:grid-cols-2 grid-cols-1 children:capitalize children:text-sm xxs:space-y-0 space-y-1">
                                <p className="xxs:font-normal font-medium">method:</p>
                                <p>Visa ending in 1234</p>
                            </div>

                        </div>

                    </div>

                </div>

                <div className="lg:col-span-2">

                    <div className="lg:w-1/2 space-y-4">
                        <p className="capitalize font-medium">cost breakdown</p>

                        <div className="">

                            <div className="w-full flex justify-between children:text-sm">
                                <p className="capitalize">subtotal:</p>
                                <p>420€</p>
                            </div>

                            <div className="w-full flex justify-between children:text-sm">
                                <p className="capitalize">shipping:</p>
                                <p className="capitalize">30€</p>
                            </div>

                            <div className="w-full flex justify-between children:text-sm">
                                <p className="capitalize">tax:</p>
                                <p className="capitalize">22€</p>
                            </div>

                            <div className="w-full flex justify-between mt-4 font-medium">
                                <p className="capitalize">total:</p>
                                <p className="capitalize">472€</p>
                            </div>

                        </div>
                    </div>

                </div>

            </div>

            <div className="h-auto w-full my-8 xss:space-x-2 xxs:flex items-start grid grid-cols-2 gap-2">

                <Button
                    title='donwload invoice'
                    size='h-10 xxs:px-4 xxs:w-auto w-full'
                    border={true}
                />

                <Button
                    title='return/exchange'
                    size='h-10 xxs:px-4 xxs:w-auto w-full'
                    border={true}
                />

            </div>

            <div className="h-auto w-full mt-8">

                <p className="capitalize font-medium">order details</p>

                <div className="grid lg:grid-cols-4 md:grid-cols-3 xs:grid-cols-2 gap-2">

                    {/* <div className="flex items-end space-x-2">

                        <div className="h-auto">

                            <p className="capitalize text-sm">subtotal: 420€</p>
                            <p className="capitalize text-sm">shipping: 30€</p>
                            <p className="capitalize font-medium text-base mt-2">total: 450€</p>

                        </div>

                    </div> */}

                    <div className=" bg-cream-200 flex flex-col p-2 space-y-2">

                        <div className="w-full">
                            <img className="py-3 px-2" src="/images/mockups/base.png" alt="" />
                        </div>

                        <div className="h-full children:text-xs py-1 space-y-2 flex flex-col justify-between">

                            <p className="uppercase text-xs">t-shirt name</p>

                            <div className="children:capitalize">
                                <p>size: m</p>
                                <p>quantity: 2</p>
                                <p>subtotal: 40€</p>
                                <p className="font-medium mt-2">total: 80€</p>
                            </div>

                        </div>

                    </div>

                </div>

            </div>

        </div>

    )

}