import { adminFirestore } from "../firebase/admin";

export default async function getOrderByCheckoutId(checkoutId) {

    try {

        const snap = await adminFirestore
            .collection("orders")
            .where("checkoutId", "==", checkoutId).get();

        return snap.empty ? [] : snap.docs[0];

    } catch (err) {

        return [];

    };

};