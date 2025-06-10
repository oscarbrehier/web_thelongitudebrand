"use client"
import { trackEvent } from "@/lib/analytics/analytics";
import { useEffect } from "react";

export function TrackEvent({ order }) {

	useEffect(() => {
		trackEvent("order_completed", {
			orderId: order.orderId,
			orderTotal: order.total,
			currency: "EUR",
			itemCount: order.items.length,
			cartItems: order.items,
		});
	}, []);

	return (null);
}