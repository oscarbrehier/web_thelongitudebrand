import { captureException } from "@sentry/nextjs";
import { adminFirestore } from "@/lib/firebase/admin";
import admin from "firebase-admin";

async function updateOrderDetails(orderId, customerDetails) {

    const orderRef = adminFirestore
        .collection("orders")
        .doc(orderId)

    try {

        await orderRef.update({
            completed: true,
            customer: { ...customerDetails }
        });

    } catch (err) {

        console.log(err)

        captureException(err);
        return;

    };
 
};

async function setupOrderProcess(orderId) {

    const data = {
        status: 0,
        timeline: [
            {
                at: admin.firestore.Timestamp.now(),
                customerView: true,
                title: "Order placed"
            },
        ],
    };

    try {

        await adminFirestore
            .collection("ordersProcess")
            .doc(orderId)
            .set(data);

    } catch (err) {

        console.log(err)

        captureException(err);
        return;

    };

};

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

        console.log(err)

        captureException(err);
        return;

    };

};

export default async function handleCheckoutSessionCompleted(data) {

    if (!data?.metadata || !data.metadata?.orderId || !data.metadata?.userId) return;
    let { orderId, userId } = data.metadata;

    await updateOrderDetails(orderId, data.customer_details);
    await setupOrderProcess(orderId);

    if (userId) deleteUserCart(userId);

};