"use server"

import { adminFirestore } from "../firebase/admin";

export default async function getOrderProcess(orderId) {

    if (!orderId) throw new Error("Invalid parameter provided to orderId");

    const docRef = adminFirestore
        .collection("ordersProcess")
        .doc(orderId);
    
    try {

        const res = await docRef.get();
        if (!res.exists) return null;

        const { shipment, ...data } = res.data();
        const { shipmentId, ...safeShipment } = shipment || {};

        const customerTimeline = data.timeline = res.data().timeline.filter((item) => item.customerView == true);

        return {
            ...data,
            timeline: customerTimeline,
            shipment: safeShipment
        };

    } catch (err) {

        console.error(err);
        return {
            error: "order-details-fetch/failed"
        };

    };

};