import { getCurrentUser } from "@/lib/authentication/sessionHelpers";
import getOrderByCheckoutId from "@/lib/firestore/getOrderByCheckoutId";
import { notFound, redirect } from "next/navigation";
import NoContentLayout from "@/app/components/NoContentLayout";


export default async function Page({
    params: {
        lang,
        id
    }
}) {

    const user = await getCurrentUser();
    const checkout = await getOrderByCheckoutId(id, user?.uid || null);

    if (!checkout) return notFound();

    const currentDate = new Date();
    const checkoutDate = new Date(checkout.data().at._seconds * 1000);


    const timeDifference = currentDate - checkoutDate;

    if (timeDifference > 600000) {

        return redirect(user ? `/customer/orders/${checkout.id}` : "/shop");

    };

    const orderId = checkout?.id;

    return (

        <NoContentLayout
            title={`Order successfully placed`}
            text={`Your order will be processed within 24 hours during work days. We will notify you by email once your order has been shipped`}
            linkTitle={user ? "view order details" : "return to homepage"}
            link={user ? `/customer/orders/${orderId}` : "/shop"}
        >
            <p>Order ID: {orderId}</p>
        </NoContentLayout>

    );

};