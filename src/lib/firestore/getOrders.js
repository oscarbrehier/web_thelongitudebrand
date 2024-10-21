import { getCurrentUser } from "../authentication/firebaseAdmin";
import { adminFirestore } from "./firebaseAdmin";

export default async function getOrders() {

    const user = await getCurrentUser();
    if (!user) return [];

    try {

        const snap = await adminFirestore
            .collection("order")
            .where("userId", "==", user.uid).get();

        snap.docs.map((item) => console.log(item.data()));

        return snap.empty ? [] : snap.docs;

    } catch (err) {

        return [];

    };

};