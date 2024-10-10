import Hyperlink from "@/components/ui/Hyperlink";
import OrderTableRow from "@/components/OrderTableRow";

export default function Page() {

    const orders = true;

    return (

        <div className={`w-full ${orders ? 'h-auto' : 'flex-1'}`}>

            {
                !orders && (
                    <div className="w-full h-full flex flex-col items-center justify-center space-y-4 pb-20">

                        <p>You don’t have any orders or returns. Discover our products or contact us if you need assistance.</p>
                        <Hyperlink
                            title='start shopping'
                            size='w-96 h-10'
                            to='/shop'
                        />

                    </div>
                )
            }

            <section className="mt-16 space-y-4">

                <p className="capitalize mx-2 my-1">your orders</p>

                <div className="flex flex-col space-y-2">

                    <div className="md:grid hidden grid-cols-4 gap-2 children:text-xs">

                        <p>order number</p>
                        <p>order date</p>
                        <p>total amout</p>
                        <p>status</p>

                    </div>

                    <OrderTableRow />

                </div>

            </section>

        </div>

    );

};