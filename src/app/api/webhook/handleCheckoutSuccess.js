import * as Sentry from "@sentry/nextjs";
import createOrder from "@/lib/firestore/createOrder";
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
        throw(err);

    };

};

export default async function handleCheckoutSuccess(event) {

    const data = event.data.object;
    let { id: stripeCheckoutId, amount_total: total } = data;
    let { orderId, userId, items } = data.metadata;

    try {

        items = JSON.parse(items);

        await createOrder(
            orderId,
            userId || null,
            items,
            total,
            stripeCheckoutId || null
        );

        if (userId) await deleteUserCart(userId);

    } catch (err) {

        console.error(err);
        Sentry.captureException(err);

    };

};