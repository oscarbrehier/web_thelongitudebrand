import { getCurrentUser } from "@/lib/authentication/sessionHelpers";
import getOrderByCheckoutId from "@/lib/firestore/getOrderByCheckoutId";
import { notFound, redirect } from "next/navigation";
import NoContentLayout from "@/app/components/NoContentLayout";
import { useEffect } from "react";
import { trackEvent } from "@/lib/analytics/analytics";


export default async function Page(props) {

    const params = await props.params;
    const { lang, id } = params;

    const user = await getCurrentUser();
    const order = await getOrderByCheckoutId(id, user?.uid || null);

    if (!order) return notFound();

    const currentDate = new Date();
    const checkoutDate = new Date(order.data().at._seconds * 1000);


    const timeDifference = currentDate - checkoutDate;

    if (timeDifference > 600000) {

        return redirect(user ? `/customer/orders/${order.id}` : "/shop");

    }

    const orderId = order?.id;

    return (

        <NoContentLayout
            title={`Order successfully placed`}
            text={`Your order will be processed within 24 hours during work days. We will notify you by email once your order has been shipped`}
            linkTitle={user ? "view order details" : "return to homepage"}
            link={user ? `/customer/orders/${orderId}` : "/shop"}
        >
            <TrackEvent order={order} />
            <p>Order ID: {orderId}</p>
        </NoContentLayout>

    );
};

function TrackEvent({ order }) {
    "use client"

    useEffect(() => {
        trackEvent("order_completed", {
            orderId: order.orderId,
            orderTotal: order.total,
            currency: "EUR",
            itemCount: order.items.length,
            cartItems: order.items,
        });
    }, []);

    return (null);
}