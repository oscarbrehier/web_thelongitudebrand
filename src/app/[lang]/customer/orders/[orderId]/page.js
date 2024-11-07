import formatTimestamp from "@/lib/firestore/formatTimestamp";
import OrderView from "@/app/components/OrderView";
import { adminFirestore } from "@/lib/firebase/admin";
import { headers } from "next/headers";
import { origin } from "@/lib/constants/settings.config";

const serializeOrderData = (orderData) => {

    return {
        orderId: orderData.orderId,
        date: orderData.date.toString(),
        items: orderData.items,
    };

};

export default async function Page({ params: { orderId } }) {

    let data = null;

    const getStripeCheckoutData = async (stripeCheckoutId) => {

        const res = await fetch(`${origin}/api/checkout/session`, {
            method: "GET",
            headers: {
                "session-id": stripeCheckoutId
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
            const stripeCheckoutData = await getStripeCheckoutData(orderData.stripeCheckoutId);

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