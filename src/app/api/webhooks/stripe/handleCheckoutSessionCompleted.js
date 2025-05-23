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

    console.log("function handleCheckoutSessionCompleted called")

    if (!data?.metadata || !data.metadata?.orderId) return;

    let {
        orderId,
        userId = null,
        sessionId } = data.metadata;

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

    } catch (err) {

        console.error(err)
        captureException(err);

    };

    if (userId) deleteUserCart(userId);

};