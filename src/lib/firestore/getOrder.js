"use server"
import { adminFirestore } from "../firebase/admin";
import formatTimestamp from "./formatTimestamp";

export default async function getOrder(orderId, userId) {

    const docRef = adminFirestore
        .collection("orders")
        .doc(orderId);

    try {

        const res = await docRef.get();

        if (!res.exists) return null;

        const data = res.data();

        if (data.userId !== userId) {

            return {
                error: "order-fetch/not-found",
            };

        };

        return {
            ...data,
            at: formatTimestamp(data.at, "MMMM d, yyyy h:mm a")
        }

    } catch (err) {

        console.error(err);
        return {
            error: "order-fetch/failed",
        };

    };

};