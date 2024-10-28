import OrderTableRow from "@/app/components/OrderTableRow";
import getOrders from "@/lib/firestore/getOrders";

export default async function Page() {

    const orders = await getOrders();

    return (

        <>

            {
                orders.length === 0 ? (

                    <div className="flex-1 w-full grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-2">

                        <div className="col-span-2 col-start-2 flex flex-col items-center justify-center pb-16">
                            <p className="text-3xl">You don't have any orders</p>
                        </div>

                    </div>

                ) : (

                    <div className={`w-full h-auto`}>

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
                                    orders.map((order, index) => (
                                        <OrderTableRow key={index} id={order.id} order={order.data()} />
                                    ))
                                }

                            </div>

                        </section>

                    </div>

                )
            }

        </>

    );

};