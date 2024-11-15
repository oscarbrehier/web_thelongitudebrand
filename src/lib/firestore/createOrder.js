"use server"
import { adminFirestore } from "../firebase/admin";
import admin from "firebase-admin";

export default async function createOrder(orderId, userId, items, total, stripeCheckoutId) {

    if (!orderId || !Array.isArray(items) || items.length === 0 || !stripeCheckoutId || typeof total !== "number") {
        throw new Error("Invalid parameters provided to createOrder");
    };

    try {

        await adminFirestore
            .collection("orders")
            .doc(orderId)
            .set({
                orderId,
                userId,
                items,
                total,
                stripeCheckoutId,
                status: 0,
                at: admin.firestore.Timestamp.now(),
            });

    } catch (err) {

        console.error(err);
        return {
            errors: "create-order/failed",
        };

    };

};