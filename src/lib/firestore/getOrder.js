"use server"
import { adminFirestore } from "../firebase/admin";
import formatTimestamp from "./formatTimestamp";

export default async function getOrder(orderId) {

    if (!orderId) throw new Error("Invalid parameter provided to getOrder");

    const docRef = adminFirestore
        .collection("orders")
        .doc(orderId);

    try {

        const res = await docRef.get();

        if (!res.exists) return null;

        return {
            ...res.data(),
            at: formatTimestamp(res.data().at, "MMMM d, yyyy h:mm a")
        }

    } catch (err) {

        console.error(err);
        return {
            error: "order-fetch/failed",
        };

    };

};