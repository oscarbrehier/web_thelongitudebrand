import { captureException } from "@sentry/nextjs";
import { adminFirestore } from "@/lib/firebase/admin";
import admin from "firebase-admin";
import { analyticsServer } from "@/lib/analytics/Analytics";

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

        console.error(err)
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

        console.error(err)
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

        console.error(err)
        captureException(err);
        return;

    };

};

export default async function handleCheckoutSessionCompleted(data, headers) {

    if (!data?.metadata || !data.metadata?.orderId || !data.metadata?.userId) return;
    let { orderId, userId, sessionId } = data.metadata;

    await updateOrderDetails(orderId, data.customer_details);
    await setupOrderProcess(orderId);

    try {

        const payload = {
            distinctId: sessionId,
            userAgent: headers.get("user-agent"),
            propreties: {
                orderId,
            },
            ...(userId && {
                user: { id: userId },
            }),
        };

        await analyticsServer.captureEventServerSide("checkout completed", payload);

    } catch (err) {

        console.error(err)
        captureException(err);

    };

    if (userId) deleteUserCart(userId);

};