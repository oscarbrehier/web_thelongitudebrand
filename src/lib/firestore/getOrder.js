import { doc, getDoc } from "@firebase/firestore";
import { database } from "../firebase/firebase";
import getCheckoutData from "../stripe/getCheckoutData";

export default async function getOrder(orderId) {

    try {

        const ref = doc(database, "s", orderId);
        const res = await getDoc(ref);

        if (res.exists) {

            const stripeSession = await getCheckoutData(res.data().checkoutId);

            return {
                order: res.data(),
                checkout: stripeSession
            };

        };

        return null;

    } catch (err) {

        console.error(err);
        throw new Error("ERROR_FETCH_ORDER");

    };

};