"use client"
import { trackEvent } from "@/lib/analytics/analytics";
import { useEffect } from "react";

export function TrackEvent({ event, data }) {

	useEffect(() => {
		trackEvent(event, data);
	}, []);

	return (null);
}