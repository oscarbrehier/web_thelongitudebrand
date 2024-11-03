import Hyperlink from "@/app/components/ui/Hyperlink";
import { isUserAuthenticated } from "@/lib/authentication/sessionHelpers";
import getOrderByCheckoutId from "@/lib/firestore/getOrderByCheckoutId";
import { notFound } from "next/navigation";

export default async function Page({
    params: {
        lang,
        id
    }
}) {

    let checkout;
    const isAuth = await isUserAuthenticated();

    if (isAuth) {

        checkout = await getOrderByCheckoutId(id);
        if (!checkout.id) return notFound();

    };

    const orderId = checkout?.id;


    return (

        <div className="h-screen w-full lg:grid grid-cols-4 gap-2 flex items-center justify-center">

            <div className="col-span-2 col-start-2 lg:w-full md:w-2/3 md:p-0 px-8 flex flex-col justify-center space-y-4">

                <div className="w-full flex flex-col space-y-2">
                    <h1 className="text-4xl">Order successfully placed</h1>
                    <p className="lg:w-2/3">Your order will be processed within 24 hours during work days. We will notify you by email once your order has been shipped.</p>
                </div>

                {
                    isAuth ? (

                        <Hyperlink
                            title="View order details"
                            size="h-14 lg:w-2/3"
                            to={`/customer/orders/${orderId}`}
                        />

                    ) : (

                        <Hyperlink
                            title="return to homepage"
                            size="h-14 lg:w-2/3"
                            to={`/shop`}
                        />

                    )
                }

            </div>

        </div>

    );

};