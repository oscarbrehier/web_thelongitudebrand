import { adminFirestore } from "../firebase/admin";

export default async function getOrderByCheckoutId(stripeCheckoutId, userId) {

    if (!stripeCheckoutId) throw new Error("Invalid parameters provided to getOrderByCheckoutId");

    try {

        const snap = await adminFirestore
            .collection("orders")
            .where("stripeCheckoutId", "==", stripeCheckoutId)
            .get();

        return snap.empty ? null : snap.docs[0];

    } catch (err) {

        return null;

    };

};