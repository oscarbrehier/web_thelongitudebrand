import formatTimestamp from "@/lib/firestore/formatTimestamp";
import OrderView from "@/app/components/OrderView";
import { adminFirestore } from "@/lib/firebase/firebaseAdmin";
import { headers } from "next/headers";

const serializeOrderData = (orderData) => {

    return {
        orderId: orderData.orderId,
        date: orderData.date.toString(),
        items: orderData.items,
    };

};

export default async function Page({ params: { orderId } }) {

    let data = null;

    const getStripeCheckoutData = async (checkoutId) => {

        const headersList = headers();
        const host = headersList.get('X-Forwarded-Host');
        const proto = headersList.get('X-Forwarded-Proto');


        console.log(proto);

        const res = await fetch(`${proto}://${host}/api/checkout-session`, {
            method: "GET",
            headers: {
                "session-id": checkoutId
            },
        }).then(res => res.json());

        return res;

    };

    const getOrder = async () => {

        const orderSnapshot = await adminFirestore
            .collection("orders")
            .doc(orderId)
            .get();

        if (orderSnapshot.exists) {

            let orderData = orderSnapshot.data();
            const stripeCheckoutData = await getStripeCheckoutData(orderData.checkoutId);

            orderData["date"] = formatTimestamp(orderData.at);
            orderData = serializeOrderData(orderData);

            return {
                order: orderData,
                checkout: stripeCheckoutData.result
            };

        };

        return null;

    };

    data = await getOrder();

    return data && (

        <div>
            <OrderView
                order={data.order}
                checkout={data.checkout}
            />
        </div>

    );

};