import posthog from "posthog-js";

export const trackEvent = (event, properties = {}) => {
	if (typeof window !== 'undefined' && posthog) {
		console.log("tracking event", event)
		posthog.capture(event, properties);
	};
};