"use server"
import { adminFirestore } from "../firebase/admin";

export default async function deleteOrder(orderId) {

    if (!orderId) throw new Error("Invalid parameter `orderId` for deleteOrder");

    try {

        const docRef = adminFirestore
            .collection("orders")
            .doc(orderId);

        await docRef.delete();

    } catch (err) {

        console.error("Failed to delete order with ID:", orderId);
        console.error(err);
        
        return {
            errors: "order-delete/failed",
        };

    };

};