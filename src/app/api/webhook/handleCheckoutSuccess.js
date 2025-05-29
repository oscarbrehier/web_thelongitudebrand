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

async function createOrderProcess(orderId) {

    const timeline = [];
    const timelineItem = {
        title: "order placed",
        message: "Thanks for your order! We're getting it ready — processing is usually completed within 24 hours.",
        customerView: true,
        at: admin.firestore.Timestamp.now(),
    };

    timeline.push(timelineItem);

    try {
        await adminFirestore
            .collection("ordersProcess")
            .doc(orderId)
            .set({
                timeline
            });
    } catch (err) {
        throw err;
    };

}

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
        await createOrderProcess(orderId);

    } catch (err) {

        console.error(err); // remove_prod
        Sentry.captureException(err);

    };

};