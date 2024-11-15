import * as Sentry from "@sentry/nextjs";
import { adminFirestore } from "@/lib/firebase/admin";
import admin from "firebase-admin";

async function deleteUserCart(userId) {

    const docRef = adminFirestore
        .collection("carts")
        .doc(userId);

    try {

        await docRef
            .update({
                items: [],
                updatedAt: admin.firestore.Timestamp.now(),
            });

    } catch (err) {

        console.log("Failed to delete cart for user with ID:", userId);
        throw (err);

    };

};

export default async function handleCheckoutSuccess(event) {

    const data = event.data.object;
    let { orderId, userId } = data.metadata;

    const orderRef = adminFirestore
        .collection("orders")
        .doc(orderId)

    try {

        await orderRef
            .update({
                completed: true,
                customer: {
                    ...data.customer_details
                }
            });

        if (userId) await deleteUserCart(userId);

    } catch (err) {

        console.error(err);
        Sentry.captureException(err);

    };

};